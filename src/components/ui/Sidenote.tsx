'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SidenoteProps {
  number: number;
  children: React.ReactNode;
}

export function Sidenote({ number, children }: SidenoteProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="relative">
      {/* Superscript number */}
      <sup
        className="cursor-pointer text-secondary-600 font-semibold hover:text-secondary-700 transition-colors lg:cursor-default"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {number}
      </sup>

      {/* Desktop: margin note */}
      <aside className="hidden lg:block absolute left-full top-0 ml-6 w-56 text-sm text-parchment-600 leading-relaxed">
        <span className="font-semibold text-secondary-600 mr-1">{number}.</span>
        {children}
      </aside>

      {/* Mobile: inline expandable note */}
      {isOpen && (
        <span className="lg:hidden inline-block ml-1 text-sm text-parchment-600 bg-parchment-100 rounded px-2 py-0.5 leading-relaxed">
          <span className="font-semibold text-secondary-600 mr-1">{number}.</span>
          {children}
        </span>
      )}
    </span>
  );
}
