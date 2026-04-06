'use client';

import { useAudio } from '@/components/audio/AudioProvider';
import { cn } from '@/lib/utils';

const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5, 2];

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function StickyPlayer() {
  const {
    activeTrack,
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    pause,
    play,
    seek,
    setPlaybackRate,
  } = useAudio();

  if (!activeTrack) return null;

  const handleSpeedCycle = () => {
    const currentIdx = SPEED_OPTIONS.indexOf(playbackRate);
    const nextIdx = (currentIdx + 1) % SPEED_OPTIONS.length;
    setPlaybackRate(SPEED_OPTIONS[nextIdx]);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value));
  };

  const handleClose = () => {
    pause();
  };

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 animate-slide-up-player',
        'bg-primary-800 text-parchment-100 shadow-2xl'
      )}
    >
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

        {/* Time & Title */}
        <div className="flex-shrink-0 min-w-0">
          <p className="text-xs font-medium truncate max-w-[120px] sm:max-w-[200px]">
            {activeTrack.title}
          </p>
          <p className="text-[10px] text-parchment-400">
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>
        </div>

        {/* Seek bar */}
        <div className="flex-1 min-w-0">
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-parchment-100/20 accent-secondary-500
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary-400
              [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-secondary-400 [&::-moz-range-thumb]:border-0"
          />
        </div>

        {/* Speed button */}
        <button
          onClick={handleSpeedCycle}
          className="flex-shrink-0 text-xs font-mono px-2 py-1 rounded bg-parchment-100/10 hover:bg-parchment-100/20 transition-colors min-w-[3rem] text-center"
          aria-label={`Playback speed: ${playbackRate}x`}
        >
          {playbackRate}x
        </button>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded hover:bg-parchment-100/10 transition-colors"
          aria-label="Close player"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5">
            <line x1="2" y1="2" x2="10" y2="10" />
            <line x1="10" y1="2" x2="2" y2="10" />
          </svg>
        </button>
      </div>
    </div>
  );
}
