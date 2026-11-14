import {
  AlertTriangle,
  ExternalLink,
  GripVertical,
  Pencil,
  Plus,
  Power,
  Radar,
  Tag,
  Trash2,
  Tv,
  Volume2,
  VolumeX,
} from 'lucide-react';
import * as React from 'react';
import { createPortal } from 'react-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { InlineConfirm } from '@/components/ui/inline-confirm';
import { LurkerEyes } from '@/components/ui/lurker-eyes';
import { Switch } from '@/components/ui/switch';
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

/** One definition per row command, shared by the row buttons and the context menu. */
function tabCommands(record: LurkerTab) {
  const key = (name: string) => `${record.tabId}:${name}`;
  return {
    enabled: {
      key: key('enabled'),
      run: () =>
        sendMessage({
          type: 'lurker:setEnabled',
          tabId: record.tabId,
          enabled: !record.enabled,
        }),
    },
    goto: {
      key: key('goto'),
      run: () => sendMessage({ type: 'lurker:goTo', tabId: record.tabId }),
    },
    mute: {
      key: key('mute'),
      run: () =>
        sendMessage({
          type: 'lurker:setMuted',
          tabId: record.tabId,
          muted: !record.muted,
        }),
    },
    pursue: {
      key: key('pursue'),
      run: () =>
        sendMessage({
          type: 'lurker:setPursueMostWatched',
          tabId: record.tabId,
          pursueMostWatched: !record.pursueMostWatched,
        }),
    },
  };
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
  index: number;
  dropEdge: 'before' | 'after' | null;
  dragging: boolean;
  onContextMenu: (x: number, y: number) => void;
  onDragStart: () => void;
  onDragOver: (edge: 'before' | 'after') => void;
  onDrop: () => void;
  onDragEnd: () => void;
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
  index,
  dropEdge,
  dragging,
  onContextMenu,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: LurkingRowProps) {
  const cmd = tabCommands(record);
  const [armed, setArmed] = React.useState(false);
  const [imageFailed, setImageFailed] = React.useState(false);
  const busy = pendingKey?.startsWith(`${record.tabId}:`) ?? false;
  const live = record.enabled && record.status === 'watching';

  const secondary = record.stream
    ? `${record.stream.channelName} · ${record.stream.categoryName || t('common.twitch')} · ${viewersLabel(record.stream)}`
    : record.status === 'error'
      ? (record.lastError ?? t('status.errorDetail'))
      : null;
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
      style={{ '--i': index } as React.CSSProperties}
      draggable={armed}
      onContextMenu={(event) => {
        event.preventDefault();
        onContextMenu(event.clientX, event.clientY);
      }}
      onDragStart={(event) => {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', String(record.tabId));
        onDragStart();
      }}
      onDragOver={(event) => {
        event.preventDefault();
        const box = event.currentTarget.getBoundingClientRect();
        onDragOver(event.clientY < box.top + box.height / 2 ? 'before' : 'after');
      }}
      onDrop={(event) => {
        event.preventDefault();
        onDrop();
      }}
      onDragEnd={() => {
        setArmed(false);
        onDragEnd();
      }}
      className={cn(
        'surface rise relative overflow-visible rounded-xl border border-border/80 bg-card p-3',
        dragging && 'opacity-40',
        dropEdge === 'before' && 'before:absolute before:-top-[5px] before:left-2 before:right-2 before:h-0.5 before:rounded-full before:bg-primary before:shadow-[0_0_8px_hsl(var(--primary))]',
        dropEdge === 'after' && 'after:absolute after:-bottom-[5px] after:left-2 after:right-2 after:h-0.5 after:rounded-full after:bg-primary after:shadow-[0_0_8px_hsl(var(--primary))]',
        !record.enabled && 'opacity-70',
        pendingClose && 'border-red-500/40',
      )}
    >
      {live && (
        <span
          aria-hidden
          className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-live shadow-[0_0_12px_hsl(var(--live))]"
        />
      )}
      <div className="flex items-start gap-2.5">
        <button
          type="button"
          tabIndex={-1}
          aria-label="Drag to reorder"
          onPointerDown={() => setArmed(true)}
          onPointerUp={() => setArmed(false)}
          className="-ml-1.5 -mr-1 mt-3 shrink-0 cursor-grab touch-none rounded text-muted-foreground/40 transition-colors hover:text-foreground active:cursor-grabbing"
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <div className="relative h-[42px] w-[75px] shrink-0 overflow-hidden rounded-lg border border-border/60 bg-secondary">
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
          {live && (
            <span className="absolute bottom-1 left-1 flex items-center gap-1 rounded bg-black/70 px-1 py-px text-[8px] font-bold uppercase tracking-wider text-white">
              <span className="live-dot h-1 w-1 rounded-full" />
              live
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="line-clamp-1 min-w-0 text-[13px] font-semibold leading-tight">{title}</p>
          {secondary && (
            <p className="mt-0.5 line-clamp-1 text-[10px] text-muted-foreground">
              {secondary}
            </p>
          )}
          <p className="mt-0.5 flex items-center gap-1 text-[10px] text-muted-foreground/90">
            <Tag className="h-2.5 w-2.5 shrink-0 text-primary/80" />
            <span className="line-clamp-1">
              {preset
                ? t('row.presetLabel', { name: preset.name })
                : t('row.presetRemoved')}
            </span>
          </p>
        </div>

        <div className="-mt-0.5 flex shrink-0 items-center gap-1.5">
          <Switch
            checked={record.enabled}
            disabled={busy}
            label={record.enabled ? t('row.turnOffTitle') : t('row.turnOnTitle')}
            onCheckedChange={() => onAction(cmd.enabled.key, cmd.enabled.run)}
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="text-muted-foreground hover:bg-red-500/10 hover:text-red-400"
                disabled={busy}
                onClick={onAskClose}
                aria-label={t('row.delete')}
              >
                <Trash2 className="h-3.5 w-3.5" />
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
              onClick={() => onAction(cmd.goto.key, cmd.goto.run)}
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
              onClick={() => onAction(cmd.mute.key, cmd.mute.run)}
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
                  ? 'text-primary hover:text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              )}
              disabled={busy}
              onClick={() => onAction(cmd.pursue.key, cmd.pursue.run)}
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

interface MenuState {
  tabId: number;
  x: number;
  y: number;
}

const MENU_WIDTH = 184;
const MENU_ITEM_HEIGHT = 30;

function ContextMenu({
  record,
  x,
  y,
  onClose,
  onAction,
  onEdit,
  onDelete,
}: {
  record: LurkerTab;
  x: number;
  y: number;
  onClose: () => void;
  onAction: (key: string, action: () => Promise<unknown>) => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const cmd = tabCommands(record);

  const items: Array<{
    label: string;
    icon: React.ReactNode;
    run: () => void;
    danger?: boolean;
    separator?: boolean;
  }> = [
    {
      label: record.enabled ? t('row.turnOff') : t('row.turnOn'),
      icon: <Power />,
      run: () => onAction(cmd.enabled.key, cmd.enabled.run),
    },
    {
      label: t('row.goTo'),
      icon: <ExternalLink />,
      run: () => onAction(cmd.goto.key, cmd.goto.run),
    },
    {
      label: record.muted ? t('row.unmute') : t('row.mute'),
      icon: record.muted ? <VolumeX /> : <Volume2 />,
      run: () => onAction(cmd.mute.key, cmd.mute.run),
    },
    {
      label: record.pursueMostWatched ? t('row.pursueOn') : t('row.pursueOff'),
      icon: <Radar />,
      run: () => onAction(cmd.pursue.key, cmd.pursue.run),
    },
    { label: t('row.edit'), icon: <Pencil />, run: onEdit, separator: true },
    { label: t('row.delete'), icon: <Trash2 />, run: onDelete, danger: true },
  ];

  // Keep the menu inside the popup.
  const height = items.length * MENU_ITEM_HEIGHT + 10;
  const left = Math.max(6, Math.min(x, window.innerWidth - MENU_WIDTH - 6));
  const top = Math.max(6, Math.min(y, window.innerHeight - height - 6));

  React.useEffect(() => {
    ref.current?.querySelector<HTMLButtonElement>('button')?.focus();
    function onPointerDown(event: PointerEvent) {
      if (!ref.current?.contains(event.target as Node)) onClose();
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      event.preventDefault();
      const buttons = Array.from(
        ref.current?.querySelectorAll<HTMLButtonElement>('button') ?? [],
      );
      const at = buttons.indexOf(document.activeElement as HTMLButtonElement);
      const step = event.key === 'ArrowDown' ? 1 : -1;
      buttons[(at + step + buttons.length) % buttons.length]?.focus();
    }
    window.addEventListener('pointerdown', onPointerDown, true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('blur', onClose);
    window.addEventListener('resize', onClose);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown, true);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('blur', onClose);
      window.removeEventListener('resize', onClose);
    };
  }, [onClose]);

  return createPortal(
    <div
      ref={ref}
      role="menu"
      style={{ left, top, width: MENU_WIDTH }}
      className="fixed z-50 origin-top-left animate-pop-in rounded-xl border border-border bg-popover/95 p-1 shadow-xl shadow-black/50 backdrop-blur-md"
    >
      {items.map((item) => (
        <React.Fragment key={item.label}>
          {item.separator && <div className="my-1 h-px bg-border/70" />}
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              onClose();
              item.run();
            }}
            className={cn(
              'flex h-[30px] w-full items-center gap-2 rounded-lg px-2 text-left text-xs font-medium transition-colors focus-visible:outline-none [&_svg]:h-3.5 [&_svg]:w-3.5 [&_svg]:shrink-0',
              item.danger
                ? 'text-red-400 hover:bg-red-500/10 focus-visible:bg-red-500/10'
                : 'text-foreground hover:bg-accent focus-visible:bg-accent',
            )}
          >
            {item.icon}
            {item.label}
          </button>
        </React.Fragment>
      ))}
    </div>,
    document.body,
  );
}

export function MainScreen() {
  const presets = useAppStore((state) => state.presets);
  const storedTabs = useAppStore((state) => state.lurkingTabs);
  const tabOrder = useAppStore((state) => state.tabOrder);
  const reorderTabs = useAppStore((state) => state.reorderTabs);
  const openLurkerForm = useAppStore((state) => state.openLurkerForm);

  // Saved order first; tabs not in it yet keep their stored order at the end.
  const lurkingTabs = React.useMemo(() => {
    const rank = (id: number) => {
      const at = tabOrder.indexOf(id);
      return at === -1 ? Number.MAX_SAFE_INTEGER : at;
    };
    return [...storedTabs].sort((a, b) => rank(a.tabId) - rank(b.tabId));
  }, [storedTabs, tabOrder]);

  const activeCount = lurkingTabs.filter((tab) => tab.enabled).length;
  const pausedCount = lurkingTabs.length - activeCount;

  const [pendingKey, setPendingKey] = React.useState<string | null>(null);
  const [pendingCloseId, setPendingCloseId] = React.useState<number | null>(
    null,
  );
  const [menu, setMenu] = React.useState<MenuState | null>(null);
  const [dragId, setDragId] = React.useState<number | null>(null);
  const [drop, setDrop] = React.useState<{
    id: number;
    edge: 'before' | 'after';
  } | null>(null);
  const [actionError, setActionError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!actionError) return;
    const timer = window.setTimeout(() => setActionError(null), 6000);
    return () => window.clearTimeout(timer);
  }, [actionError]);

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

  function endDrag() {
    setDragId(null);
    setDrop(null);
  }

  function handleDrop() {
    if (dragId === null || drop === null || dragId === drop.id) return endDrag();
    const ids = lurkingTabs.map((tab) => tab.tabId).filter((id) => id !== dragId);
    const at = ids.indexOf(drop.id) + (drop.edge === 'after' ? 1 : 0);
    ids.splice(at, 0, dragId);
    endDrag();
    void reorderTabs(ids).catch((error: unknown) =>
      setActionError(errorMessage(error)),
    );
  }

  function handleConfirmClose() {
    const tabId = pendingCloseId;
    if (tabId === null) return;
    void handleTabAction(`${tabId}:close`, async () => {
      await sendMessage({ type: 'lurker:remove', tabId, closeTab: true });
      setPendingCloseId(null);
    });
  }

  const menuRecord = menu
    ? lurkingTabs.find((tab) => tab.tabId === menu.tabId)
    : undefined;

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
            <h2 className="eyebrow text-muted-foreground">
              {t('main.lurkingTabs')}
            </h2>
            <Badge variant={activeCount > 0 ? 'success' : 'secondary'}>
              {activeCount > 0 && <span className="live-dot h-1.5 w-1.5 rounded-full" />}
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
            className="h-7 shrink-0 gap-1 btn-brand px-2.5 text-[11px]"
            onClick={() => openLurkerForm()}
          >
            <Plus />
            {t('main.addLurker')}
          </Button>
        </div>

        <div className="space-y-2">
          {lurkingTabs.length === 0 && (
            <div className="rise rounded-2xl border border-dashed border-border bg-card/40 px-4 py-9 text-center">
              <LurkerEyes />
              <p className="mt-5 text-sm font-semibold">{t('main.noTabsTitle')}</p>
              <p className="mx-auto mt-1 max-w-[260px] text-[11px] leading-relaxed text-muted-foreground">
                {t('main.noTabsHint')}
              </p>
            </div>
          )}
          {lurkingTabs.map((record, index) => (
            <LurkingRow
              key={record.tabId}
              index={index}
              record={record}
              preset={presets.find((preset) => preset.id === record.presetId)}
              pendingKey={pendingKey}
              pendingClose={pendingCloseId === record.tabId}
              onAction={(key, action) => void handleTabAction(key, action)}
              onAskClose={() => setPendingCloseId(record.tabId)}
              onCancelClose={() => setPendingCloseId(null)}
              onConfirmClose={handleConfirmClose}
              onEdit={() => openLurkerForm(record.tabId)}
              dragging={dragId === record.tabId}
              dropEdge={
                drop && drop.id === record.tabId && dragId !== record.tabId
                  ? drop.edge
                  : null
              }
              onContextMenu={(x, y) => setMenu({ tabId: record.tabId, x, y })}
              onDragStart={() => setDragId(record.tabId)}
              onDragOver={(edge) =>
                dragId !== null && setDrop({ id: record.tabId, edge })
              }
              onDrop={handleDrop}
              onDragEnd={endDrag}
            />
          ))}
        </div>
      </section>

      {menu && menuRecord && (
        <ContextMenu
          record={menuRecord}
          x={menu.x}
          y={menu.y}
          onClose={() => setMenu(null)}
          onAction={(key, action) => void handleTabAction(key, action)}
          onEdit={() => openLurkerForm(menuRecord.tabId)}
          onDelete={() => setPendingCloseId(menuRecord.tabId)}
        />
      )}

      <p className="pb-1 text-center text-[9px] text-muted-foreground/60">
        {t('main.footer')}
      </p>
    </div>
  );
}
