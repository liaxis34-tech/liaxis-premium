"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import clsx from "clsx";
import VideoBlock from "../VideoBlock";

type Slide = { type: "image"; src: string; alt: string } | { type: "video" };

interface ProductGalleryProps {
  images: { src: string; alt: string }[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const slides: Slide[] = [
    ...images.map((img) => ({ type: "image" as const, ...img })),
    { type: "video" },
  ];

  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const slide = slides[active];

  return (
    <div>
      <div
        className="group relative aspect-[3/4] w-full cursor-zoom-in overflow-hidden rounded-[2px] bg-blush-50"
        onClick={() => slide.type !== "video" && setZoomed(true)}
      >
        {slide.type === "image" && (
          <Image src={slide.src} alt={slide.alt} fill priority className="object-cover" />
        )}
        {slide.type === "video" && <VideoBlock className="h-full w-full" label="Behind the Design" />}

        {slide.type !== "video" && (
          <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-ink-deep opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <ZoomIn size={15} strokeWidth={1.5} />
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-5 gap-3">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={clsx(
              "relative aspect-square overflow-hidden rounded-[2px] border bg-blush-50 transition-colors",
              active === i ? "border-blush-600" : "border-transparent hover:border-blush-300"
            )}
          >
            {s.type === "image" && <Image src={s.src} alt="" fill className="object-cover" />}
            {s.type === "video" && <VideoBlock className="h-full w-full" label="" />}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {zoomed && slide.type === "image" && (
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
              className="relative max-h-[85vh] w-full max-w-lg overflow-hidden rounded-[2px] bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[3/4] w-full">
                <Image src={slide.src} alt={slide.alt} fill className="object-cover" />
              </div>
              <button
                aria-label="Close zoom"
                onClick={() => setZoomed(false)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-deep"
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
