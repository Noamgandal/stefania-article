'use client';

import { useState, useEffect, useRef } from 'react';

export function MedievalCreature() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  // Check prefers-reduced-motion on mount
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
  }, []);

  // Observe sentinel at ~60% of page
  useEffect(() => {
    if (prefersReducedMotion || triggered) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [prefersReducedMotion, triggered]);

  // Hide after 4 seconds
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <>
      {/* Sentinel placed at roughly 60% down the page content flow */}
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="absolute left-0 w-px h-px"
        style={{ top: '60%' }}
      />

      {/* The creature */}
      {triggered && !prefersReducedMotion && (
        <div
          className={`fixed right-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none transition-transform duration-700 ease-out ${
            visible
              ? 'translate-x-[15%]'
              : 'translate-x-[110%]'
          }`}
          aria-hidden="true"
        >
          <svg
            width="70"
            height="80"
            viewBox="0 0 70 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-md"
          >
            {/* Left horn */}
            <path
              d="M22 28 L18 12 L26 24Z"
              fill="#8b1e3b"
              stroke="#6b1530"
              strokeWidth="0.5"
            />
            {/* Right horn */}
            <path
              d="M42 28 L46 12 L38 24Z"
              fill="#8b1e3b"
              stroke="#6b1530"
              strokeWidth="0.5"
            />
            {/* Head */}
            <ellipse
              cx="32"
              cy="32"
              rx="14"
              ry="12"
              fill="#8b1e3b"
            />
            {/* Body */}
            <ellipse
              cx="32"
              cy="52"
              rx="16"
              ry="14"
              fill="#8b1e3b"
            />
            {/* Left eye (open) */}
            <ellipse cx="27" cy="30" rx="3" ry="3" fill="#fffff8" />
            <ellipse cx="27.5" cy="30" rx="1.5" ry="1.8" fill="#111" />
            {/* Right eye (winking) */}
            <path
              d="M35 29 Q37.5 32 40 29"
              stroke="#fffff8"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Mouth / smirk */}
            <path
              d="M26 37 Q32 42 38 36"
              stroke="#d4a01c"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Small teeth */}
            <path d="M28 37 L29 39 L30 37" fill="#fffff8" />
            <path d="M34 36 L35 38 L36 36" fill="#fffff8" />
            {/* Left arm holding pitchfork */}
            <path
              d="M16 48 L6 40"
              stroke="#8b1e3b"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Pitchfork handle */}
            <line x1="6" y1="40" x2="6" y2="14" stroke="#6b1530" strokeWidth="1.5" />
            {/* Pitchfork prongs */}
            <path
              d="M3 18 L6 12 L9 18"
              stroke="#6b1530"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <line x1="6" y1="12" x2="6" y2="18" stroke="#6b1530" strokeWidth="1.5" />
            {/* Right arm (waving / peeking) */}
            <path
              d="M48 48 L55 42"
              stroke="#8b1e3b"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Right hand */}
            <circle cx="56" cy="41" r="2.5" fill="#8b1e3b" />
            {/* Tail */}
            <path
              d="M32 66 Q38 74 44 70 Q50 66 48 60"
              stroke="#8b1e3b"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Tail arrow tip */}
            <path
              d="M46 58 L50 60 L46 63"
              fill="#8b1e3b"
            />
            {/* Belly highlight */}
            <ellipse
              cx="32"
              cy="52"
              rx="9"
              ry="8"
              fill="#a32a4a"
              opacity="0.4"
            />
          </svg>
        </div>
      )}
    </>
  );
}
