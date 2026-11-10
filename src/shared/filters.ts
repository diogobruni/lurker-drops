import type { Preset, StreamInfo } from './types';

const RESERVED_TWITCH_PATHS = new Set([
  'directory',
  'search',
  'videos',
  'settings',
  'subscriptions',
  'inventory',
  'wallet',
  'drops',
  'friends',
  'messages',
  'dashboard',
  'turbo',
  'downloads',
  'jobs',
  'p',
  'store',
  'creatorcamp',
  'security',
  'privacy',
  'legal',
]);

/** Turns a typed slug, @handle, or Twitch URL into a lowercase channel login. */
export function normalizeChannel(input: string): string {
  let value = input.trim().toLowerCase();
  if (!value) return '';

  value = value.replace(/^https?:\/\//, '').replace(/^www\./, '');
  if (value.startsWith('twitch.tv/')) {
    value = value.slice('twitch.tv/'.length);
  } else if (value.startsWith('m.twitch.tv/')) {
    value = value.slice('m.twitch.tv/'.length);
  }

  value = value.split(/[?#]/, 1)[0] ?? '';
  value = value.replace(/^@+/, '');
  const firstSegment = value.split('/').find((segment) => segment.length > 0) ?? '';
  return firstSegment.trim();
}

export function normalizeChannels(inputs: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const input of inputs) {
    const channel = normalizeChannel(input);
    if (!channel || seen.has(channel)) continue;
    seen.add(channel);
    result.push(channel);
  }
  return result;
}

export function normalizeTitleFilter(value: string): string {
  return value.trim();
}

export function titleMatches(title: string, titleFilter: string): boolean {
  const filter = titleFilter.trim().toLowerCase();
  if (!filter) return true;
  return title.toLowerCase().includes(filter);
}

export function isBlacklisted(login: string, blacklist: string[]): boolean {
  const normalized = normalizeChannel(login);
  return blacklist.some((entry) => normalizeChannel(entry) === normalized);
}

export function categoryMatches(stream: StreamInfo, preset: Preset): boolean {
  const category = preset.category;
  if (!category) return true;
  if (category.id && stream.categoryId) {
    return category.id === stream.categoryId;
  }
  const targetNames = [category.name, category.displayName]
    .filter(Boolean)
    .map((name) => name.trim().toLowerCase());
  return targetNames.includes(stream.categoryName.trim().toLowerCase());
}

export function streamMatchesPreset(stream: StreamInfo, preset: Preset): boolean {
  if (isBlacklisted(stream.channelLogin, preset.blacklist)) return false;
  if (!categoryMatches(stream, preset)) return false;
  return titleMatches(stream.title, preset.titleFilter);
}

interface PickStreamInput {
  preset: Preset;
  /** Live results for the preset's favorite channels, in any order. */
  favoritesLive?: StreamInfo[];
  /** Candidate streams, usually sorted by viewers. */
  candidates?: StreamInfo[];
  /** The channel currently open in the tab, if known. Used when pursueMostWatched is off. */
  current?: StreamInfo | null;
  /** Chase the most-watched eligible live instead of keeping the current one. */
  pursueMostWatched: boolean;
}

/**
 * Selection rules:
 * - Favorites form the preferred tier. If any eligible favorite is live, the
 *   winner is picked from them; otherwise the winner comes from all candidates.
 * - pursueMostWatched on: most-watched live in the pool wins. Favorite order breaks ties.
 * - pursueMostWatched off: favorites win in the configured order; with no eligible
 *   favorite, the current live is kept while it remains valid; otherwise most viewers win.
 *
 * The current channel gets no protection when pursueMostWatched is on, so the next
 * check can move the tab to a new leader as viewership shifts.
 */
export function pickStream({
  preset,
  favoritesLive = [],
  candidates = [],
  current = null,
  pursueMostWatched,
}: PickStreamInput): StreamInfo | null {
  const favoriteRank = new Map(
    normalizeChannels(preset.favorites).map((login, index) => [login, index]),
  );

  const unique = new Map<string, StreamInfo>();
  for (const stream of [...favoritesLive, ...candidates]) {
    const login = normalizeChannel(stream.channelLogin);
    if (!login || unique.has(login)) continue;
    unique.set(login, stream);
  }

  const eligible = [...unique.values()].filter((stream) =>
    streamMatchesPreset(stream, preset),
  );
  const eligibleFavorites = eligible.filter((stream) =>
    favoriteRank.has(normalizeChannel(stream.channelLogin)),
  );
  const pool = eligibleFavorites.length > 0 ? eligibleFavorites : eligible;

  const byViewers = [...pool].sort((a, b) => {
    if (b.viewers !== a.viewers) return b.viewers - a.viewers;
    const aRank =
      favoriteRank.get(normalizeChannel(a.channelLogin)) ?? Number.MAX_SAFE_INTEGER;
    const bRank =
      favoriteRank.get(normalizeChannel(b.channelLogin)) ?? Number.MAX_SAFE_INTEGER;
    if (aRank !== bRank) return aRank - bRank;
    return a.channelLogin.localeCompare(b.channelLogin);
  });

  if (pursueMostWatched) return byViewers[0] ?? null;

  if (eligibleFavorites.length > 0) {
    const byFavoriteOrder = [...eligibleFavorites].sort((a, b) => {
      const aRank =
        favoriteRank.get(normalizeChannel(a.channelLogin)) ?? Number.MAX_SAFE_INTEGER;
      const bRank =
        favoriteRank.get(normalizeChannel(b.channelLogin)) ?? Number.MAX_SAFE_INTEGER;
      return aRank - bRank;
    });
    return byFavoriteOrder[0] ?? null;
  }

  if (current && streamMatchesPreset(current, preset)) return current;
  return byViewers[0] ?? null;
}

export function channelFromTwitchUrl(urlValue: string | undefined): string | null {
  if (!urlValue) return null;
  try {
    const url = new URL(urlValue);
    if (!['twitch.tv', 'www.twitch.tv', 'm.twitch.tv'].includes(url.hostname)) return null;
    const segment = url.pathname.split('/').find((part) => part.length > 0);
    if (!segment) return null;
    const login = normalizeChannel(segment);
    if (!login || RESERVED_TWITCH_PATHS.has(login)) return null;
    return login;
  } catch {
    return null;
  }
}
