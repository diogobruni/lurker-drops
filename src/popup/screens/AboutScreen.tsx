import { Package, UserRound } from 'lucide-react';

import logoUrl from '@/assets/logo-128.png';
import { Badge } from '@/components/ui/badge';
import { t } from '@/shared/i18n';

function appVersion(): string {
  try {
    return chrome.runtime.getManifest().version;
  } catch {
    return '';
  }
}

export function AboutScreen() {
  const version = appVersion();

  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="relative overflow-hidden rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-600/20 via-purple-600/10 to-transparent p-5 text-center shadow-lg shadow-purple-950/20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-violet-500/25 blur-3xl"
        />
        <img
          src={logoUrl}
          alt={t('app.name')}
          className="relative mx-auto h-16 w-16 rounded-2xl border border-white/10 shadow-lg shadow-purple-950/40"
        />
        <h2 className="relative mt-3 text-lg font-semibold tracking-tight">
          {t('app.name')}
        </h2>
        <p className="relative mt-1 text-[11px] text-muted-foreground">
          {t('nav.tagline')}
        </p>
        <Badge
          variant="outline"
          className="relative mt-3 border-violet-400/30 bg-violet-500/10 text-violet-200"
        >
          {version ? `v${version}` : t('about.version')}
        </Badge>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-3 rounded-xl border border-border/80 bg-card/80 p-3 shadow-sm">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300">
            <UserRound className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {t('about.madeBy')}
            </p>
            <p className="truncate text-sm font-medium">Geox</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-border/80 bg-card/80 p-3 shadow-sm">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300">
            <Package className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {t('about.version')}
            </p>
            <p className="truncate text-sm font-medium">
              {version || '—'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
