import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Globe2,
  Loader2,
  Power,
  Settings2,
  Tv,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Combobox, type ComboboxOption } from '@/components/ui/combobox';
import { errorMessage, sendMessage } from '@/shared/messages';
import type { LurkerTab, Preset, StreamInfo } from '@/shared/types';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/popup/store';

function hostLabel(url?: string): string {
  try {
    return new URL(url ?? '').hostname.replace(/^www\./, '');
  } catch {
    return 'Browser tab';
  }
}

function viewersLabel(stream: StreamInfo): string {
  return `${new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(stream.viewers)} viewers`;
}

function statusPresentation(record: LurkerTab) {
  if (!record.enabled) {
    return { label: 'Paused', variant: 'secondary' as const, detail: 'The lurker is off for this tab.' };
  }
  switch (record.status) {
    case 'watching':
      return {
        label: 'Live',
        variant: 'success' as const,
        detail: record.stream
          ? `Watching ${record.stream.channelName} · ${record.stream.title}`
          : 'Watching a live.',
      };
    case 'searching':
      return {
        label: 'Searching',
        variant: 'warning' as const,
        detail: 'Searching Twitch for a live that matches this preset...',
      };
    case 'waiting':
      return {
        label: 'Waiting',
        variant: 'warning' as const,
        detail: 'No matching live right now. The lurker will check again every minute.',
      };
    case 'error':
      return {
        label: 'Error',
        variant: 'destructive' as const,
        detail: record.lastError ?? 'Could not reach Twitch.',
      };
    default:
      return {
        label: 'Idle',
        variant: 'secondary' as const,
        detail: 'The lurker is ready.',
      };
  }
}

interface LurkingRowProps {
  record: LurkerTab;
  preset: Preset | undefined;
  pendingKey: string | null;
  onAction: (key: string, action: () => Promise<unknown>) => void;
}

