"use client";

import clsx from "clsx";

interface Petal {
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
}

const PETALS: Petal[] = [
  { top: "8%", left: "10%", size: 22, duration: 11, delay: 0, rotate: -18 },
  { top: "18%", left: "82%", size: 16, duration: 9, delay: 1.2, rotate: 24 },
  { top: "62%", left: "6%", size: 18, duration: 13, delay: 0.6, rotate: 12 },
  { top: "78%", left: "88%", size: 24, duration: 10, delay: 2, rotate: -30 },
  { top: "40%", left: "94%", size: 14, duration: 8, delay: 0.9, rotate: 8 },
  { top: "30%", left: "3%", size: 15, duration: 12, delay: 1.6, rotate: -10 },
];

function PetalShape({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C16 6 20 8 22 12C20 16 16 18 12 22C8 18 4 16 2 12C4 8 8 6 12 2Z"
        fill="url(#petal-gradient)"
        opacity="0.85"
      />
      <defs>
        <linearGradient id="petal-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F4E8E9" />
          <stop offset="100%" stopColor="#D9B6B8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Subtle drifting petals used as ambient set-dressing over hero/section backgrounds. */
export default function FloatingPetals({ className }: { className?: string }) {
  return (
    <div className={clsx("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {PETALS.map((p, i) => (
        <div
          key={i}
          className="absolute animate-drift"
          style={{
            top: p.top,
            left: p.left,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        >
          <PetalShape size={p.size} />
        </div>
      ))}
    </div>
  );
}
