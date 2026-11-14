import {
  AlertTriangle,
  Ban,
  Check,
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
import { InlineConfirm } from '@/components/ui/inline-confirm';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { t } from '@/shared/i18n';
import { errorMessage } from '@/shared/messages';
import type { Preset } from '@/shared/types';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/popup/store';

function PresetCard({
  preset,
  usageCount,
  deleting,
  pendingDelete,
  onSelect,
  onEdit,
  onAskDelete,
  onCancelDelete,
  onConfirmDelete,
}: {
  preset: Preset;
  usageCount: number;
  deleting: boolean;
  pendingDelete: boolean;
  onSelect?: () => void;
  onEdit: () => void;
  onAskDelete: () => void;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
}) {
  return (
    <div
      className={cn(
        'relative rounded-xl border bg-card/80 p-3 shadow-sm transition-colors',
        pendingDelete ? 'border-red-500/30' : 'border-border/80',
      )}
    >
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{preset.name}</p>
          <p className="mt-0.5 line-clamp-1 text-[10px] text-muted-foreground">
            {preset.category?.displayName ?? t('common.anyCategory')}
            {preset.titleFilter.trim()
              ? ` · ${t('presets.titleContains', { filter: preset.titleFilter.trim() })}`
              : ` · ${t('presets.anyTitle')}`}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              {t('presets.favoritesCount', { count: preset.favorites.length })}
            </span>
            <span className="flex items-center gap-1">
              <Ban className="h-3 w-3" />
              {t('presets.blockedCount', { count: preset.blacklist.length })}
            </span>
            {usageCount > 0 && (
              <Badge variant="success" className="gap-1">
                <Tv className="h-2.5 w-2.5" />
                {t('presets.inUseCount', { count: usageCount })}
              </Badge>
            )}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-0.5">
          {onSelect && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onSelect}
              className="h-7 gap-1 px-2 text-xs text-violet-300 hover:text-violet-200"
            >
              <Check className="h-3.5 w-3.5" />
              {t('presets.select')}
            </Button>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={onEdit}
                aria-label={t('presets.edit')}
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('presets.edit')}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={onAskDelete}
                aria-label={t('presets.delete')}
                className="text-muted-foreground hover:bg-red-500/10 hover:text-red-400"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('presets.delete')}</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <InlineConfirm
        open={pendingDelete}
        message={
          <>
            {t('presets.deleteConfirm', { name: preset.name })}
            {usageCount > 0
              ? ` ${t('presets.deleteInUse')}`
              : ` ${t('presets.deleteUnused')}`}
          </>
        }
        cancelLabel={t('common.cancel')}
        confirmLabel={t('presets.delete')}
        busyLabel={t('presets.deleting')}
        busy={deleting}
        onCancel={onCancelDelete}
        onConfirm={onConfirmDelete}
      />
    </div>
  );
}

export function PresetsScreen() {
  const presets = useAppStore((state) => state.presets);
  const lurkingTabs = useAppStore((state) => state.lurkingTabs);
  const openPresetForm = useAppStore((state) => state.openPresetForm);
  const deletePreset = useAppStore((state) => state.deletePreset);
  const pickPreset = useAppStore((state) => state.pickPreset);
  const canSelect = useAppStore((state) => state.presetsOrigin === 'lurker-form');

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
        {t('nav.newPreset')}
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
          {t('presets.saved')}
        </p>
        <span className="text-[10px] text-muted-foreground">
          {t('presets.total', { count: presets.length })}
        </span>
      </div>

      {presets.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/80 bg-background/30 px-4 py-8 text-center">
          <SlidersHorizontal className="mx-auto h-5 w-5 text-muted-foreground/60" />
          <p className="mt-2 text-xs font-medium">{t('presets.emptyTitle')}</p>
          <p className="mx-auto mt-1 max-w-[240px] text-[10px] leading-relaxed text-muted-foreground">
            {t('presets.emptyHint')}
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
              onSelect={canSelect ? () => pickPreset(preset.id) : undefined}
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
        {t('presets.tip')}
      </div>
    </div>
  );
}
