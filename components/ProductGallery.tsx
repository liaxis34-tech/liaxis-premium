"use client";

import Image from "next/image";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";

export default function ProductGallery() {
  return (
    <section className="relative bg-ivory py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-xl text-center">
          <SectionLabel>Koleksiyon</SectionLabel>
          <h2 className="mt-6 font-display text-4xl font-light text-ink md:text-5xl">
            Zarafeti <span className="italic text-gold-dark">yakından</span> keşfedin
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-6 md:gap-5">
          <Reveal className="relative overflow-hidden md:col-span-4" delay={0}>
            <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[16/10]">
              <Image
                src="/images/hero-duo.webp"
                alt="LIAXIS Postür Toparlayıcı Sütyen ile şık bir kombin"
                fill
                priority
                sizes="(min-width: 768px) 66vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-5 text-[10px] uppercase tracking-widest2 text-ivory">
                Şehir Silüeti
              </span>
            </div>
          </Reveal>

          <Reveal className="relative overflow-hidden md:col-span-2" delay={0.12}>
            <div className="relative aspect-[3/4] w-full overflow-hidden md:h-full">
              <Image
                src="/images/detail.webp"
                alt="LIAXIS kumaş ve kanca detayı yakın çekim"
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-out hover:scale-105"
              />
              <span className="absolute bottom-5 left-5 text-[10px] uppercase tracking-widest2 text-ivory">
                Detay İşçiliği
              </span>
            </div>
          </Reveal>

          <Reveal className="relative overflow-hidden md:col-span-2" delay={0.18}>
            <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-square">
              <Image
                src="/images/cinematic.jpg"
                alt="LIAXIS premium ipeksi kumaş dokusu"
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-out hover:scale-105"
              />
              <span className="absolute bottom-5 left-5 text-[10px] uppercase tracking-widest2 text-ivory">
                İpeksi Doku
              </span>
            </div>
          </Reveal>

          <Reveal className="relative overflow-hidden md:col-span-4" delay={0.24}>
            <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-beige-100 md:aspect-[16/10]">
              <div className="px-8 text-center">
                <span className="text-[11px] uppercase tracking-widest2 text-gold-dark">
                  LIAXIS Premium
                </span>
                <p className="mt-4 font-display text-2xl font-light italic text-ink md:text-3xl">
                  &ldquo;Duruşunuz, en zarif ifadeniz.&rdquo;
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
