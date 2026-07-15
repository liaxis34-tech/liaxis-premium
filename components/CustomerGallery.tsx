"use client";

import Image from "next/image";
import { Instagram, Heart, Sparkles } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionLabel from "./ui/SectionLabel";

const TILES = [
  { type: "image" as const, src: "/images/product-gem-fringe-gold.webp", position: "center", span: "row-span-2" },
  { type: "image" as const, src: "/images/ear-cuff-profile-clean.webp", position: "center", span: "" },
  { type: "image" as const, src: "/images/product-pearl-blossom.webp", position: "center", span: "" },
  { type: "image" as const, src: "/images/lifestyle-mirror-kitchen.webp", position: "top", span: "" },
  { type: "image" as const, src: "/images/product-starfish-trail.webp", position: "center", span: "row-span-2" },
  { type: "image" as const, src: "/images/product-butterfly.webp", position: "center", span: "" },
  { type: "cta" as const, span: "" },
];

export default function CustomerGallery() {
  return (
    <section id="gallery" className="relative bg-ink py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="mx-auto max-w-xl text-center">
          <SectionLabel>@charmora</SectionLabel>
          <h2 className="mt-6 font-display text-4xl font-light text-cream md:text-5xl">
            Follow the <span className="italic gold-text">story</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm font-light leading-relaxed text-cream/60">
            A closer look at the collection, straight from our feed. Tag
            @wearcharmora to be featured here.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {TILES.map((tile, i) =>
            tile.type === "image" ? (
              <Reveal
                key={i}
                delay={(i % 4) * 0.06}
                className={`group relative aspect-square overflow-hidden ${tile.span}`}
              >
                <Image
                  src={tile.src}
                  alt="A Charmora ear cuff"
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  style={{ objectPosition: tile.position }}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/40 group-hover:opacity-100">
                  <Heart size={20} strokeWidth={1.5} className="text-cream" />
                </div>
              </Reveal>
            ) : (
              <Reveal
                key={i}
                delay={(i % 4) * 0.06}
                className={`group flex aspect-square flex-col items-center justify-center gap-3 border border-gold/25 bg-cream px-4 text-center transition-colors duration-300 hover:border-gold ${tile.span}`}
              >
                <Sparkles
                  size={20}
                  strokeWidth={1.25}
                  className="text-gold-dark transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
                />
                <span className="text-xs uppercase tracking-widest2 text-ink/70">
                  Tag @wearcharmora
                </span>
              </Reveal>
            )
          )}
        </div>

        <Reveal delay={0.2} className="mt-10 flex justify-center">
          <a
            href="#"
            className="flex items-center gap-2 text-[11px] uppercase tracking-widest2 text-cream/60 transition-colors hover:text-cream"
          >
            <Instagram size={15} strokeWidth={1.5} />
            @wearcharmora
          </a>
        </Reveal>
      </div>
    </section>
  );
}
