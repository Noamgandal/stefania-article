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
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px',
    once: true,
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        isInView ? 'animate-fade-in-up' : 'opacity-0',
        delay && `stagger-${delay}`,
        className
      )}
    >
      {children}
    </div>
  );
}
