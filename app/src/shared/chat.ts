import type { ChatConnectionStatus } from './types';

export const CHAT_RECONNECT_COOLDOWN_MS = 90_000;
export const CHAT_RELOAD_COOLDOWN_MS = 5 * 60_000;
export const CHAT_ACTIVITY_WINDOW_MS = 90_000;
export const CHAT_INITIALIZATION_GRACE_MS = 5_000;

export interface ChatObservation {
  hookInstalled: boolean;
  socketState: 'open' | 'connecting' | 'closed' | 'none' | null;
  chatRoomPresent: boolean;
  documentReady: boolean;
  pageAgeMs: number;
  lastActivityAt: number | null;
  now: number;
}

export interface ChatStatusResult {
  status: ChatConnectionStatus;
  reason: string;
}

export function deriveChatStatus(observation: ChatObservation): ChatStatusResult {
  const {
    hookInstalled,
    socketState,
    chatRoomPresent,
    documentReady,
    pageAgeMs,
    lastActivityAt,
    now,
  } = observation;

  if (!documentReady || pageAgeMs < CHAT_INITIALIZATION_GRACE_MS) {
    return { status: 'unknown', reason: 'initializing' };
  }

  if (socketState === 'open') {
    return { status: 'connected', reason: 'chat-socket-open' };
  }

  if (socketState === 'connecting') {
    return { status: 'unknown', reason: 'chat-connecting' };
  }

  const recentActivity =
    typeof lastActivityAt === 'number' &&
    now - lastActivityAt < CHAT_ACTIVITY_WINDOW_MS;

  if (hookInstalled) {
    if (socketState === 'closed' || socketState === 'none') {
      if (!chatRoomPresent) {
        return { status: 'unknown', reason: 'chat-not-mounted' };
      }
      return { status: 'disconnected', reason: `chat-socket-${socketState}` };
    }
    if (recentActivity) {
      return { status: 'connected', reason: 'chat-activity' };
    }
    return { status: 'unknown', reason: 'chat-state-unknown' };
  }

  if (recentActivity) {
    return { status: 'connected', reason: 'chat-activity-no-hook' };
  }
  return { status: 'unknown', reason: 'hook-missing' };
}

export interface ChatAttemptState {
  chatFailures: number;
  lastChatReconnectAt: number | null;
  lastChatReloadAt: number | null;
}

export type ChatWatchAction = 'reset' | 'reconnect' | 'reload' | 'wait';

export function decideChatWatchAction(
  attempt: ChatAttemptState,
  status: ChatConnectionStatus,
  now: number,
): ChatWatchAction {
  if (status === 'connected') return 'reset';
  if (status !== 'disconnected') return 'wait';

  const nextFailures = attempt.chatFailures + 1;
  const reloadAllowed =
    attempt.lastChatReloadAt === null ||
    now - attempt.lastChatReloadAt >= CHAT_RELOAD_COOLDOWN_MS;
  if (nextFailures >= 2 && reloadAllowed) return 'reload';

  const reconnectAllowed =
    attempt.lastChatReconnectAt === null ||
    now - attempt.lastChatReconnectAt >= CHAT_RECONNECT_COOLDOWN_MS;
  if (reconnectAllowed) return 'reconnect';

  return 'wait';
}
