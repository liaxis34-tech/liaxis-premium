import Image from "next/image";
import Reveal from "./ui/Reveal";
import SectionLabel from "./ui/SectionLabel";
import { CHARM_OPTIONS } from "@/lib/mock-data";
import { CHARM_ICONS } from "./icons/CharmIcons";

export default function StorySection() {
  return (
    <section id="story" className="relative overflow-hidden bg-white py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-[2px] shadow-luxe lg:mx-0 lg:max-w-none">
            <Image
              src="/images/lifestyle-worn.webp"
              alt="Charmora signature charm ear cuff worn, close up"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 90vw"
            />
          </Reveal>

          <div className="flex flex-col justify-center">
            <Reveal>
              <SectionLabel>This Isn&apos;t Just Jewelry</SectionLabel>
              <h2 className="mt-6 max-w-xl font-display text-4xl font-light leading-[1.08] text-ink-deep sm:text-5xl md:text-6xl">
                It&apos;s your story,
                <br />
                <span className="italic text-blush-700">worn.</span>
              </h2>
              <p className="mt-8 max-w-lg text-base font-light leading-relaxed text-ink-soft md:text-lg">
                Every piece you build carries something of you — a memory, an emotion,
                a milestone. Choose the charms that speak for the moments you don&apos;t
                want to forget.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-blush-100 pt-10 sm:grid-cols-4">
              {CHARM_OPTIONS.map((charm) => {
                const Icon = CHARM_ICONS[charm.kind];
                return (
                  <div key={charm.id}>
                    <Icon className="h-8 w-8" />
                    <p className="mt-3 font-display text-base text-ink-deep">{charm.name}</p>
                    <span className="text-[10px] uppercase tracking-widest2 text-gold-dark">
                      {charm.meaning}
                    </span>
                  </div>
                );
              })}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
