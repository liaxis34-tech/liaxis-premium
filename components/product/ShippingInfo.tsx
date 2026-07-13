"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import clsx from "clsx";

const SECTIONS = [
  {
    title: "Shipping",
    body: "Free shipping on US orders over $75. Standard orders ship within 1-2 business days and arrive in 3-5 business days. Each piece is made to order.",
  },
  {
    title: "Materials & Care",
    body: "14k gold-plated brass over a hypoallergenic base. Avoid water, perfume and lotion for the longest-lasting shine. Store in the included pouch.",
  },
  {
    title: "Returns & Exchanges",
    body: "30-day returns on unworn pieces in original packaging. Custom charm combinations are final sale.",
  },
];

export default function ShippingInfo() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col divide-y divide-blush-200 border-t border-blush-200">
      {SECTIONS.map((section, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={section.title}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-[11px] uppercase tracking-widest2 text-ink-deep">{section.title}</span>
              <Plus
                size={15}
                strokeWidth={1.4}
                className={clsx("text-gold-dark transition-transform duration-300", isOpen && "rotate-45")}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-4 text-sm font-light leading-relaxed text-ink-soft">{section.body}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
