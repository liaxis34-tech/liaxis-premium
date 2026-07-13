"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import clsx from "clsx";
import Logo from "./Logo";
import CartDrawer from "./CartDrawer";
import { useCartStore } from "@/lib/store";
import { SIGNATURE_PRODUCT_HANDLE } from "@/lib/mock-data";

const NAV_LINKS = [
  { label: "Our Story", href: "/#story" },
  { label: "Build Your Charm", href: "/#build" },
  { label: "Shop", href: `/product/${SIGNATURE_PRODUCT_HANDLE}` },
  { label: "Reviews", href: "/#reviews" },
  { label: "FAQ", href: "/#faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalQuantity, open } = useCartStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "bg-white/90 shadow-glass backdrop-blur-md" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <Link href="/" aria-label="Charmora home">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[11px] uppercase tracking-widest2 text-ink-soft transition-colors duration-300 hover:text-blush-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              aria-label="Open cart"
              onClick={open}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-blush-50"
            >
              <ShoppingBag size={19} strokeWidth={1.4} />
              {totalQuantity() > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-medium text-white">
                  {totalQuantity()}
                </span>
              )}
            </button>
            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-blush-50 lg:hidden"
            >
              <Menu size={20} strokeWidth={1.4} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-white px-6 py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-blush-50"
              >
                <X size={20} strokeWidth={1.4} />
              </button>
            </div>
            <nav className="mt-16 flex flex-col gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-3xl text-ink-deep"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer />
    </>
  );
}
