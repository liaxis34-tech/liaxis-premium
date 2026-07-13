"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import GoldLight from "./decor/GoldLight";
import { SIGNATURE_PRODUCT_HANDLE } from "@/lib/mock-data";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
        .fromTo(
          ".hero-word",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.12 },
          "-=0.4"
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.5"
        )
        .fromTo(
          ".hero-art",
          { opacity: 0, scale: 0.85, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.3 },
          "-=0.9"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative flex min-h-[100svh] items-center overflow-hidden bg-blush-radial pt-24">
      <GoldLight />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <div ref={headlineRef} className="flex flex-col justify-center text-center lg:text-left">
          <span className="hero-eyebrow mx-auto text-[11px] uppercase tracking-widest3 text-gold-dark lg:mx-0">
            Personalized Fine Jewelry
          </span>
          <h1 className="mt-6 overflow-hidden font-display text-5xl font-light leading-[1.05] text-ink-deep sm:text-6xl md:text-7xl">
            <span className="hero-word inline-block">Wear</span>{" "}
            <span className="hero-word inline-block">Your</span>{" "}
            <span className="hero-word inline-block italic text-blush-700">Story</span>
          </h1>
          <p className="hero-sub mx-auto mt-6 max-w-md text-base font-light leading-relaxed text-ink-soft md:text-lg lg:mx-0">
            Create a charm combination that is uniquely yours — for the love, the dreams,
            the beginnings and the memories you carry.
          </p>
          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:items-start lg:justify-start justify-center">
            <Link
              href="/#build"
              className="hero-cta inline-flex items-center justify-center gap-2 bg-ink-deep px-9 py-4 text-[11px] uppercase tracking-widest2 text-white transition-colors duration-500 hover:bg-gold-dark"
            >
              Build Your Charm
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
            <Link
              href={`/product/${SIGNATURE_PRODUCT_HANDLE}`}
              className="hero-cta inline-flex items-center justify-center gap-2 border border-ink-deep/30 px-9 py-4 text-[11px] uppercase tracking-widest2 text-ink-deep transition-colors duration-500 hover:border-ink-deep"
            >
              Shop Now
            </Link>
          </div>
        </div>

        <div className="hero-art relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-[2px] shadow-luxe lg:max-w-lg">
          <Image
            src="/images/hero-petals.webp"
            alt="Charmora signature charm ear cuff floating amid falling petals"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 32rem, 90vw"
          />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
