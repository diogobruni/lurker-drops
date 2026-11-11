import { AlertTriangle, Loader2, Save } from 'lucide-react';
import * as React from 'react';

import { CategoryCombobox } from '@/components/category-combobox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MultiCombobox } from '@/components/ui/multi-combobox';
import { normalizeChannels } from '@/shared/filters';
import { t } from '@/shared/i18n';
import { errorMessage } from '@/shared/messages';
import { newId } from '@/shared/storage';
import {
  presetDraftSchema,
  type Preset,
  type TwitchCategory,
} from '@/shared/types';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/popup/store';

function FieldLabel({
  children,
  optional = false,
}: {
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs font-medium">{children}</span>
      {optional && (
        <span className="text-[10px] text-muted-foreground">
          {t('common.optional')}
        </span>
      )}
    </div>
  );
}

function FieldHint({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] leading-relaxed text-muted-foreground">{children}</p>
  );
}

export function PresetFormScreen() {
  const editingPresetId = useAppStore((state) => state.editingPresetId);
  const presets = useAppStore((state) => state.presets);
  const savePreset = useAppStore((state) => state.savePreset);
  const goBack = useAppStore((state) => state.goBack);

  const existing = editingPresetId
    ? presets.find((preset) => preset.id === editingPresetId)
    : undefined;

  const [name, setName] = React.useState(existing?.name ?? '');
  const [category, setCategory] = React.useState<TwitchCategory | null>(
    existing?.category ?? null,
  );
  const [titleFilter, setTitleFilter] = React.useState(existing?.titleFilter ?? '');
  const [favorites, setFavorites] = React.useState<string[]>(
    existing?.favorites ?? [],
  );
  const [blacklist, setBlacklist] = React.useState<string[]>(
    existing?.blacklist ?? [],
  );
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({});
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [saving, setSaving] = React.useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});
    setSubmitError(null);

    const result = presetDraftSchema.safeParse({
      name,
      category,
      titleFilter: titleFilter.trim(),
      favorites: normalizeChannels(favorites),
      blacklist: normalizeChannels(blacklist),
    });

    if (!result.success) {
      const errors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path[0] ?? 'form');
        if (!errors[key]) errors[key] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }

    const now = Date.now();
    const preset: Preset = {
      id: existing?.id ?? newId(),
      ...result.data,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };

    setSaving(true);
    try {
      await savePreset(preset);
    } catch (cause) {
      setSubmitError(errorMessage(cause));
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
        {submitError && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-[11px] text-red-300"
          >
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        <div className="space-y-1.5">
          <FieldLabel>{t('form.name')}</FieldLabel>
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t('form.namePlaceholder')}
            autoFocus
            aria-invalid={Boolean(fieldErrors.name)}
            className={cn(
              fieldErrors.name &&
                'border-red-500/60 focus-visible:ring-red-500/50',
            )}
          />
          {fieldErrors.name ? (
            <p className="text-[10px] text-red-400">{fieldErrors.name}</p>
          ) : (
            <FieldHint>{t('form.nameHint')}</FieldHint>
          )}
        </div>

        <div className="space-y-1.5">
          <FieldLabel optional>{t('form.category')}</FieldLabel>
          <CategoryCombobox value={category} onValueChange={setCategory} />
          <FieldHint>{t('form.categoryHint')}</FieldHint>
        </div>

        <div className="space-y-1.5">
          <FieldLabel optional>{t('form.titleFilter')}</FieldLabel>
          <Input
            value={titleFilter}
            onChange={(event) => setTitleFilter(event.target.value)}
            placeholder={t('form.titleFilterPlaceholder')}
          />
          <FieldHint>{t('form.titleFilterHint')}</FieldHint>
        </div>

        <div className="space-y-1.5">
          <FieldLabel optional>{t('form.favorites')}</FieldLabel>
          <MultiCombobox
            value={favorites}
            onValueChange={setFavorites}
            reorderable
            placeholder={t('form.favoritesPlaceholder')}
          />
          <FieldHint>{t('form.favoritesHint')}</FieldHint>
        </div>

        <div className="space-y-1.5">
          <FieldLabel optional>{t('form.blacklist')}</FieldLabel>
          <MultiCombobox
            value={blacklist}
            onValueChange={setBlacklist}
            placeholder={t('form.blacklistPlaceholder')}
          />
          <FieldHint>{t('form.blacklistHint')}</FieldHint>
        </div>
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
            className="flex-1 gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500"
            disabled={saving}
          >
            {saving ? <Loader2 className="animate-spin" /> : <Save />}
            {saving ? t('form.saving') : t('form.save')}
          </Button>
        </div>
      </div>
    </form>
  );
}
