/**
 * MAIN-world hook. Twitch creates its chat connection in page script, so this
 * content script runs at document_start and tracks the IRC WebSocket state.
 * It exposes that state through data attributes on <html> for the isolated
 * chat monitor to read.
 */

(() => {
  const flag = '__lurkerDropsChatHookInstalled';
  const windowWithFlag = window as unknown as Record<string, unknown>;
  if (windowWithFlag[flag]) return;
  windowWithFlag[flag] = true;

  const NativeWebSocket = window.WebSocket;
  if (typeof NativeWebSocket !== 'function') return;

  const sockets = new Set<WebSocket>();
  let sawChatSocket = false;
  let createdChatSockets = 0;

  function publish(): void {
    const root = document.documentElement;
    if (!root) return;
    let openCount = 0;
    let connectingCount = 0;
    for (const socket of sockets) {
      if (socket.readyState === NativeWebSocket.OPEN) openCount += 1;
      else if (socket.readyState === NativeWebSocket.CONNECTING) connectingCount += 1;
    }
    const state =
      openCount > 0
        ? 'open'
        : connectingCount > 0
          ? 'connecting'
          : sawChatSocket
            ? 'closed'
            : 'none';
    root.setAttribute('data-lurker-chat-hook', '1');
    root.setAttribute('data-lurker-chat-state', state);
    root.setAttribute('data-lurker-chat-open', String(openCount));
    root.setAttribute('data-lurker-chat-created', String(createdChatSockets));
    root.setAttribute('data-lurker-chat-updated-at', String(Date.now()));
  }

  publish();
  document.addEventListener('DOMContentLoaded', publish, { once: true });

  function track(socket: WebSocket): void {
    sockets.add(socket);
    publish();
    socket.addEventListener('open', publish);
    socket.addEventListener('error', publish);
    socket.addEventListener('close', () => {
      sockets.delete(socket);
      publish();
    });
  }

  const WrappedWebSocket = new Proxy(NativeWebSocket, {
    construct(target, args: unknown[]): WebSocket {
      const socket = Reflect.construct(target, args) as WebSocket;
      try {
        const url = String(args[0] ?? '');
        if (/^wss?:\/\/irc-ws\.chat\.twitch\.tv/i.test(url)) {
          sawChatSocket = true;
          createdChatSockets += 1;
          track(socket);
        }
      } catch {
        // Never interfere with a page WebSocket because tracking failed.
      }
      return socket;
    },
  });

  try {
    window.WebSocket = WrappedWebSocket as typeof WebSocket;
  } catch {
    return;
  }

  window.addEventListener('lurker-drops:reconnect-chat', () => {
    for (const socket of [...sockets]) {
      try {
        socket.close();
      } catch {
        // Already closed.
      }
    }
    // Nudge Twitch's client after the forced close.
    try {
      window.dispatchEvent(new Event('online'));
    } catch {
      // Ignore.
    }
  });
})();
