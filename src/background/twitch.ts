import type { StreamInfo, TwitchCategory } from '../shared/types';

const GQL_URL = 'https://gql.twitch.tv/gql';
// Public client ID used by Twitch's own web player. No user login or secret is required.
const TWITCH_WEB_CLIENT_ID = 'kimne78kx3ncx6brgo4mv6wki5h1ko';

interface GqlError {
  message: string;
}

interface GqlResponse<T> {
  data?: T;
  errors?: GqlError[];
}

interface CategoryNode {
  id: string;
  name: string;
  displayName: string;
}

interface StreamNode {
  title: string;
  viewersCount: number;
  broadcaster: { login: string; displayName: string };
  game: { id: string; displayName: string } | null;
  previewImageURL: string | null;
}

interface UserNode {
  login: string;
  displayName: string;
  stream: {
    title: string;
    viewersCount: number;
    game: { id: string; displayName: string } | null;
    previewImageURL: string | null;
  } | null;
}

const STREAM_NODE_FIELDS = `
  title
  viewersCount
  broadcaster { login displayName }
  game { id displayName }
  previewImageURL(width: 320)
`;

async function gql<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(GQL_URL, {
      method: 'POST',
      headers: {
        'Client-ID': TWITCH_WEB_CLIENT_ID,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
      signal: AbortSignal.timeout(12_000),
    });
  } catch (error) {
    throw new Error(
      error instanceof Error && error.name === 'TimeoutError'
        ? 'Twitch took too long to respond.'
        : 'Could not reach Twitch. Check your connection.',
    );
  }

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Twitch is rate limiting requests. Try again in a minute.');
    }
    throw new Error(`Twitch API returned HTTP ${response.status}.`);
  }

  const body = (await response.json()) as GqlResponse<T>;
  if (body.errors?.length) {
    throw new Error(body.errors[0].message);
  }
  if (!body.data) {
    throw new Error('Twitch API returned an empty response.');
  }
  return body.data;
}

function previewUrl(value: string | null): string {
  return (value ?? '').replace('{height}', '180');
}

function toStreamInfo(node: StreamNode): StreamInfo {
  const login = node.broadcaster.login.toLowerCase();
  return {
    channelLogin: login,
    channelName: node.broadcaster.displayName,
    title: node.title,
    categoryId: node.game?.id ?? '',
    categoryName: node.game?.displayName ?? '',
    viewers: node.viewersCount,
    previewUrl: previewUrl(node.previewImageURL),
    url: `https://www.twitch.tv/${login}`,
  };
}

export async function searchCategories(
  query: string,
  limit = 20,
): Promise<TwitchCategory[]> {
  const normalized = query.trim();
  const first = Math.min(Math.max(limit, 1), 50);

  if (!normalized) {
    const data = await gql<{ games: { edges: Array<{ node: CategoryNode }> } }>(
      `query LurkerTopCategories($first: Int!) {
        games(first: $first, options: { sort: VIEWER_COUNT }) {
          edges { node { id name displayName } }
        }
      }`,
      { first },
    );
    return uniqueCategories(data.games.edges.map((edge) => edge.node));
  }

  const data = await gql<{
    searchCategories: { edges: Array<{ node: CategoryNode }> };
  }>(
    `query LurkerSearchCategories($query: String!, $first: Int!) {
      searchCategories(query: $query, first: $first) {
        edges { node { id name displayName } }
      }
    }`,
    { query: normalized, first },
  );
  return uniqueCategories(data.searchCategories.edges.map((edge) => edge.node));
}

function uniqueCategories(nodes: CategoryNode[]): TwitchCategory[] {
  const seen = new Set<string>();
  const categories: TwitchCategory[] = [];
  for (const node of nodes) {
    const key = node.id || node.name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    categories.push({ id: node.id, name: node.name, displayName: node.displayName });
  }
  return categories;
}

export async function getCategoryStreams(
  category: TwitchCategory | null,
  limit = 30,
): Promise<StreamInfo[]> {
  // Twitch's public GraphQL caps stream pages at 30 entries.
  const first = Math.min(Math.max(limit, 1), 30);

  if (!category) {
    const data = await gql<{
      streams: { edges: Array<{ node: StreamNode }> };
    }>(
      `query LurkerTopStreams($first: Int!) {
        streams(first: $first, options: { sort: VIEWER_COUNT }) {
          edges { node { ${STREAM_NODE_FIELDS} } }
        }
      }`,
      { first },
    );
    return data.streams.edges.map((edge) => toStreamInfo(edge.node));
  }

  if (category.id) {
    const data = await gql<{
      game: { streams: { edges: Array<{ node: StreamNode }> } } | null;
    }>(
      `query LurkerCategoryStreams($id: ID!, $first: Int!) {
        game(id: $id) {
          streams(first: $first, options: { sort: VIEWER_COUNT }) {
            edges { node { ${STREAM_NODE_FIELDS} } }
          }
        }
      }`,
      { id: category.id, first },
    );
    return data.game?.streams.edges.map((edge) => toStreamInfo(edge.node)) ?? [];
  }

  const data = await gql<{
    game: { streams: { edges: Array<{ node: StreamNode }> } } | null;
  }>(
    `query LurkerCategoryStreamsByName($name: String!, $first: Int!) {
      game(name: $name) {
        streams(first: $first, options: { sort: VIEWER_COUNT }) {
          edges { node { ${STREAM_NODE_FIELDS} } }
        }
      }
    }`,
    { name: category.name, first },
  );
  return data.game?.streams.edges.map((edge) => toStreamInfo(edge.node)) ?? [];
}

export async function getLiveChannels(logins: string[]): Promise<StreamInfo[]> {
  const uniqueLogins = [...new Set(logins.map((login) => login.toLowerCase()))].slice(0, 100);
  if (uniqueLogins.length === 0) return [];

  const data = await gql<{ users: UserNode[] }>(
    `query LurkerLiveUsers($logins: [String!]!) {
      users(logins: $logins) {
        login
        displayName
        stream {
          title
          viewersCount
          game { id displayName }
          previewImageURL(width: 320)
        }
      }
    }`,
    { logins: uniqueLogins },
  );

  return data.users.flatMap((user) => {
    if (!user.stream) return [];
    const login = user.login.toLowerCase();
    return [
      {
        channelLogin: login,
        channelName: user.displayName,
        title: user.stream.title,
        categoryId: user.stream.game?.id ?? '',
        categoryName: user.stream.game?.displayName ?? '',
        viewers: user.stream.viewersCount,
        previewUrl: previewUrl(user.stream.previewImageURL),
        url: `https://www.twitch.tv/${login}`,
      },
    ];
  });
}

export async function getLiveChannel(login: string): Promise<StreamInfo | null> {
  const channels = await getLiveChannels([login]);
  return channels[0] ?? null;
}
