"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Flower2, Star, Gem, Moon, Move3D, ShieldCheck, Infinity as InfinityIcon, Ban } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";

const FLOATERS = [
  { Icon: Flower2, top: "8%", left: "6%", delay: 0 },
  { Icon: Star, top: "18%", right: "8%", delay: 1.2 },
  { Icon: Gem, bottom: "22%", left: "10%", delay: 2 },
  { Icon: Moon, bottom: "10%", right: "12%", delay: 0.6 },
];

const TRUST = [
  { Icon: ShieldCheck, label: "14k Gold Vermeil" },
  { Icon: Ban, label: "No Piercing Needed" },
  { Icon: InfinityIcon, label: "One Size, Adjustable" },
  { Icon: Move3D, label: "Hypoallergenic" },
];

export default function ProductReveal() {
  const x = useMotionValue(0);
  const rotateY = useTransform(x, [-200, 200], [-18, 18]);
  const crossfade = useTransform(x, [-200, 0, 200], [1, 0, 1]);
  const inverseCrossfade = useTransform(crossfade, (v) => 1 - v);
  const [dragged, setDragged] = useState(false);

  return (
    <section id="reveal" className="relative overflow-hidden bg-cream py-24 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-gold-sheen opacity-[0.04]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="mx-auto max-w-xl text-center">
          <SectionLabel>Product Reveal</SectionLabel>
          <h2 className="mt-6 font-display text-4xl font-light text-ink md:text-5xl">
            One cuff. <span className="italic text-gold-dark">Endless meaning.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm font-light leading-relaxed text-ink/60">
            The Charmora Signature Ear Cuff — a single, sculpted hoop in 14k
            gold vermeil, designed to hold up to three charms at once.
          </p>
        </Reveal>

        <div className="relative mx-auto mt-16 flex max-w-3xl items-center justify-center">
          {FLOATERS.map(({ Icon, delay, ...pos }, i) => (
            <motion.div
              key={i}
              style={pos}
              className="absolute z-0 hidden h-14 w-14 items-center justify-center rounded-full border border-gold/25 bg-white/60 text-gold-dark shadow-[0_10px_30px_-10px_rgba(176,141,87,0.4)] backdrop-blur-sm sm:flex"
              animate={{ y: [0, -16, 0], rotate: [0, 6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay }}
            >
              <Icon size={20} strokeWidth={1.25} />
            </motion.div>
          ))}

          <motion.div
            drag="x"
            dragConstraints={{ left: -200, right: 200 }}
            dragElastic={0.15}
            style={{ x, rotateY, perspective: 1200 }}
            onDragStart={() => setDragged(true)}
            className="relative z-10 aspect-[4/5] w-full max-w-sm cursor-grab touch-pan-y select-none active:cursor-grabbing sm:max-w-md"
          >
            <motion.div style={{ opacity: inverseCrossfade }} className="absolute inset-0">
              <Image
                src="/images/product-studio.webp"
                alt="The Charmora Signature Ear Cuff in 14k gold vermeil with Blue Gem and Star charms, studio shot"
                fill
                draggable={false}
                sizes="(max-width: 640px) 90vw, 480px"
                className="object-contain drop-shadow-[0_30px_60px_rgba(35,28,24,0.18)]"
                priority
              />
            </motion.div>
            <motion.div style={{ opacity: crossfade }} className="absolute inset-0">
              <Image
                src="/images/product-petals.webp"
                alt="The Charmora Signature Ear Cuff floating among petals"
                fill
                draggable={false}
                sizes="(max-width: 640px) 90vw, 480px"
                className="object-contain drop-shadow-[0_30px_60px_rgba(35,28,24,0.18)]"
              />
            </motion.div>
          </motion.div>
        </div>

        {!dragged && (
          <p className="mt-6 flex items-center justify-center gap-2 text-[11px] uppercase tracking-widest2 text-ink/35">
            <Move3D size={13} strokeWidth={1.5} />
            Drag to explore
          </p>
        )}

        <Reveal delay={0.1} className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          {TRUST.map(({ Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-3 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 text-gold-dark">
                <Icon size={18} strokeWidth={1.25} />
              </div>
              <span className="text-[11px] uppercase tracking-widest2 text-ink/60">{label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
