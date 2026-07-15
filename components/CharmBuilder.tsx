"use client";

import Image from "next/image";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Check, Flower2, Star, Gem, Moon } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";
import { useCharmoraStore } from "@/lib/store";
import { CHARMS, CharmId, MAX_CHARMS, getCharm, getProduct } from "@/lib/shopify";

const ICONS: Record<CharmId, typeof Flower2> = {
  flower: Flower2,
  star: Star,
  gem: Gem,
  moon: Moon,
};

export default function CharmBuilder() {
  const { activeProductId, charms, toggleCharm, buyActiveProduct } = useCharmoraStore();
  const full = charms.length >= MAX_CHARMS;

  if (!getProduct(activeProductId).hasCharmBuilder) return null;

  return (
    <section id="charms" className="relative bg-ink py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="mx-auto max-w-xl text-center">
          <SectionLabel>Choose Your Charms</SectionLabel>
          <h2 className="mt-6 font-display text-4xl font-light text-cream md:text-5xl">
            Build <span className="italic gold-text">your combination</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm font-light leading-relaxed text-cream/60">
            Your cuff holds up to {MAX_CHARMS} charms at once. Choose the ones
            that tell your story — swap them any time.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-sm">
            <div className="relative aspect-square overflow-hidden rounded-full border border-cream/10 bg-gradient-to-b from-cream/[0.06] to-transparent">
              <Image
                src="/images/product-studio.webp"
                alt="Charmora Signature Ear Cuff preview"
                fill
                sizes="(max-width: 1024px) 80vw, 420px"
                className="object-contain p-10"
              />
            </div>

            <div className="mt-8 flex items-center justify-center gap-4">
              {Array.from({ length: MAX_CHARMS }).map((_, i) => {
                const id = charms[i];
                const charm = id ? getCharm(id) : null;
                const Icon = id ? ICONS[id] : null;
                return (
                  <motion.div
                    key={i}
                    initial={false}
                    animate={{ scale: charm ? 1 : 0.9, opacity: charm ? 1 : 0.4 }}
                    className={clsx(
                      "flex h-14 w-14 items-center justify-center rounded-full border",
                      charm ? "border-gold bg-cream/5" : "border-dashed border-cream/25"
                    )}
                    style={charm ? { boxShadow: `0 0 0 1px ${charm.color}40 inset` } : undefined}
                  >
                    {Icon ? (
                      <Icon size={20} strokeWidth={1.25} style={{ color: charm!.color }} />
                    ) : (
                      <span className="text-[10px] uppercase tracking-widest2 text-cream/25">
                        {i + 1}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
            <p className="mt-5 text-center text-[11px] uppercase tracking-widest2 text-cream/40">
              {charms.length} / {MAX_CHARMS} charms selected
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CHARMS.map((charm, i) => {
              const Icon = ICONS[charm.id];
              const active = charms.includes(charm.id);
              const disabled = !active && full;
              return (
                <Reveal key={charm.id} delay={i * 0.06}>
                  <button
                    onClick={() => toggleCharm(charm.id)}
                    disabled={disabled}
                    className={clsx(
                      "group flex w-full items-start gap-4 border p-5 text-left transition-all duration-300",
                      !disabled && "hover:-translate-y-0.5",
                      active
                        ? "border-gold bg-cream/[0.06]"
                        : "border-cream/15 hover:border-cream/35",
                      disabled && "cursor-not-allowed opacity-40"
                    )}
                  >
                    <span
                      className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border"
                      style={{ borderColor: `${charm.color}80`, color: charm.color }}
                    >
                      <Icon size={18} strokeWidth={1.25} />
                    </span>
                    <span className="flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-display text-lg font-light text-cream">
                          {charm.name}
                        </span>
                        <span
                          className={clsx(
                            "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border transition-colors",
                            active ? "border-gold bg-gold text-ink" : "border-cream/25 text-transparent"
                          )}
                        >
                          <Check size={12} strokeWidth={3} />
                        </span>
                      </span>
                      <span className="mt-1 block text-[11px] uppercase tracking-widest2 text-gold-light/80">
                        {charm.meaning}
                      </span>
                      <span className="mt-2 block text-sm font-light leading-relaxed text-cream/50">
                        {charm.description}
                      </span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.2} className="mt-14 flex justify-center">
          <button
            onClick={buyActiveProduct}
            disabled={charms.length === 0}
            className="border border-cream bg-cream px-10 py-4 text-[11px] uppercase tracking-widest2 text-ink transition-all duration-300 hover:scale-[1.03] hover:bg-transparent hover:text-cream active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
          >
            Add to Bag
          </button>
        </Reveal>
      </div>
    </section>
  );
}
