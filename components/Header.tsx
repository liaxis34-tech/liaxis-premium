"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { useCharmoraStore } from "@/lib/store";
import { goToBuyNow } from "@/lib/shopify";
import { Logo, Monogram } from "./Logo";

const LINKS = [
  { label: "The Cuff", href: "#reveal" },
  { label: "Charms", href: "#charms" },
  { label: "Meaning", href: "#meaning" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const charms = useCharmoraStore((s) => s.charms);

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
          ? "border-b border-ink/10 bg-cream/90 py-3 backdrop-blur-md"
          : "bg-transparent py-6"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Charmora home">
          <Monogram tone={scrolled ? "dark" : "light"} className="h-7 w-7" />
          <Logo tone={scrolled ? "ink" : "cream"} className="text-2xl transition-colors" />
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={clsx(
                "relative py-1 text-[11px] font-medium uppercase tracking-widest2 transition-colors hover:text-gold after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full",
                scrolled ? "text-ink/80" : "text-cream/90"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => goToBuyNow(charms)}
            className={clsx(
              "hidden items-center gap-2 border px-5 py-2.5 text-[11px] font-medium uppercase tracking-widest2 transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] md:inline-flex",
              scrolled
                ? "border-ink text-ink hover:bg-ink hover:text-cream"
                : "border-cream text-cream hover:bg-cream hover:text-ink"
            )}
          >
            Buy Now
          </button>

          <button
            aria-label="Menu"
            className={clsx("md:hidden", scrolled ? "text-ink" : "text-cream")}
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
            className="overflow-hidden border-t border-ink/10 bg-cream md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              <div className="flex items-center gap-2.5 border-b border-ink/5 pb-4">
                <Monogram tone="dark" className="h-6 w-6" />
                <Logo tone="ink" className="text-lg" />
              </div>
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-ink/5 py-3 text-sm uppercase tracking-widest2 text-ink/80"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  goToBuyNow(charms);
                }}
                className="mt-4 bg-ink py-3 text-xs uppercase tracking-widest2 text-cream"
              >
                Buy Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
