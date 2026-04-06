'use client';

import { useScrollProgress } from '@/hooks/useScrollProgress';

export function ProgressBar() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px]">
      <div
        className="h-full origin-left bg-gradient-to-r from-secondary-600 to-accent-500"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
