import { Feather, Gift, Package, Sparkles, Wand2 } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionLabel from "./ui/SectionLabel";
import FloatingPetals from "./decor/FloatingPetals";
import GoldLight from "./decor/GoldLight";

const FEATURES = [
  {
    icon: Wand2,
    title: "Fully Customizable",
    description: "Build a combination of charms that belongs to no one but you.",
  },
  {
    icon: Sparkles,
    title: "Premium Materials",
    description: "14k gold-plated finishes over hypoallergenic brass, made to last.",
  },
  {
    icon: Feather,
    title: "Light as a Feather",
    description: "Designed to be worn every day, all day, without a second thought.",
  },
  {
    icon: Gift,
    title: "Gift-Ready",
    description: "Arrives in signature Charmora packaging, ready to hand over as-is.",
  },
  {
    icon: Package,
    title: "Luxury Packaging",
    description: "A keepsake box and pouch worthy of what's inside.",
  },
];

export default function WhyCharmora() {
  return (
    <section className="relative overflow-hidden bg-blush-radial py-24 md:py-36">
      <GoldLight />
      <FloatingPetals />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>Why Charmora</SectionLabel>
          <h2 className="mt-6 font-display text-4xl font-light text-ink-deep md:text-5xl">
            Made to be treasured
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.08} className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 text-gold-dark">
                <feature.icon size={22} strokeWidth={1.2} />
              </span>
              <h3 className="mt-5 font-display text-xl text-ink-deep">{feature.title}</h3>
              <p className="mt-2 text-sm font-light leading-relaxed text-ink-soft">{feature.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
