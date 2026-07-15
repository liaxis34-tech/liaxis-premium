"use client";

import Image from "next/image";
import clsx from "clsx";
import { Check } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";
import { useCharmoraStore } from "@/lib/store";
import { PRODUCTS, formatPrice } from "@/lib/shopify";

export default function Collection() {
  const { activeProductId, setActiveProduct } = useCharmoraStore();

  const handleSelect = (id: string) => {
    setActiveProduct(id);
    document.querySelector("#reveal")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="collection" className="relative bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="mx-auto max-w-xl text-center">
          <SectionLabel>The Collection</SectionLabel>
          <h2 className="mt-6 font-display text-4xl font-light text-ink md:text-5xl">
            Six cuffs. <span className="italic gold-text">One signature.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm font-light leading-relaxed text-ink/60">
            Each ear cuff is designed to be worn alone — no piercing required.
            Choose the one that tells your story.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {PRODUCTS.map((product, i) => {
            const active = product.id === activeProductId;
            return (
              <Reveal key={product.id} delay={(i % 3) * 0.08}>
                <button
                  onClick={() => handleSelect(product.id)}
                  className={clsx(
                    "group relative block w-full overflow-hidden border text-left transition-all duration-300",
                    active ? "border-gold" : "border-ink/10 hover:border-ink/30"
                  )}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-cream-soft">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {active && (
                      <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-gold text-ink">
                        <Check size={14} strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <div className="flex items-start justify-between gap-2 p-4">
                    <div>
                      <h3 className="font-display text-base font-light text-ink md:text-lg">
                        {product.name}
                      </h3>
                      <span className="mt-1 block text-[10px] uppercase tracking-widest2 text-ink/40">
                        {product.metal === "gold" ? "Gold Vermeil" : "Sterling Silver"}
                        {product.hasCharmBuilder ? " · Customizable" : ""}
                      </span>
                    </div>
                    <span className="flex-shrink-0 text-sm text-ink/70">
                      {formatPrice(product.price, product.currency)}
                    </span>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
