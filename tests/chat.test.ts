import { describe, expect, it } from 'vitest';

import {
  CHAT_RECONNECT_COOLDOWN_MS,
  CHAT_RELOAD_COOLDOWN_MS,
  decideChatWatchAction,
  deriveChatStatus,
} from '../src/shared/chat';

const now = 10_000_000;

function observation(overrides: Partial<Parameters<typeof deriveChatStatus>[0]> = {}) {
  return {
    hookInstalled: true,
    socketState: 'open' as const,
    chatRoomPresent: true,
    documentReady: true,
    pageAgeMs: 60_000,
    lastActivityAt: null,
    now,
    ...overrides,
  };
}

describe('deriveChatStatus', () => {
  it('reports connected when the chat WebSocket is open', () => {
    expect(deriveChatStatus(observation())).toEqual({
      status: 'connected',
      reason: 'chat-socket-open',
    });
  });

  it('reports disconnected when the socket is closed and chat is mounted', () => {
    expect(
      deriveChatStatus(
        observation({ socketState: 'closed', lastActivityAt: now - 1_000 }),
      ),
    ).toEqual({ status: 'disconnected', reason: 'chat-socket-closed' });

    expect(
      deriveChatStatus(observation({ socketState: 'none' })),
    ).toEqual({ status: 'disconnected', reason: 'chat-socket-none' });
  });

  it('does not reconnect while the page or chat socket is still connecting', () => {
    expect(
      deriveChatStatus(
        observation({ socketState: 'none', pageAgeMs: 1_000 }),
      ).status,
    ).toBe('unknown');
    expect(
      deriveChatStatus(
        observation({ socketState: 'none', documentReady: false }),
      ).status,
    ).toBe('unknown');
    expect(
      deriveChatStatus(observation({ socketState: 'connecting' })),
    ).toEqual({ status: 'unknown', reason: 'chat-connecting' });
  });

  it('does not treat an unmounted chat as disconnected', () => {
    expect(
      deriveChatStatus(
        observation({ socketState: 'closed', chatRoomPresent: false }),
      ).status,
    ).toBe('unknown');
  });

  it('uses recent chat activity only when the socket hook is missing', () => {
    expect(
      deriveChatStatus(
        observation({
          hookInstalled: false,
          socketState: null,
          lastActivityAt: now - 5_000,
        }),
      ),
    ).toEqual({ status: 'connected', reason: 'chat-activity-no-hook' });

    expect(
      deriveChatStatus(
        observation({
          hookInstalled: false,
          socketState: null,
          lastActivityAt: null,
        }),
      ),
    ).toEqual({ status: 'unknown', reason: 'hook-missing' });
  });

  it('trusts a closed socket over old chat activity', () => {
    expect(
      deriveChatStatus(
        observation({
          socketState: 'closed',
          lastActivityAt: now - 10_000,
        }),
      ).status,
    ).toBe('disconnected');
  });
});

const attempt = {
  chatFailures: 0,
  lastChatReconnectAt: null,
  lastChatReloadAt: null,
};

describe('decideChatWatchAction', () => {
  it('resets counters when connected', () => {
    expect(decideChatWatchAction(attempt, 'connected', now)).toBe('reset');
  });

  it('waits while status is unknown', () => {
    expect(decideChatWatchAction(attempt, 'unknown', now)).toBe('wait');
  });

  it('soft-reconnects on the first disconnected check', () => {
    expect(decideChatWatchAction(attempt, 'disconnected', now)).toBe('reconnect');
  });

  it('reloads the tab on the second disconnected check', () => {
    expect(
      decideChatWatchAction(
        {
          chatFailures: 1,
          lastChatReconnectAt: now - 60_000,
          lastChatReloadAt: null,
        },
        'disconnected',
        now,
      ),
    ).toBe('reload');
  });

  it('respects the reload and reconnect cooldowns', () => {
    expect(
      decideChatWatchAction(
        {
          chatFailures: 2,
          lastChatReconnectAt: now - CHAT_RECONNECT_COOLDOWN_MS + 1,
          lastChatReloadAt: now - CHAT_RELOAD_COOLDOWN_MS + 1,
        },
        'disconnected',
        now,
      ),
    ).toBe('wait');

    expect(
      decideChatWatchAction(
        {
          chatFailures: 2,
          lastChatReconnectAt: now - CHAT_RECONNECT_COOLDOWN_MS,
          lastChatReloadAt: now - CHAT_RELOAD_COOLDOWN_MS + 1,
        },
        'disconnected',
        now,
      ),
    ).toBe('reconnect');
  });
});
