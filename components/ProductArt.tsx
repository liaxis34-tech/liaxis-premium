import clsx from "clsx";
import { CHARM_ICONS, CharmKind } from "./icons/CharmIcons";

const ATTACH_POINTS: Record<number, { x: number; y: number }[]> = {
  1: [{ x: 200, y: 246 }],
  2: [
    { x: 150, y: 234 },
    { x: 250, y: 234 },
  ],
  3: [
    { x: 128, y: 206 },
    { x: 200, y: 246 },
    { x: 272, y: 206 },
  ],
  4: [
    { x: 118, y: 178 },
    { x: 168, y: 232 },
    { x: 232, y: 232 },
    { x: 282, y: 178 },
  ],
};

interface CharmCuffArtProps {
  charms: CharmKind[];
  className?: string;
  animated?: boolean;
}

/** The recurring illustrated hero product: a gold ear cuff with hanging charms. */
export default function CharmCuffArt({ charms, className, animated = true }: CharmCuffArtProps) {
  const points = ATTACH_POINTS[Math.min(charms.length, 4) as 1 | 2 | 3 | 4] ?? [];

  return (
    <svg viewBox="0 0 400 400" className={clsx("w-full", className)} aria-hidden>
      <defs>
        <linearGradient id="cuff-gold" x1="80" y1="60" x2="320" y2="260" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F7E9BE" />
          <stop offset="45%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#AC8A26" />
        </linearGradient>
        <radialGradient id="cuff-glow" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#F4E8E9" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F4E8E9" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="200" cy="190" r="170" fill="url(#cuff-glow)" />

      {/* ear cuff band */}
      <path
        d="M120 90 A 130 130 0 1 0 280 90"
        fill="none"
        stroke="url(#cuff-gold)"
        strokeWidth="7"
        strokeLinecap="round"
        className={animated ? "origin-center animate-[float_9s_ease-in-out_infinite]" : undefined}
      />
      <path
        d="M120 90 A 130 130 0 1 0 280 90"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* link chains + charms */}
      {points.map((pt, i) => {
        const Icon = CHARM_ICONS[charms[i]];
        return (
          <g
            key={i}
            className={animated ? "animate-float" : undefined}
            style={animated ? { animationDelay: `${i * 0.6}s`, transformOrigin: `${pt.x}px ${pt.y}px` } : undefined}
          >
            <line x1={pt.x} y1={pt.y - 20} x2={pt.x} y2={pt.y} stroke="#D4AF37" strokeWidth="1.5" opacity="0.7" />
            <circle cx={pt.x} cy={pt.y - 20} r="2.5" fill="none" stroke="#D4AF37" strokeWidth="1.2" />
            <Icon x={pt.x - 20} y={pt.y} width="40" height="40" />
          </g>
        );
      })}
    </svg>
  );
}
