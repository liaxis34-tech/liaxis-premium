"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCartStore, useCharmBuilder } from "@/lib/store";

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

interface StickyAddToCartProps {
  productHandle: string;
  title: string;
  basePrice: number;
}

export default function StickyAddToCart({ productHandle, title, basePrice }: StickyAddToCartProps) {
  const [visible, setVisible] = useState(false);
  const { charms, totalPrice } = useCharmBuilder();
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const selectedCharms = charms();
  const price = totalPrice(basePrice);

  const handleAdd = () => {
    addItem({
      productHandle,
      title,
      unitPrice: price,
      quantity: 1,
      charms: selectedCharms.map((c) => ({ name: c.name, meaning: c.meaning })),
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-blush-200 bg-white/95 px-5 py-3.5 shadow-glass backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest2 text-ink-faint">{title}</p>
              <p className="font-display text-lg text-ink-deep">{formatPrice(price)}</p>
            </div>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 bg-ink-deep px-7 py-3 text-[11px] uppercase tracking-widest2 text-white transition-colors duration-500 hover:bg-gold-dark"
            >
              <ShoppingBag size={14} strokeWidth={1.5} />
              Add to Bag
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
