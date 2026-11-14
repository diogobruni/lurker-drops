import {
  AlertTriangle,
  Loader2,
  Save,
  Settings2,
  Tv,
} from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Combobox, type ComboboxOption } from '@/components/ui/combobox';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { formatCompactNumber, t } from '@/shared/i18n';
import { errorMessage, sendMessage } from '@/shared/messages';
import type { StreamInfo } from '@/shared/types';
import { useAppStore } from '@/popup/store';

export function LurkerFormScreen() {
  const lurkerFormTabId = useAppStore((state) => state.lurkerFormTabId);
  const lurkingTabs = useAppStore((state) => state.lurkingTabs);
  const activeTab = useAppStore((state) => state.activeTab);
  const presets = useAppStore((state) => state.presets);
  const goBack = useAppStore((state) => state.goBack);
  const goToPresets = useAppStore((state) => state.goToPresets);
  const pickedPresetId = useAppStore((state) => state.pickedPresetId);

  const existing =
    lurkerFormTabId !== null
      ? lurkingTabs.find((tab) => tab.tabId === lurkerFormTabId)
      : undefined;
  const targetTabId = existing?.tabId ?? activeTab?.id ?? null;

  const [selectedPresetId, setSelectedPresetId] = React.useState(
    (pickedPresetId && presets.some((p) => p.id === pickedPresetId)
      ? pickedPresetId
      : undefined) ??
      existing?.presetId ??
      presets[0]?.id ??
      '',
  );
  const [muted, setMuted] = React.useState(existing?.muted ?? true);
  const [pursueMostWatched, setPursueMostWatched] = React.useState(
    existing?.pursueMostWatched ?? true,
  );
  const [newTab, setNewTab] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [preview, setPreview] = React.useState<StreamInfo | null>(null);
  const [previewLoading, setPreviewLoading] = React.useState(false);
  const [previewError, setPreviewError] = React.useState<string | null>(null);
  const [previewImageFailed, setPreviewImageFailed] = React.useState(false);

  const presetOptions: ComboboxOption[] = presets.map((preset) => ({
    value: preset.id,
    label: preset.name,
    hint: preset.category?.displayName ?? t('common.anyCategory'),
  }));

  const hasValidPreset = presets.some(
    (preset) => preset.id === selectedPresetId,
  );

  React.useEffect(() => {
    if (!hasValidPreset) {
      setPreview(null);
      setPreviewError(null);
      setPreviewLoading(false);
      return;
    }

    let cancelled = false;
    setPreviewLoading(true);
    setPreviewError(null);
    setPreviewImageFailed(false);

    const timer = window.setTimeout(() => {
      sendMessage<StreamInfo | null>({
        type: 'lurker:previewStream',
        presetId: selectedPresetId,
      })
        .then((stream) => {
          if (!cancelled) setPreview(stream);
        })
        .catch((error) => {
          if (cancelled) return;
          setPreview(null);
          setPreviewError(errorMessage(error));
        })
        .finally(() => {
          if (!cancelled) setPreviewLoading(false);
        });
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [selectedPresetId, hasValidPreset]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!existing && !newTab && targetTabId === null) return;
    if (!hasValidPreset) return;
    setFormError(null);
    setSaving(true);
    try {
      if (existing) {
        const tabId = existing.tabId;
        if (existing.presetId !== selectedPresetId) {
          await sendMessage({
            type: 'lurker:setPreset',
            tabId,
            presetId: selectedPresetId,
          });
        }
        if (existing.muted !== muted) {
          await sendMessage({ type: 'lurker:setMuted', tabId, muted });
        }
        if (existing.pursueMostWatched !== pursueMostWatched) {
          await sendMessage({
            type: 'lurker:setPursueMostWatched',
            tabId,
            pursueMostWatched,
          });
        }
      } else if (newTab) {
        await sendMessage({
          type: 'lurker:startInNewTab',
          presetId: selectedPresetId,
          muted,
          pursueMostWatched,
        });
      } else if (targetTabId !== null) {
        await sendMessage({
          type: 'lurker:start',
          tabId: targetTabId,
          presetId: selectedPresetId,
          muted,
          pursueMostWatched,
        });
      }
      goBack();
    } catch (error) {
      setFormError(errorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={(event) => void handleSubmit(event)}
      noValidate
      className="flex h-full flex-col"
    >
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
        {formError && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-[11px] text-red-300"
          >
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="lurker-preset"
              className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground"
            >
              {t('main.preset')}
            </label>
            {presets.length === 0 && (
              <span className="text-[10px] text-muted-foreground">
                {t('main.noPresets')}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <Combobox
              id="lurker-preset"
              value={selectedPresetId}
              onValueChange={setSelectedPresetId}
              options={presetOptions}
              placeholder={
                presets.length
                  ? t('main.selectPreset')
                  : t('main.createPresetFirst')
              }
              searchPlaceholder={t('main.searchPresets')}
              emptyMessage={t('main.noPresetMatches')}
              disabled={presets.length === 0}
              className="flex-1"
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                  onClick={goToPresets}
                  aria-label={t('main.managePresets')}
                >
                  <Settings2 />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{t('main.managePresets')}</TooltipContent>
            </Tooltip>
          </div>
          {presets.length === 0 && (
            <button
              type="button"
              onClick={goToPresets}
              className="text-[10px] text-primary underline-offset-2 hover:underline"
            >
              {t('main.createFirstPreset')}
            </button>
          )}
        </div>

        <div className="rounded-xl border border-border/80 bg-card/80 p-3 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {t('main.livePreview')}
            </p>
            {previewLoading && (
              <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
            )}
          </div>

          {previewLoading ? (
            <div className="mt-2 flex animate-pulse gap-2.5">
              <div className="h-14 w-24 shrink-0 rounded-md bg-secondary" />
              <div className="flex-1 space-y-1.5 py-1">
                <div className="h-2.5 w-4/5 rounded bg-secondary" />
                <div className="h-2 w-3/5 rounded bg-secondary/80" />
                <div className="h-2 w-2/5 rounded bg-secondary/60" />
              </div>
            </div>
          ) : previewError ? (
            <p className="mt-2 text-[10px] leading-relaxed text-red-300">
              {previewError}
            </p>
          ) : preview ? (
            <div className="mt-2 flex gap-2.5">
              <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-md border border-border/60 bg-secondary">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Tv className="h-4 w-4 text-muted-foreground/50" />
                </div>
                {preview.previewUrl && !previewImageFailed && (
                  <img
                    src={preview.previewUrl}
                    alt=""
                    className="relative h-full w-full object-cover"
                    loading="lazy"
                    onError={() => setPreviewImageFailed(true)}
                  />
                )}
                <span className="absolute left-1 top-1 h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_0_2px_rgba(0,0,0,0.55)]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-xs font-medium leading-snug">
                  {preview.title}
                </p>
                <p className="mt-0.5 line-clamp-1 text-[10px] text-muted-foreground">
                  {preview.channelName} ·{' '}
                  {preview.categoryName || t('common.twitch')}
                </p>
                <p className="mt-1 text-[10px] font-medium text-live">
                  {t('common.viewers', {
                    count: formatCompactNumber(preview.viewers),
                  })}
                </p>
              </div>
            </div>
          ) : (
            <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
              {t('main.noLivePreview')}
            </p>
          )}
        </div>

        <label
          htmlFor="lurker-muted"
          className="flex cursor-pointer items-start gap-2.5 rounded-md border border-border/50 bg-background/40 p-2.5"
        >
          <Checkbox
            id="lurker-muted"
            checked={muted}
            onCheckedChange={(checked) => setMuted(checked === true)}
            disabled={saving}
            className="mt-0.5"
          />
          <div className="space-y-0.5">
            <p className="text-xs font-medium leading-none">{t('main.muted')}</p>
            <p className="text-[10px] leading-relaxed text-muted-foreground">
              {t('main.mutedHint')}
            </p>
          </div>
        </label>

        <label
          htmlFor="lurker-pursue"
          className="flex cursor-pointer items-start gap-2.5 rounded-md border border-border/50 bg-background/40 p-2.5"
        >
          <Checkbox
            id="lurker-pursue"
            checked={pursueMostWatched}
            onCheckedChange={(checked) => setPursueMostWatched(checked === true)}
            disabled={saving}
            className="mt-0.5"
          />
          <div className="space-y-0.5">
            <p className="text-xs font-medium leading-none">{t('main.pursue')}</p>
            <p className="text-[10px] leading-relaxed text-muted-foreground">
              {t('main.pursueHint')}
            </p>
          </div>
        </label>

        {!existing && (
          <label
            htmlFor="lurker-new-tab"
            className="flex cursor-pointer items-start gap-2.5 rounded-md border border-border/50 bg-background/40 p-2.5"
          >
            <Checkbox
              id="lurker-new-tab"
              checked={newTab}
              onCheckedChange={(checked) => setNewTab(checked === true)}
              disabled={saving || targetTabId === null}
              className="mt-0.5"
            />
            <div className="space-y-0.5">
              <p className="text-xs font-medium leading-none">
                {t('form.newTab')}
              </p>
              <p className="text-[10px] leading-relaxed text-muted-foreground">
                {t('form.newTabHint')}
              </p>
            </div>
          </label>
        )}
      </div>

      <div className="shrink-0 border-t border-border/70 bg-background/80 p-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={goBack}
            disabled={saving}
          >
            {t('common.cancel')}
          </Button>
          <Button
            type="submit"
            className="flex-1 gap-2 btn-brand "
            disabled={
              saving ||
              !hasValidPreset ||
              (!existing && !newTab && targetTabId === null)
            }
          >
            {saving ? <Loader2 className="animate-spin" /> : <Save />}
            {saving
              ? t('form.saving')
              : existing
                ? t('form.saveLurker')
                : t('main.turnOnLurker')}
          </Button>
        </div>
      </div>
    </form>
  );
}
