"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import clsx from "clsx";
import Reveal from "./ui/Reveal";
import SectionLabel from "./ui/SectionLabel";

const FAQS = [
  {
    question: "Can I change my charm combination later?",
    answer:
      "Your ear cuff's chain loops are designed for easy swapping. Charms sold separately can be added or rearranged anytime.",
  },
  {
    question: "What is the ear cuff made of?",
    answer:
      "14k gold-plated brass over a hypoallergenic base — safe for sensitive ears and made to resist tarnish with everyday wear.",
  },
  {
    question: "Do I need pierced ears?",
    answer: "No. The Signature Ear Cuff is a no-piercing design that adjusts gently to fit most ear shapes.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Orders within the US ship within 1-2 business days and typically arrive in 3-5 business days. Each piece is made to order.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer 30-day returns on unworn pieces in original packaging. Custom charm combinations are final sale.",
  },
  {
    question: "Is it gift-ready?",
    answer: "Every order arrives in signature Charmora packaging with a keepsake box — ready to gift as-is.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-white py-24 md:py-36">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <Reveal className="text-center">
          <SectionLabel>Questions</SectionLabel>
          <h2 className="mt-6 font-display text-4xl font-light text-ink-deep md:text-5xl">
            Frequently asked
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col divide-y divide-blush-200 border-t border-b border-blush-200">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.question}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg text-ink-deep md:text-xl">{faq.question}</span>
                  <Plus
                    size={18}
                    strokeWidth={1.4}
                    className={clsx(
                      "shrink-0 text-gold-dark transition-transform duration-400",
                      isOpen && "rotate-45"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-sm font-light leading-relaxed text-ink-soft">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
