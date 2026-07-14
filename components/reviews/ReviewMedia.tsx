"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import type { ReviewMedia as ReviewMediaItem } from "@/lib/reviews";

interface ReviewMediaProps {
  media: ReviewMediaItem[];
  authorName: string;
}

/** Customer photo/video thumbnails for a review, with a click-to-enlarge lightbox. */
export default function ReviewMedia({ media, authorName }: ReviewMediaProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (media.length === 0) return null;

  const active = activeIndex !== null ? media[activeIndex] : null;

  return (
    <>
      <div className="mt-4 flex flex-wrap gap-2">
        {media.map((item, i) => (
          <button
            key={item.url + i}
            onClick={() => setActiveIndex(i)}
            aria-label={item.type === "video" ? "Play customer video" : "View customer photo"}
            className="group relative h-16 w-16 shrink-0 overflow-hidden rounded-[2px] bg-blush-100"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.thumbnailUrl ?? item.url}
              alt={`Photo from ${authorName}'s review`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {item.type === "video" && (
              <span className="absolute inset-0 flex items-center justify-center bg-ink-deep/25">
                <Play size={14} strokeWidth={1.5} fill="white" className="text-white" />
              </span>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink-deep/80 p-6"
            onClick={() => setActiveIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[85vh] w-full max-w-md overflow-hidden rounded-[2px] bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              {active.type === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={active.url} alt={`Photo from ${authorName}'s review`} className="max-h-[85vh] w-full object-contain" />
              ) : (
                <video src={active.url} controls autoPlay className="max-h-[85vh] w-full" poster={active.thumbnailUrl} />
              )}
              <button
                aria-label="Close"
                onClick={() => setActiveIndex(null)}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-deep"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
