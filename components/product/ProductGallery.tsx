"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import clsx from "clsx";
import CharmCuffArt from "../ProductArt";
import VideoBlock from "../VideoBlock";
import { CharmKind } from "../icons/CharmIcons";

type Slide =
  | { type: "art"; charms: CharmKind[] }
  | { type: "image"; src: string; alt: string }
  | { type: "video" };

interface ProductGalleryProps {
  charms: CharmKind[];
}

export default function ProductGallery({ charms }: ProductGalleryProps) {
  const slides: Slide[] = [
    { type: "art", charms },
    { type: "image", src: "/images/atmosphere-bg.jpg", alt: "Charmora styled with soft light and petals" },
    { type: "art", charms: charms.slice(0, 2) },
    { type: "video" },
  ];

  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const slide = slides[active];

  return (
    <div>
      <div
        className="group relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-[2px] bg-blush-50"
        onClick={() => slide.type !== "video" && setZoomed(true)}
      >
        {slide.type === "art" && (
          <div className="flex h-full w-full items-center justify-center p-10">
            <CharmCuffArt charms={slide.charms} />
          </div>
        )}
        {slide.type === "image" && (
          <Image src={slide.src} alt={slide.alt} fill className="object-cover" />
        )}
        {slide.type === "video" && <VideoBlock className="h-full w-full" label="Behind the Design" />}

        {slide.type !== "video" && (
          <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-ink-deep opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <ZoomIn size={15} strokeWidth={1.5} />
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={clsx(
              "flex aspect-square items-center justify-center overflow-hidden rounded-[2px] border bg-blush-50 transition-colors",
              active === i ? "border-blush-600" : "border-transparent hover:border-blush-300"
            )}
          >
            {s.type === "art" && <CharmCuffArt charms={s.charms} animated={false} className="w-3/4 p-2" />}
            {s.type === "image" && (
              <Image src={s.src} alt="" width={120} height={120} className="h-full w-full object-cover" />
            )}
            {s.type === "video" && <VideoBlock className="h-full w-full" label="" />}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {zoomed && slide.type !== "video" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink-deep/70 p-6"
            onClick={() => setZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-[2px] bg-white p-10"
              onClick={(e) => e.stopPropagation()}
            >
              {slide.type === "art" && <CharmCuffArt charms={slide.charms} />}
              {slide.type === "image" && (
                <div className="relative aspect-square w-full">
                  <Image src={slide.src} alt={slide.alt} fill className="object-cover" />
                </div>
              )}
              <button
                aria-label="Close zoom"
                onClick={() => setZoomed(false)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-blush-50 text-ink-deep"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
