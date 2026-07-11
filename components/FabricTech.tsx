"use client";

import { useEffect, useRef } from "react";
import { Layers } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionLabel from "./ui/SectionLabel";

const LAYERS = [
  {
    title: "Mikro-Modal Dış Yüzey",
    text: "Teninizi saran, ipeksi yumuşaklıkta nefes alabilir dış katman gün boyu ferahlık sağlar.",
    tone: "#F4EFE6",
  },
  {
    title: "Esnek Destek Ağı",
    text: "Omurga hizasını destekleyen görünmez elastik iskelet, omuzları nazikçe geriye çeker.",
    tone: "#E6D6BC",
  },
  {
    title: "Nem Dengeleyici İç Katman",
    text: "Teknik iç yüzey nemi dengeler, gün boyu kuru ve taze bir his sunar.",
    tone: "#D8C39F",
  },
  {
    title: "Dikişsiz Bitiş",
    text: "Kıyafetlerinizin altında tamamen görünmez kalan, iz bırakmayan kenar işçiliği.",
    tone: "#C9AD81",
  },
];

export default function FabricTech() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

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
        tl.to(
          ringRef.current,
          { rotate: i * 45, borderColor: LAYERS[i].tone, duration: 0.4 },
          i
        );
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
      <div className="mx-auto grid w-full max-w-7xl gap-14 px-6 md:grid-cols-2 md:items-center md:px-10">
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
          <div className="relative flex h-72 w-72 items-center justify-center md:h-96 md:w-96">
            <div
              ref={ringRef}
              className="absolute inset-0 rounded-full border-2 transition-colors"
              style={{ borderColor: LAYERS[0].tone }}
            />
            <div className="absolute inset-8 rounded-full border border-ivory/15" />
            <div className="absolute inset-16 rounded-full border border-ivory/10" />
            <div className="absolute inset-28 rounded-full border border-ivory/10" />
            <span className="font-display text-5xl italic text-champagne-light">L</span>
          </div>
        </div>
      </div>
    </section>
  );
}
