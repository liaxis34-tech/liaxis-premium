"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useCharmoraStore } from "@/lib/store";

export default function CheckoutNotice() {
  const checkoutUnavailable = useCharmoraStore((s) => s.checkoutUnavailable);

  return (
    <AnimatePresence>
      {checkoutUnavailable && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-24 left-1/2 z-50 w-[calc(100%-3rem)] max-w-sm -translate-x-1/2 border border-gold/30 bg-ink px-5 py-4 text-center text-cream shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] md:bottom-8"
        >
          <p className="text-sm font-light">This style isn&rsquo;t open for checkout yet.</p>
          <a
            href="mailto:hello@charmora.com"
            className="mt-2 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest2 text-gold-light hover:text-cream"
          >
            <Mail size={12} strokeWidth={1.5} />
            hello@charmora.com
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
