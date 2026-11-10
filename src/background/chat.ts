import { decideChatWatchAction } from '../shared/chat';
import { channelFromTwitchUrl } from '../shared/filters';
import { getLurkerTabs, updateLurkerTab } from '../shared/storage';
import type {
  ChatContentRequest,
  ChatContentResponse,
} from '../shared/types';

async function requestChatStatus(tabId: number): Promise<ChatContentResponse | null> {
  try {
    const response = (await chrome.tabs.sendMessage(tabId, {
      type: 'chat:check',
    } satisfies ChatContentRequest)) as ChatContentResponse | undefined;
    return response ?? null;
  } catch {
    return null;
  }
}

async function requestSoftReconnect(tabId: number): Promise<void> {
  try {
    await chrome.tabs.sendMessage(tabId, {
      type: 'chat:reconnect',
    } satisfies ChatContentRequest);
  } catch {
    // No monitor in the tab; the reload fallback handles it on a later check.
  }
}

export async function checkChatForTab(tabId: number): Promise<void> {
  const record = (await getLurkerTabs()).find((tab) => tab.tabId === tabId);
  if (!record?.enabled || record.status !== 'watching') return;

  let tab: chrome.tabs.Tab;
  try {
    tab = await chrome.tabs.get(tabId);
  } catch {
    return;
  }
  if (!channelFromTwitchUrl(tab.url)) return;

  const response = await requestChatStatus(tabId);
  if (!response?.ok || !response.status) return;

  const now = Date.now();

  if (response.status === 'connected') {
    if (record.chatStatus !== 'connected' || record.chatFailures !== 0) {
      await updateLurkerTab(tabId, (current) => ({
        ...current,
        chatStatus: 'connected',
        chatFailures: 0,
      }));
    }
    return;
  }

  if (response.status === 'unknown') {
    if (record.chatStatus !== 'unknown') {
      await updateLurkerTab(tabId, (current) => ({
        ...current,
        chatStatus: 'unknown',
      }));
    }
    return;
  }

  const action = decideChatWatchAction(record, 'disconnected', now);
  const nextFailures = record.chatFailures + 1;

  if (action === 'reload') {
    await updateLurkerTab(tabId, (current) => ({
      ...current,
      chatStatus: 'disconnected',
      chatFailures: nextFailures,
      lastChatReloadAt: now,
    }));
    try {
      await chrome.tabs.reload(tabId);
    } catch {
      // The tab may be gone.
    }
    return;
  }

  if (action === 'reconnect') {
    await updateLurkerTab(tabId, (current) => ({
      ...current,
      chatStatus: 'disconnected',
      chatFailures: nextFailures,
      lastChatReconnectAt: now,
    }));
    await requestSoftReconnect(tabId);
    return;
  }

  await updateLurkerTab(tabId, (current) => ({
    ...current,
    chatStatus: 'disconnected',
    chatFailures: nextFailures,
  }));
}

export async function checkAllChatConnections(): Promise<void> {
  const tabs = await getLurkerTabs();
  const targets = tabs.filter((tab) => tab.enabled && tab.status === 'watching');
  await Promise.allSettled(targets.map((tab) => checkChatForTab(tab.tabId)));
}
