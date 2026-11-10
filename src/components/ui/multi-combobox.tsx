import { ChevronDown, ChevronUp, ChevronsUpDown, Plus, X } from 'lucide-react';
import * as React from 'react';

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { normalizeChannel } from '@/shared/filters';
import { cn } from '@/lib/utils';

interface MultiComboboxProps {
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  reorderable?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export function MultiCombobox({
  value,
  onValueChange,
  placeholder = 'Type a Twitch channel slug',
  reorderable = false,
  disabled = false,
  id,
  className,
}: MultiComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const normalizedSearch = normalizeChannel(search);
  const alreadySelected = normalizedSearch.length > 0 && value.includes(normalizedSearch);

  function addChannels(inputs: string[]) {
    const next = [...value];
    for (const input of inputs) {
      const channel = normalizeChannel(input);
      if (channel && !next.includes(channel)) next.push(channel);
    }
    if (next.length !== value.length) onValueChange(next);
    setSearch('');
  }

  function removeChannel(channel: string) {
    onValueChange(value.filter((item) => item !== channel));
  }

  function moveChannel(index: number, offset: number) {
    const target = index + offset;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[index], next[target]] = [next[target], next[index]];
    onValueChange(next);
  }

  function handleSearchChange(next: string) {
    if (!next.includes(',')) {
      setSearch(next);
      return;
    }
    const parts = next.split(',');
    const remainder = parts.pop() ?? '';
    addChannels(parts);
    setSearch(remainder);
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
        <div
          id={id}
          role="combobox"
          aria-expanded={open}
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          onKeyDown={(event) => {
            if (disabled) return;
            if (!open && (event.key === 'Enter' || event.key === ' ')) {
              event.preventDefault();
              setOpen(true);
            }
          }}
          className={cn(
            'flex min-h-9 w-full cursor-pointer flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent px-2 py-1.5 text-sm shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            disabled && 'cursor-not-allowed opacity-50',
            className,
          )}
        >
          {value.length === 0 && (
            <span className="px-1 text-muted-foreground">{placeholder}</span>
          )}
          {value.map((channel) => (
            <span
              key={channel}
              className="inline-flex items-center gap-1 rounded bg-secondary px-1.5 py-0.5 text-xs text-secondary-foreground"
            >
              <span className="max-w-[180px] truncate">@{channel}</span>
              <button
                type="button"
                aria-label={`Remove ${channel}`}
                className="rounded-sm opacity-60 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation();
                  removeChannel(channel);
                }}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] p-0">
        {value.length > 0 && (
          <div className="border-b border-border p-2">
            <p className="px-1 pb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {reorderable ? 'Priority order' : 'Selected'}
            </p>
            <div className="max-h-32 space-y-0.5 overflow-y-auto">
              {value.map((channel, index) => (
                <div
                  key={channel}
                  className="flex items-center gap-1 rounded px-1 py-0.5 text-xs hover:bg-accent/40"
                >
                  <span className="min-w-0 flex-1 truncate">@{channel}</span>
                  {reorderable && (
                    <>
                      <button
                        type="button"
                        aria-label={`Move ${channel} up`}
                        disabled={index === 0}
                        className="rounded p-0.5 text-muted-foreground hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
                        onClick={() => moveChannel(index, -1)}
                      >
                        <ChevronUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Move ${channel} down`}
                        disabled={index === value.length - 1}
                        className="rounded p-0.5 text-muted-foreground hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
                        onClick={() => moveChannel(index, 1)}
                      >
                        <ChevronDown className="h-3.5 w-3.5" />
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    aria-label={`Remove ${channel}`}
                    className="rounded p-0.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                    onClick={() => removeChannel(channel)}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search or type a channel slug..."
            value={search}
            onValueChange={handleSearchChange}
            autoFocus
            onKeyDown={(event) => {
              if (event.key === 'Enter' && normalizedSearch && !alreadySelected) {
                event.preventDefault();
                addChannels([normalizedSearch]);
              }
            }}
          />
          <CommandList className="max-h-40">
            {normalizedSearch ? (
              <CommandGroup>
                <CommandItem
                  value={`add-${normalizedSearch}`}
                  disabled={alreadySelected}
                  onSelect={() => addChannels([normalizedSearch])}
                >
                  <Plus className="h-4 w-4" />
                  {alreadySelected ? (
                    <span className="text-muted-foreground">@{normalizedSearch} is already added</span>
                  ) : (
                    <span>
                      Add <span className="font-medium">@{normalizedSearch}</span>
                    </span>
                  )}
                </CommandItem>
              </CommandGroup>
            ) : (
              <div className="px-3 py-4 text-center text-xs text-muted-foreground">
                Type a channel slug or paste a Twitch URL.
              </div>
            )}
          </CommandList>
        </Command>
        <div className="border-t border-border px-3 py-2 text-[10px] text-muted-foreground">
          {reorderable
            ? 'Favorites have priority. Order is used when Pursue is off or to break viewer ties.'
            : 'Use commas to add several channels at once.'}
        </div>
      </PopoverContent>
    </Popover>
  );
}
