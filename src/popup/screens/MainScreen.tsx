import {
  AlertTriangle,
  ExternalLink,
  Pencil,
  Plus,
  Power,
  Radar,
  Tv,
  Volume2,
  VolumeX,
  X,
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
import { formatCompactNumber, t } from '@/shared/i18n';
import { errorMessage, sendMessage } from '@/shared/messages';
import type { LurkerTab, Preset, StreamInfo } from '@/shared/types';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/popup/store';

function viewersLabel(stream: StreamInfo): string {
  return t('common.viewers', {
    count: formatCompactNumber(stream.viewers),
  });
}

interface LurkingRowProps {
  record: LurkerTab;
  preset: Preset | undefined;
  pendingKey: string | null;
  pendingClose: boolean;
  onAction: (key: string, action: () => Promise<unknown>) => void;
  onAskClose: () => void;
  onCancelClose: () => void;
  onConfirmClose: () => void;
  onEdit: () => void;
}

const actionButtonClass =
  'h-6 gap-1 px-1.5 text-[10px] [&_svg]:h-3 [&_svg]:w-3';

function LurkingRow({
  record,
  preset,
  pendingKey,
  pendingClose,
  onAction,
  onAskClose,
  onCancelClose,
  onConfirmClose,
  onEdit,
}: LurkingRowProps) {
  const [imageFailed, setImageFailed] = React.useState(false);
  const busy = pendingKey?.startsWith(`${record.tabId}:`) ?? false;

  const secondary = record.stream
    ? `${record.stream.channelName} · ${record.stream.categoryName || t('common.twitch')} · ${viewersLabel(record.stream)}`
    : record.status === 'error'
      ? (record.lastError ?? t('status.errorDetail'))
      : preset
        ? t('row.presetLabel', { name: preset.name })
        : t('row.presetRemoved');
  const title =
    record.stream?.title ??
    (record.status === 'error'
      ? t('row.couldNotCheck')
      : record.status === 'searching'
        ? t('row.searchingMatch')
        : record.enabled
          ? t('row.waitingMatch')
          : t('row.lurkerPaused'));

  return (
    <div
      className={cn(
        'relative rounded-lg border border-border/80 bg-background/45 p-2.5 transition-colors',
        !record.enabled && 'opacity-75',
        pendingClose && 'border-red-500/40',
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
          <p className="line-clamp-1 min-w-0 text-xs font-medium">{title}</p>
          <p className="mt-0.5 line-clamp-1 text-[10px] text-muted-foreground">
            {secondary}
          </p>
        </div>

        <div className="-mr-1 -mt-1 flex shrink-0 items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className={cn(
                  record.enabled
                    ? 'text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
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
                aria-label={
                  record.enabled ? t('row.turnOffTitle') : t('row.turnOnTitle')
                }
              >
                <Power className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {record.enabled ? t('row.turnOffTitle') : t('row.turnOnTitle')}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="text-muted-foreground hover:bg-red-500/10 hover:text-red-400"
                disabled={busy}
                onClick={onAskClose}
                aria-label={t('row.close')}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('row.closeTitle')}</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-0.5 gap-y-1 border-t border-border/60 pt-1.5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={cn(
                actionButtonClass,
                'text-muted-foreground hover:text-foreground',
              )}
              disabled={busy}
              onClick={() =>
                onAction(`${record.tabId}:goto`, () =>
                  sendMessage({ type: 'lurker:goTo', tabId: record.tabId }),
                )
              }
            >
              <ExternalLink />
              {t('row.goTo')}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t('row.goToTitle')}</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={cn(
                actionButtonClass,
                'text-muted-foreground hover:text-foreground',
              )}
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
            >
              {record.muted ? <VolumeX /> : <Volume2 />}
              {record.muted ? t('row.unmute') : t('row.mute')}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {record.muted ? t('row.unmuteTitle') : t('row.muteTitle')}
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={cn(
                actionButtonClass,
                record.pursueMostWatched
                  ? 'text-violet-300 hover:text-violet-200'
                  : 'text-muted-foreground hover:text-foreground',
              )}
              disabled={busy}
              onClick={() =>
                onAction(`${record.tabId}:pursue`, () =>
                  sendMessage({
                    type: 'lurker:setPursueMostWatched',
                    tabId: record.tabId,
                    pursueMostWatched: !record.pursueMostWatched,
                  }),
                )
              }
            >
              <Radar />
              {record.pursueMostWatched
                ? t('row.pursueOn')
                : t('row.pursueOff')}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {record.pursueMostWatched
              ? t('row.pursueOnTitle')
              : t('row.pursueOffTitle')}
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={cn(
                actionButtonClass,
                'ml-auto text-muted-foreground hover:text-foreground',
              )}
              disabled={busy}
              onClick={onEdit}
            >
              <Pencil />
              {t('row.edit')}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t('row.edit')}</TooltipContent>
        </Tooltip>
      </div>

      <InlineConfirm
        open={pendingClose}
        message={t('row.closeConfirm')}
        cancelLabel={t('common.cancel')}
        confirmLabel={t('row.close')}
        busy={busy}
        onCancel={onCancelClose}
        onConfirm={onConfirmClose}
      />
    </div>
  );
}

