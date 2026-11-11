import { Check, ChevronsUpDown, Loader2, PenLine, TriangleAlert } from 'lucide-react';
import * as React from 'react';

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { t } from '@/shared/i18n';
import { errorMessage, sendMessage } from '@/shared/messages';
import type { TwitchCategory } from '@/shared/types';
import { cn } from '@/lib/utils';

const categoryCache = new Map<string, TwitchCategory[]>();

interface CategoryComboboxProps {
  value: TwitchCategory | null;
  onValueChange: (category: TwitchCategory | null) => void;
  id?: string;
  disabled?: boolean;
}

export function CategoryCombobox({
  value,
  onValueChange,
  id,
  disabled = false,
}: CategoryComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [options, setOptions] = React.useState<TwitchCategory[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) return;
    const trimmed = search.trim();
    const cacheKey = trimmed.toLowerCase();
    const cached = categoryCache.get(cacheKey);

    if (cached) {
      setOptions(cached);
      setLoading(false);
      setError(null);
      return;
    }

    setOptions([]);
    setLoading(true);
    setError(null);
    let cancelled = false;
    const timer = window.setTimeout(
      () => {
        sendMessage<TwitchCategory[]>({ type: 'twitch:categories', query: trimmed })
          .then((result) => {
            if (cancelled) return;
            categoryCache.set(cacheKey, result);
            setOptions(result);
          })
          .catch((cause: unknown) => {
            if (!cancelled) setError(errorMessage(cause));
          })
          .finally(() => {
            if (!cancelled) setLoading(false);
          });
      },
      trimmed ? 250 : 0,
    );

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [open, search]);

  const trimmedSearch = search.trim();
  const exactMatch = options.some(
    (category) =>
      category.name.toLowerCase() === trimmedSearch.toLowerCase() ||
      category.displayName.toLowerCase() === trimmedSearch.toLowerCase(),
  );
  const canAddCustom = trimmedSearch.length > 0 && !exactMatch;

  function selectCategory(category: TwitchCategory | null) {
    onValueChange(category);
    setOpen(false);
    setSearch('');
  }

  function selectCustom() {
    if (!trimmedSearch) return;
    selectCategory({ name: trimmedSearch, displayName: trimmedSearch });
  }

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setSearch('');
      }}
    >
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            'flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-left text-sm shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            !value && 'text-muted-foreground',
          )}
        >
          <span className="truncate">
            {value?.displayName ?? t('common.anyCategory')}
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] p-0"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={t('category.searchPlaceholder')}
            value={search}
            onValueChange={setSearch}
            autoFocus
          />
          <CommandList>
            {loading && (
              <div className="flex items-center justify-center gap-2 py-6 text-xs text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                {t('category.searching')}
              </div>
            )}
            {!loading && error && (
              <div className="flex items-start gap-2 px-3 py-3 text-xs text-red-400">
                <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {!loading && !error && options.length === 0 && (
              <div className="px-3 py-4 text-center text-xs text-muted-foreground">
                {t('category.none')}
              </div>
            )}
            <CommandGroup>
              {!trimmedSearch && (
                <CommandItem value="any-category" onSelect={() => selectCategory(null)}>
                  <Check
                    className={cn('h-4 w-4', value ? 'opacity-0' : 'opacity-100')}
                  />
                  <span>{t('common.anyCategory')}</span>
                </CommandItem>
              )}
              {options.map((category) => {
                const selected =
                  value?.id === category.id ||
                  (!value?.id &&
                    value?.name.toLowerCase() === category.name.toLowerCase());
                return (
                  <CommandItem
                    key={category.id ?? category.name}
                    value={`${category.name}-${category.id ?? ''}`}
                    onSelect={() => selectCategory(category)}
                  >
                    <Check
                      className={cn('h-4 w-4', selected ? 'opacity-100' : 'opacity-0')}
                    />
                    <span className="truncate">{category.displayName}</span>
                  </CommandItem>
                );
              })}
              {canAddCustom && (
                <CommandItem
                  value={`custom-${trimmedSearch}`}
                  onSelect={selectCustom}
                  className="text-primary"
                >
                  <PenLine className="h-4 w-4" />
                  <span>{t('category.use', { name: trimmedSearch })}</span>
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
        <div className="border-t border-border px-3 py-2 text-[10px] text-muted-foreground">
          {t('category.footer')}
        </div>
      </PopoverContent>
    </Popover>
  );
}
