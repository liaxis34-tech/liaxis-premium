"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";

const REVIEWS = [
  {
    name: "Elif A.",
    location: "İstanbul",
    rating: 5,
    text: "İlk günden itibaren fark ettim. Omuzlarım artık gün sonunda ağrımıyor ve aynada kendimi çok daha dik görüyorum.",
  },
  {
    name: "Ceren D.",
    location: "Ankara",
    rating: 5,
    text: "Çok rahat ve kıyafetlerimin altında hiç belli olmuyor. Bluzlarımın altında bile fark edilmiyor, tam istediğim gibi.",
  },
  {
    name: "Melis K.",
    location: "İzmir",
    rating: 5,
    text: "Duruşum ciddi şekilde düzeldi. Masa başı çalıştığım için sırt ağrılarım vardı, LIAXIS gerçekten fark yarattı.",
  },
  {
    name: "Zeynep T.",
    location: "Bursa",
    rating: 5,
    text: "Kumaşı inanılmaz yumuşak. Gün boyu takıyorum, hiç rahatsızlık hissetmiyorum. Kesinlikle tavsiye ederim.",
  },
  {
    name: "Sude Y.",
    location: "Antalya",
    rating: 4,
    text: "Kaliteli bir ürün, kargo da hızlı geldi. Bedenimi tam oturdu, ikinci rengi de almayı düşünüyorum.",
  },
  {
    name: "Aylin B.",
    location: "Eskişehir",
    rating: 5,
    text: "Yıllardır aradığım destek buydu. Hem şık hem de gerçekten işlevsel. LIAXIS artık vazgeçilmezim.",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="relative bg-ivory py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-xl text-center">
          <SectionLabel>Kadınların Deneyimleri</SectionLabel>
          <h2 className="mt-6 font-display text-4xl font-light text-ink md:text-5xl">
            Binlerce kadının <span className="italic text-gold-dark">tercihi</span>
          </h2>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="flex gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <span className="text-sm text-ink/60">4.9 / 5 — 2.340 değerlendirme</span>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-5 border border-gold/15 bg-ivory-soft p-8 shadow-[0_20px_60px_-30px_rgba(26,23,18,0.25)]"
            >
              <Quote size={22} strokeWidth={1.25} className="text-gold" />
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: review.rating }).map((_, s) => (
                  <Star key={s} size={13} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-sm font-light leading-relaxed text-ink/70">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="mt-auto flex items-center gap-3 border-t border-ink/10 pt-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-champagne/30 font-display text-sm text-ink">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">{review.name}</p>
                  <p className="text-xs text-ink/50">{review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
