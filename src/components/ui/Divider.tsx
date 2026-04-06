import { cn } from '@/lib/utils';

interface DividerProps {
  className?: string;
}

export function Divider({ className }: DividerProps) {
  return (
    <div className={cn('flex items-center justify-center gap-4 my-12', className)}>
      <div className="h-px flex-1 max-w-24 bg-accent-400/40" />
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        className="text-accent-400"
        aria-hidden="true"
      >
        <rect
          x="6"
          y="0"
          width="8.49"
          height="8.49"
          rx="1"
          transform="rotate(45 6 0)"
          fill="currentColor"
        />
      </svg>
      <div className="h-px flex-1 max-w-24 bg-accent-400/40" />
    </div>
  );
}
