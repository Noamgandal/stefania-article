'use client';

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
          Weaponizing Obese Sinners in Medieval Hell
        </h1>

        <p className="mt-6 font-serif text-xl md:text-2xl text-foreground/70 stagger-1 animate-fade-in-up">
          Taddeo di Bartolo&rsquo;s Last Judgment in San Gimignano&rsquo;s
          Collegiata
        </p>

        <p className="mt-4 font-serif text-lg text-foreground/50 stagger-2 animate-fade-in-up">
          Stefania Gandal
        </p>

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
