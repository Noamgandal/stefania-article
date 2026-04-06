'use client';

import { useCallback, useState, useEffect } from 'react';

export function useAudioPersistence(trackId: string) {
  const key = `audio-progress-${trackId}`;

  const [savedTime, setSavedTime] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = parseFloat(stored);
      if (!isNaN(parsed)) {
        setSavedTime(parsed);
      }
    }
  }, [key]);

  const saveTime = useCallback(
    (time: number) => {
      localStorage.setItem(key, String(time));
      setSavedTime(time);
    },
    [key]
  );

  const clearTime = useCallback(() => {
    localStorage.removeItem(key);
    setSavedTime(0);
  }, [key]);

  return { savedTime, saveTime, clearTime };
}
