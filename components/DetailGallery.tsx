"use client";

import Image from "next/image";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";

const TILES = [
  {
    src: "/images/floating-product.webp",
    alt: "LIAXIS Postür Toparlayıcı Sütyen ürün portresi",
    caption: "Ürün Portresi",
    kicker: "01",
  },
  {
    src: "/images/detail.webp",
    alt: "LIAXIS kumaş ve kanca detayı yakın çekim",
    caption: "Zanaat Detayı",
    kicker: "02",
  },
  {
    src: "/images/cinematic.jpg",
    alt: "LIAXIS premium ipeksi kumaş dokusu",
    caption: "İpeksi Doku",
    kicker: "03",
  },
];

export default function DetailGallery() {
  return (
    <section className="relative bg-ivory py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-xl text-center">
          <SectionLabel>Detay &amp; Kumaş Galerisi</SectionLabel>
          <h2 className="mt-6 font-display text-4xl font-light text-ink md:text-5xl">
            Zanaatı <span className="italic text-gold-dark">yakından</span> keşfedin
          </h2>
          <p className="mt-5 text-sm font-light leading-relaxed text-ink/60 md:text-base">
            Her dikiş, her doku, her kanca — LIAXIS&apos;in ürün ve kumaş
            zanaatkârlığına dair üç yakın plan.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-3">
          {TILES.map((tile, i) => (
            <Reveal key={tile.src} delay={i * 0.12}>
              <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-[2px]">
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                <span className="absolute left-5 top-5 font-display text-sm italic text-ivory/70">
                  {tile.kicker}
                </span>
                <span className="absolute bottom-5 left-5 text-[11px] uppercase tracking-widest2 text-ivory">
                  {tile.caption}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
