"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Layers } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionLabel from "./ui/SectionLabel";

const LAYERS = [
  {
    title: "Mikro-Modal Dış Yüzey",
    text: "Teninizi saran, ipeksi yumuşaklıkta nefes alabilir dış katman gün boyu ferahlık sağlar.",
  },
  {
    title: "Esnek Destek Ağı",
    text: "Omurga hizasını destekleyen görünmez elastik iskelet, omuzları nazikçe geriye çeker.",
  },
  {
    title: "Nem Dengeleyici İç Katman",
    text: "Teknik iç yüzey nemi dengeler, gün boyu kuru ve taze bir his sunar.",
  },
  {
    title: "Dikişsiz Bitiş",
    text: "Kıyafetlerinizin altında tamamen görünmez kalan, iz bırakmayan kenar işçiliği.",
  },
];

export default function FabricTech() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = panelsRef.current;
      gsap.set(panels, { autoAlpha: 0, y: 24 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${panels.length * 100}%`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      panels.forEach((panel, i) => {
        if (i > 0) {
          tl.to(panels[i - 1], { autoAlpha: 0, y: -24, duration: 0.4 }, i)
            .to(panel, { autoAlpha: 1, y: 0, duration: 0.4 }, i);
        }
        tl.to(
          progressRef.current,
          { width: `${((i + 1) / panels.length) * 100}%`, duration: 0.4 },
          i
        );
        tl.to(imageRef.current, { scale: 1 + i * 0.04, duration: 0.4 }, i);
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="fabric"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-ink py-24 text-ivory md:py-0"
    >
      <div className="absolute inset-0 opacity-[0.14] mix-blend-luminosity">
        <Image
          src="/images/cinematic.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/95 to-ink" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-6 md:grid-cols-2 md:items-center md:px-10">
        <div className="order-2 md:order-1">
          <SectionLabel>Kumaş Teknolojisi</SectionLabel>
          <h2 className="mt-6 font-display text-4xl font-light md:text-5xl">
            Dört katmanlı <span className="italic text-champagne-light">zarafet</span>
          </h2>

          <div className="relative mt-10 h-56">
            {LAYERS.map((layer, i) => (
              <div
                key={layer.title}
                ref={(el) => {
                  if (el) panelsRef.current[i] = el;
                }}
                className="absolute inset-0"
              >
                <span className="flex items-center gap-2 text-[11px] uppercase tracking-widest2 text-champagne-light">
                  <Layers size={14} strokeWidth={1.5} />
                  Katman {i + 1} / {LAYERS.length}
                </span>
                <h3 className="mt-4 font-display text-2xl font-light md:text-3xl">
                  {layer.title}
                </h3>
                <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-ivory/65">
                  {layer.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 h-px w-full max-w-md bg-ivory/15">
            <div
              ref={progressRef}
              className="h-px bg-gradient-to-r from-champagne-light to-gold"
              style={{ width: "25%" }}
            />
          </div>
        </div>

        <div className="order-1 flex items-center justify-center md:order-2">
          <div
            ref={imageRef}
            className="relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[2px] border border-ivory/10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)]"
          >
            <Image
              src="/images/detail.webp"
              alt="LIAXIS kumaş ve kanca detayı"
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
