'use client';

import Image from 'next/image';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-secondary-50/40 to-background"
    >
      <div className="text-center max-w-3xl mx-auto">
        {/* Decorative top line */}
        <div className="mx-auto mb-8 h-px w-24 bg-accent-500/60" />

        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-primary-700 animate-title-reveal">
          Obesity and the Politics of Taddeo di Bartolo&rsquo;s Inferno
        </h1>

        <p className="mt-6 font-serif text-xl md:text-2xl text-foreground/70 stagger-1 animate-fade-in-up">
          Stefania Roccas Gandal
        </p>

        {/* Affiliation with TAU logo */}
        <div className="mt-3 flex items-center justify-center gap-2.5 stagger-2 animate-fade-in-up">
          <Image
            src="/images/tau-logo.png"
            alt="Tel Aviv University"
            width={28}
            height={15}
            className="opacity-40"
          />
          <span className="font-serif text-sm md:text-base text-foreground/40">
            Department of Art History, Tel Aviv University
          </span>
        </div>

        {/* Decorative middle line */}
        <div className="mx-auto my-6 h-px w-12 bg-accent-500/30" />

        {/* Publication info */}
        <p className="font-serif text-base md:text-lg text-foreground/50 stagger-3 animate-fade-in-up">
          Published in{' '}
          <a
            href="https://doi.org/10.1111/rest.70030"
            target="_blank"
            rel="noopener noreferrer"
            className="italic text-secondary-600/70 hover:text-secondary-600 transition-colors duration-200 underline decoration-secondary-600/20 hover:decoration-secondary-600/50 underline-offset-2"
          >
            Renaissance Studies
          </a>
          <span className="mx-2 text-foreground/20">·</span>
          <span>16 March 2026</span>
        </p>

        {/* Read original link */}
        <a
          href="https://doi.org/10.1111/rest.70030"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-5 font-serif text-sm text-secondary-600/60 hover:text-secondary-600 transition-colors duration-200 stagger-4 animate-fade-in-up group"
        >
          Read original paper
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            <path
              d="M6 3l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        {/* Decorative bottom line */}
        <div className="mx-auto mt-8 h-px w-16 bg-accent-500/40" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/30 stagger-3 animate-fade-in-up">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="animate-bounce"
          aria-hidden="true"
        >
          <path
            d="M10 4v10m0 0l-4-4m4 4l4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
