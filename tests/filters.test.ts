import { describe, expect, it } from 'vitest';

import {
  categoryMatches,
  channelFromTwitchUrl,
  isBlacklisted,
  normalizeChannel,
  normalizeChannels,
  pickStream,
  streamMatchesPreset,
  titleMatches,
} from '../src/shared/filters';
import type { Preset, StreamInfo } from '../src/shared/types';

function makeStream(
  login: string,
  overrides: Partial<StreamInfo> = {},
): StreamInfo {
  return {
    channelLogin: login,
    channelName: login,
    title: `${login} live`,
    categoryId: '509658',
    categoryName: 'Just Chatting',
    viewers: 100,
    previewUrl: '',
    url: `https://www.twitch.tv/${login}`,
    ...overrides,
  };
}

function makePreset(overrides: Partial<Preset> = {}): Preset {
  return {
    id: 'preset-1',
    name: 'Test preset',
    category: null,
    titleFilter: '',
    favorites: [],
    blacklist: [],
    createdAt: 0,
    updatedAt: 0,
    ...overrides,
  };
}

describe('normalizeChannel', () => {
  it('normalizes handles, URLs, capitalization and query strings', () => {
    expect(normalizeChannel('@SomeStreamer')).toBe('somestreamer');
    expect(normalizeChannel('https://www.twitch.tv/SomeStreamer?x=1')).toBe(
      'somestreamer',
    );
    expect(normalizeChannel('https://twitch.tv/some/chat')).toBe('some');
    expect(normalizeChannel('  ')).toBe('');
  });

  it('deduplicates channels while preserving order', () => {
    expect(normalizeChannels(['@A', 'a', 'b', ' B ', ''])).toEqual(['a', 'b']);
  });
});

describe('channelFromTwitchUrl', () => {
  it('extracts channel logins only from Twitch channel URLs', () => {
    expect(channelFromTwitchUrl('https://www.twitch.tv/SomeStreamer')).toBe(
      'somestreamer',
    );
    expect(channelFromTwitchUrl('https://twitch.tv/some/chat')).toBe('some');
    expect(channelFromTwitchUrl('https://www.twitch.tv/directory')).toBeNull();
    expect(channelFromTwitchUrl('https://example.com/some')).toBeNull();
    expect(channelFromTwitchUrl(undefined)).toBeNull();
  });
});

describe('filters', () => {
  it('matches titles case-insensitively', () => {
    expect(titleMatches('DROPS enabled!', 'drops')).toBe(true);
    expect(titleMatches('Ranked grind', 'drops')).toBe(false);
    expect(titleMatches('Anything', '   ')).toBe(true);
  });

  it('matches categories by id or by manual name', () => {
    const stream = makeStream('a', { categoryId: '509658', categoryName: 'Just Chatting' });
    expect(
      categoryMatches(
        stream,
        makePreset({
          category: { id: '509658', name: 'Just Chatting', displayName: 'Just Chatting' },
        }),
      ),
    ).toBe(true);
    expect(
      categoryMatches(
        stream,
        makePreset({
          category: { name: 'just chatting', displayName: 'Just Chatting' },
        }),
      ),
    ).toBe(true);
    expect(
      categoryMatches(
        stream,
        makePreset({
          category: { id: '27471', name: 'Minecraft', displayName: 'Minecraft' },
        }),
      ),
    ).toBe(false);
  });

  it('applies title, category and blacklist together', () => {
    const preset = makePreset({
      titleFilter: 'drops',
      blacklist: ['Blocked'],
      category: { id: '509658', name: 'Just Chatting', displayName: 'Just Chatting' },
    });
    expect(
      streamMatchesPreset(
        makeStream('ok', { title: 'DROPS while working' }),
        preset,
      ),
    ).toBe(true);
    expect(
      streamMatchesPreset(makeStream('blocked', { title: 'drops' }), preset),
    ).toBe(false);
    expect(
      streamMatchesPreset(
        makeStream('wrong-category', { title: 'drops', categoryId: '1', categoryName: 'Minecraft' }),
        preset,
      ),
    ).toBe(false);
    expect(isBlacklisted('@Blocked', preset.blacklist)).toBe(true);
  });
});

