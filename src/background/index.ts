import { errorMessage } from '../shared/messages';
import {
  getLurkerTabs,
  getPresets,
  mutateLurkerTabs,
  removeLurkerTab,
  updateLurkerTab,
} from '../shared/storage';
import type {
  BackgroundRequest,
  BackgroundResponse,
  LurkerTab,
  Preset,
  TwitchCategory,
} from '../shared/types';
import {
  cleanupClosedTab,
  evaluateAllEnabled,
  evaluateTab,
  invalidateEvaluation,
  reconcilePresets,
} from './engine';
import { checkAllChatConnections } from './chat';
import { searchCategories } from './twitch';

const ALARM_NAME = 'lurker-drops:tick';
const ACTIVE_ICONS = {
  16: 'icons/active-16.png',
  32: 'icons/active-32.png',
  48: 'icons/active-48.png',
};
const INACTIVE_ICONS = {
  16: 'icons/inactive-16.png',
  32: 'icons/inactive-32.png',
  48: 'icons/inactive-48.png',
};

async function setTabMuted(tabId: number, muted: boolean): Promise<void> {
  try {
    await chrome.tabs.update(tabId, { muted });
  } catch {
    // The tab can disappear at any moment; cleanup handles it on the next sweep.
  }
}

async function syncActionStateNow(): Promise<void> {
  const tabs = await getLurkerTabs();
  const activeCount = tabs.filter((tab) => tab.enabled).length;
  const isActive = activeCount > 0;

  await chrome.action.setIcon({ path: isActive ? ACTIVE_ICONS : INACTIVE_ICONS });
  await chrome.action.setBadgeBackgroundColor({ color: '#7c3aed' });
  try {
    await chrome.action.setBadgeTextColor({ color: '#ffffff' });
  } catch {
    // Older Chromium builds do not support badge text color.
  }
  await chrome.action.setBadgeText({
    text: isActive ? (activeCount > 9 ? '9+' : String(activeCount)) : '',
  });

  if (isActive) {
    const existing = await chrome.alarms.get(ALARM_NAME);
    if (!existing) {
      await chrome.alarms.create(ALARM_NAME, { periodInMinutes: 1 });
    }
  } else {
    await chrome.alarms.clear(ALARM_NAME);
  }
}

let actionSyncChain: Promise<unknown> = Promise.resolve();

function syncActionState(): Promise<void> {
  const run = actionSyncChain.then(syncActionStateNow, syncActionStateNow);
  actionSyncChain = run.catch(() => undefined);
  return run;
}

async function startLurking(
  tabId: number,
  presetId: string,
  muted: boolean,
  pursueMostWatched: boolean,
): Promise<void> {
  await chrome.tabs.get(tabId);
  const preset = (await getPresets()).find((item) => item.id === presetId);
  if (!preset) throw new Error('Choose a preset before starting the lurker.');

  await mutateLurkerTabs((tabs) => {
    const existing = tabs.find((tab) => tab.tabId === tabId);
    const next: LurkerTab = existing
      ? {
          ...existing,
          presetId,
          muted,
          pursueMostWatched,
          enabled: true,
          status: 'searching',
          chatStatus: 'unknown',
          chatFailures: 0,
          lastError: null,
        }
      : {
          tabId,
          presetId,
          muted,
          pursueMostWatched,
          enabled: true,
          status: 'searching',
          stream: null,
          lastError: null,
          lastCheckedAt: null,
          chatStatus: 'unknown',
          chatFailures: 0,
          lastChatReconnectAt: null,
          lastChatReloadAt: null,
        };
    return existing
      ? tabs.map((tab) => (tab.tabId === tabId ? next : tab))
      : [...tabs, next];
  });

  await setTabMuted(tabId, muted);
  await evaluateTab(tabId);
}

async function setEnabled(tabId: number, enabled: boolean): Promise<void> {
  const record = (await getLurkerTabs()).find((tab) => tab.tabId === tabId);
  if (!record) throw new Error('This tab is not managed by Lurker Drops.');

  if (enabled) {
    const preset = (await getPresets()).find((item) => item.id === record.presetId);
    if (!preset) throw new Error('Choose a preset before starting the lurker.');
    await updateLurkerTab(tabId, (tab) => ({
      ...tab,
      enabled: true,
      status: 'searching',
      chatStatus: 'unknown',
      chatFailures: 0,
      lastError: null,
    }));
    await setTabMuted(tabId, record.muted);
    await evaluateTab(tabId);
    return;
  }

  invalidateEvaluation(tabId);
  await updateLurkerTab(tabId, (tab) => ({
    ...tab,
    enabled: false,
    status: 'idle',
  }));
}

async function setPreset(tabId: number, presetId: string): Promise<void> {
  const preset = (await getPresets()).find((item) => item.id === presetId);
  if (!preset) throw new Error('That preset no longer exists.');
  const record = (await getLurkerTabs()).find((tab) => tab.tabId === tabId);
  if (!record) throw new Error('This tab is not managed by Lurker Drops.');

  await updateLurkerTab(tabId, (tab) => ({
    ...tab,
    presetId,
    status: tab.enabled ? 'searching' : tab.status,
    stream: tab.enabled ? null : tab.stream,
    lastError: null,
  }));

  if (record.enabled) await evaluateTab(tabId);
}

