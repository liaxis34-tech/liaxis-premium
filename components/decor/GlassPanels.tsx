"use client";

import clsx from "clsx";

interface Panel {
  top: string;
  left: string;
  width: number;
  height: number;
  rotate: number;
  delay: number;
}

const PANELS: Panel[] = [
  { top: "6%", left: "70%", width: 140, height: 180, rotate: -12, delay: 0 },
  { top: "58%", left: "4%", width: 120, height: 150, rotate: 8, delay: 1.4 },
  { top: "70%", left: "80%", width: 100, height: 130, rotate: -6, delay: 0.7 },
];

/** Translucent floating glass panels, echoing the brand's blush-glass moodboard. */
export default function GlassPanels({ className }: { className?: string }) {
  return (
    <div className={clsx("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {PANELS.map((p, i) => (
        <div
          key={i}
          className="glass-panel absolute animate-floatSlow rounded-[28px]"
          style={{
            top: p.top,
            left: p.left,
            width: p.width,
            height: p.height,
            transform: `rotate(${p.rotate}deg)`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
