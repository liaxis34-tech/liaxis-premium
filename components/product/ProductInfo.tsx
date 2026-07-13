"use client";

import { useState } from "react";
import { Check, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import clsx from "clsx";
import { CHARM_ICONS } from "../icons/CharmIcons";
import TrustBadges from "./TrustBadges";
import ShippingInfo from "./ShippingInfo";
import { CHARM_OPTIONS } from "@/lib/mock-data";
import { useCartStore, useCharmBuilder } from "@/lib/store";
import type { ReviewSummary } from "@/lib/reviews";

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

interface ProductInfoProps {
  productHandle: string;
  title: string;
  description: string;
  basePrice: number;
  compareAtPrice?: number;
  reviewSummary: ReviewSummary;
}

export default function ProductInfo({
  productHandle,
  title,
  description,
  basePrice,
  compareAtPrice,
  reviewSummary,
}: ProductInfoProps) {
  const { selected, toggleCharm, charms, totalPrice } = useCharmBuilder();
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);

  const selectedCharms = charms();
  const price = totalPrice(basePrice);

  const handleAdd = () => {
    addItem({
      productHandle,
      title,
      unitPrice: price,
      quantity,
      charms: selectedCharms.map((c) => ({ name: c.name, meaning: c.meaning })),
    });
  };

  return (
    <div>
      <span className="text-[11px] uppercase tracking-widest2 text-gold-dark">Charmora</span>
      <h1 className="mt-2 font-display text-4xl font-light text-ink-deep md:text-5xl">{title}</h1>

      {reviewSummary.count > 0 ? (
        <div className="mt-3 flex items-center gap-2">
          <div className="flex gap-0.5 text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} fill={i < Math.round(reviewSummary.averageRating) ? "currentColor" : "none"} strokeWidth={1.3} />
            ))}
          </div>
          <a href="#reviews" className="text-sm text-ink-soft underline-offset-2 hover:underline">
            {reviewSummary.count} reviews
          </a>
        </div>
      ) : (
        <a href="#reviews" className="mt-3 inline-block text-sm text-ink-soft underline-offset-2 hover:underline">
          Be the first to review
        </a>
      )}

      <div className="mt-5 flex items-baseline gap-3">
        <span className="font-display text-3xl text-ink-deep">{formatPrice(price)}</span>
        {compareAtPrice && (
          <span className="text-sm text-ink-faint line-through">{formatPrice(compareAtPrice)}</span>
        )}
      </div>

      <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-ink-soft">{description}</p>

      <div className="mt-8 border-t border-blush-200 pt-8">
        <p className="text-[11px] uppercase tracking-widest2 text-ink-deep">
          Choose Your Charms <span className="text-ink-faint">({selected.length}/4)</span>
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {CHARM_OPTIONS.map((charm) => {
            const Icon = CHARM_ICONS[charm.kind];
            const isSelected = selected.includes(charm.id);
            return (
              <button
                key={charm.id}
                onClick={() => toggleCharm(charm.id)}
                className={clsx(
                  "relative flex items-center gap-3 rounded-[2px] border p-3 text-left transition-all duration-300",
                  isSelected ? "border-blush-600 bg-blush-50" : "border-blush-200 hover:border-blush-400"
                )}
              >
                <Icon className="h-9 w-9 shrink-0" />
                <span className="flex-1">
                  <span className="block text-sm text-ink-deep">{charm.name}</span>
                  <span className="block text-[11px] text-ink-faint">+{formatPrice(charm.price)}</span>
                </span>
                {isSelected && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blush-600 text-white">
                    <Check size={11} strokeWidth={2} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex items-stretch gap-3">
        <div className="flex items-center gap-4 rounded-[2px] border border-blush-200 px-4">
          <button
            aria-label="Decrease quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="text-ink-soft transition-colors hover:text-ink-deep"
          >
            <Minus size={13} strokeWidth={1.5} />
          </button>
          <span className="w-4 text-center text-sm text-ink-deep">{quantity}</span>
          <button
            aria-label="Increase quantity"
            onClick={() => setQuantity((q) => q + 1)}
            className="text-ink-soft transition-colors hover:text-ink-deep"
          >
            <Plus size={13} strokeWidth={1.5} />
          </button>
        </div>
        <button
          onClick={handleAdd}
          className="flex flex-1 items-center justify-center gap-2 bg-ink-deep px-8 py-4 text-[11px] uppercase tracking-widest2 text-white transition-colors duration-500 hover:bg-gold-dark"
        >
          <ShoppingBag size={14} strokeWidth={1.5} />
          Add to Bag
        </button>
      </div>

      <div className="mt-8">
        <TrustBadges />
      </div>

      <div className="mt-2">
        <ShippingInfo />
      </div>
    </div>
  );
}
