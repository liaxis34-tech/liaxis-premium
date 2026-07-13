"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCartStore } from "@/lib/store";

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export default function CartDrawer() {
  const { items, isOpen, close, removeItem, setQuantity, subtotal } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-ink-deep/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col bg-white shadow-luxe"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between border-b border-blush-100 px-6 py-5">
              <h2 className="font-display text-2xl text-ink-deep">Your Bag</h2>
              <button
                aria-label="Close cart"
                onClick={close}
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-blush-50"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag size={32} strokeWidth={1} className="text-blush-400" />
                  <p className="mt-4 text-sm text-ink-soft">Your bag is empty.</p>
                  <p className="mt-1 text-sm text-ink-faint">Start building your story.</p>
                </div>
              ) : (
                <ul className="flex flex-col gap-6">
                  {items.map((item) => (
                    <li key={item.lineId} className="flex gap-4 border-b border-blush-100 pb-6">
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-blush-radial">
                        <ShoppingBag size={22} strokeWidth={1.2} className="text-blush-600" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-display text-lg text-ink-deep">{item.title}</p>
                          <button
                            aria-label="Remove item"
                            onClick={() => removeItem(item.lineId)}
                            className="text-ink-faint transition-colors hover:text-ink-deep"
                          >
                            <X size={14} strokeWidth={1.5} />
                          </button>
                        </div>
                        {item.charms.length > 0 && (
                          <p className="mt-1 text-xs text-ink-faint">
                            {item.charms.map((c) => c.name).join(" · ")}
                          </p>
                        )}
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-3 rounded-full border border-blush-200 px-2 py-1">
                            <button
                              aria-label="Decrease quantity"
                              onClick={() => setQuantity(item.lineId, item.quantity - 1)}
                              className="text-ink-soft transition-colors hover:text-ink-deep"
                            >
                              <Minus size={12} strokeWidth={1.5} />
                            </button>
                            <span className="w-4 text-center text-xs text-ink-deep">{item.quantity}</span>
                            <button
                              aria-label="Increase quantity"
                              onClick={() => setQuantity(item.lineId, item.quantity + 1)}
                              className="text-ink-soft transition-colors hover:text-ink-deep"
                            >
                              <Plus size={12} strokeWidth={1.5} />
                            </button>
                          </div>
                          <span className="font-display text-base text-ink-deep">
                            {formatPrice(item.unitPrice * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-blush-100 px-6 py-6">
                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="text-ink-soft">Subtotal</span>
                  <span className="font-display text-xl text-ink-deep">{formatPrice(subtotal())}</span>
                </div>
                <button className="w-full bg-ink-deep py-4 text-[11px] uppercase tracking-widest2 text-white transition-colors duration-500 hover:bg-gold-dark">
                  Checkout
                </button>
                <p className="mt-3 text-center text-[11px] text-ink-faint">
                  Shipping and taxes calculated at checkout.
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
