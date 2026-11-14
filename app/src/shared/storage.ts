import type { ExtensionState, LurkerTab, Preset } from './types';
import { lurkerTabSchema, presetSchema } from './types';

export const PRESETS_KEY = 'presets';
export const LURKER_TABS_KEY = 'lurkerTabs';
export const TAB_ORDER_KEY = 'lurkerOrder';

let presetWriteChain: Promise<unknown> = Promise.resolve();
let tabWriteChain: Promise<unknown> = Promise.resolve();

function serialize<T>(chain: Promise<unknown>, fn: () => Promise<T>): Promise<T> {
  return chain.then(fn, fn);
}

export function newId(): string {
  return crypto.randomUUID();
}

function parsePresets(raw: unknown): Preset[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item) => {
    const parsed = presetSchema.safeParse(item);
    return parsed.success ? [parsed.data] : [];
  });
}

function parseLurkerTabs(raw: unknown): LurkerTab[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item) => {
    const parsed = lurkerTabSchema.safeParse(item);
    return parsed.success ? [parsed.data] : [];
  });
}

export async function getPresets(): Promise<Preset[]> {
  const stored = await chrome.storage.local.get({ [PRESETS_KEY]: [] as Preset[] });
  return parsePresets(stored[PRESETS_KEY]);
}

export async function getLurkerTabs(): Promise<LurkerTab[]> {
  const stored = await chrome.storage.local.get({ [LURKER_TABS_KEY]: [] as LurkerTab[] });
  return parseLurkerTabs(stored[LURKER_TABS_KEY]);
}

export async function getExtensionState(): Promise<ExtensionState> {
  const stored = await chrome.storage.local.get({
    [PRESETS_KEY]: [] as Preset[],
    [LURKER_TABS_KEY]: [] as LurkerTab[],
  });
  return {
    presets: parsePresets(stored[PRESETS_KEY]),
    lurkerTabs: parseLurkerTabs(stored[LURKER_TABS_KEY]),
  };
}

export async function mutatePresets(
  updater: (presets: Preset[]) => Preset[],
): Promise<Preset[]> {
  const run = serialize(presetWriteChain, async () => {
    const current = await getPresets();
    const next = updater(current);
    await chrome.storage.local.set({ [PRESETS_KEY]: next });
    return next;
  });
  presetWriteChain = run.catch(() => undefined);
  return run;
}

export async function upsertPreset(preset: Preset): Promise<Preset[]> {
  return mutatePresets((presets) => {
    const index = presets.findIndex((item) => item.id === preset.id);
    if (index === -1) return [...presets, preset];
    const next = [...presets];
    next[index] = preset;
    return next;
  });
}

export async function removePreset(presetId: string): Promise<Preset[]> {
  return mutatePresets((presets) => presets.filter((preset) => preset.id !== presetId));
}

export async function mutateLurkerTabs(
  updater: (tabs: LurkerTab[]) => LurkerTab[],
): Promise<LurkerTab[]> {
  const run = serialize(tabWriteChain, async () => {
    const current = await getLurkerTabs();
    const next = updater(current);
    await chrome.storage.local.set({ [LURKER_TABS_KEY]: next });
    return next;
  });
  tabWriteChain = run.catch(() => undefined);
  return run;
}

export async function updateLurkerTab(
  tabId: number,
  updater: (tab: LurkerTab) => LurkerTab,
): Promise<LurkerTab[]> {
  return mutateLurkerTabs((tabs) =>
    tabs.map((tab) => (tab.tabId === tabId ? updater(tab) : tab)),
  );
}

export async function removeLurkerTab(tabId: number): Promise<LurkerTab[]> {
  return mutateLurkerTabs((tabs) => tabs.filter((tab) => tab.tabId !== tabId));
}

export async function setLurkerTabs(tabs: LurkerTab[]): Promise<void> {
  await chrome.storage.local.set({ [LURKER_TABS_KEY]: tabs });
}

/** Popup-only display order (tab ids). Kept apart from `lurkerTabs` so it never races with the background worker. */
export async function getTabOrder(): Promise<number[]> {
  const stored = await chrome.storage.local.get({ [TAB_ORDER_KEY]: [] as number[] });
  const raw: unknown = stored[TAB_ORDER_KEY];
  return Array.isArray(raw) ? raw.filter((id): id is number => Number.isInteger(id)) : [];
}

export async function setTabOrder(order: number[]): Promise<void> {
  await chrome.storage.local.set({ [TAB_ORDER_KEY]: order });
}
