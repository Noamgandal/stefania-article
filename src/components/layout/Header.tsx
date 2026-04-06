'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ProgressBar } from '@/components/ui/ProgressBar';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const y = window.scrollY;
      setScrolled(y > 50);
      setPastHero(y > window.innerHeight * 0.8);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <ProgressBar />
      <div
        className={cn(
          'flex items-center h-14 px-6 transition-all duration-300',
          scrolled
            ? 'backdrop-blur-md bg-background/80 border-b border-accent-400/20'
            : 'bg-transparent'
        )}
      >
        <span
          className={cn(
            'font-display text-sm md:text-base text-primary-700 truncate transition-opacity duration-500',
            pastHero ? 'opacity-100' : 'opacity-0'
          )}
        >
          Weaponizing Obese Sinners in Medieval Hell
        </span>
      </div>
    </header>
  );
}
