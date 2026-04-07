'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
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

/* ── Zoomable Lightbox ── */

function Lightbox({
  src,
  alt,
  caption,
  figureNumber,
  onClose,
}: {
  src: string;
  alt: string;
  caption: string;
  figureNumber: number;
  onClose: () => void;
}) {
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const lastPan = useRef({ x: 0, y: 0 });
  const lastPinchDist = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const resetZoom = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  // Double-tap to zoom in/out
  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (scale > 1) {
        resetZoom();
      } else {
        // Zoom to 2.5x centered on click point
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const cx = e.clientX - rect.left - rect.width / 2;
          const cy = e.clientY - rect.top - rect.height / 2;
          setScale(2.5);
          setTranslate({ x: -cx * 1.5, y: -cy * 1.5 });
        } else {
          setScale(2.5);
        }
      }
    },
    [scale, resetZoom]
  );

  // Mouse wheel zoom
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.85 : 1.18;
      setScale((prev) => {
        const next = Math.max(0.5, Math.min(6, prev * delta));
        if (next <= 1) {
          setTranslate({ x: 0, y: 0 });
        }
        return next;
      });
    },
    []
  );

  // Mouse pan when zoomed
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (scale <= 1) return;
      e.preventDefault();
      setIsPanning(true);
      lastPan.current = { x: e.clientX, y: e.clientY };
    },
    [scale]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isPanning) return;
      const dx = e.clientX - lastPan.current.x;
      const dy = e.clientY - lastPan.current.y;
      lastPan.current = { x: e.clientX, y: e.clientY };
      setTranslate((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    },
    [isPanning]
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Touch: pinch-to-zoom + pan
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        // Pinch start
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        lastPinchDist.current = Math.sqrt(dx * dx + dy * dy);
      } else if (e.touches.length === 1 && scale > 1) {
        // Pan start
        setIsPanning(true);
        lastPan.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    },
    [scale]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 2) {
        // Pinch zoom
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (lastPinchDist.current > 0) {
          const ratio = dist / lastPinchDist.current;
          setScale((prev) => Math.max(0.5, Math.min(6, prev * ratio)));
        }
        lastPinchDist.current = dist;
      } else if (e.touches.length === 1 && isPanning) {
        // Pan
        const dx = e.touches[0].clientX - lastPan.current.x;
        const dy = e.touches[0].clientY - lastPan.current.y;
        lastPan.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        setTranslate((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      }
    },
    [isPanning]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length < 2) {
        lastPinchDist.current = 0;
      }
      if (e.touches.length === 0) {
        setIsPanning(false);
        if (scale <= 0.8) {
          onClose();
        } else if (scale < 1) {
          resetZoom();
        }
      }
    },
    [scale, onClose, resetZoom]
  );

  // Escape to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const isZoomed = scale > 1;

  return (
    <div
      className="fixed inset-0 z-[70] flex flex-col bg-black/90"
      onClick={isZoomed ? undefined : onClose}
      role="dialog"
      aria-label={`Figure ${figureNumber}: ${alt}`}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 text-white/80 shrink-0">
        <span className="text-sm font-medium">
          Figure {figureNumber}
        </span>
        <div className="flex items-center gap-3">
          {/* Zoom indicator */}
          {isZoomed && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetZoom();
              }}
              className="text-xs bg-white/10 px-2 py-1 rounded-full hover:bg-white/20 transition-colors"
            >
              {Math.round(scale * 100)}% — Reset
            </button>
          )}
          {/* Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round">
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Image area */}
      <div
        ref={containerRef}
        className={cn(
          'flex-1 flex items-center justify-center overflow-hidden select-none',
          isZoomed ? 'cursor-grab' : 'cursor-zoom-in',
          isPanning && 'cursor-grabbing'
        )}
        onDoubleClick={handleDoubleClick}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="transition-transform duration-150 ease-out"
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            transition: isPanning ? 'none' : undefined,
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={1800}
            height={1125}
            className="max-h-[80vh] max-w-[95vw] w-auto h-auto object-contain rounded select-none pointer-events-none"
            draggable={false}
            priority
          />
        </div>
      </div>

      {/* Caption bar */}
      <div className="shrink-0 px-4 py-3 text-center">
        <p className="text-white/60 text-xs leading-relaxed max-w-2xl mx-auto">
          <span className="text-white/80 font-medium">Figure {figureNumber}:</span>{' '}
          <span dangerouslySetInnerHTML={{ __html: caption }} />
        </p>
        {!isZoomed && (
          <p className="text-white/30 text-[10px] mt-1.5">
            Double-tap or scroll to zoom &middot; Pinch on mobile
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Main Component ── */

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
          role="button"
          tabIndex={0}
          className="relative cursor-zoom-in overflow-hidden rounded-lg w-full text-left group"
          onClick={() => {
            if (!imgError) setLightboxOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !imgError) setLightboxOpen(true);
          }}
          aria-label={`View Figure ${figureNumber} in full screen`}
        >
          {imgError ? (
            <div className="flex items-center justify-center bg-parchment-100 border border-parchment-200 rounded-lg aspect-[16/10] text-parchment-400">
              <div className="text-center p-6">
                <p className="text-lg font-semibold mb-1">Figure {figureNumber}</p>
                <p className="text-sm">{alt}</p>
              </div>
            </div>
          ) : (
            <>
              <Image
                src={src}
                alt={alt}
                width={1200}
                height={750}
                className="w-full h-auto rounded-lg"
                onError={() => setImgError(true)}
              />
              {/* Zoom icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity shadow-md">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </div>
              </div>
            </>
          )}
        </div>
        <figcaption className="mt-2.5 text-sm leading-relaxed text-parchment-600">
          <span className="font-semibold text-secondary-600">Figure {figureNumber}:</span>{' '}
          <span dangerouslySetInnerHTML={{ __html: caption }} />
        </figcaption>
      </figure>

      {lightboxOpen && (
        <Lightbox
          src={src}
          alt={alt}
          caption={caption}
          figureNumber={figureNumber}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