export function MainScreen() {
  const presets = useAppStore((state) => state.presets);
  const lurkingTabs = useAppStore((state) => state.lurkingTabs);
  const openLurkerForm = useAppStore((state) => state.openLurkerForm);

  const activeCount = lurkingTabs.filter((tab) => tab.enabled).length;
  const pausedCount = lurkingTabs.length - activeCount;

  const [pendingKey, setPendingKey] = React.useState<string | null>(null);
  const [pendingCloseId, setPendingCloseId] = React.useState<number | null>(
    null,
  );
  const [actionError, setActionError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!actionError) return;
    const timer = window.setTimeout(() => setActionError(null), 6000);
    return () => window.clearTimeout(timer);
  }, [actionError]);

  const sortedTabs = [...lurkingTabs].sort(
    (a, b) => Number(b.enabled) - Number(a.enabled),
  );

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

  function handleConfirmClose() {
    const tabId = pendingCloseId;
    if (tabId === null) return;
    void handleTabAction(`${tabId}:close`, async () => {
      await sendMessage({ type: 'lurker:remove', tabId, closeTab: true });
      setPendingCloseId(null);
    });
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
              {t('main.lurkingTabs')}
            </h2>
            <Badge variant={activeCount > 0 ? 'success' : 'secondary'}>
              {t('nav.activeBadge', { count: activeCount })}
            </Badge>
            {pausedCount > 0 && (
              <span className="text-[10px] text-muted-foreground">
                {t('main.pausedCount', { count: pausedCount })}
              </span>
            )}
          </div>
          <Button
            type="button"
            size="sm"
            className="h-7 shrink-0 gap-1 bg-gradient-to-r from-violet-600 to-purple-600 px-2.5 text-[11px] hover:from-violet-500 hover:to-purple-500"
            onClick={() => openLurkerForm()}
          >
            <Plus />
            {t('main.addLurker')}
          </Button>
        </div>

        <div className="space-y-2">
          {sortedTabs.length === 0 && (
            <div className="rounded-xl border border-dashed border-border/80 bg-background/30 px-4 py-6 text-center">
              <Tv className="mx-auto h-5 w-5 text-muted-foreground/60" />
              <p className="mt-2 text-xs font-medium">{t('main.noTabsTitle')}</p>
              <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">
                {t('main.noTabsHint')}
              </p>
            </div>
          )}
          {sortedTabs.map((record) => (
            <LurkingRow
              key={record.tabId}
              record={record}
              preset={presets.find((preset) => preset.id === record.presetId)}
              pendingKey={pendingKey}
              pendingClose={pendingCloseId === record.tabId}
              onAction={(key, action) => void handleTabAction(key, action)}
              onAskClose={() => setPendingCloseId(record.tabId)}
              onCancelClose={() => setPendingCloseId(null)}
              onConfirmClose={handleConfirmClose}
              onEdit={() => openLurkerForm(record.tabId)}
            />
          ))}
        </div>
      </section>

      <p className="pb-1 text-center text-[9px] text-muted-foreground/60">
        {t('main.footer')}
      </p>
    </div>
  );
}
