"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";

const FAQS = [
  {
    q: "LIAXIS Postür Toparlayıcı Sütyen nasıl çalışır?",
    a: "Sırt bölgesindeki esnek destek ağı omuzları nazikçe geriye çekerek omurga hizasını destekler. Düzenli kullanımda kaslarınız doğru duruşu hatırlamaya başlar.",
  },
  {
    q: "Hangi bedeni seçmeliyim?",
    a: "Ürün S, M, L ve XL bedenlerinde sunulur. Mevcut sütyen bedeninizle aynı bedeni seçmenizi öneririz. Emin değilseniz iki beden arasında kalırsanız daha küçük olanı tercih edin.",
  },
  {
    q: "Ürünü günde kaç saat kullanabilirim?",
    a: "Nefes alabilir kumaşı sayesinde güvenle 8-12 saat boyunca kullanılabilir. İlk günlerde 2-3 saatlik kullanımla başlayıp süreyi kademeli olarak artırmanızı öneririz.",
  },
  {
    q: "Kargo süresi ne kadar?",
    a: "Siparişleriniz 1-3 iş günü içinde kargoya teslim edilir ve Türkiye genelinde ortalama 2-4 iş günü içinde adresinize ulaşır.",
  },
  {
    q: "İade ve değişim yapabilir miyim?",
    a: "Ürünü teslim aldıktan sonra 14 gün içinde, kullanılmamış ve orijinal ambalajında olması koşuluyla iade veya değişim talebinde bulunabilirsiniz.",
  },
  {
    q: "Kumaşı hassas ciltler için uygun mu?",
    a: "Evet, dermatolojik olarak test edilmiş mikro-modal kumaşımız hassas ciltlerde bile tahriş yaratmayacak şekilde geliştirilmiştir.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-beige-100 py-24 md:py-36">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <div className="text-center">
          <SectionLabel>Sıkça Sorulan Sorular</SectionLabel>
          <h2 className="mt-6 font-display text-4xl font-light text-ink md:text-5xl">
            Merak <span className="italic text-gold-dark">ettikleriniz</span>
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
