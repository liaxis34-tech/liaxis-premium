"use client";

import { useState } from "react";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import Reveal from "./ui/Reveal";
import { Logo, Monogram } from "./Logo";

const LINK_COLUMNS = [
  {
    title: "Koleksiyon",
    links: ["Postür Toparlayıcı Sütyen", "Yeni Gelenler", "Çok Satanlar"],
  },
  {
    title: "Kurumsal",
    links: ["Hakkımızda", "Sürdürülebilirlik", "İletişim"],
  },
  {
    title: "Destek",
    links: ["Sıkça Sorulan Sorular", "Kargo &amp; Teslimat", "İade &amp; Değişim", "Beden Rehberi"],
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
    <footer className="relative bg-ink pb-28 pt-20 text-ivory md:pb-16 md:pt-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="flex flex-col items-start justify-between gap-10 border-b border-ivory/10 pb-16 md:flex-row md:items-center">
          <div>
            <h3 className="font-display text-3xl font-light md:text-4xl">
              Zarafete <span className="italic text-champagne-light">bir adım</span>
            </h3>
            <p className="mt-3 max-w-sm text-sm font-light text-ivory/60">
              Yeni koleksiyonlardan ve özel fırsatlardan ilk siz haberdar olun.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-md items-center gap-0 border-b border-ivory/30 pb-2 md:w-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              className="w-full min-w-0 flex-1 bg-transparent text-sm text-ivory placeholder:text-ivory/40 focus:outline-none"
            />
            <button
              type="submit"
              className="flex-shrink-0 text-[11px] uppercase tracking-widest2 text-champagne-light hover:text-ivory"
            >
              {submitted ? "Teşekkürler" : "Abone Ol"}
            </button>
          </form>
        </Reveal>

        <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <Monogram tone="light" className="h-8 w-8" />
              <Logo tone="ivory" className="text-3xl" />
            </div>
            <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-ivory/55">
              Duruşunuzu zarafetle destekleyen premium postür toparlayıcı sütyen
              koleksiyonu.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 text-ivory/70 transition-colors hover:border-champagne-light hover:text-champagne-light"
              >
                <Instagram size={15} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {LINK_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] uppercase tracking-widest2 text-champagne-light">
                {col.title}
              </h4>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm font-light text-ivory/60 transition-colors hover:text-ivory"
                      dangerouslySetInnerHTML={{ __html: link }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6 border-t border-ivory/10 pt-8 text-xs font-light text-ivory/40 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
            <span className="flex items-center gap-2">
              <Mail size={13} strokeWidth={1.5} />
              destek@theliaxis.com
            </span>
            <span className="flex items-center gap-2">
              <Phone size={13} strokeWidth={1.5} />
              0850 000 00 00
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={13} strokeWidth={1.5} />
              İstanbul, Türkiye
            </span>
          </div>
          <span>© {new Date().getFullYear()} LIAXIS. Tüm hakları saklıdır.</span>
        </div>
      </div>
    </footer>
  );
}
