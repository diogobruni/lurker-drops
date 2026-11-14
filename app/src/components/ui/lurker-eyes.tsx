import * as React from 'react';

import { cn } from '@/lib/utils';

/** Two eyes in the dark. Pupils follow the pointer; they blink now and then. */
function LurkerEyes({ className }: { className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [look, setLook] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    function onMove(event: PointerEvent) {
      const box = ref.current?.getBoundingClientRect();
      if (!box) return;
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = event.clientY - (box.top + box.height / 2);
      const dist = Math.hypot(dx, dy) || 1;
      const reach = Math.min(1, dist / 140);
      setLook({ x: (dx / dist) * reach * 4, y: (dy / dist) * reach * 3 });
    }
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn('flex items-center justify-center gap-3', className)}
    >
      {[0, 1].map((side) => (
        <div
          key={side}
          className="relative h-9 w-7 overflow-hidden rounded-[50%] bg-white shadow-[0_0_28px_hsl(262_90%_65%/0.45)]"
          style={{
            animation: 'blink 5s infinite',
            animationDelay: `${side * 40}ms`,
            transform: `rotate(${side === 0 ? 8 : -8}deg)`,
          }}
        >
          <span
            className="absolute left-1/2 top-1/2 h-4 w-4 rounded-full bg-[hsl(258_40%_8%)] transition-transform duration-150 ease-out"
            style={{
              transform: `translate(calc(-50% + ${look.x}px), calc(-50% + ${look.y}px))`,
            }}
          />
          {/* heavy brow: the lurker stare */}
          <span
            className="absolute -top-1 left-0 h-3 w-full bg-background"
            style={{ transform: `rotate(${side === 0 ? 14 : -14}deg)` }}
          />
        </div>
      ))}
    </div>
  );
}

export { LurkerEyes };
