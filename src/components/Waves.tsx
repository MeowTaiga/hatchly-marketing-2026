type WaveVariant = 1 | 2 | 3 | 4 | 5;

type WaveProps = {
  className?: string;
  fill: string;
  /** Which wave silhouette to use */
  variant?: WaveVariant;
  flip?: boolean;
};

/**
 * Irregular, personality-filled wave silhouettes.
 * Only the start/end Y match so tiles loop cleanly — the middle is freeform.
 * Filled region is the LOWER half of the viewBox; top stays transparent so the
 * previous section shows through when the seam overlays upward.
 */
const PATHS: Record<WaveVariant, string> = {
  // Chubby soft hills — lazy & round
  1: 'M0,90 C90,40 150,130 260,70 C340,30 390,145 500,95 C610,40 680,155 820,85 C940,30 1020,140 1140,100 C1240,65 1340,130 1440,90 L1440,200 L0,200 Z',
  // Spiky playful peaks — bouncy
  2: 'M0,100 C70,20 110,160 200,55 C270,10 310,170 420,90 C500,35 560,175 680,60 C760,15 820,165 940,110 C1040,55 1120,170 1240,75 C1320,30 1380,140 1440,100 L1440,200 L0,200 Z',
  // Long swoops with a surprise bump
  3: 'M0,80 C180,120 280,30 420,85 C520,120 580,25 700,70 C820,130 900,20 1040,90 C1160,145 1260,35 1440,80 L1440,200 L0,200 Z',
  // Lumpy gooey — uneven blob-wave
  4: 'M0,110 C60,70 100,150 180,95 C250,50 290,160 380,120 C470,75 520,20 620,100 C720,175 800,45 900,115 C1000,170 1080,40 1180,90 C1280,140 1360,60 1440,110 L1440,200 L0,200 Z',
  // Gentle rollers with one tall ear
  5: 'M0,95 C120,95 180,50 260,95 C340,140 400,95 500,95 C620,95 680,15 780,70 C860,110 920,160 1020,100 C1120,40 1220,130 1320,85 C1380,60 1410,95 1440,95 L1440,200 L0,200 Z',
};

/** Single full-width wave strip — animate the inner track horizontally for drift. */
export function WaveStrip({ className = '', fill, variant = 1, flip = false }: WaveProps) {
  return (
    <div
      className={`wave-strip ${flip ? 'is-flip' : ''} ${className}`}
      data-wave-layer
      aria-hidden="true"
    >
      <div className="wave-track" data-wave-track>
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path d={PATHS[variant]} fill={fill} />
        </svg>
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path d={PATHS[variant]} fill={fill} />
        </svg>
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path d={PATHS[variant]} fill={fill} />
        </svg>
      </div>
    </div>
  );
}

/** Stacked drifting waves — each layer a unique silhouette + height. */
export function HeroWaves() {
  return (
    <div className="hero-waves" aria-hidden="true">
      <WaveStrip className="hero-wave hero-wave-a" fill="rgba(255, 150, 196, 0.5)" variant={2} />
      <WaveStrip className="hero-wave hero-wave-b" fill="rgba(120, 196, 255, 0.55)" variant={4} />
      <WaveStrip className="hero-wave hero-wave-c" fill="rgba(90, 214, 180, 0.7)" variant={1} />
      <WaveStrip className="hero-wave hero-wave-d" fill="#ffe8c8" variant={5} />
      <WaveStrip className="hero-wave hero-wave-e" fill="#fff4e8" variant={3} />
    </div>
  );
}

/** Soft sky with layered drifting waves. */
export function HeroSky() {
  return (
    <div className="hero-sky" aria-hidden="true">
      <HeroWaves />
    </div>
  );
}

/**
 * Top seam for a colored section. Place as the first child of that section.
 * Hangs upward over the previous section so transparent SVG areas show the
 * section above — never a body-cream spacer band between siblings.
 */
export function SectionWave({
  fill,
  flip = false,
  variant = 4,
}: {
  fill: string;
  flip?: boolean;
  variant?: WaveVariant;
}) {
  return <WaveStrip className="panel-seam" fill={fill} flip={flip} variant={variant} />;
}

/** Soft white gooey bubbles for mid-page atmosphere. */
export function GooeyBubbles() {
  return (
    <div className="gooey-field" aria-hidden="true">
      <span className="goo goo-a" data-goo />
      <span className="goo goo-b" data-goo />
      <span className="goo goo-c" data-goo />
      <span className="goo goo-d" data-goo />
      <span className="goo goo-e" data-goo />
      <span className="goo goo-f" data-goo />
    </div>
  );
}
