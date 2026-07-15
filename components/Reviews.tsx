"use client";

import { Star } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";

// Loox integration point: Loox's widget script mounts its review summary +
// list into #loox-reviews-default below (see https://loox.io for the embed
// snippet). Until the first reviews come in, this renders the empty state.
export default function Reviews() {
  return (
    <section id="reviews" className="relative bg-cream-soft py-24 md:py-36">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <Reveal className="text-center">
          <SectionLabel>Reviews</SectionLabel>
          <h2 className="mt-6 font-display text-4xl font-light text-ink md:text-5xl">
            Loved, <span className="italic text-gold-dark">one story at a time</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <div
            id="loox-reviews-default"
            className="loox-reviews-default flex flex-col items-center gap-5 border border-gold/15 bg-cream/60 px-8 py-16 text-center"
          >
            <div className="flex gap-1 text-gold/40">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={20} strokeWidth={1.25} />
              ))}
            </div>
            <p className="font-display text-xl font-light text-ink">
              Be the first to share your story
            </p>
            <p className="max-w-sm text-sm font-light leading-relaxed text-ink/55">
              Verified reviews will appear here automatically as customers
              share their experience with the collection.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
