"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import clsx from "clsx";
import { useSelectionStore } from "@/lib/store";
import { goToBuyNow } from "@/lib/shopify";
import { Logo, Monogram } from "./Logo";

const LINKS = [
  { label: "3D Deneyim", href: "#experience" },
  { label: "Avantajlar", href: "#benefits" },
  { label: "Kumaş", href: "#fabric" },
  { label: "Yorumlar", href: "#reviews" },
  { label: "S.S.S.", href: "#faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const selectedVariantId = useSelectionStore((s) => s.selectedVariantId);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-ivory/90 backdrop-blur-md border-b border-ink/10 py-3"
          : "bg-transparent py-6"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
        <a href="#top" className="flex items-center gap-2.5" aria-label="LIAXIS anasayfa">
          <Monogram tone={scrolled ? "dark" : "light"} className="h-7 w-7" />
          <Logo tone={scrolled ? "ink" : "ivory"} className="text-2xl transition-colors" />
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={clsx(
                "text-[11px] uppercase tracking-widest2 font-medium transition-colors hover:text-gold",
                scrolled ? "text-ink/80" : "text-ivory/90"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => goToBuyNow(selectedVariantId())}
            className={clsx(
              "hidden md:inline-flex items-center gap-2 border px-5 py-2.5 text-[11px] uppercase tracking-widest2 font-medium transition-colors",
              scrolled
                ? "border-ink text-ink hover:bg-ink hover:text-ivory"
                : "border-ivory text-ivory hover:bg-ivory hover:text-ink"
            )}
          >
            <ShoppingBag size={14} strokeWidth={1.5} />
            Satın Al
          </button>

          <button
            aria-label="Menü"
            className={clsx("md:hidden", scrolled ? "text-ink" : "text-ivory")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-ivory border-t border-ink/10"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              <div className="flex items-center gap-2.5 pb-4 border-b border-ink/5">
                <Monogram tone="dark" className="h-6 w-6" />
                <Logo tone="ink" className="text-lg" />
              </div>
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm uppercase tracking-widest2 text-ink/80 border-b border-ink/5"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  goToBuyNow(selectedVariantId());
                }}
                className="mt-4 bg-ink text-ivory py-3 text-xs uppercase tracking-widest2"
              >
                Hemen Satın Al
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
