"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, ShoppingBag } from "lucide-react";
import VariantSelector from "./VariantSelector";
import { useSelectionStore } from "@/lib/store";
import { goToAddToCart, goToBuyNow } from "@/lib/shopify";

export default function StickyBuyBar() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { color, size, selectedVariantId } = useSelectionStore();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.85);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-ivory/95 backdrop-blur-md shadow-[0_-10px_40px_-20px_rgba(26,23,18,0.35)] md:hidden"
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
                <div className="py-5">
                  <VariantSelector compact />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-3 px-4 py-3">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex flex-col items-start"
            >
              <span className="font-display text-base text-ink">₺1.890</span>
              <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest2 text-ink/50">
                {color} / {size}
                <ChevronUp
                  size={11}
                  strokeWidth={2}
                  className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                />
              </span>
            </button>

            <div className="ml-auto flex flex-1 gap-2">
              <button
                onClick={() => goToAddToCart(selectedVariantId())}
                aria-label="Sepete Ekle"
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center border border-ink text-ink"
              >
                <ShoppingBag size={16} strokeWidth={1.5} />
              </button>
              <button
                onClick={() => goToBuyNow(selectedVariantId())}
                className="flex-1 bg-ink px-4 text-[11px] uppercase tracking-widest2 text-ivory"
              >
                Hemen Satın Al
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
