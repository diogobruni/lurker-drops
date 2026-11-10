import {
  AlertTriangle,
  Ban,
  Gamepad2,
  Pencil,
  Plus,
  SlidersHorizontal,
  Star,
  Trash2,
  Tv,
} from 'lucide-react';
import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { errorMessage } from '@/shared/messages';
import type { Preset } from '@/shared/types';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/popup/store';

function PresetCard({
  preset,
  usageCount,
  deleting,
  pendingDelete,
  onEdit,
  onAskDelete,
  onCancelDelete,
  onConfirmDelete,
}: {
  preset: Preset;
  usageCount: number;
  deleting: boolean;
  pendingDelete: boolean;
  onEdit: () => void;
  onAskDelete: () => void;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
}) {
  return (
    <div
      className={cn(
        'rounded-xl border bg-card/80 p-3 shadow-sm transition-colors',
        pendingDelete ? 'border-red-500/30' : 'border-border/80',
      )}
    >
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{preset.name}</p>
          <p className="mt-0.5 line-clamp-1 text-[10px] text-muted-foreground">
            {preset.category?.displayName ?? 'Any category'}
            {preset.titleFilter.trim()
              ? ` · title contains “${preset.titleFilter.trim()}”`
              : ' · any title'}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              {preset.favorites.length} favorite{preset.favorites.length === 1 ? '' : 's'}
            </span>
            <span className="flex items-center gap-1">
              <Ban className="h-3 w-3" />
              {preset.blacklist.length} blocked
            </span>
            {usageCount > 0 && (
              <Badge variant="success" className="gap-1">
                <Tv className="h-2.5 w-2.5" />
                {usageCount} in use
              </Badge>
            )}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-0.5">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onEdit}
            title="Edit preset"
            aria-label={`Edit ${preset.name}`}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onAskDelete}
            title="Delete preset"
            aria-label={`Delete ${preset.name}`}
            className="text-muted-foreground hover:bg-red-500/10 hover:text-red-400"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {pendingDelete && (
        <div className="mt-3 rounded-lg border border-red-500/20 bg-red-500/5 p-2.5">
          <p className="text-[11px] leading-relaxed text-red-200">
            Delete <span className="font-medium">{preset.name}</span>?
            {usageCount > 0
              ? ` ${usageCount} tab${usageCount === 1 ? '' : 's'} using it will be paused.`
              : ' This cannot be undone.'}
          </p>
          <div className="mt-2 flex justify-end gap-1.5">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 text-[11px]"
              onClick={onCancelDelete}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="h-7 text-[11px]"
              onClick={onConfirmDelete}
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete preset'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export function PresetsScreen() {
  const presets = useAppStore((state) => state.presets);
  const lurkingTabs = useAppStore((state) => state.lurkingTabs);
  const openPresetForm = useAppStore((state) => state.openPresetForm);
  const deletePreset = useAppStore((state) => state.deletePreset);

  const [pendingDeleteId, setPendingDeleteId] = React.useState<string | null>(null);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  async function handleDelete(presetId: string) {
    setDeletingId(presetId);
    setError(null);
    try {
      await deletePreset(presetId);
      setPendingDeleteId(null);
    } catch (cause) {
      setError(errorMessage(cause));
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="h-full space-y-3 overflow-y-auto p-4">
      <Button
        type="button"
        onClick={() => openPresetForm()}
        className="w-full gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500"
      >
        <Plus />
        New preset
      </Button>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-[11px] text-red-300"
        >
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex items-center justify-between px-0.5">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
          Saved presets
        </p>
        <span className="text-[10px] text-muted-foreground">
          {presets.length} total
        </span>
      </div>

      {presets.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/80 bg-background/30 px-4 py-8 text-center">
          <SlidersHorizontal className="mx-auto h-5 w-5 text-muted-foreground/60" />
          <p className="mt-2 text-xs font-medium">No presets yet</p>
          <p className="mx-auto mt-1 max-w-[240px] text-[10px] leading-relaxed text-muted-foreground">
            A preset tells the lurker which Twitch category, title, favorite channels,
            and blocked channels to use.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {presets.map((preset) => (
            <PresetCard
              key={preset.id}
              preset={preset}
              usageCount={
                lurkingTabs.filter((tab) => tab.presetId === preset.id).length
              }
              deleting={deletingId === preset.id}
              pendingDelete={pendingDeleteId === preset.id}
              onEdit={() => openPresetForm(preset.id)}
              onAskDelete={() => {
                setError(null);
                setPendingDeleteId((current) =>
                  current === preset.id ? null : preset.id,
                );
              }}
              onCancelDelete={() => setPendingDeleteId(null)}
              onConfirmDelete={() => void handleDelete(preset.id)}
            />
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/30 px-3 py-2 text-[10px] text-muted-foreground">
        <Gamepad2 className="h-3.5 w-3.5 shrink-0" />
        Favorites are checked first; blacklist always wins. Use Pursue per tab to
        chase the most-watched live.
      </div>
    </div>
  );
}
