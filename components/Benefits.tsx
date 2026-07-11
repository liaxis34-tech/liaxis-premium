"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Wind, Clock, ShieldCheck, Sparkles, Feather } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";

const STORY_IMAGES = [
  {
    src: "/images/hero-duo.webp",
    alt: "LIAXIS Postür Toparlayıcı Sütyen çapraz sırt tasarımı, şehir manzaralı bir ortamda",
  },
  {
    src: "/images/back-profile.webp",
    alt: "LIAXIS Postür Toparlayıcı Sütyen ile zarif bir sırt profili",
  },
];

const BENEFITS = [
  {
    icon: Activity,
    title: "Anında Duruş Desteği",
    text: "Omurga hizasını nazikçe destekleyen dokuma, omuzları geriye çekerek dik bir duruş kazandırır.",
  },
  {
    icon: Feather,
    title: "Görünmez Konfor",
    text: "İnce, dikişsiz yapısı kıyafetlerinizin altında iz bırakmadan tamamen görünmez kalır.",
  },
  {
    icon: Wind,
    title: "Nefes Alabilir Kumaş",
    text: "Mikro-modal karışımlı kumaş teni saracak kadar yumuşak, gün boyu serin ve kuru tutar.",
  },
  {
    icon: Clock,
    title: "Gün Boyu Rahatlık",
    text: "Esnek destek bantları hareket özgürlüğünü kısıtlamadan 12 saate kadar konfor sağlar.",
  },
  {
    icon: ShieldCheck,
    title: "Omuz ve Sırt Desteği",
    text: "Çapraz sırt tasarımı, omuz ve üst sırt bölgesindeki gerginliği azaltarak yükü dengeler.",
  },
  {
    icon: Sparkles,
    title: "Zarif Silüet",
    text: "Vücut hatlarını yumuşakça toparlayan kesim, her kıyafetin altında zarif bir siluet yaratır.",
  },
];

export default function Benefits() {
  const [storyIndex, setStoryIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStoryIndex((i) => (i + 1) % STORY_IMAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="benefits" className="relative bg-ivory py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-xl text-center">
          <SectionLabel>Neden LIAXIS</SectionLabel>
          <h2 className="mt-6 font-display text-4xl font-light text-ink md:text-5xl">
            Duruşunuz için <span className="italic text-gold-dark">tasarlandı</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] w-full overflow-hidden lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)] lg:aspect-auto"
          >
            <AnimatePresence mode="sync">
              <motion.div
                key={STORY_IMAGES[storyIndex].src}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={STORY_IMAGES[storyIndex].src}
                  alt={STORY_IMAGES[storyIndex].alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  priority={storyIndex === 0}
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
            <div className="absolute bottom-6 right-6 flex gap-1.5">
              {STORY_IMAGES.map((img, i) => (
                <span
                  key={img.src}
                  className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                    i === storyIndex ? "bg-ivory" : "bg-ivory/35"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-px overflow-hidden bg-ink/10 sm:grid-cols-2">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="group flex flex-col gap-4 bg-ivory p-7 transition-colors duration-500 hover:bg-ivory-soft md:p-8"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold-dark transition-colors duration-500 group-hover:bg-ink group-hover:text-ivory group-hover:border-ink">
                  <benefit.icon size={18} strokeWidth={1.25} />
                </div>
                <h3 className="font-display text-lg font-light text-ink md:text-xl">
                  {benefit.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-ink/60">{benefit.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[11px] uppercase tracking-widest2 text-ink/50">
            <span>%94 Müşteri Memnuniyeti</span>
            <span className="h-1 w-1 rounded-full bg-gold" />
            <span>12.000+ Mutlu Kadın</span>
            <span className="h-1 w-1 rounded-full bg-gold" />
            <span>Dermatolojik Test Onaylı</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
