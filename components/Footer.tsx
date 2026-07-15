"use client";

import { useState } from "react";
import { Instagram, Mail } from "lucide-react";
import Reveal from "./ui/Reveal";
import { Logo, Monogram } from "./Logo";

const LINK_COLUMNS = [
  {
    title: "The Cuffs",
    links: [
      { label: "Collection", href: "#collection" },
      { label: "Product Reveal", href: "#reveal" },
      { label: "Meaning", href: "#meaning" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Shipping & Returns", href: "#faq" },
      { label: "Care Guide", href: "#faq" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <footer className="relative bg-ink pb-28 pt-20 text-cream md:pb-16 md:pt-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="flex flex-col items-start justify-between gap-10 border-b border-cream/10 pb-16 md:flex-row md:items-center">
          <div>
            <h3 className="font-display text-3xl font-light md:text-4xl">
              Stay <span className="italic gold-text">close</span>
            </h3>
            <p className="mt-3 max-w-sm text-sm font-light text-cream/60">
              New charms and stories, delivered occasionally.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-md items-center gap-0 border-b border-cream/30 pb-2 md:w-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full min-w-0 flex-1 bg-transparent text-sm text-cream placeholder:text-cream/40 focus:outline-none"
            />
            <button
              type="submit"
              className="flex-shrink-0 text-[11px] uppercase tracking-widest2 text-gold-light transition-colors hover:text-cream"
            >
              {submitted ? "Thank you" : "Notify Me"}
            </button>
          </form>
        </Reveal>

        <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-4">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <Monogram tone="light" className="h-8 w-8" />
              <Logo tone="cream" className="text-3xl" />
            </div>
            <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-cream/55">
              Gold and silver ear cuffs, worn without a piercing. Six designs,
              each one a story you get to wear.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-all duration-300 hover:scale-110 hover:border-gold-light hover:text-gold-light"
              >
                <Instagram size={15} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {LINK_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] uppercase tracking-widest2 text-gold-light">
                {col.title}
              </h4>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm font-light text-cream/60 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6 border-t border-cream/10 pt-8 text-xs font-light text-cream/40 md:flex-row md:items-center md:justify-between">
          <span className="flex items-center gap-2">
            <Mail size={13} strokeWidth={1.5} />
            hello@charmora.com
          </span>
          <span>© {new Date().getFullYear()} Charmora. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
