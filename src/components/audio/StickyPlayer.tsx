'use client';

import { useState } from 'react';
import { useAudio } from '@/components/audio/AudioProvider';
import { cn } from '@/lib/utils';

const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5, 2];

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
      <polygon points="3,1 16,9 3,17" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
      <rect x="3" y="2" width="4" height="14" rx="1" />
      <rect x="11" y="2" width="4" height="14" rx="1" />
    </svg>
  );
}

function SkipIcon({ direction }: { direction: 'back' | 'forward' }) {
  const flip = direction === 'back' ? 'scale(-1,1)' : undefined;
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: flip }}>
      <path d="M10 3a7 7 0 1 1-6.3 4" />
      <polyline points="3,3 3,7.5 7.5,7.5" />
      <text x="7.5" y="13.5" fill="currentColor" stroke="none" fontSize="6" fontWeight="600" textAnchor="middle" fontFamily="system-ui">15</text>
    </svg>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('transition-transform duration-300', expanded ? 'rotate-180' : '')}
    >
      <polyline points="4,10 8,6 12,10" />
    </svg>
  );
}

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
  const [expanded, setExpanded] = useState(false);

  if (!activeTrack) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, x / rect.width));
    seek(percent * duration);
  };

  const handleSeekDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const bar = e.currentTarget;
    bar.setPointerCapture(e.pointerId);

    const onMove = (ev: PointerEvent) => {
      const rect = bar.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      const percent = Math.max(0, Math.min(1, x / rect.width));
      seek(percent * duration);
    };

    const onUp = () => {
      bar.removeEventListener('pointermove', onMove);
      bar.removeEventListener('pointerup', onUp);
    };

    bar.addEventListener('pointermove', onMove);
    bar.addEventListener('pointerup', onUp);
  };

  const skipBy = (seconds: number) => {
    seek(Math.max(0, Math.min(duration, currentTime + seconds)));
  };

  const otherTrack = tracks.find((t) => t.id !== activeTrack.id);

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 animate-slide-up-player',
        'bg-primary-800 text-parchment-100 shadow-2xl',
        'transition-all duration-300 ease-out'
      )}
    >
      {/* --- MINI BAR (always visible) --- */}
      <div className="flex items-center gap-3 px-4 py-2.5 max-w-5xl mx-auto h-[56px]">
        {/* Play/Pause */}
        <button
          onClick={() => (isPlaying ? pause() : play(activeTrack.id))}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-parchment-100/10 hover:bg-parchment-100/20 transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <rect x="2" y="1" width="3.5" height="12" rx="1" />
              <rect x="8.5" y="1" width="3.5" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <polygon points="2,1 13,7 2,13" />
            </svg>
          )}
        </button>

        {/* Track title + time */}
        <div className="flex-shrink-0 min-w-0">
          <p className="text-xs font-medium truncate max-w-[120px] sm:max-w-[200px]">
            {activeTrack.title}
          </p>
          <p className="text-[10px] text-parchment-400">
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>
        </div>

        {/* Clickable seek bar (mini) */}
        <div
          className="flex-1 min-w-0 group cursor-pointer py-2"
          onClick={(e) => {
            handleSeek(e);
            setExpanded(true);
          }}
          role="slider"
          aria-label="Seek"
          aria-valuenow={currentTime}
          aria-valuemax={duration}
        >
          <div className="relative h-1 rounded-full bg-parchment-100/20 group-hover:h-1.5 transition-all">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-secondary-400 group-hover:bg-secondary-300 transition-all"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-parchment-100 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              style={{ left: `calc(${progress}% - 5px)` }}
            />
          </div>
        </div>

        {/* Speed */}
        <button
          onClick={() => {
            const idx = SPEED_OPTIONS.indexOf(playbackRate);
            setPlaybackRate(SPEED_OPTIONS[(idx + 1) % SPEED_OPTIONS.length]);
          }}
          className="flex-shrink-0 text-xs font-mono px-2 py-1 rounded bg-parchment-100/10 hover:bg-parchment-100/20 transition-colors min-w-[3rem] text-center"
        >
          {playbackRate}x
        </button>

        {/* Expand / Close */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded hover:bg-parchment-100/10 transition-colors"
          aria-label={expanded ? 'Collapse player' : 'Expand player'}
        >
          <ChevronIcon expanded={expanded} />
        </button>

        <button
          onClick={pause}
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded hover:bg-parchment-100/10 transition-colors"
          aria-label="Close player"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5">
            <line x1="2" y1="2" x2="10" y2="10" />
            <line x1="10" y1="2" x2="2" y2="10" />
          </svg>
        </button>
      </div>

      {/* --- EXPANDED PANEL --- */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-out',
          expanded ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 pb-5 pt-1 max-w-5xl mx-auto space-y-4">
          {/* Big seek bar */}
          <div className="space-y-1.5">
            <div
              className="relative h-2 rounded-full bg-parchment-100/15 cursor-pointer group"
              onClick={handleSeek}
              onPointerDown={handleSeekDrag}
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-secondary-500 to-accent-500 transition-[width] duration-75"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-parchment-100 shadow-md border-2 border-secondary-400 transition-transform group-hover:scale-110"
                style={{ left: `calc(${progress}% - 8px)` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-parchment-400 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between">
            {/* Skip back / Play / Skip forward */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => skipBy(-15)}
                className="text-parchment-300 hover:text-parchment-100 transition-colors"
                aria-label="Skip back 15 seconds"
              >
                <SkipIcon direction="back" />
              </button>

              <button
                onClick={() => (isPlaying ? pause() : play(activeTrack.id))}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-parchment-100 text-primary-800 hover:bg-parchment-200 transition-colors shadow-sm"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>

              <button
                onClick={() => skipBy(15)}
                className="text-parchment-300 hover:text-parchment-100 transition-colors"
                aria-label="Skip forward 15 seconds"
              >
                <SkipIcon direction="forward" />
              </button>
            </div>

            {/* Track switcher */}
            {otherTrack && (
              <button
                onClick={() => toggle(otherTrack.id)}
                className="text-xs text-parchment-300 hover:text-parchment-100 transition-colors border border-parchment-100/15 rounded-full px-3 py-1.5 hover:border-parchment-100/30"
              >
                Switch to {otherTrack.title}
              </button>
            )}

            {/* Speed pills */}
            <div className="flex gap-1">
              {SPEED_OPTIONS.map((speed) => (
                <button
                  key={speed}
                  onClick={() => setPlaybackRate(speed)}
                  className={cn(
                    'text-[11px] font-mono px-2 py-1 rounded-full transition-colors',
                    speed === playbackRate
                      ? 'bg-secondary-500 text-white'
                      : 'text-parchment-400 hover:text-parchment-100 hover:bg-parchment-100/10'
                  )}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
