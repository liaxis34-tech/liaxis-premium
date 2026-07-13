"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCartStore, useCharmBuilder } from "@/lib/store";
import { SIGNATURE_BASE_PRICE, SIGNATURE_PRODUCT_HANDLE } from "@/lib/mock-data";

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export default function StickyBuyBar() {
  const [visible, setVisible] = useState(false);
  const { charms, totalPrice } = useCharmBuilder();
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const selectedCharms = charms();
  const price = totalPrice(SIGNATURE_BASE_PRICE);

  const handleAdd = () => {
    addItem({
      productHandle: SIGNATURE_PRODUCT_HANDLE,
      title: "Signature Charm Ear Cuff",
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
          className="fixed inset-x-0 bottom-0 z-40 border-t border-blush-200 bg-white/95 px-5 py-3.5 shadow-glass backdrop-blur-md md:hidden"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest2 text-ink-faint">Signature Ear Cuff</p>
              <p className="font-display text-lg text-ink-deep">{formatPrice(price)}</p>
            </div>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 bg-ink-deep px-6 py-3 text-[11px] uppercase tracking-widest2 text-white transition-colors duration-500 hover:bg-gold-dark"
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
