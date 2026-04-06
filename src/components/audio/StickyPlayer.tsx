'use client';

import { useState, useRef, useCallback } from 'react';
import { useAudio } from '@/components/audio/AudioProvider';
import { cn } from '@/lib/utils';

const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5, 2];

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/* ── Icon Components ── */

function PlayIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="currentColor">
      <polygon points="4,1 16,9 4,17" />
    </svg>
  );
}

function PauseIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="currentColor">
      <rect x="3" y="2" width="4" height="14" rx="1" />
      <rect x="11" y="2" width="4" height="14" rx="1" />
    </svg>
  );
}

function SkipBackIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18" />
      <path d="M12 3 8 7l4 4" />
      <text x="12" y="15.5" fill="currentColor" stroke="none" fontSize="7" fontWeight="700" textAnchor="middle" fontFamily="system-ui">15</text>
    </svg>
  );
}

function SkipForwardIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18" />
      <path d="M12 3l4 4-4 4" />
      <text x="12" y="15.5" fill="currentColor" stroke="none" fontSize="7" fontWeight="700" textAnchor="middle" fontFamily="system-ui">15</text>
    </svg>
  );
}

/* ── Seek Bar Component ── */

function SeekBar({
  currentTime,
  duration,
  onSeek,
  size = 'small',
}: {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  size?: 'small' | 'large';
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const seekFromEvent = useCallback(
    (clientX: number) => {
      if (!barRef.current || !duration) return;
      const rect = barRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percent = Math.max(0, Math.min(1, x / rect.width));
      onSeek(percent * duration);
    },
    [duration, onSeek]
  );

  const handleClick = (e: React.MouseEvent) => {
    seekFromEvent(e.clientX);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    const bar = barRef.current;
    if (!bar) return;
    bar.setPointerCapture(e.pointerId);
    seekFromEvent(e.clientX);

    const onMove = (ev: PointerEvent) => seekFromEvent(ev.clientX);
    const onUp = () => {
      bar.removeEventListener('pointermove', onMove);
      bar.removeEventListener('pointerup', onUp);
    };
    bar.addEventListener('pointermove', onMove);
    bar.addEventListener('pointerup', onUp);
  };

  const isLarge = size === 'large';

  return (
    <div
      ref={barRef}
      className={cn(
        'relative rounded-full cursor-pointer group',
        isLarge ? 'h-2 bg-parchment-100/20' : 'h-1 bg-parchment-100/20'
      )}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      role="slider"
      aria-label="Seek"
      aria-valuenow={currentTime}
      aria-valuemax={duration}
    >
      {/* Filled track */}
      <div
        className={cn(
          'absolute inset-y-0 left-0 rounded-full transition-[width] duration-75',
          isLarge
            ? 'bg-gradient-to-r from-secondary-500 to-accent-500'
            : 'bg-secondary-400'
        )}
        style={{ width: `${progress}%` }}
      />
      {/* Thumb */}
      <div
        className={cn(
          'absolute top-1/2 -translate-y-1/2 rounded-full bg-parchment-100 shadow-md transition-transform',
          isLarge
            ? 'w-5 h-5 border-2 border-secondary-400 group-hover:scale-110'
            : 'w-2.5 h-2.5 opacity-0 group-hover:opacity-100'
        )}
        style={{ left: `calc(${progress}% - ${isLarge ? 10 : 5}px)` }}
      />
    </div>
  );
}

/* ── Main Component ── */

export function StickyPlayer() {
  const {
    tracks,
    activeTrack,
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    pause,
    play,
    toggle,
    seek,
    setPlaybackRate,
  } = useAudio();

  const [fullScreen, setFullScreen] = useState(false);
  const dragRef = useRef<{ startY: number; currentY: number } | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  if (!activeTrack) return null;

  const skipBy = (seconds: number) => {
    seek(Math.max(0, Math.min(duration, currentTime + seconds)));
  };

  const otherTrack = tracks.find((t) => t.id !== activeTrack.id);

  /* ── Swipe-down-to-dismiss ── */
  const handleTouchStart = (e: React.TouchEvent) => {
    dragRef.current = { startY: e.touches[0].clientY, currentY: e.touches[0].clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragRef.current || !overlayRef.current) return;
    dragRef.current.currentY = e.touches[0].clientY;
    const dy = Math.max(0, dragRef.current.currentY - dragRef.current.startY);
    overlayRef.current.style.transform = `translateY(${dy}px)`;
    overlayRef.current.style.transition = 'none';
  };

  const handleTouchEnd = () => {
    if (!dragRef.current || !overlayRef.current) return;
    const dy = dragRef.current.currentY - dragRef.current.startY;
    overlayRef.current.style.transition = 'transform 0.3s ease-out';
    if (dy > 120) {
      overlayRef.current.style.transform = 'translateY(100%)';
      setTimeout(() => setFullScreen(false), 300);
    } else {
      overlayRef.current.style.transform = 'translateY(0)';
    }
    dragRef.current = null;
  };

  return (
    <>
      {/* ═══ MINI BAR ═══ */}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50 animate-slide-up-player',
          'bg-primary-800 text-parchment-100 shadow-2xl',
          fullScreen && 'pointer-events-none opacity-0'
        )}
      >
        <div className="flex items-center gap-2 px-3 py-2 max-w-5xl mx-auto h-[64px]">
          {/* Transport: Skip back / Play / Skip forward */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => skipBy(-15)}
              className="w-9 h-9 flex items-center justify-center rounded-full text-parchment-300 hover:text-parchment-100 active:bg-parchment-100/10 transition-colors"
              aria-label="Skip back 15 seconds"
            >
              <SkipBackIcon />
            </button>

            <button
              onClick={() => (isPlaying ? pause() : play(activeTrack.id))}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-parchment-100/10 hover:bg-parchment-100/20 active:bg-parchment-100/30 transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
            </button>

            <button
              onClick={() => skipBy(15)}
              className="w-9 h-9 flex items-center justify-center rounded-full text-parchment-300 hover:text-parchment-100 active:bg-parchment-100/10 transition-colors"
              aria-label="Skip forward 15 seconds"
            >
              <SkipForwardIcon />
            </button>
          </div>

          {/* Title + progress (tappable → open fullscreen) */}
          <button
            onClick={() => setFullScreen(true)}
            className="flex-1 min-w-0 text-left py-1"
            aria-label="Open full-screen player"
          >
            <p className="text-xs font-medium truncate">{activeTrack.title}</p>
            <div className="mt-1.5">
              <SeekBar currentTime={currentTime} duration={duration} onSeek={seek} size="small" />
            </div>
          </button>

          {/* Close */}
          <button
            onClick={pause}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-parchment-100/10 active:bg-parchment-100/20 transition-colors"
            aria-label="Close player"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="3" y1="3" x2="11" y2="11" />
              <line x1="11" y1="3" x2="3" y2="11" />
            </svg>
          </button>
        </div>
      </div>

      {/* ═══ FULL-SCREEN PLAYER ═══ */}
      {fullScreen && (
        <div className="fixed inset-0 z-[60]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 animate-fade-in"
            onClick={() => setFullScreen(false)}
          />

          {/* Player panel */}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-primary-800 text-parchment-100 flex flex-col"
            style={{ transition: 'transform 0.3s ease-out', transform: 'translateY(0)' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Collapse handle */}
            <div className="flex justify-center pt-3 pb-2">
              <button
                onClick={() => {
                  if (overlayRef.current) {
                    overlayRef.current.style.transition = 'transform 0.3s ease-out';
                    overlayRef.current.style.transform = 'translateY(100%)';
                    setTimeout(() => setFullScreen(false), 300);
                  }
                }}
                className="px-6 py-2"
                aria-label="Collapse player"
              >
                <div className="w-10 h-1 rounded-full bg-parchment-100/30" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-8 max-w-lg mx-auto w-full">
              {/* Decorative artwork area */}
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl bg-gradient-to-br from-secondary-600/40 via-primary-700/60 to-accent-700/30 flex items-center justify-center mb-8 shadow-lg">
                <div className="text-center">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto mb-2 text-parchment-100/30">
                    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="24" y1="4" x2="24" y2="16" stroke="currentColor" strokeWidth="1" />
                    <line x1="24" y1="32" x2="24" y2="44" stroke="currentColor" strokeWidth="1" />
                    <line x1="4" y1="24" x2="16" y2="24" stroke="currentColor" strokeWidth="1" />
                    <line x1="32" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="1" />
                  </svg>
                  <p className="text-[10px] text-parchment-100/20 uppercase tracking-[0.2em]">
                    {activeTrack.id === 'narration' ? 'Narration' : 'Podcast'}
                  </p>
                </div>
              </div>

              {/* Title & description */}
              <h2 className="font-display text-xl sm:text-2xl text-center mb-1">
                {activeTrack.title}
              </h2>
              <p className="text-sm text-parchment-400 text-center mb-8">
                {activeTrack.description}
              </p>

              {/* Seek bar (large) */}
              <div className="w-full mb-2">
                <SeekBar currentTime={currentTime} duration={duration} onSeek={seek} size="large" />
              </div>
              <div className="w-full flex justify-between text-xs text-parchment-400 font-mono mb-8">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              {/* Transport controls */}
              <div className="flex items-center justify-center gap-6 mb-8">
                <button
                  onClick={() => skipBy(-15)}
                  className="w-12 h-12 flex items-center justify-center rounded-full text-parchment-300 hover:text-parchment-100 active:bg-parchment-100/10 transition-colors"
                  aria-label="Skip back 15 seconds"
                >
                  <SkipBackIcon />
                </button>

                <button
                  onClick={() => (isPlaying ? pause() : play(activeTrack.id))}
                  className="w-14 h-14 flex items-center justify-center rounded-full bg-parchment-100 text-primary-800 hover:bg-parchment-200 active:bg-parchment-300 transition-colors shadow-lg"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <PauseIcon size={22} /> : <PlayIcon size={22} />}
                </button>

                <button
                  onClick={() => skipBy(15)}
                  className="w-12 h-12 flex items-center justify-center rounded-full text-parchment-300 hover:text-parchment-100 active:bg-parchment-100/10 transition-colors"
                  aria-label="Skip forward 15 seconds"
                >
                  <SkipForwardIcon />
                </button>
              </div>

              {/* Speed pills */}
              <div className="flex items-center gap-1.5 mb-6">
                {SPEED_OPTIONS.map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setPlaybackRate(speed)}
                    className={cn(
                      'text-xs font-mono px-3 py-1.5 rounded-full transition-colors',
                      speed === playbackRate
                        ? 'bg-secondary-500 text-white'
                        : 'text-parchment-400 hover:text-parchment-100 bg-parchment-100/5 hover:bg-parchment-100/10'
                    )}
                  >
                    {speed}x
                  </button>
                ))}
              </div>

              {/* Track switcher */}
              {otherTrack && (
                <button
                  onClick={() => toggle(otherTrack.id)}
                  className="text-sm text-parchment-300 hover:text-parchment-100 transition-colors border border-parchment-100/15 rounded-full px-5 py-2 hover:border-parchment-100/30 active:bg-parchment-100/5"
                >
                  Switch to: {otherTrack.title} →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
