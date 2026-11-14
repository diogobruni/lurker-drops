import { describe, expect, it } from 'vitest';

import {
  lurkerTabArraySchema,
  presetArraySchema,
  presetDraftSchema,
  presetSchema,
} from '../src/shared/types';

const validPreset = {
  id: 'preset-1',
  name: 'Drops',
  category: { id: '509658', name: 'Just Chatting', displayName: 'Just Chatting' },
  titleFilter: 'drops',
  favorites: ['somestreamer'],
  blacklist: [],
  createdAt: 1,
  updatedAt: 2,
};

describe('preset persistence schemas', () => {
  it('accepts a valid stored preset', () => {
    const parsed = presetArraySchema.safeParse([validPreset]);
    expect(parsed.success).toBe(true);
    if (parsed.success) expect(parsed.data[0].name).toBe('Drops');
  });

  it('rejects corrupt stored presets instead of crashing the UI', () => {
    expect(presetArraySchema.safeParse([{ ...validPreset, name: '' }]).success).toBe(
      false,
    );
    expect(presetSchema.safeParse({ ...validPreset, favorites: 'not-an-array' }).success).toBe(
      false,
    );
  });

  it('rejects invalid lurking tab records and defaults pursueMostWatched to on', () => {
    expect(lurkerTabArraySchema.safeParse([{ tabId: 1 }]).success).toBe(false);
    const parsed = lurkerTabArraySchema.safeParse([
      {
        tabId: 1,
        presetId: 'preset-1',
        muted: false,
        enabled: true,
        status: 'watching',
        stream: null,
        lastError: null,
        lastCheckedAt: null,
      },
    ]);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data[0].pursueMostWatched).toBe(true);
      expect(parsed.data[0].chatStatus).toBe('unknown');
      expect(parsed.data[0].chatFailures).toBe(0);
      expect(parsed.data[0].lastChatReconnectAt).toBeNull();
      expect(parsed.data[0].lastChatReloadAt).toBeNull();
    }
  });

  it('requires a preset name in the form schema', () => {
    const missing = presetDraftSchema.safeParse({
      name: '   ',
      category: null,
      titleFilter: '',
      favorites: [],
      blacklist: [],
    });
    expect(missing.success).toBe(false);

    const valid = presetDraftSchema.safeParse({
      name: '  Drops  ',
      category: null,
      titleFilter: '',
      favorites: ['a'],
      blacklist: [],
    });
    expect(valid.success).toBe(true);
    if (valid.success) expect(valid.data.name).toBe('Drops');
  });
});
