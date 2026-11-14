import { AlertTriangle, Loader2 } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface InlineConfirmProps {
  open: boolean;
  message: React.ReactNode;
  cancelLabel: string;
  confirmLabel: string;
  busyLabel?: string;
  busy?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  className?: string;
}

/**
 * Confirmation overlay for compact cards. It covers the card in place instead
 * of adding rows below it, so opening it never shifts the layout.
 */
function InlineConfirm({
  open,
  message,
  cancelLabel,
  confirmLabel,
  busyLabel,
  busy = false,
  onCancel,
  onConfirm,
  className,
}: InlineConfirmProps) {
  const confirmLock = React.useRef(false);
  const confirmTimer = React.useRef<number | null>(null);

  function clearConfirmTimer(): void {
    if (confirmTimer.current !== null) {
      window.clearTimeout(confirmTimer.current);
      confirmTimer.current = null;
    }
    confirmLock.current = false;
  }

  React.useEffect(() => {
    if (open) return;
    clearConfirmTimer();
  }, [open]);

  React.useEffect(() => clearConfirmTimer, []);

  function handleConfirm(): void {
    if (busy || confirmLock.current) return;
    confirmLock.current = true;
    confirmTimer.current = window.setTimeout(() => {
      confirmTimer.current = null;
      confirmLock.current = false;
      onConfirm();
    }, 150);
  }

  function handleCancel(): void {
    clearConfirmTimer();
    onCancel();
  }

  if (!open) return null;

  return (
    <div
      className={cn(
        'absolute inset-0 z-10 flex animate-pop-in flex-col items-center justify-center gap-1.5 rounded-[inherit] bg-background/90 p-2.5 text-center backdrop-blur-sm',
        className,
      )}
    >
      <div className="flex items-start gap-1.5">
        <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-red-400" />
        <p className="text-[10px] leading-relaxed text-muted-foreground">
          {message}
        </p>
      </div>
      <div className="flex items-center gap-1.5">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-6 rounded-md px-2 text-[10px]"
          disabled={busy}
          onClick={handleCancel}
        >
          {cancelLabel}
        </Button>
        <Button
          type="button"
          variant="destructive"
          size="sm"
          className="h-6 gap-1 rounded-md px-2 text-[10px] [&_svg]:h-3 [&_svg]:w-3"
          disabled={busy}
          onClick={handleConfirm}
        >
          {busy && <Loader2 className="animate-spin" />}
          {busy ? (busyLabel ?? confirmLabel) : confirmLabel}
        </Button>
      </div>
    </div>
  );
}

export { InlineConfirm };
