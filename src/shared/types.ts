import { z } from 'zod';

export const twitchCategorySchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1),
  displayName: z.string().trim().min(1),
});

export type TwitchCategory = z.infer<typeof twitchCategorySchema>;

export const presetSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1),
  category: twitchCategorySchema.nullable(),
  titleFilter: z.string(),
  favorites: z.array(z.string()),
  blacklist: z.array(z.string()),
  createdAt: z.number(),
  updatedAt: z.number(),
});

export type Preset = z.infer<typeof presetSchema>;

export const presetArraySchema = z.array(presetSchema);

export const streamInfoSchema = z.object({
  channelLogin: z.string(),
  channelName: z.string(),
  title: z.string(),
  categoryId: z.string(),
  categoryName: z.string(),
  viewers: z.number(),
  previewUrl: z.string(),
  url: z.string(),
});

export type StreamInfo = z.infer<typeof streamInfoSchema>;

export const lurkerStatusSchema = z.enum([
  'idle',
  'searching',
  'watching',
  'waiting',
  'error',
]);

export type LurkerStatus = z.infer<typeof lurkerStatusSchema>;

export const chatConnectionStatusSchema = z.enum([
  'connected',
  'disconnected',
  'unknown',
]);

export type ChatConnectionStatus = z.infer<typeof chatConnectionStatusSchema>;

export const lurkerTabSchema = z.object({
  tabId: z.number(),
  presetId: z.string(),
  muted: z.boolean(),
  pursueMostWatched: z.boolean().default(true),
  enabled: z.boolean(),
  status: lurkerStatusSchema,
  stream: streamInfoSchema.nullable(),
  lastError: z.string().nullable(),
  lastCheckedAt: z.number().nullable(),
  chatStatus: chatConnectionStatusSchema.default('unknown'),
  chatFailures: z.number().int().nonnegative().default(0),
  lastChatReconnectAt: z.number().nullable().default(null),
  lastChatReloadAt: z.number().nullable().default(null),
});

export type LurkerTab = z.infer<typeof lurkerTabSchema>;

export const lurkerTabArraySchema = z.array(lurkerTabSchema);

export interface ExtensionState {
  presets: Preset[];
  lurkerTabs: LurkerTab[];
}

export const presetDraftSchema = z.object({
  name: z.string().trim().min(1, 'Give this preset a name.'),
  category: twitchCategorySchema.nullable(),
  titleFilter: z.string(),
  favorites: z.array(z.string()),
  blacklist: z.array(z.string()),
});

export type PresetDraft = z.infer<typeof presetDraftSchema>;

export type BackgroundRequest =
  | {
      type: 'lurker:start';
      tabId: number;
      presetId: string;
      muted: boolean;
      pursueMostWatched: boolean;
    }
  | { type: 'lurker:stop'; tabId: number }
  | { type: 'lurker:setEnabled'; tabId: number; enabled: boolean }
  | { type: 'lurker:setPreset'; tabId: number; presetId: string }
  | { type: 'lurker:setMuted'; tabId: number; muted: boolean }
  | {
      type: 'lurker:setPursueMostWatched';
      tabId: number;
      pursueMostWatched: boolean;
    }
  | { type: 'lurker:remove'; tabId: number; closeTab?: boolean }
  | { type: 'lurker:goTo'; tabId: number }
  | { type: 'lurker:evaluate'; tabId?: number }
  | { type: 'twitch:categories'; query?: string };

export interface BackgroundResponse<T = undefined> {
  ok: boolean;
  data?: T;
  error?: string;
}

export interface ChatCheckRequest {
  type: 'chat:check';
}

export interface ChatReconnectRequest {
  type: 'chat:reconnect';
}

export type ChatContentRequest = ChatCheckRequest | ChatReconnectRequest;

export interface ChatContentResponse {
  ok: boolean;
  status?: ChatConnectionStatus;
  reason?: string;
}
