import { ArrowLeft, ExternalLink, Info } from 'lucide-react';
import * as React from 'react';

import logoUrl from '@/assets/logo-128.png';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { t } from '@/shared/i18n';
import { IS_POPOUT, openPopout } from '@/popup/popout';
import { useAppStore } from '@/popup/store';

function StatusPill({
  activeCount,
  onSelect,
}: {
  activeCount: number;
  onSelect: () => void;
}) {
  const active = activeCount > 0;
  const tooltip = active
    ? t('nav.activeTooltip', { count: activeCount })
    : t('nav.idleTooltip');
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={onSelect}
          className={cn(
            'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-1 text-[10px] font-medium transition-colors',
            active
              ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
              : 'border-border bg-secondary/60 text-muted-foreground hover:bg-secondary',
          )}
          aria-label={tooltip}
        >
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-full',
              active
                ? 'animate-pulse-soft bg-emerald-400'
                : 'bg-muted-foreground/60',
            )}
          />
          {active
            ? t('nav.activeBadge', { count: activeCount })
            : t('status.idle')}
        </button>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}

export function Navbar() {
  const screen = useAppStore((state) => state.screen);
  const editingPresetId = useAppStore((state) => state.editingPresetId);
  const goBack = useAppStore((state) => state.goBack);
  const goToMain = useAppStore((state) => state.goToMain);
  const goToAbout = useAppStore((state) => state.goToAbout);
  const lurkerFormTabId = useAppStore((state) => state.lurkerFormTabId);
  const activeCount = useAppStore(
    (state) => state.lurkingTabs.filter((tab) => tab.enabled).length,
  );
  const [openingPopout, setOpeningPopout] = React.useState(false);

  async function handlePopOut() {
    setOpeningPopout(true);
    try {
      await openPopout();
    } catch (error) {
      console.error('Could not open the Lurker Drops window', error);
      setOpeningPopout(false);
    }
  }

  const title =
    screen === 'main'
      ? t('app.name')
      : screen === 'presets'
        ? t('nav.presets')
        : screen === 'about'
          ? t('nav.about')
          : screen === 'lurker-form'
            ? lurkerFormTabId !== null
              ? t('nav.editLurker')
              : t('nav.newLurker')
            : editingPresetId
              ? t('nav.editPreset')
              : t('nav.newPreset');
  const subtitle =
    screen === 'main'
      ? t('nav.tagline')
      : screen === 'presets'
        ? t('nav.presetsSubtitle')
        : screen === 'about'
          ? t('nav.aboutSubtitle')
          : screen === 'lurker-form'
            ? t('nav.lurkerSubtitle')
            : t('nav.formSubtitle');

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border/70 bg-background/80 px-3 backdrop-blur">
      {screen !== 'main' ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={goBack}
              aria-label={t('common.goBack')}
              className="shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t('common.goBack')}</TooltipContent>
        </Tooltip>
      ) : (
        <img
          src={logoUrl}
          alt={t('app.name')}
          className="h-8 w-8 shrink-0 rounded-lg shadow-md shadow-purple-950/50"
        />
      )}

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-sm font-semibold leading-tight">{title}</h1>
        <p className="truncate text-[10px] leading-tight text-muted-foreground">
          {subtitle}
        </p>
      </div>

      <StatusPill activeCount={activeCount} onSelect={goToMain} />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={goToAbout}
            aria-label={t('nav.about')}
            className="shrink-0 text-muted-foreground hover:text-foreground"
          >
            <Info className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t('nav.about')}</TooltipContent>
      </Tooltip>

      {!IS_POPOUT && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => void handlePopOut()}
              disabled={openingPopout}
              aria-label={t('common.popOut')}
              className="shrink-0 text-muted-foreground hover:text-foreground"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t('common.popOut')}</TooltipContent>
        </Tooltip>
      )}
    </header>
  );
}
