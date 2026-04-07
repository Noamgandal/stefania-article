'use client';

import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';

interface Track {
  id: string;
  src: string;
  title: string;
  description: string;
}

interface AudioContextType {
  tracks: Track[];
  activeTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  play: (trackId: string) => void;
  pause: () => void;
  close: () => void;
  toggle: (trackId: string) => void;
  seek: (time: number) => void;
  setPlaybackRate: (rate: number) => void;
  getSavedTime: (trackId: string) => number;
}

const TRACKS: Track[] = [
  {
    id: 'narration',
    src: '/audio/narration.mp3',
    title: 'Listen to the Paper',
    description: 'AI-narrated reading of the full article',
  },
  {
    id: 'podcast',
    src: '/audio/podcast.m4a',
    title: 'Podcast Discussion',
    description: 'AI-generated podcast discussion about the paper',
  },
];

const AudioContext = createContext<AudioContextType | null>(null);

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return ctx;
}

function getStorageKey(trackId: string) {
  return `audio-progress-${trackId}`;
}

function getSavedTimeFromStorage(trackId: string): number {
  if (typeof window === 'undefined') return 0;
  const stored = localStorage.getItem(getStorageKey(trackId));
  if (stored) {
    const parsed = parseFloat(stored);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeTrack, setActiveTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRateState] = useState(1);
  const saveIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Create audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audioRef.current = audio;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      setIsPlaying(false);
      if (saveIntervalRef.current) {
        clearInterval(saveIntervalRef.current);
        saveIntervalRef.current = null;
      }
    };
    const onPause = () => setIsPlaying(false);
    const onPlay = () => setIsPlaying(true);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('durationchange', onDurationChange);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('play', onPlay);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('durationchange', onDurationChange);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('play', onPlay);
      audio.pause();
      if (saveIntervalRef.current) {
        clearInterval(saveIntervalRef.current);
      }
    };
  }, []);

  // Auto-save progress every 3 seconds while playing
  useEffect(() => {
    if (isPlaying && activeTrack) {
      saveIntervalRef.current = setInterval(() => {
        const audio = audioRef.current;
        if (audio && activeTrack) {
          localStorage.setItem(getStorageKey(activeTrack.id), String(audio.currentTime));
        }
      }, 3000);
    } else {
      if (saveIntervalRef.current) {
        clearInterval(saveIntervalRef.current);
        saveIntervalRef.current = null;
      }
    }
    return () => {
      if (saveIntervalRef.current) {
        clearInterval(saveIntervalRef.current);
        saveIntervalRef.current = null;
      }
    };
  }, [isPlaying, activeTrack]);

  const play = useCallback(
    (trackId: string) => {
      const audio = audioRef.current;
      if (!audio) return;

      const track = TRACKS.find((t) => t.id === trackId);
      if (!track) return;

      // If switching tracks, save current position first
      if (activeTrack && activeTrack.id !== trackId) {
        localStorage.setItem(getStorageKey(activeTrack.id), String(audio.currentTime));
        audio.src = track.src;
        const saved = getSavedTimeFromStorage(trackId);
        audio.currentTime = saved;
        setActiveTrack(track);
      } else if (!activeTrack) {
        audio.src = track.src;
        const saved = getSavedTimeFromStorage(trackId);
        audio.currentTime = saved;
        setActiveTrack(track);
      }

      audio.playbackRate = playbackRate;
      audio.play().catch(() => {
        // Autoplay may be blocked
      });
    },
    [activeTrack, playbackRate]
  );

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    if (activeTrack) {
      localStorage.setItem(getStorageKey(activeTrack.id), String(audio.currentTime));
    }
  }, [activeTrack]);

  const close = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (activeTrack) {
      localStorage.setItem(getStorageKey(activeTrack.id), String(audio.currentTime));
    }
    audio.pause();
    audio.src = '';
    setActiveTrack(null);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  }, [activeTrack]);

  const toggle = useCallback(
    (trackId: string) => {
      if (activeTrack?.id === trackId && isPlaying) {
        pause();
      } else {
        play(trackId);
      }
    },
    [activeTrack, isPlaying, pause, play]
  );

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  const setPlaybackRate = useCallback((rate: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.playbackRate = rate;
    }
    setPlaybackRateState(rate);
  }, []);

  const getSavedTime = useCallback((trackId: string) => {
    return getSavedTimeFromStorage(trackId);
  }, []);

  return (
    <AudioContext.Provider
      value={{
        tracks: TRACKS,
        activeTrack,
        isPlaying,
        currentTime,
        duration,
        playbackRate,
        play,
        pause,
        close,
        toggle,
        seek,
        setPlaybackRate,
        getSavedTime,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}
