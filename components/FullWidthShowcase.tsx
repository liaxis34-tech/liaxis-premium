"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function FullWidthShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.18 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[85vh] min-h-[560px] w-full overflow-hidden bg-ink">
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src="/images/hero-duo.webp"
          alt="LIAXIS Postür Toparlayıcı Sütyen ile şehir manzaralı bir ortamda iki kadın"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/40" />

      <div
        ref={textRef}
        className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-16 text-center md:pb-20"
      >
        <span className="text-[11px] uppercase tracking-widest2 text-champagne-light">
          LIAXIS Koleksiyonu
        </span>
        <p className="mt-5 max-w-2xl font-display text-3xl font-light italic leading-tight text-ivory md:text-5xl">
          &ldquo;Zarafet, göze görünmeyen destekle başlar.&rdquo;
        </p>
      </div>
    </section>
  );
}
