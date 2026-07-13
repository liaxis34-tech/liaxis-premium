import Reveal from "./ui/Reveal";
import SectionLabel from "./ui/SectionLabel";
import { CHARM_OPTIONS } from "@/lib/mock-data";
import { CHARM_ICONS } from "./icons/CharmIcons";

export default function StorySection() {
  return (
    <section id="story" className="relative bg-white py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>Every Charm Has a Meaning</SectionLabel>
          <h2 className="mt-6 font-display text-4xl font-light leading-tight text-ink-deep md:text-5xl">
            This isn&apos;t just jewelry.
            <br />
            <span className="italic text-blush-700">It&apos;s your story, worn.</span>
          </h2>
          <p className="mt-6 text-sm font-light leading-relaxed text-ink-soft md:text-base">
            Every piece you build carries something of you — a memory, an emotion, a milestone.
            Choose the charms that speak for the moments you don&apos;t want to forget.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-px overflow-hidden rounded-[2px] bg-blush-100 sm:grid-cols-2 lg:grid-cols-4">
          {CHARM_OPTIONS.map((charm, i) => {
            const Icon = CHARM_ICONS[charm.kind];
            return (
              <Reveal key={charm.id} delay={i * 0.1} className="group bg-white p-8 transition-colors duration-500 hover:bg-blush-50 md:p-10">
                <Icon className="h-12 w-12" />
                <h3 className="mt-6 font-display text-2xl text-ink-deep">{charm.name}</h3>
                <span className="mt-1 block text-[11px] uppercase tracking-widest2 text-gold-dark">
                  {charm.meaning}
                </span>
                <p className="mt-4 text-sm font-light leading-relaxed text-ink-soft">
                  {charm.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
