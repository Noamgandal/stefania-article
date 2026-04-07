'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useActiveSection } from '@/hooks/useActiveSection';

interface TableOfContentsProps {
  sections: { id: string; title: string; number?: number }[];
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const sectionIds = sections.map((s) => s.id);
  const activeSection = useActiveSection(sectionIds);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleClick = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileOpen(false);
    },
    []
  );

  const navList = (
    <nav aria-label="Table of contents">
      <ul className="space-y-1">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <li key={section.id}>
              <button
                onClick={() => handleClick(section.id)}
                className={cn(
                  'w-full text-left px-3 py-1.5 text-sm rounded-sm transition-colors duration-200 border-l-2',
                  isActive
                    ? 'text-primary-700 border-primary-700 font-medium bg-primary-700/5'
                    : 'text-foreground/40 border-transparent hover:text-foreground/70 hover:border-accent-400/40'
                )}
              >
                {section.number != null && (
                  <span className="mr-1.5 text-xs opacity-60">
                    {section.number}.
                  </span>
                )}
                {section.title}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="toc-sidebar sticky top-20 self-start w-56 shrink-0">
        <p className="text-xs font-medium uppercase tracking-widest text-foreground/30 mb-4 px-3">
          Contents
        </p>
        {navList}
      </aside>

      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="xl:hidden fixed bottom-20 right-4 z-30 bg-primary-700 text-white text-xs font-medium px-3 py-2 rounded-full shadow-lg hover:bg-primary-700/90 transition-colors"
        aria-label="Open table of contents"
      >
        Contents
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="xl:hidden fixed inset-0 z-30">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileOpen(false)}
          />
          {/* Bottom sheet */}
          <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-2xl p-6 pb-10 max-h-[70vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-medium uppercase tracking-widest text-foreground/30">
                Contents
              </p>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-foreground/40 hover:text-foreground/70 text-sm"
                aria-label="Close table of contents"
              >
                Close
              </button>
            </div>
            {navList}
          </div>
        </div>
      )}
    </>
  );
}
