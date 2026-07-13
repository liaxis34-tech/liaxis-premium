"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, Send } from "lucide-react";
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
    <footer className="relative overflow-hidden bg-blush-radial pb-8 pt-20 md:pt-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-14 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:gap-8">
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
                className="flex h-9 w-9 items-center justify-center rounded-full border border-blush-300 text-blush-700 transition-colors hover:bg-blush-100"
              >
                <Instagram size={15} strokeWidth={1.4} />
              </a>
              <a
                href="https://tiktok.com/@charmora"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Charmora on TikTok"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-blush-300 text-[11px] font-medium text-blush-700 transition-colors hover:bg-blush-100"
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

          <div>
            <h3 className="text-[11px] uppercase tracking-widest2 text-ink-deep">Stay in Touch</h3>
            <p className="mt-5 text-sm font-light text-ink-soft">
              New arrivals, charm stories and early access — straight to your inbox.
            </p>
            {submitted ? (
              <p className="mt-4 text-sm text-blush-700">You&apos;re on the list. Welcome to Charmora.</p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 flex items-center border-b border-ink-deep/25 pb-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full bg-transparent text-sm text-ink-deep placeholder:text-ink-faint focus:outline-none"
                />
                <button type="submit" aria-label="Subscribe" className="text-blush-700">
                  <Send size={16} strokeWidth={1.4} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ink-deep/10 pt-8 text-[11px] text-ink-faint md:flex-row">
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
