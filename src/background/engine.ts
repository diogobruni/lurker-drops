import {
  channelFromTwitchUrl,
  isBlacklisted,
  normalizeChannels,
  pickStream,
} from '../shared/filters';
import { errorMessage } from '../shared/messages';
import {
  getLurkerTabs,
  getPresets,
  mutateLurkerTabs,
  removeLurkerTab,
  updateLurkerTab,
} from '../shared/storage';
import type { LurkerTab, Preset, StreamInfo } from '../shared/types';
import { getCategoryStreams, getLiveChannel, getLiveChannels } from './twitch';

const runVersions = new Map<number, number>();

function beginRun(tabId: number): number {
  const next = (runVersions.get(tabId) ?? 0) + 1;
  runVersions.set(tabId, next);
  return next;
}

function isCurrentRun(tabId: number, version: number): boolean {
  return runVersions.get(tabId) === version;
}

/** Cancels any in-flight evaluation so it cannot write or navigate after a user action. */
export function invalidateEvaluation(tabId: number): void {
  runVersions.set(tabId, (runVersions.get(tabId) ?? 0) + 1);
}

async function findStreamForPreset(
  preset: Preset,
  currentLogin: string | null,
  pursueMostWatched: boolean,
): Promise<StreamInfo | null> {
  const favoriteLogins = normalizeChannels(preset.favorites)
    .filter((login) => !isBlacklisted(login, preset.blacklist))
    .slice(0, 100);

  const [favoritesResult, candidatesResult] = await Promise.allSettled([
    favoriteLogins.length > 0 ? getLiveChannels(favoriteLogins) : Promise.resolve([]),
    getCategoryStreams(preset.category, 30),
  ]);

  const favoritesLive =
    favoritesResult.status === 'fulfilled' ? favoritesResult.value : [];
  const candidates =
    candidatesResult.status === 'fulfilled' ? candidatesResult.value : [];

  let current: StreamInfo | null = null;
  if (
    !pursueMostWatched &&
    currentLogin &&
    !isBlacklisted(currentLogin, preset.blacklist)
  ) {
    current =
      favoritesLive.find((stream) => stream.channelLogin === currentLogin) ??
      candidates.find((stream) => stream.channelLogin === currentLogin) ??
      null;

    if (!current) {
      try {
        current = await getLiveChannel(currentLogin);
      } catch {
        current = null;
      }
    }
  }

  const selected = pickStream({
    preset,
    favoritesLive,
    candidates,
    current,
    pursueMostWatched,
  });

  if (!selected && favoritesResult.status === 'rejected' && candidatesResult.status === 'rejected') {
    throw new Error(errorMessage(candidatesResult.reason));
  }
  if (!selected && candidatesResult.status === 'rejected' && favoritesLive.length === 0) {
    throw new Error(errorMessage(candidatesResult.reason));
  }

  return selected;
}

export async function evaluateTab(tabId: number): Promise<void> {
  const record = (await getLurkerTabs()).find((tab) => tab.tabId === tabId);
  if (!record?.enabled) return;

  const preset = (await getPresets()).find((item) => item.id === record.presetId);
  if (!preset) {
    await updateLurkerTab(tabId, (tab) => ({
      ...tab,
      enabled: false,
      status: 'idle',
      lastError: 'The preset no longer exists.',
    }));
    return;
  }

  const version = beginRun(tabId);

  let tab: chrome.tabs.Tab;
  try {
    tab = await chrome.tabs.get(tabId);
  } catch {
    await removeLurkerTab(tabId);
    return;
  }

  try {
    await chrome.tabs.update(tabId, { muted: record.muted });
  } catch {
    // The tab may be closing; the next tab lookup will clean it up.
  }

  if (!record.stream && isCurrentRun(tabId, version)) {
    await updateLurkerTab(tabId, (current) =>
      current.enabled ? { ...current, status: 'searching', lastError: null } : current,
    );
  }

  const currentLogin = channelFromTwitchUrl(tab.url);
  const pursueMostWatched = record.pursueMostWatched;

  try {
    const stream = await findStreamForPreset(
      preset,
      currentLogin,
      pursueMostWatched,
    );
    if (!isCurrentRun(tabId, version)) return;

    const latest = (await getLurkerTabs()).find((item) => item.tabId === tabId);
    if (
      !latest?.enabled ||
      latest.presetId !== preset.id ||
      latest.pursueMostWatched !== pursueMostWatched
    ) {
      return;
    }

    const now = Date.now();
    if (!stream) {
      await updateLurkerTab(tabId, (current) => ({
        ...current,
        status: 'waiting',
        stream: null,
        lastError: null,
        lastCheckedAt: now,
      }));
      return;
    }

    const changingChannel = currentLogin !== stream.channelLogin;
    await updateLurkerTab(tabId, (current) => ({
      ...current,
      status: 'watching',
      stream,
      lastError: null,
      lastCheckedAt: now,
      ...(changingChannel
        ? { chatStatus: 'unknown' as const, chatFailures: 0 }
        : {}),
    }));

    let freshTab: chrome.tabs.Tab;
    try {
      freshTab = await chrome.tabs.get(tabId);
    } catch {
      await removeLurkerTab(tabId);
      return;
    }

    try {
      if (channelFromTwitchUrl(freshTab.url) !== stream.channelLogin) {
        await chrome.tabs.update(tabId, { url: stream.url, muted: latest.muted });
      } else if (freshTab.mutedInfo?.muted !== latest.muted) {
        await chrome.tabs.update(tabId, { muted: latest.muted });
      }
    } catch (error) {
      if (!isCurrentRun(tabId, version)) return;
      await updateLurkerTab(tabId, (current) =>
        current.enabled
          ? {
              ...current,
              status: 'error',
              lastError: `Could not open ${stream.channelName}: ${errorMessage(error)}`,
            }
          : current,
      );
    }
  } catch (error) {
    if (!isCurrentRun(tabId, version)) return;
    await updateLurkerTab(tabId, (current) =>
      current.enabled
        ? {
            ...current,
            status: 'error',
            lastError: errorMessage(error),
            lastCheckedAt: Date.now(),
          }
        : current,
    );
  }
}

export async function evaluateAllEnabled(): Promise<void> {
  const tabs = await getLurkerTabs();
  const enabled = tabs.filter((tab) => tab.enabled);
  await Promise.allSettled(enabled.map((tab) => evaluateTab(tab.tabId)));
}

export async function reconcilePresets(presets: Preset[]): Promise<void> {
  const allowed = new Set(presets.map((preset) => preset.id));
  const fallbackId = presets[0]?.id ?? '';

  await mutateLurkerTabs((tabs) =>
    tabs.map((tab) => {
      if (allowed.has(tab.presetId)) return tab;
      return {
        ...tab,
        presetId: fallbackId,
        enabled: false,
        status: 'idle',
        lastError: 'The preset used by this tab was removed.',
      };
    }),
  );
}

export async function cleanupClosedTab(tabId: number): Promise<void> {
  invalidateEvaluation(tabId);
  await removeLurkerTab(tabId);
}

export type { LurkerTab };
