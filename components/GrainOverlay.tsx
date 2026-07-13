export default function GrainOverlay({ opacity = 0.05 }: { opacity?: number }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full mix-blend-overlay"
      style={{ opacity }}
      aria-hidden
    >
      <filter id="charmora-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#charmora-grain)" />
    </svg>
  );
}
