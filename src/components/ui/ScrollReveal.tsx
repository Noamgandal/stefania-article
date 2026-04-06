'use client';

import { cn } from '@/lib/utils';
import { useInView } from '@/hooks/useInView';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({ children, className, delay }: ScrollRevealProps) {
  const [ref, isInView] = useInView({
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px',
    once: true,
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        'opacity-0 transition-opacity duration-300',
        isInView && 'animate-fade-in-up',
        delay && `stagger-${delay}`,
        className
      )}
    >
      {children}
    </div>
  );
}
