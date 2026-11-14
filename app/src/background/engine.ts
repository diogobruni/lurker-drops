import {
  channelFromTwitchUrl,
  isBlacklisted,
  normalizeChannels,
  pickStream,
} from '../shared/filters';
import { t } from '../shared/i18n';
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
import { markInternalNavigation } from './navigation';

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

export async function previewStreamForPreset(
  presetId: string,
): Promise<StreamInfo | null> {
  const preset = (await getPresets()).find((item) => item.id === presetId);
  if (!preset) throw new Error(t('error.presetMissing'));
  return findStreamForPreset(preset, null, true);
}

const stripHash = (url: string | undefined | null) => url?.split('#')[0];

let relinkChain: Promise<unknown> = Promise.resolve();

async function relinkTab(
  staleId: number,
  openIfMissing: boolean,
): Promise<number | null> {
  const records = await getLurkerTabs();
  const record = records.find((tab) => tab.tabId === staleId);
  if (!record) return null;
  try {
    await chrome.tabs.get(staleId);
    return staleId;
  } catch {
    // Reference lost (e.g. browser restarted). Look for the same URL.
  }

  const taken = new Set(records.map((tab) => tab.tabId));
  const wanted = stripHash(record.url);
  const match = wanted
    ? (await chrome.tabs.query({})).find(
        (tab) =>
          typeof tab.id === 'number' &&
          !taken.has(tab.id) &&
          stripHash(tab.url ?? tab.pendingUrl) === wanted,
      )
    : undefined;

  let newId = match?.id;
  if (newId === undefined && openIfMissing) {
    newId = (await chrome.tabs.create({ url: record.url ?? 'https://www.twitch.tv/' }))
      .id;
  }
  if (newId === undefined) return null;

  const id = newId;
  await mutateLurkerTabs((tabs) =>
    tabs.map((tab) => (tab.tabId === staleId ? { ...tab, tabId: id } : tab)),
  );
  return id;
}

/**
 * Returns a live tab id for the record. When its tab is gone, reattaches to an
 * unmanaged tab with the same URL, or opens a new one if `openIfMissing`.
 * Returns null when nothing was found (or the record vanished).
 */
export function ensureTab(
  record: LurkerTab,
  openIfMissing: boolean,
): Promise<number | null> {
  const run = relinkChain.then(() => relinkTab(record.tabId, openIfMissing));
  relinkChain = run.catch(() => undefined);
  return run;
}

/**
 * Browser restart reassigns tab ids, so a stored id may point at an unrelated
 * tab. `storage.session` is cleared on restart: on the first run of a browser
 * session, replace every stored id with a unique invalid one so each record is
 * relinked by URL instead of trusted.
 */
export async function invalidateStaleRefsOnBoot(): Promise<void> {
  const { booted } = await chrome.storage.session.get('booted');
  if (booted) return;
  await chrome.storage.session.set({ booted: true });
  await mutateLurkerTabs((tabs) =>
    tabs.map((tab, index) => ({ ...tab, tabId: -(index + 1) })),
  );
}

/**
 * Reattach records whose tab is gone to a same-URL tab, without opening tabs.
 * Enabled records are included only when `includeEnabled`; otherwise
 * `evaluateTab` handles them (and may open a tab).
 */
export async function relinkLostTabs(includeEnabled: boolean): Promise<void> {
  for (const record of await getLurkerTabs()) {
    if (includeEnabled || !record.enabled) await ensureTab(record, false);
  }
}

export async function evaluateTab(tabId: number): Promise<void> {
  const record = (await getLurkerTabs()).find((tab) => tab.tabId === tabId);
  if (!record?.enabled) return;

  const liveId = await ensureTab(record, true);
  if (liveId === null) return;
  if (liveId !== tabId) return evaluateTab(liveId);

  const preset = (await getPresets()).find((item) => item.id === record.presetId);
  if (!preset) {
    await updateLurkerTab(tabId, (tab) => ({
      ...tab,
      enabled: false,
      status: 'idle',
      lastError: t('error.presetNoLongerExists'),
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
        markInternalNavigation(tabId);
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
              lastError: t('error.couldNotOpenChannel', {
                channel: stream.channelName,
                error: errorMessage(error),
              }),
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
        lastError: t('error.presetRemoved'),
      };
    }),
  );
}

export async function cleanupClosedTab(tabId: number): Promise<void> {
  invalidateEvaluation(tabId);
  await removeLurkerTab(tabId);
}

export type { LurkerTab };
