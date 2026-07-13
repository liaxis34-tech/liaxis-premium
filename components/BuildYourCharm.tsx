"use client";

import Image from "next/image";
import { Check, ShoppingBag } from "lucide-react";
import clsx from "clsx";
import Reveal from "./ui/Reveal";
import SectionLabel from "./ui/SectionLabel";
import { CHARM_ICONS } from "./icons/CharmIcons";
import { CHARM_OPTIONS, SIGNATURE_BASE_PRICE, SIGNATURE_PRODUCT_HANDLE } from "@/lib/mock-data";
import { useCharmBuilder, useCartStore } from "@/lib/store";

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export default function BuildYourCharm() {
  const { selected, toggleCharm, charms, totalPrice } = useCharmBuilder();
  const addItem = useCartStore((s) => s.addItem);

  const selectedCharms = charms();
  const price = totalPrice(SIGNATURE_BASE_PRICE);

  const handleAddToBag = () => {
    addItem({
      productHandle: SIGNATURE_PRODUCT_HANDLE,
      title: "Signature Charm Ear Cuff",
      unitPrice: price,
      quantity: 1,
      charms: selectedCharms.map((c) => ({ name: c.name, meaning: c.meaning })),
    });
  };

  return (
    <section id="build" className="relative overflow-hidden bg-blush-50 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>Build Your Charm</SectionLabel>
          <h2 className="mt-6 font-display text-4xl font-light text-ink-deep md:text-5xl">
            Design a piece that is <span className="italic text-blush-700">only yours</span>
          </h2>
          <p className="mt-5 text-sm font-light leading-relaxed text-ink-soft md:text-base">
            Start with our signature ear cuff, then choose the charms that tell your story.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[2px] shadow-luxe">
              <Image
                src="/images/product-clean.webp"
                alt="Charmora signature charm ear cuff"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 24rem, 90vw"
              />
            </div>
            {selectedCharms.length > 0 && (
              <div className="mx-auto mt-4 flex max-w-sm flex-wrap justify-center gap-2">
                {selectedCharms.map((c) => (
                  <span
                    key={c.id}
                    className="rounded-full border border-blush-200 bg-white px-3 py-1 text-[10px] uppercase tracking-widest2 text-ink-soft"
                  >
                    {c.name}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-6 flex items-center justify-between rounded-[2px] border border-blush-200 bg-white px-6 py-5">
              <div>
                <p className="text-[11px] uppercase tracking-widest2 text-ink-faint">Your Combination</p>
                <p className="mt-1 font-display text-2xl text-ink-deep">{formatPrice(price)}</p>
              </div>
              <button
                onClick={handleAddToBag}
                disabled={selectedCharms.length === 0}
                className="flex items-center gap-2 bg-ink-deep px-6 py-3.5 text-[11px] uppercase tracking-widest2 text-white transition-colors duration-500 hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ShoppingBag size={14} strokeWidth={1.5} />
                Add to Bag
              </button>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {CHARM_OPTIONS.map((charm, i) => {
              const Icon = CHARM_ICONS[charm.kind];
              const isSelected = selected.includes(charm.id);
              return (
                <Reveal key={charm.id} delay={i * 0.08}>
                  <button
                    onClick={() => toggleCharm(charm.id)}
                    className={clsx(
                      "group relative flex w-full flex-col items-start rounded-[2px] border p-7 text-left transition-all duration-500",
                      isSelected
                        ? "border-blush-600 bg-white shadow-luxe"
                        : "border-blush-200 bg-white/60 hover:border-blush-400 hover:bg-white"
                    )}
                  >
                    <span
                      className={clsx(
                        "absolute right-5 top-5 flex h-6 w-6 items-center justify-center rounded-full border transition-colors duration-300",
                        isSelected ? "border-blush-600 bg-blush-600 text-white" : "border-blush-300 text-transparent"
                      )}
                    >
                      <Check size={12} strokeWidth={2} />
                    </span>
                    <Icon className="h-14 w-14 transition-transform duration-500 group-hover:-translate-y-1" />
                    <h3 className="mt-5 font-display text-xl text-ink-deep">{charm.name}</h3>
                    <span className="mt-1 text-[11px] uppercase tracking-widest2 text-gold-dark">
                      {charm.meaning}
                    </span>
                    <p className="mt-3 text-sm font-light leading-relaxed text-ink-soft">
                      {charm.description}
                    </p>
                    <span className="mt-4 font-display text-lg text-ink-deep">+{formatPrice(charm.price)}</span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
