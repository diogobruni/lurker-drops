import { Loader2 } from 'lucide-react';
import * as React from 'react';

import logoUrl from '@/assets/logo-128.png';
import { TooltipProvider } from '@/components/ui/tooltip';
import { t } from '@/shared/i18n';
import { errorMessage } from '@/shared/messages';
import { Navbar } from '@/popup/components/Navbar';
import { AboutScreen } from '@/popup/screens/AboutScreen';
import { MainScreen } from '@/popup/screens/MainScreen';
import { LurkerFormScreen } from '@/popup/screens/LurkerFormScreen';
import { PresetFormScreen } from '@/popup/screens/PresetFormScreen';
import { PresetsScreen } from '@/popup/screens/PresetsScreen';
import { useAppStore } from '@/popup/store';

function Splash({ error }: { error: string | null }) {
  return (
    <div className="flex h-full flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
        <img
          src={logoUrl}
          alt={t('app.name')}
          className="h-12 w-12 rounded-2xl shadow-[0_0_30px_hsl(262_83%_60%/0.5)]"
        />
        {error ? (
          <>
            <p className="text-sm font-medium">{t('app.loadErrorTitle')}</p>
            <p className="max-w-[280px] text-xs text-muted-foreground">{error}</p>
          </>
        ) : (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            <p className="text-xs text-muted-foreground">{t('app.loading')}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const hydrated = useAppStore((state) => state.hydrated);
  const screen = useAppStore((state) => state.screen);
  const editingPresetId = useAppStore((state) => state.editingPresetId);
  const lurkerFormTabId = useAppStore((state) => state.lurkerFormTabId);
  const load = useAppStore((state) => state.load);
  const [loadError, setLoadError] = React.useState<string | null>(null);

  React.useEffect(() => {
    void load().catch((error: unknown) => setLoadError(errorMessage(error)));
  }, [load]);

  return (
    <TooltipProvider delayDuration={250}>
      <div
        className="flex h-full flex-col overflow-hidden"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -10%, hsl(262 83% 63% / 0.18), transparent 70%), radial-gradient(ellipse 60% 40% at 100% 100%, hsl(78 85% 58% / 0.04), transparent 70%)',
        }}
      >
        {!hydrated ? (
          <Splash error={loadError} />
        ) : (
          <>
            <Navbar />
            <div className="min-h-0 flex-1">
              <div
                key={`${screen}-${editingPresetId ?? ''}-${lurkerFormTabId ?? 'new'}`}
                className="screen-in h-full"
              >
                {screen === 'main' && <MainScreen />}
                {screen === 'presets' && <PresetsScreen />}
                {screen === 'preset-form' && <PresetFormScreen />}
                {screen === 'lurker-form' && <LurkerFormScreen />}
                {screen === 'about' && <AboutScreen />}
              </div>
            </div>
          </>
        )}
      </div>
    </TooltipProvider>
  );
}
