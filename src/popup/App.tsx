import { Eye, Loader2 } from 'lucide-react';
import * as React from 'react';

import { errorMessage } from '@/shared/messages';
import { Navbar } from '@/popup/components/Navbar';
import { MainScreen } from '@/popup/screens/MainScreen';
import { PresetFormScreen } from '@/popup/screens/PresetFormScreen';
import { PresetsScreen } from '@/popup/screens/PresetsScreen';
import { useAppStore } from '@/popup/store';

function Splash({ error }: { error: string | null }) {
  return (
    <div className="flex h-full flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-800 shadow-lg shadow-purple-950/50">
          <Eye className="h-6 w-6" />
        </div>
        {error ? (
          <>
            <p className="text-sm font-medium">Could not load Lurker Drops</p>
            <p className="max-w-[280px] text-xs text-muted-foreground">{error}</p>
          </>
        ) : (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Loading your lurkers...</p>
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
  const load = useAppStore((state) => state.load);
  const [loadError, setLoadError] = React.useState<string | null>(null);

  React.useEffect(() => {
    void load().catch((error: unknown) => setLoadError(errorMessage(error)));
  }, [load]);

  return (
    <div
      className="flex h-full flex-col overflow-hidden"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at top, hsl(262 83% 63% / 0.13), transparent 52%)',
      }}
    >
      {!hydrated ? (
        <Splash error={loadError} />
      ) : (
        <>
          <Navbar />
          <div className="min-h-0 flex-1">
            <div key={`${screen}-${editingPresetId ?? ''}`} className="h-full animate-fade-in">
              {screen === 'main' && <MainScreen />}
              {screen === 'presets' && <PresetsScreen />}
              {screen === 'preset-form' && <PresetFormScreen />}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
