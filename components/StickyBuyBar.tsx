"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { ChevronUp, Flower2, Star, Gem, Moon } from "lucide-react";
import { useCharmoraStore } from "@/lib/store";
import { CHARMS, CharmId, MAX_CHARMS, formatPrice, goToBuyNow } from "@/lib/shopify";

const ICONS: Record<CharmId, typeof Flower2> = {
  flower: Flower2,
  star: Star,
  gem: Gem,
  moon: Moon,
};

export default function StickyBuyBar() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { charms, toggleCharm } = useCharmoraStore();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.85);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const full = charms.length >= MAX_CHARMS;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-cream/95 shadow-[0_-10px_40px_-20px_rgba(35,28,24,0.35)] backdrop-blur-md md:hidden"
        >
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden border-b border-ink/10 px-5"
              >
                <div className="flex items-center justify-center gap-3 py-5">
                  {CHARMS.map((charm) => {
                    const Icon = ICONS[charm.id];
                    const active = charms.includes(charm.id);
                    return (
                      <button
                        key={charm.id}
                        onClick={() => toggleCharm(charm.id)}
                        disabled={!active && full}
                        className={clsx(
                          "flex h-11 w-11 items-center justify-center rounded-full border transition-all",
                          active ? "border-gold bg-gold/10" : "border-ink/15",
                          !active && full && "cursor-not-allowed opacity-30"
                        )}
                        style={active ? { color: charm.color } : undefined}
                        aria-label={charm.name}
                      >
                        <Icon size={16} strokeWidth={1.25} />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-3 px-4 py-3">
            <button onClick={() => setExpanded((v) => !v)} className="flex flex-col items-start">
              <span className="font-display text-base text-ink">{formatPrice()}</span>
              <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest2 text-ink/50">
                {charms.length} charm{charms.length === 1 ? "" : "s"}
                <ChevronUp
                  size={11}
                  strokeWidth={2}
                  className={clsx("transition-transform duration-300", expanded && "rotate-180")}
                />
              </span>
            </button>

            <div className="ml-auto flex flex-1 gap-2">
              <button
                onClick={() => goToBuyNow(charms)}
                className="flex-1 bg-ink px-4 py-3.5 text-[11px] uppercase tracking-widest2 text-cream"
              >
                Buy Now
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
