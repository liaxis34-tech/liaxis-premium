"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCharmoraStore } from "@/lib/store";
import { CHARMS, PRODUCT_NAME, formatPrice, getCharm } from "@/lib/shopify";

export default function ReserveModal() {
  const { isReserveOpen, closeReserve, charms } = useCharmoraStore();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isReserveOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeReserve();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isReserveOpen, closeReserve]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  const handleClose = () => {
    closeReserve();
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
    }, 300);
  };

  return (
    <AnimatePresence>
      {isReserveOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 px-6 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md border border-gold/20 bg-cream p-8 text-center shadow-[0_40px_100px_-30px_rgba(35,28,24,0.5)] md:p-10"
          >
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute right-5 top-5 text-ink/40 transition-colors hover:text-ink"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            {!submitted ? (
              <>
                <span className="text-[11px] uppercase tracking-widest2 text-gold-dark">
                  {PRODUCT_NAME}
                </span>
                <h3 className="mt-4 font-display text-3xl font-light text-ink">
                  Reserve <span className="italic blush-text">yours</span>
                </h3>
                <p className="mx-auto mt-3 max-w-xs text-sm font-light leading-relaxed text-ink/60">
                  Charmora is preparing for launch. Leave your email and be the
                  first to bring your story to life —{" "}
                  <span className="text-ink/80">{formatPrice()}</span>.
                </p>

                {charms.length > 0 && (
                  <div className="mx-auto mt-5 flex max-w-xs flex-wrap items-center justify-center gap-2">
                    {charms.map((id) => {
                      const charm = getCharm(id);
                      return (
                        <span
                          key={id}
                          className="flex items-center gap-1.5 border border-ink/10 bg-white/50 px-3 py-1 text-[11px] uppercase tracking-wider text-ink/70"
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: charm.color }}
                          />
                          {charm.name}
                        </span>
                      );
                    })}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full border border-ink/15 bg-transparent px-4 py-3.5 text-center text-sm text-ink placeholder:text-ink/35 focus:border-gold focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-ink px-8 py-3.5 text-[11px] uppercase tracking-widest2 text-cream transition-colors hover:bg-gold-dark"
                  >
                    Notify Me
                  </button>
                </form>
                <p className="mt-4 text-[10px] uppercase tracking-widest2 text-ink/35">
                  All {CHARMS.length} charm meanings, one signature cuff
                </p>
              </>
            ) : (
              <div className="py-6">
                <h3 className="font-display text-3xl font-light text-ink">
                  You&rsquo;re on <span className="italic blush-text">the list</span>
                </h3>
                <p className="mx-auto mt-3 max-w-xs text-sm font-light leading-relaxed text-ink/60">
                  Thank you. We&rsquo;ll email you the moment Charmora is ready
                  to ship.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
