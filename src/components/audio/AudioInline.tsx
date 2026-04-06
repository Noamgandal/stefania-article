'use client';

import { useAudio } from '@/components/audio/AudioProvider';
import { cn } from '@/lib/utils';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function HeadphonesIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  );
}

function MicIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  );
}

export function AudioInline() {
  const { tracks, activeTrack, isPlaying, toggle, getSavedTime } = useAudio();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
      {tracks.map((track) => {
        const saved = getSavedTime(track.id);
        const isActive = activeTrack?.id === track.id && isPlaying;
        const Icon = track.id === 'narration' ? HeadphonesIcon : MicIcon;

        return (
          <button
            key={track.id}
            onClick={() => toggle(track.id)}
            className={cn(
              'flex items-start gap-3 rounded-xl p-4 text-left shadow-sm transition-all duration-200',
              'bg-parchment-50 border border-parchment-200 hover:shadow-md hover:border-secondary-300',
              isActive && 'ring-2 ring-secondary-500 border-secondary-400 bg-parchment-100'
            )}
          >
            <div
              className={cn(
                'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center',
                isActive ? 'bg-secondary-500 text-white' : 'bg-parchment-200 text-secondary-600'
              )}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-parchment-900">{track.title}</p>
              <p className="text-xs text-parchment-500 mt-0.5">{track.description}</p>
              {saved > 0 && !isActive && (
                <span className="inline-block mt-1.5 text-xs bg-accent-100 text-accent-700 rounded-full px-2 py-0.5">
                  Resume from {formatTime(saved)}
                </span>
              )}
              {isActive && (
                <span className="inline-block mt-1.5 text-xs text-secondary-600 font-medium">
                  Playing...
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
