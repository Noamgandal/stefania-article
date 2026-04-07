'use client';

import { useState } from 'react';
import Image from 'next/image';
import { figures } from '@/content/figures';

export function FigureNavigator() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedFigure, setExpandedFigure] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedFigure((prev) => (prev === id ? null : id));
  };

  const stripHtml = (html: string) =>
    html.replace(/<[^>]*>/g, '');

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="xl:hidden fixed bottom-[136px] right-4 z-30 bg-primary-700 text-white text-xs font-medium px-3 py-2 rounded-full shadow-lg hover:bg-primary-700/90 transition-colors flex items-center gap-1.5"
        aria-label="Open figure browser"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        Figures
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-30">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsOpen(false)}
          />
          {/* Bottom sheet */}
          <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-2xl p-6 pb-10 max-h-[70vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-medium uppercase tracking-widest text-foreground/30">
                Figures
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="text-foreground/40 hover:text-foreground/70 text-sm"
                aria-label="Close figure browser"
              >
                Close
              </button>
            </div>

            <div className="space-y-1">
              {figures.map((fig, idx) => {
                const figNum = idx + 1;
                const isExpanded = expandedFigure === fig.id;
                const label = stripHtml(fig.caption).slice(0, 60);

                return (
                  <div key={fig.id}>
                    <button
                      onClick={() => handleToggle(fig.id)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-sm transition-colors duration-200 border-l-2 flex items-center justify-between gap-2 ${
                        isExpanded
                          ? 'text-primary-700 border-primary-700 font-medium bg-primary-700/5'
                          : 'text-foreground/60 border-transparent hover:text-foreground/80 hover:border-accent-400/40'
                      }`}
                    >
                      <span className="truncate">
                        <span className="font-medium">Figure {figNum}</span>
                        <span className="mx-1.5 text-foreground/20">|</span>
                        <span className="text-xs">{label}...</span>
                      </span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`shrink-0 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>

                    {isExpanded && (
                      <div className="px-3 py-3">
                        <Image
                          src={fig.src}
                          alt={fig.alt}
                          width={600}
                          height={400}
                          style={{ width: '100%', height: 'auto' }}
                          className="rounded-lg"
                        />
                        <p
                          className="mt-2 text-xs leading-relaxed text-foreground/60 font-serif"
                          dangerouslySetInnerHTML={{ __html: fig.caption }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
