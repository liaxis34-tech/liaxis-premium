import Image from "next/image";
import Reveal from "./ui/Reveal";
import SectionLabel from "./ui/SectionLabel";
import CharmCuffArt from "./ProductArt";
import VideoBlock from "./VideoBlock";
import { StarCharm } from "./icons/CharmIcons";

export default function ProductShowcase() {
  return (
    <section id="showcase" className="relative bg-white py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>The Collection</SectionLabel>
          <h2 className="mt-6 font-display text-4xl font-light text-ink-deep md:text-5xl">
            A closer look
          </h2>
        </Reveal>

        <div className="mt-16 grid auto-rows-[220px] gap-4 md:grid-cols-3 md:auto-rows-[260px] md:gap-6">
          <Reveal className="relative overflow-hidden rounded-[2px] md:col-span-2 md:row-span-2">
            <Image
              src="/images/atmosphere-bg.jpg"
              alt="Charmora signature charm ear cuff, styled with blush light and floating petals"
              fill
              className="object-cover transition-transform duration-[1400ms] hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-[11px] uppercase tracking-widest2 text-white/80">Signature Collection</span>
              <p className="mt-1 font-display text-2xl">Wear Your Story</p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex items-center justify-center overflow-hidden rounded-[2px] bg-blush-100">
            <CharmCuffArt charms={["flower", "gem"]} animated={false} className="w-3/4" />
          </Reveal>

          <Reveal delay={0.18}>
            <VideoBlock className="h-full w-full rounded-[2px]" label="Behind the Design" />
          </Reveal>

          <Reveal delay={0.26} className="flex items-center justify-center overflow-hidden rounded-[2px] bg-blush-radial">
            <CharmCuffArt charms={["star", "moon"]} animated={false} className="w-3/4" />
          </Reveal>

          <Reveal delay={0.34} className="relative flex items-center justify-center overflow-hidden rounded-[2px] bg-gold-sheen bg-[length:200%_auto] md:col-span-2">
            <StarCharm className="h-24 w-24 opacity-90" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-[11px] uppercase tracking-widest2">Hand-Set Details</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
