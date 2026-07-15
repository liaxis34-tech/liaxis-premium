"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";

const FAQS = [
  {
    q: "Which cuff should I choose?",
    a: "Browse the collection above — each design ships exactly as shown. The Signature Ear Cuff is the only one built to be customized, with three charm slots you can swap any time. The other five are fixed designs, finished and ready to wear.",
  },
  {
    q: "Do I need a piercing to wear it?",
    a: "No. Every Charmora ear cuff wraps gently around the outer ear and stays secure with no piercing required. It takes seconds to put on and just as long to remove.",
  },
  {
    q: "What is it made of?",
    a: "Each cuff is cast in either 14k gold vermeil or sterling silver, noted on its product card. Both are tarnish-resistant, hypoallergenic, and made to be worn every day.",
  },
  {
    q: "Will it fit my ear?",
    a: "Yes. Every cuff is designed as one adjustable size that gently molds to fit most ear shapes comfortably, from a snug helix fit to a looser lobe drape.",
  },
  {
    q: "Can I change the charms myself?",
    a: "On the Signature Ear Cuff, yes — each charm attaches to its own small hoop, so you can swap between Flower, Star, Blue Gem, and Moon whenever your story changes. Our other cuffs are fixed designs, finished as shown.",
  },
  {
    q: "How do I care for my cuff?",
    a: "Keep it dry, store it away from direct sunlight in the pouch provided, and wipe gently with a soft cloth. Avoid perfume, chlorine, and saltwater contact where possible.",
  },
  {
    q: "What's your shipping and return policy?",
    a: "Every order ships in signature Charmora packaging, ready to gift. We offer a 30-day return window on unworn pieces in their original condition.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-cream-soft py-24 md:py-36">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <div className="text-center">
          <SectionLabel>Frequently Asked</SectionLabel>
          <h2 className="mt-6 font-display text-4xl font-light text-ink md:text-5xl">
            Questions, <span className="italic text-gold-dark">answered</span>
          </h2>
        </div>

        <Reveal delay={0.1} className="mt-14">
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {FAQS.map((faq, i) => {
              const open = openIndex === i;
              return (
                <div key={faq.q}>
                  <button
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-lg font-light text-ink md:text-xl">
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold-dark"
                    >
                      <Plus size={15} strokeWidth={1.5} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 max-w-xl text-sm font-light leading-relaxed text-ink/60">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
