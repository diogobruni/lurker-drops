import { ArrowLeft, ExternalLink, Eye } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IS_POPOUT, openPopout } from '@/popup/popout';
import { useAppStore } from '@/popup/store';

function StatusPill({ activeCount }: { activeCount: number }) {
  const active = activeCount > 0;
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-1 text-[10px] font-medium',
        active
          ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
          : 'border-border bg-secondary/60 text-muted-foreground',
      )}
      title={active ? `${activeCount} tab(s) lurking` : 'Lurker Drops is idle'}
    >
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          active ? 'animate-pulse-soft bg-emerald-400' : 'bg-muted-foreground/60',
        )}
      />
      {active ? `${activeCount} active` : 'Idle'}
    </span>
  );
}

export function Navbar() {
  const screen = useAppStore((state) => state.screen);
  const editingPresetId = useAppStore((state) => state.editingPresetId);
  const goBack = useAppStore((state) => state.goBack);
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
      ? 'Lurker Drops'
      : screen === 'presets'
        ? 'Presets'
        : editingPresetId
          ? 'Edit preset'
          : 'New preset';
  const subtitle =
    screen === 'main'
      ? 'Twitch auto-lurker'
      : screen === 'presets'
        ? 'Manage your filters'
        : 'Lurker filters';

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border/70 bg-background/80 px-3 backdrop-blur">
      {screen !== 'main' ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={goBack}
          aria-label="Go back"
          title="Go back"
          className="shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      ) : (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-800 shadow-md shadow-purple-950/50">
          <Eye className="h-4 w-4" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-sm font-semibold leading-tight">{title}</h1>
        <p className="truncate text-[10px] leading-tight text-muted-foreground">
          {subtitle}
        </p>
      </div>

      <StatusPill activeCount={activeCount} />

      {!IS_POPOUT && (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => void handlePopOut()}
          disabled={openingPopout}
          aria-label="Pop out"
          title="Pop out"
          className="shrink-0 text-muted-foreground hover:text-foreground"
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      )}
    </header>
  );
}
