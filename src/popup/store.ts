import { create } from 'zustand';

import { IS_POPOUT, SOURCE_TAB_ID } from '@/popup/popout';
import { t } from '@/shared/i18n';
import {
  getExtensionState,
  PRESETS_KEY,
  LURKER_TABS_KEY,
  removePreset,
  upsertPreset,
} from '@/shared/storage';
import {
  lurkerTabArraySchema,
  presetArraySchema,
  presetSchema,
  type Preset,
  type LurkerTab,
} from '@/shared/types';

export type Screen = 'main' | 'presets' | 'preset-form' | 'lurker-form';

export interface ActiveTabInfo {
  id: number;
  title: string;
  url?: string;
  favIconUrl?: string;
}

interface AppStore {
  hydrated: boolean;
  screen: Screen;
  presetsOrigin: 'main' | 'lurker-form';
  editingPresetId: string | null;
  lurkerFormTabId: number | null;
  presets: Preset[];
  lurkingTabs: LurkerTab[];
  activeTab: ActiveTabInfo | null;
  load: () => Promise<void>;
  goToMain: () => void;
  goToPresets: () => void;
  openLurkerForm: (tabId?: number) => void;
  openPresetForm: (presetId?: string) => void;
  goBack: () => void;
  savePreset: (preset: Preset) => Promise<void>;
  deletePreset: (presetId: string) => Promise<void>;
}

let loadPromise: Promise<void> | null = null;
let storageSubscribed = false;
let activeTabSubscribed = false;

function mapTab(tab: chrome.tabs.Tab | undefined): ActiveTabInfo | null {
  if (!tab || typeof tab.id !== 'number') return null;
  return {
    id: tab.id,
    title: tab.title ?? t('common.currentTab'),
    url: tab.url,
    favIconUrl: tab.favIconUrl,
  };
}

async function resolveLastNormalActiveTab(): Promise<ActiveTabInfo | null> {
  try {
    const win = await chrome.windows.getLastFocused({ windowTypes: ['normal'] });
    if (typeof win.id === 'number') {
      const [tab] = await chrome.tabs.query({ active: true, windowId: win.id });
      const mapped = mapTab(tab);
      if (mapped) return mapped;
    }
  } catch {
    // Fall through to the last-focused-window query.
  }

  try {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    return mapTab(tab);
  } catch {
    return null;
  }
}

async function resolveInitialActiveTab(): Promise<ActiveTabInfo | null> {
  if (!IS_POPOUT) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return mapTab(tab);
  }

  if (SOURCE_TAB_ID !== null) {
    try {
      return mapTab(await chrome.tabs.get(SOURCE_TAB_ID));
    } catch {
      // The source tab may have been closed; find the last normal tab instead.
    }
  }

  return resolveLastNormalActiveTab();
}

function subscribeToActiveTabTracking(
  set: (partial: Partial<AppStore>) => void,
  get: () => AppStore,
): void {
  if (!IS_POPOUT || activeTabSubscribed) return;
  activeTabSubscribed = true;

  async function applyWindow(windowId: number): Promise<void> {
    if (windowId === chrome.windows.WINDOW_ID_NONE) return;
    try {
      const win = await chrome.windows.get(windowId);
      if (win.type !== 'normal') return;
      const [tab] = await chrome.tabs.query({ active: true, windowId });
      const mapped = mapTab(tab);
      if (mapped) set({ activeTab: mapped });
    } catch {
      // The window may have closed while we were reading it.
    }
  }

  chrome.tabs.onActivated.addListener((info) => {
    void applyWindow(info.windowId);
  });

  chrome.windows.onFocusChanged.addListener((windowId) => {
    void applyWindow(windowId);
  });

  chrome.tabs.onRemoved.addListener((tabId) => {
    if (get().activeTab?.id !== tabId) return;
    void resolveLastNormalActiveTab().then((tab) => {
      if (tab) set({ activeTab: tab });
    });
  });

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tabId !== get().activeTab?.id) return;
    if (!changeInfo.title && !changeInfo.url && !changeInfo.favIconUrl) return;
    const mapped = mapTab(tab);
    if (mapped) set({ activeTab: mapped });
  });
}

function subscribeToStorage(
  set: (partial: Partial<AppStore>) => void,
): void {
  if (storageSubscribed) return;
  storageSubscribed = true;

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== 'local') return;

    if (changes[PRESETS_KEY]) {
      const parsed = presetArraySchema.safeParse(changes[PRESETS_KEY].newValue ?? []);
      if (parsed.success) set({ presets: parsed.data });
    }

    if (changes[LURKER_TABS_KEY]) {
      const parsed = lurkerTabArraySchema.safeParse(
        changes[LURKER_TABS_KEY].newValue ?? [],
      );
      if (parsed.success) set({ lurkingTabs: parsed.data });
    }
  });
}

export const useAppStore = create<AppStore>((set, get) => ({
  hydrated: false,
  screen: 'main',
  presetsOrigin: 'main',
  editingPresetId: null,
  lurkerFormTabId: null,
  presets: [],
  lurkingTabs: [],
  activeTab: null,

  load: () => {
    if (!loadPromise) {
      loadPromise = (async () => {
        subscribeToStorage(set);
        subscribeToActiveTabTracking(set, get);
        const [state, activeTab] = await Promise.all([
          getExtensionState(),
          resolveInitialActiveTab(),
        ]);
        set({
          presets: state.presets,
          lurkingTabs: state.lurkerTabs,
          activeTab,
          hydrated: true,
        });
      })();
    }
    return loadPromise;
  },

  goToMain: () => set({ screen: 'main', editingPresetId: null }),
  goToPresets: () =>
    set((state) => ({
      screen: 'presets',
      editingPresetId: null,
      presetsOrigin: state.screen === 'lurker-form' ? 'lurker-form' : 'main',
    })),
  openLurkerForm: (tabId) =>
    set({
      screen: 'lurker-form',
      editingPresetId: null,
      lurkerFormTabId: tabId ?? null,
    }),
  openPresetForm: (presetId) =>
    set({ screen: 'preset-form', editingPresetId: presetId ?? null }),
  goBack: () => {
    const screen = get().screen;
    if (screen === 'preset-form') {
      set({ screen: 'presets', editingPresetId: null });
    } else if (screen === 'presets') {
      set({ screen: get().presetsOrigin, editingPresetId: null });
    } else if (screen === 'lurker-form') {
      set({ screen: 'main', editingPresetId: null });
    }
  },

  savePreset: async (preset) => {
    const validated = presetSchema.parse(preset);
    const next = await upsertPreset(validated);
    set({ presets: next, screen: 'presets', editingPresetId: null });
  },

  deletePreset: async (presetId) => {
    const next = await removePreset(presetId);
    set((state) => ({
      presets: next,
      editingPresetId:
        state.editingPresetId === presetId ? null : state.editingPresetId,
      screen: state.screen === 'preset-form' ? 'presets' : state.screen,
    }));
  },
}));
