import { ArrowLeft, ExternalLink, Info } from 'lucide-react';
import * as React from 'react';

import logoUrl from '@/assets/logo-128.png';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { t } from '@/shared/i18n';
import { IS_POPOUT, openPopout } from '@/popup/popout';
import { useAppStore } from '@/popup/store';

export function Navbar() {
  const screen = useAppStore((state) => state.screen);
  const editingPresetId = useAppStore((state) => state.editingPresetId);
  const goBack = useAppStore((state) => state.goBack);
  const goToAbout = useAppStore((state) => state.goToAbout);
  const lurkerFormTabId = useAppStore((state) => state.lurkerFormTabId);
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
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border/60 bg-background/70 px-3 backdrop-blur-md">
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
          className="h-8 w-8 shrink-0 rounded-lg shadow-[0_0_18px_hsl(262_83%_60%/0.45)] transition-transform duration-250 ease-out hover:rotate-[-6deg] hover:scale-105"
        />
      )}

      <div className="min-w-0 flex-1">
        <h1 key={title} className="rise truncate text-sm font-semibold leading-tight tracking-tight">{title}</h1>
        <p key={subtitle} className="rise truncate text-[10px] leading-tight text-muted-foreground" style={{ ["--i" as string]: 1 }}>
          {subtitle}
        </p>
      </div>

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
