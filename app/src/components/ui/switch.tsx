import { cn } from '@/lib/utils';

interface SwitchProps {
  checked: boolean;
  onCheckedChange: () => void;
  disabled?: boolean;
  label: string;
}

function Switch({ checked, onCheckedChange, disabled, label }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={onCheckedChange}
      className={cn(
        'relative h-5 w-9 shrink-0 rounded-full border transition-colors duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50',
        checked
          ? 'border-live/40 bg-live/25'
          : 'border-border bg-secondary',
      )}
    >
      <span
        className={cn(
          'switch-thumb absolute left-0.5 top-0.5 h-3.5 w-3.5 rounded-full',
          checked
            ? 'translate-x-4 bg-live shadow-[0_0_10px_hsl(var(--live)/0.7)]'
            : 'translate-x-0 bg-muted-foreground',
        )}
      />
    </button>
  );
}

export { Switch };
