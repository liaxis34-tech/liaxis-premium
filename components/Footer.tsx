"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Instagram } from "lucide-react";
import Logo from "./Logo";
import { SIGNATURE_PRODUCT_HANDLE } from "@/lib/mock-data";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "Build Your Charm", href: "/#build" },
      { label: "Signature Ear Cuff", href: `/product/${SIGNATURE_PRODUCT_HANDLE}` },
      { label: "All Jewelry", href: "/#showcase" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "/#story" },
      { label: "Reviews", href: "/#reviews" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping & Returns", href: "/#faq" },
      { label: "Track Order", href: "/#faq" },
      { label: "Contact Us", href: "mailto:hello@charmora.com" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Ready to wire to a Klaviyo / Shopify customer list endpoint.
    setSubmitted(true);
  };

  return (
    <footer className="bg-blush-radial pt-16 md:pt-20">
      {/* Newsletter band */}
      <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
        <span className="text-[11px] uppercase tracking-widest3 text-gold-dark">Join the Circle</span>
        <h2 className="mt-4 font-display text-3xl font-light text-ink-deep sm:text-4xl">
          New charms, styling edits and early access — first.
        </h2>

        {submitted ? (
          <p className="mt-8 text-sm text-blush-700">You&apos;re on the list. Welcome to Charmora.</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex w-full max-w-md items-center gap-3 border-b border-ink-deep/25 pb-3"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full bg-transparent text-center text-sm text-ink-deep placeholder:text-ink-faint focus:outline-none sm:text-left"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="flex shrink-0 items-center gap-1.5 text-[11px] uppercase tracking-widest2 text-blush-700 transition-colors hover:text-gold-dark"
            >
              Subscribe
              <ArrowRight size={13} strokeWidth={1.5} />
            </button>
          </form>
        )}
      </div>

      <div className="mx-auto mt-16 max-w-7xl border-t border-ink-deep/10 px-6 pt-14 md:mt-20 md:px-10 md:pt-16">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:gap-8">
          <div>
            <Logo showSubline />
            <p className="mt-5 max-w-xs text-sm font-light leading-relaxed text-ink-soft">
              Personalized fine jewelry for the moments, dreams and memories worth wearing.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://instagram.com/charmora"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Charmora on Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-blush-300 text-blush-700 transition-colors hover:border-gold hover:bg-white hover:text-gold-dark"
              >
                <Instagram size={15} strokeWidth={1.4} />
              </a>
              <a
                href="https://tiktok.com/@charmora"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Charmora on TikTok"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-blush-300 text-[11px] font-medium text-blush-700 transition-colors hover:border-gold hover:bg-white hover:text-gold-dark"
              >
                TT
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-[11px] uppercase tracking-widest2 text-ink-deep">{col.title}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-light text-ink-soft transition-colors hover:text-blush-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ink-deep/10 py-8 text-[11px] text-ink-faint md:flex-row">
          <p>&copy; {new Date().getFullYear()} Charmora. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-ink-soft">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-ink-soft">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
