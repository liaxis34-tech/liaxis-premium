"use client";

import { Flower2, Star, Gem, Moon } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";
import { CHARMS, CharmId } from "@/lib/shopify";

const ICONS: Record<CharmId, typeof Flower2> = {
  flower: Flower2,
  star: Star,
  gem: Gem,
  moon: Moon,
};

const NUMERALS = ["I", "II", "III", "IV"];

export default function CharmMeaning() {
  return (
    <section id="meaning" className="relative bg-cream-soft py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal className="mx-auto max-w-xl text-center">
          <SectionLabel>The Meaning</SectionLabel>
          <h2 className="mt-6 font-display text-4xl font-light text-ink md:text-5xl">
            A story behind <span className="italic text-gold-dark">every charm</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm font-light leading-relaxed text-ink/60">
            Each charm carries its own quiet symbolism — chosen by you, worn
            close, and never quite the same combination twice.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 divide-y divide-ink/10 border-y border-ink/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          {CHARMS.map((charm, i) => {
            const Icon = ICONS[charm.id];
            return (
              <Reveal key={charm.id} delay={i * 0.08} className="group px-6 py-10 md:px-10 md:py-14">
                <div className="flex items-start justify-between">
                  <span className="font-display text-sm text-ink/30">{NUMERALS[i]}</span>
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-full border transition-transform duration-500 group-hover:scale-105"
                    style={{ borderColor: `${charm.color}60`, color: charm.color }}
                  >
                    <Icon size={22} strokeWidth={1.25} />
                  </span>
                </div>
                <h3 className="mt-8 font-display text-3xl font-light text-ink md:text-4xl">
                  {charm.name}
                </h3>
                <span
                  className="mt-2 block text-[11px] uppercase tracking-widest2"
                  style={{ color: charm.color }}
                >
                  {charm.meaning}
                </span>
                <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-ink/55">
                  {charm.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