function LurkingRow({ record, preset, pendingKey, onAction }: LurkingRowProps) {
  const [imageFailed, setImageFailed] = React.useState(false);
  const status = statusPresentation(record);
  const busy = pendingKey?.startsWith(`${record.tabId}:`) ?? false;

  const secondary = record.stream
    ? `${record.stream.channelName} · ${record.stream.categoryName || 'Twitch'} · ${viewersLabel(record.stream)}`
    : record.status === 'error'
      ? (record.lastError ?? 'Could not reach Twitch.')
      : preset
        ? `Preset: ${preset.name}`
        : 'Preset removed';
  const title =
    record.stream?.title ??
    (record.status === 'error'
      ? 'Could not check Twitch'
      : record.status === 'searching'
        ? 'Searching for a live match'
        : record.enabled
          ? 'Waiting for a live match'
          : 'Lurker paused');

  return (
    <div
      className={cn(
        'rounded-lg border border-border/80 bg-background/45 p-2.5 transition-colors',
        !record.enabled && 'opacity-75',
      )}
    >
      <div className="flex items-start gap-2.5">
        <div className="relative h-9 w-16 shrink-0 overflow-hidden rounded-md border border-border/60 bg-secondary">
          <div className="absolute inset-0 flex items-center justify-center">
            <Tv className="h-4 w-4 text-muted-foreground/50" />
          </div>
          {record.stream?.previewUrl && !imageFailed && (
            <img
              src={record.stream.previewUrl}
              alt=""
              className="relative h-full w-full object-cover"
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
          )}
          {record.enabled && record.status === 'watching' && (
            <span className="absolute left-1 top-1 h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_0_2px_rgba(0,0,0,0.55)]" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="line-clamp-1 min-w-0 flex-1 text-xs font-medium">
              {title}
            </p>
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
          <p className="mt-0.5 line-clamp-1 text-[10px] text-muted-foreground">
            {secondary}
          </p>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-0.5 border-t border-border/60 pt-1.5">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-6 gap-1 px-1.5 text-[10px] text-muted-foreground hover:text-foreground [&_svg]:h-3 [&_svg]:w-3"
          disabled={busy}
          onClick={() =>
            onAction(`${record.tabId}:goto`, () =>
              sendMessage({ type: 'lurker:goTo', tabId: record.tabId }),
            )
          }
          title="Go to the lurking tab"
        >
          <ExternalLink />
          Go to
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-6 gap-1 px-1.5 text-[10px] text-muted-foreground hover:text-foreground [&_svg]:h-3 [&_svg]:w-3"
          disabled={busy}
          onClick={() =>
            onAction(`${record.tabId}:mute`, () =>
              sendMessage({
                type: 'lurker:setMuted',
                tabId: record.tabId,
                muted: !record.muted,
              }),
            )
          }
          title={record.muted ? 'Unmute this tab' : 'Mute this tab'}
        >
          {record.muted ? <VolumeX /> : <Volume2 />}
          {record.muted ? 'Unmute' : 'Mute'}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={cn(
            'h-6 gap-1 px-1.5 text-[10px] [&_svg]:h-3 [&_svg]:w-3',
            record.enabled
              ? 'text-emerald-400 hover:text-emerald-300'
              : 'text-muted-foreground hover:text-foreground',
          )}
          disabled={busy}
          onClick={() =>
            onAction(`${record.tabId}:enabled`, () =>
              sendMessage({
                type: 'lurker:setEnabled',
                tabId: record.tabId,
                enabled: !record.enabled,
              }),
            )
          }
          title={record.enabled ? 'Turn off the lurker on this tab' : 'Turn on the lurker on this tab'}
        >
          <Power />
          {record.enabled ? 'Turn off' : 'Turn on'}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="ml-auto h-6 gap-1 px-1.5 text-[10px] text-muted-foreground hover:bg-red-500/10 hover:text-red-400 [&_svg]:h-3 [&_svg]:w-3"
          disabled={busy}
          onClick={() =>
            onAction(`${record.tabId}:close`, () =>
              sendMessage({ type: 'lurker:remove', tabId: record.tabId, closeTab: true }),
            )
          }
          title="Close this tab and turn off its lurker"
        >
          <X />
          Close
        </Button>
      </div>
    </div>
  );
}

export function MainScreen() {
  const presets = useAppStore((state) => state.presets);
  const lurkingTabs = useAppStore((state) => state.lurkingTabs);
  const activeTab = useAppStore((state) => state.activeTab);
  const goToPresets = useAppStore((state) => state.goToPresets);

  const activeRecord = activeTab
    ? (lurkingTabs.find((tab) => tab.tabId === activeTab.id) ?? null)
    : null;
  const activeCount = lurkingTabs.filter((tab) => tab.enabled).length;
  const pausedCount = lurkingTabs.length - activeCount;

  const [expanded, setExpanded] = React.useState(false);
  const [selectedPresetId, setSelectedPresetId] = React.useState('');
  const [muted, setMuted] = React.useState(false);
  const [pursueMostWatched, setPursueMostWatched] = React.useState(true);
  const [toggleBusy, setToggleBusy] = React.useState(false);
  const [pendingKey, setPendingKey] = React.useState<string | null>(null);
  const [actionError, setActionError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (activeRecord) {
      setSelectedPresetId(activeRecord.presetId);
      setMuted(activeRecord.muted);
      setPursueMostWatched(activeRecord.pursueMostWatched);
      return;
    }
    setSelectedPresetId((current) =>
      presets.some((preset) => preset.id === current)
        ? current
        : (presets[0]?.id ?? ''),
    );
  }, [
    activeRecord?.tabId,
    activeRecord?.presetId,
    activeRecord?.muted,
    activeRecord?.pursueMostWatched,
    presets,
  ]);

  React.useEffect(() => {
    if (!actionError) return;
    const timer = window.setTimeout(() => setActionError(null), 6000);
    return () => window.clearTimeout(timer);
  }, [actionError]);

  const presetOptions: ComboboxOption[] = presets.map((preset) => ({
    value: preset.id,
    label: preset.name,
    hint: preset.category?.displayName ?? 'Any category',
  }));

  const isRunning = activeRecord?.enabled ?? false;
  const hasValidPreset = presets.some((preset) => preset.id === selectedPresetId);
  const status = activeRecord
    ? statusPresentation(activeRecord)
    : {
        label: 'Off',
        variant: 'secondary' as const,
        detail: 'The lurker is off for this tab.',
      };

  const sortedTabs = [...lurkingTabs].sort(
    (a, b) => Number(b.enabled) - Number(a.enabled),
  );

  async function handlePresetChange(presetId: string) {
    const previous = selectedPresetId;
    setSelectedPresetId(presetId);
    setActionError(null);
    if (!activeRecord) return;
    try {
      await sendMessage({ type: 'lurker:setPreset', tabId: activeRecord.tabId, presetId });
    } catch (error) {
      setSelectedPresetId(previous);
      setActionError(errorMessage(error));
    }
  }

  async function handleMutedChange(checked: boolean) {
    const previous = muted;
    setMuted(checked);
    setActionError(null);
    if (!activeRecord) return;
    try {
      await sendMessage({ type: 'lurker:setMuted', tabId: activeRecord.tabId, muted: checked });
    } catch (error) {
      setMuted(previous);
      setActionError(errorMessage(error));
    }
  }

  async function handlePursueChange(checked: boolean) {
    const previous = pursueMostWatched;
    setPursueMostWatched(checked);
    setActionError(null);
    if (!activeRecord) return;
    try {
      await sendMessage({
        type: 'lurker:setPursueMostWatched',
        tabId: activeRecord.tabId,
        pursueMostWatched: checked,
      });
    } catch (error) {
      setPursueMostWatched(previous);
      setActionError(errorMessage(error));
    }
  }

  async function handleToggle() {
    if (!activeTab) return;
    setToggleBusy(true);
    setActionError(null);
    try {
      if (isRunning) {
        await sendMessage({ type: 'lurker:stop', tabId: activeTab.id });
      } else {
        await sendMessage({
          type: 'lurker:start',
          tabId: activeTab.id,
          presetId: selectedPresetId,
          muted,
          pursueMostWatched,
        });
      }
    } catch (error) {
      setActionError(errorMessage(error));
    } finally {
      setToggleBusy(false);
    }
  }

  async function handleTabAction(key: string, action: () => Promise<unknown>) {
    setPendingKey(key);
    setActionError(null);
    try {
      await action();
    } catch (error) {
      setActionError(errorMessage(error));
    } finally {
      setPendingKey(null);
    }
  }

  return (
    <div className="h-full space-y-4 overflow-y-auto p-4">
      {actionError && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-[11px] text-red-300"
        >
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      <section className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Lurking Tabs
            </h2>
            <Badge variant={activeCount > 0 ? 'success' : 'secondary'}>
              {activeCount} active
            </Badge>
            {pausedCount > 0 && (
              <span className="text-[10px] text-muted-foreground">{pausedCount} paused</span>
            )}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 shrink-0 gap-1 px-2 text-[11px] text-muted-foreground hover:text-foreground"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
          >
            {expanded ? 'Collapse' : 'Expand'}
            {expanded ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>

        {expanded && (
          <div className="space-y-2">
            {sortedTabs.length === 0 && (
              <div className="rounded-xl border border-dashed border-border/80 bg-background/30 px-4 py-6 text-center">
                <Tv className="mx-auto h-5 w-5 text-muted-foreground/60" />
                <p className="mt-2 text-xs font-medium">No tabs are lurking yet</p>
                <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">
                  Choose a preset below and turn on the lurker for this tab.
                </p>
              </div>
            )}
            {sortedTabs.map((record) => (
              <LurkingRow
                key={record.tabId}
                record={record}
                preset={presets.find((preset) => preset.id === record.presetId)}
                pendingKey={pendingKey}
                onAction={(key, action) => void handleTabAction(key, action)}
              />
            ))}
          </div>
        )}
      </section>

      <section className="space-y-2">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Current Tab
        </h2>

        <div className="rounded-xl border border-border/80 bg-card/80 p-3 shadow-sm">
          <div className="flex items-center gap-2.5 border-b border-border/60 pb-3">
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border/60 bg-secondary">
              <Globe2 className="h-4 w-4 text-muted-foreground" />
              {activeTab?.favIconUrl && (
                <img
                  src={activeTab.favIconUrl}
                  alt=""
                  className="absolute h-4 w-4"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                  }}
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-1 text-xs font-medium">
                {activeTab?.title ?? 'Current tab'}
              </p>
              <p className="line-clamp-1 text-[10px] text-muted-foreground">
                {hostLabel(activeTab?.url)}
              </p>
            </div>
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>

          <div className="space-y-3 pt-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </span>
                <span className="flex items-center gap-1.5 text-[11px]">
                  <span
                    className={cn(
                      'h-1.5 w-1.5 rounded-full',
                      isRunning ? 'animate-pulse-soft bg-emerald-400' : 'bg-muted-foreground/50',
                    )}
                  />
                  {isRunning ? 'On' : 'Off'}
                </span>
              </div>
              <div className="flex items-start gap-2 rounded-md border border-border/50 bg-background/40 px-2.5 py-2">
                {activeRecord?.enabled && activeRecord.status === 'searching' ? (
                  <Loader2 className="mt-0.5 h-3.5 w-3.5 shrink-0 animate-spin text-amber-300" />
                ) : (
                  <span
                    className={cn(
                      'mt-1 h-1.5 w-1.5 shrink-0 rounded-full',
                      isRunning ? 'bg-emerald-400' : 'bg-muted-foreground/50',
                    )}
                  />
                )}
                <p className="line-clamp-3 text-[10px] leading-relaxed text-muted-foreground">
                  {status.detail}
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="current-preset"
                  className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground"
                >
                  Preset
                </label>
                {presets.length === 0 && (
                  <span className="text-[10px] text-muted-foreground">No presets yet</span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <Combobox
                  id="current-preset"
                  value={selectedPresetId}
                  onValueChange={(value) => void handlePresetChange(value)}
                  options={presetOptions}
                  placeholder={presets.length ? 'Select a preset' : 'Create a preset first'}
                  searchPlaceholder="Search presets..."
                  emptyMessage="No presets match."
                  disabled={presets.length === 0}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                  onClick={goToPresets}
                  title="Manage presets"
                  aria-label="Manage presets"
                >
                  <Settings2 />
                </Button>
              </div>
              {presets.length === 0 && (
                <button
                  type="button"
                  onClick={goToPresets}
                  className="text-[10px] text-primary underline-offset-2 hover:underline"
                >
                  Create your first preset
                </button>
              )}
            </div>

            <label
              htmlFor="current-muted"
              className="flex cursor-pointer items-start gap-2.5 rounded-md border border-border/50 bg-background/40 p-2.5"
            >
              <Checkbox
                id="current-muted"
                checked={muted}
                onCheckedChange={(checked) => void handleMutedChange(checked === true)}
                disabled={toggleBusy}
                className="mt-0.5"
              />
              <div className="space-y-0.5">
                <p className="text-xs font-medium leading-none">Muted</p>
                <p className="text-[10px] leading-relaxed text-muted-foreground">
                  Mute the browser tab itself, not just the Twitch player.
                </p>
              </div>
            </label>

            <label
              htmlFor="current-pursue"
              className="flex cursor-pointer items-start gap-2.5 rounded-md border border-border/50 bg-background/40 p-2.5"
            >
              <Checkbox
                id="current-pursue"
                checked={pursueMostWatched}
                onCheckedChange={(checked) => void handlePursueChange(checked === true)}
                disabled={toggleBusy}
                className="mt-0.5"
              />
              <div className="space-y-0.5">
                <p className="text-xs font-medium leading-none">Pursue</p>
                <p className="text-[10px] leading-relaxed text-muted-foreground">
                  Follow the most-watched live matching this preset. Off keeps the
                  current live while it remains valid.
                </p>
              </div>
            </label>

            <Button
              type="button"
              className={cn(
                'w-full gap-2',
                isRunning &&
                  'border border-red-500/25 bg-red-500/10 text-red-300 hover:bg-red-500/20',
                !isRunning && 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500',
              )}
              variant={isRunning ? 'ghost' : 'default'}
              disabled={toggleBusy || !activeTab || (!isRunning && !hasValidPreset)}
              onClick={() => void handleToggle()}
            >
              {toggleBusy ? <Loader2 className="animate-spin" /> : <Power />}
              {isRunning ? 'Turn off lurker' : 'Turn on lurker'}
            </Button>
          </div>
        </div>
      </section>

      <p className="pb-1 text-center text-[9px] text-muted-foreground/60">
        Lurker Drops checks Twitch every minute while any lurking tab is on.
      </p>
    </div>
  );
}
