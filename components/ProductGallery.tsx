"use client";

import Image from "next/image";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";

const TILES = [
  {
    src: "/images/hero-duo.webp",
    alt: "LIAXIS Postür Toparlayıcı Sütyen ile şık bir kombin",
    caption: "Şehir Silüeti",
    span: "md:col-span-4",
    aspect: "aspect-[4/3] md:aspect-[16/10]",
  },
  {
    src: "/images/detail.webp",
    alt: "LIAXIS kumaş ve kanca detayı yakın çekim",
    caption: "Detay İşçiliği",
    span: "md:col-span-2",
    aspect: "aspect-[3/4] md:h-full",
  },
  {
    src: "/images/cinematic.jpg",
    alt: "LIAXIS premium ipeksi kumaş dokusu",
    caption: "İpeksi Doku",
    span: "md:col-span-2",
    aspect: "aspect-[4/3] md:aspect-square",
  },
  {
    src: "/images/floating-product.webp",
    alt: "LIAXIS Postür Toparlayıcı Sütyen ürün portresi",
    caption: "Ürün Portresi",
    span: "md:col-span-2",
    aspect: "aspect-[4/3] md:aspect-square",
  },
  {
    src: "/images/villa.webp",
    alt: "LIAXIS Postür Toparlayıcı Sütyen ile villa içinde şık bir duruş",
    caption: "Villa Koleksiyonu",
    span: "md:col-span-2",
    aspect: "aspect-[4/3] md:aspect-square",
  },
];

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
          {TILES.map((tile, i) => (
            <Reveal key={tile.src} className={`relative overflow-hidden ${tile.span}`} delay={i * 0.08}>
              <div className={`relative w-full overflow-hidden ${tile.aspect}`}>
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  priority={i === 0}
                  sizes={
                    tile.span === "md:col-span-4"
                      ? "(min-width: 768px) 66vw, 100vw"
                      : "(min-width: 768px) 33vw, 100vw"
                  }
                  className="object-cover transition-transform duration-[1.2s] ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
                <span className="absolute bottom-5 left-5 text-[10px] uppercase tracking-widest2 text-ivory">
                  {tile.caption}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-14 text-center">
          <p className="font-display text-2xl font-light italic text-ink md:text-3xl">
            &ldquo;Duruşunuz, en zarif ifadeniz.&rdquo;
          </p>
          <span className="mt-3 block text-[11px] uppercase tracking-widest2 text-gold-dark">
            LIAXIS Premium
          </span>
        </Reveal>
      </div>
    </section>
  );
}
