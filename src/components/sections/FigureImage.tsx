'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface FigureImageProps {
  src: string;
  alt: string;
  caption: string;
  figureNumber: number;
  layout?: 'inline' | 'outset' | 'full';
}

const layoutClasses = {
  inline: 'max-w-[42rem] mx-auto',
  outset: 'max-w-[56rem] mx-auto',
  full: 'w-full',
} as const;

export function FigureImage({
  src,
  alt,
  caption,
  figureNumber,
  layout = 'inline',
}: FigureImageProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <>
      <figure className={cn('my-8', layoutClasses[layout])}>
        <div
          className="relative cursor-zoom-in overflow-hidden rounded-lg"
          onClick={() => !imgError && setLightboxOpen(true)}
        >
          {imgError ? (
            <div className="flex items-center justify-center bg-parchment-100 border border-parchment-200 rounded-lg aspect-[16/10] text-parchment-400">
              <div className="text-center p-6">
                <p className="text-lg font-semibold mb-1">Figure {figureNumber}</p>
                <p className="text-sm">{alt}</p>
              </div>
            </div>
          ) : (
            <Image
              src={src}
              alt={alt}
              width={1200}
              height={750}
              className="w-full h-auto rounded-lg"
              onError={() => setImgError(true)}
            />
          )}
        </div>
        <figcaption className="mt-2.5 text-sm leading-relaxed text-parchment-600">
          <span className="font-semibold text-secondary-600">Figure {figureNumber}:</span>{' '}
          <span dangerouslySetInnerHTML={{ __html: caption }} />
        </figcaption>
      </figure>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 cursor-zoom-out"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-label={`Enlarged view of Figure ${figureNumber}`}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
          </button>
          <Image
            src={src}
            alt={alt}
            width={1800}
            height={1125}
            className="max-h-[90vh] max-w-[90vw] w-auto h-auto object-contain rounded"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
