"use client";

import Image from "next/image";
import Reveal from "./ui/Reveal";
import SectionLabel from "./ui/SectionLabel";

export default function Lifestyle() {
  return (
    <section className="relative bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="mx-auto max-w-xl text-center">
          <SectionLabel>Lifestyle</SectionLabel>
          <h2 className="mt-6 font-display text-4xl font-light text-ink md:text-5xl">
            Small enough to <span className="italic text-gold-dark">whisper.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal className="relative aspect-[4/5] overflow-hidden md:order-2">
            <Image
              src="/images/ear-cuff-warm-portrait.webp"
              alt="Close-up portrait wearing the Charmora Signature Ear Cuff against a warm, softly lit backdrop"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={0.15} className="md:order-1">
            <p className="font-display text-2xl font-light leading-snug text-ink md:text-3xl">
              &ldquo;It doesn&rsquo;t ask for attention. It just quietly holds
              the parts of you worth remembering.&rdquo;
            </p>
            <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-ink/60">
              No second piercing, no daily decision-making — just one cuff
              that slips over the ear in seconds and stays exactly as
              considered as the story it carries.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/ear-cuff-editorial-red.webp"
              alt="Close-up editorial portrait wearing the Charmora Signature Ear Cuff with Star and Blue Gem charms"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-display text-2xl font-light leading-snug text-ink md:text-3xl">
              Worn from morning meetings to midnight taxis — it moves through
              your day exactly as you do.
            </p>
            <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-ink/60">
              Cast in 14k gold vermeil or sterling silver and finished by
              hand, each cuff is made to be lived in, not saved for special
              occasions.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