describe('pickStream', () => {
  it('with pursue on, prefers the most-watched favorite over order and popular non-favorites', () => {
    const preset = makePreset({ favorites: ['first', 'second'] });
    const first = makeStream('first', { viewers: 50 });
    const second = makeStream('second', { viewers: 500 });
    const popular = makeStream('popular', { viewers: 5000 });

    expect(
      pickStream({
        preset,
        favoritesLive: [first, second],
        candidates: [popular, second, first],
        pursueMostWatched: true,
      })?.channelLogin,
    ).toBe('second');
  });

  it('with pursue on, ignores the current channel when a bigger one exists', () => {
    const preset = makePreset();
    const current = makeStream('current', { viewers: 10 });
    const bigger = makeStream('bigger', { viewers: 9000 });
    expect(
      pickStream({
        preset,
        candidates: [bigger, current],
        current,
        pursueMostWatched: true,
      })?.channelLogin,
    ).toBe('bigger');
  });

  it('with pursue off, follows favorites in the configured order', () => {
    const preset = makePreset({ favorites: ['first', 'second'] });
    const first = makeStream('first', { viewers: 50 });
    const second = makeStream('second', { viewers: 500 });
    const popular = makeStream('popular', { viewers: 5000 });

    expect(
      pickStream({
        preset,
        favoritesLive: [second, first],
        candidates: [popular, second, first],
        pursueMostWatched: false,
      })?.channelLogin,
    ).toBe('first');
  });

  it('with pursue off, keeps a valid current live over a bigger channel', () => {
    const preset = makePreset();
    const current = makeStream('current', { viewers: 10 });
    const bigger = makeStream('bigger', { viewers: 9000 });
    expect(
      pickStream({
        preset,
        candidates: [bigger, current],
        current,
        pursueMostWatched: false,
      })?.channelLogin,
    ).toBe('current');
  });

  it('skips a favorite that does not match the preset filters', () => {
    const preset = makePreset({ favorites: ['sleeping', 'live'], titleFilter: 'drops' });
    const sleeping = makeStream('sleeping', { title: 'just chatting' });
    const live = makeStream('live', { title: 'Drops enabled' });
    expect(
      pickStream({
        preset,
        favoritesLive: [sleeping, live],
        pursueMostWatched: true,
      })?.channelLogin,
    ).toBe('live');
  });

  it('with pursue off and no eligible favorite, falls back to the current live when valid', () => {
    const preset = makePreset({ titleFilter: 'drops' });
    const current = makeStream('current', { title: 'Drops!', viewers: 10 });
    const candidate = makeStream('candidate', { title: 'Drops!', viewers: 5000 });
    expect(
      pickStream({
        preset,
        candidates: [candidate],
        current,
        pursueMostWatched: false,
      })?.channelLogin,
    ).toBe('current');
  });

  it('chooses the most-watched matching candidate when nothing else applies', () => {
    const preset = makePreset({ titleFilter: 'drops', blacklist: ['bad'] });
    const candidates = [
      makeStream('mid', { title: 'drops', viewers: 200 }),
      makeStream('top', { title: 'DROPS!', viewers: 300 }),
      makeStream('off-filter', { title: 'not eligible', viewers: 9000 }),
      makeStream('bad', { title: 'drops', viewers: 8000 }),
    ];
    expect(
      pickStream({ preset, candidates, pursueMostWatched: true })?.channelLogin,
    ).toBe('top');
    expect(
      pickStream({ preset, candidates, pursueMostWatched: false })?.channelLogin,
    ).toBe('top');
  });

  it('returns null when no live matches', () => {
    const preset = makePreset({ titleFilter: 'drops' });
    expect(
      pickStream({
        preset,
        candidates: [makeStream('unrelated', { title: 'hello' })],
        pursueMostWatched: true,
      }),
    ).toBeNull();
  });
});
