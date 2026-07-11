"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionLabel from "./ui/SectionLabel";

export default function EditorialStory() {
  return (
    <section className="relative overflow-hidden bg-ivory-soft">
      <div className="grid md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/5] w-full overflow-hidden md:aspect-auto md:min-h-[42rem]"
        >
          <Image
            src="/images/back-profile.webp"
            alt="LIAXIS Postür Toparlayıcı Sütyen ile zarif bir sırt profili"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>

        <div className="flex flex-col justify-center px-6 py-16 md:px-16 md:py-0 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionLabel>Zarafetin Anatomisi</SectionLabel>
            <h2 className="mt-6 max-w-md font-display text-4xl font-light leading-tight text-ink md:text-5xl">
              Duruş, sessizce <span className="italic text-gold-dark">konuşan</span> bir dildir
            </h2>
            <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-ink/60 md:text-base">
              LIAXIS, teninize dokunduğu andan itibaren omurganızın doğal
              hizasını hatırlatır. Çapraz sırt tasarımı yalnızca destek
              vermez — bir duruş, bir tavır, bir zarafet ifadesi yaratır.
              Her dikiş, gün boyu fark edilmeden çalışan sessiz bir
              zanaatkârlığın izidir.
            </p>
            <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-ink/60 md:text-base">
              Bu, yalnızca bir iç giyim parçası değil; kendinize karşı
              verdiğiniz bir sözdür.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