async function setMuted(tabId: number, muted: boolean): Promise<void> {
  await updateLurkerTab(tabId, (tab) => ({ ...tab, muted }));
  await setTabMuted(tabId, muted);
}

async function setPursueMostWatched(
  tabId: number,
  pursueMostWatched: boolean,
): Promise<void> {
  const record = (await getLurkerTabs()).find((tab) => tab.tabId === tabId);
  if (!record) throw new Error('This tab is not managed by Lurker Drops.');

  await updateLurkerTab(tabId, (tab) => ({
    ...tab,
    pursueMostWatched,
    status: tab.enabled ? 'searching' : tab.status,
    lastError: null,
  }));

  if (record.enabled) await evaluateTab(tabId);
}

async function removeTab(tabId: number, closeTab: boolean): Promise<void> {
  invalidateEvaluation(tabId);
  await removeLurkerTab(tabId);
  if (closeTab) {
    try {
      await chrome.tabs.remove(tabId);
    } catch {
      // Already closed.
    }
  }
}

async function goToTab(tabId: number): Promise<void> {
  const tab = await chrome.tabs.get(tabId);
  await chrome.tabs.update(tabId, { active: true });
  if (typeof tab.windowId === 'number') {
    await chrome.windows.update(tab.windowId, { focused: true });
  }
}

async function routeRequest(message: BackgroundRequest): Promise<unknown> {
  switch (message.type) {
    case 'lurker:start':
      await startLurking(
        message.tabId,
        message.presetId,
        message.muted,
        message.pursueMostWatched,
      );
      return undefined;
    case 'lurker:stop':
      await setEnabled(message.tabId, false);
      return undefined;
    case 'lurker:setEnabled':
      await setEnabled(message.tabId, message.enabled);
      return undefined;
    case 'lurker:setPreset':
      await setPreset(message.tabId, message.presetId);
      return undefined;
    case 'lurker:setMuted':
      await setMuted(message.tabId, message.muted);
      return undefined;
    case 'lurker:setPursueMostWatched':
      await setPursueMostWatched(message.tabId, message.pursueMostWatched);
      return undefined;
    case 'lurker:remove':
      await removeTab(message.tabId, message.closeTab ?? false);
      return undefined;
    case 'lurker:goTo':
      await goToTab(message.tabId);
      return undefined;
    case 'lurker:evaluate':
      if (typeof message.tabId === 'number') {
        await evaluateTab(message.tabId);
      } else {
        await evaluateAllEnabled();
      }
      return undefined;
    case 'twitch:categories': {
      const categories: TwitchCategory[] = await searchCategories(message.query ?? '');
      return categories;
    }
    default: {
      const exhaustive: never = message;
      throw new Error(`Unknown request: ${String(exhaustive)}`);
    }
  }
}

async function handleRequest(message: BackgroundRequest): Promise<unknown> {
  const data = await routeRequest(message);
  if (message.type.startsWith('lurker:')) {
    await syncActionState();
  }
  return data;
}

async function bootstrap(): Promise<void> {
  await syncActionState();
}

let presetReconcileTimer: ReturnType<typeof setTimeout> | undefined;

const ready = bootstrap().catch((error: unknown) => {
  console.error('Lurker Drops boot failed', error);
});

chrome.runtime.onMessage.addListener(
  (
    message: BackgroundRequest,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: BackgroundResponse<unknown>) => void,
  ) => {
    if (sender.id !== chrome.runtime.id) {
      sendResponse({ ok: false, error: 'Unauthorized sender.' });
      return false;
    }
    ready
      .then(() => handleRequest(message))
      .then((data) => sendResponse({ ok: true, data }))
      .catch((error: unknown) =>
        sendResponse({ ok: false, error: errorMessage(error) }),
      );
    return true;
  },
);

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === ALARM_NAME) {
    void ready
      .then(async () => {
        await evaluateAllEnabled();
        await checkAllChatConnections();
        await syncActionState();
      })
      .catch((error: unknown) => {
        console.error('Lurker tick failed', error);
      });
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  void ready
    .then(() => cleanupClosedTab(tabId))
    .then(() => syncActionState())
    .catch((error: unknown) => {
      console.error('Could not clean up a closed tab', error);
    });
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== 'local' || !changes.presets) return;
  const presets = (changes.presets.newValue ?? []) as Preset[];
  if (presetReconcileTimer) clearTimeout(presetReconcileTimer);
  presetReconcileTimer = setTimeout(() => {
    void (async () => {
      await ready;
      await reconcilePresets(presets);
      await syncActionState();
      await evaluateAllEnabled();
    })().catch((error: unknown) => {
      console.error('Could not apply preset changes', error);
    });
  }, 300);
});

chrome.runtime.onInstalled.addListener(() => {
  void ready
    .then(() => syncActionState())
    .catch((error: unknown) => {
      console.error('Lurker Drops install setup failed', error);
    });
});

chrome.runtime.onStartup.addListener(() => {
  void ready
    .then(() => syncActionState())
    .catch((error: unknown) => {
      console.error('Lurker Drops startup failed', error);
    });
});
