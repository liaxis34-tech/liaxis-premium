"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import clsx from "clsx";

interface VideoBlockProps {
  src?: string;
  label?: string;
  className?: string;
}

/**
 * Reusable video slot for gallery / product media. Renders a real <video>
 * once `src` is provided (e.g. from Shopify's `product.media`); until then
 * it shows an on-brand poster so the layout never depends on a stock clip.
 */
export default function VideoBlock({ src, label = "Watch the Story", className }: VideoBlockProps) {
  const [playing, setPlaying] = useState(false);

  if (src) {
    return (
      <div className={clsx("relative overflow-hidden", className)}>
        <video
          src={src}
          controls={playing}
          onPlay={() => setPlaying(true)}
          className="h-full w-full object-cover"
          poster="/images/atmosphere-bg.jpg"
        />
      </div>
    );
  }

  return (
    <div className={clsx("group relative flex items-end overflow-hidden bg-gold-sheen bg-[length:200%_auto] p-6", className)}>
      <div className="absolute inset-0 bg-ink-deep/20 transition-colors duration-500 group-hover:bg-ink-deep/10" />
      <div className="relative z-10 flex w-full items-center justify-between">
        <span className="text-xs uppercase tracking-widest2 text-white">{label}</span>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink-deep transition-transform duration-500 group-hover:scale-110">
          <Play size={16} strokeWidth={1.5} fill="currentColor" />
        </span>
      </div>
    </div>
  );
}
