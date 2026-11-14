import { deriveChatStatus } from '../shared/chat';
import type { ChatContentRequest, ChatContentResponse } from '../shared/types';

/**
 * ISOLATED-world content script. The background worker asks it for a chat
 * status every minute and can request a soft reconnect. The actual WebSocket
 * state comes from chat-hook.ts, which runs in the page's MAIN world.
 */

(() => {
  const flag = '__lurkerDropsChatMonitorInstalled';
  const windowWithFlag = window as unknown as Record<string, unknown>;
  if (windowWithFlag[flag]) return;
  windowWithFlag[flag] = true;

  const RECONNECT_EVENT = 'lurker-drops:reconnect-chat';
  const CHAT_ROOM_SELECTOR =
    '[data-test-selector="chat-room-component-layout"], [data-a-target="chat-room-component-layout"], .chat-room';
  const CHAT_CONTAINER_SELECTOR =
    '[data-test-selector="chat-scrollable-area__message-container"], [data-a-target="chat-scroller"], .chat-scrollable-area__message-container';
  const CHAT_MESSAGE_SELECTOR =
    '[data-a-target="chat-line-message"], .chat-line__message';

  let lastChatActivityAt: number | null = null;
  let activityObserver: MutationObserver | null = null;
  let activityAttachTimer: number | null = null;

  function ensureActivityObserver(): void {
    if (activityObserver || activityAttachTimer !== null) return;

    let attempts = 0;
    const tryAttach = () => {
      activityAttachTimer = null;
      const container = document.querySelector(CHAT_CONTAINER_SELECTOR);
      if (!container) {
        attempts += 1;
        if (attempts < 30) {
          activityAttachTimer = window.setTimeout(tryAttach, 2_000);
        }
        return;
      }

      activityObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (!(node instanceof Element)) continue;
            if (
              node.matches(CHAT_MESSAGE_SELECTOR) ||
              node.querySelector(CHAT_MESSAGE_SELECTOR)
            ) {
              lastChatActivityAt = Date.now();
              return;
            }
          }
        }
      });

      activityObserver.observe(container, {
        childList: true,
        subtree: true,
      });
    };

    tryAttach();
  }

  function collectStatus() {
    const root = document.documentElement;
    const rawState = root?.getAttribute('data-lurker-chat-state');
    const socketState =
      rawState === 'open' ||
      rawState === 'connecting' ||
      rawState === 'closed' ||
      rawState === 'none'
        ? rawState
        : null;

    return deriveChatStatus({
      hookInstalled: root?.getAttribute('data-lurker-chat-hook') === '1',
      socketState,
      chatRoomPresent: document.querySelector(CHAT_ROOM_SELECTOR) !== null,
      documentReady: document.readyState === 'complete',
      pageAgeMs: performance.now(),
      lastActivityAt: lastChatActivityAt,
      now: Date.now(),
    });
  }

  chrome.runtime.onMessage.addListener(
    (
      message: ChatContentRequest,
      _sender: chrome.runtime.MessageSender,
      sendResponse: (response: ChatContentResponse) => void,
    ) => {
      if (message?.type === 'chat:check') {
        ensureActivityObserver();
        const result = collectStatus();
        sendResponse({ ok: true, ...result });
        return false;
      }

      if (message?.type === 'chat:reconnect') {
        window.dispatchEvent(new Event(RECONNECT_EVENT));
        sendResponse({ ok: true, reason: 'reconnect-requested' });
        return false;
      }

      return false;
    },
  );
})();
