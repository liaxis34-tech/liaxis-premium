"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { gsap } from "@/lib/gsap";
import GrainOverlay from "./GrainOverlay";
import { useSelectionStore } from "@/lib/store";
import { goToBuyNow } from "@/lib/shopify";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  const selectedVariantId = useSelectionStore((s) => s.selectedVariantId);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        rootRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2 }
      )
        .fromTo(
          eyebrowRef.current,
          { y: 24, opacity: 0, letterSpacing: "0.1em" },
          { y: 0, opacity: 1, letterSpacing: "0.32em", duration: 1 },
          "-=0.8"
        )
        .fromTo(
          [line1Ref.current, line2Ref.current],
          { y: "110%" },
          { y: "0%", duration: 1.2, stagger: 0.12 },
          "-=0.5"
        )
        .fromTo(
          copyRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.6"
        )
        .fromTo(
          scrollCueRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.4"
        );

      gsap.to(scrollCueRef.current, {
        y: 10,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });

      gsap.fromTo(
        bgImageRef.current,
        { scale: 1 },
        { scale: 1.12, duration: 22, ease: "sine.inOut", repeat: -1, yoyo: true }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleExplore = () => {
    document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden bg-ink"
    >
      <div className="absolute inset-0">
        <div ref={bgImageRef} className="absolute inset-0">
          <Image
            src="/images/villa.webp"
            alt="LIAXIS Postür Toparlayıcı Sütyen ile villa içinde şık bir duruş"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        {!videoFailed && (
          <video
            ref={videoRef}
            className="h-full w-full object-cover opacity-55"
            src="/videos/campaign.mp4"
            poster="/images/villa.webp"
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoFailed(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(13,12,10,0.65)_100%)]" />
        <GrainOverlay opacity={0.06} />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <span
          ref={eyebrowRef}
          className="mb-6 block text-[11px] uppercase text-champagne-light tracking-widest2"
        >
          Postür Koleksiyonu 2026
        </span>

        <h1 className="font-display font-light text-ivory">
          <span className="block overflow-hidden">
            <span
              ref={line1Ref}
              className="block text-[13vw] leading-[0.95] sm:text-[9vw] md:text-[6.5vw]"
            >
              Duruşunuzun
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              ref={line2Ref}
              className="gold-text block animate-shimmer bg-[length:200%_auto] text-[13vw] italic leading-[0.95] sm:text-[9vw] md:text-[6.5vw]"
            >
              Zarif Gücü
            </span>
          </span>
        </h1>

        <p
          ref={copyRef}
          className="mx-auto mt-8 max-w-md text-balance text-sm font-light leading-relaxed text-ivory/80 md:text-base"
        >
          Omuzlarınızı nazikçe geriye çeken, gün boyu görünmez destek sağlayan
          premium postür toparlayıcı sütyen. LIAXIS ile duruşunuz bir zarafet ifadesine dönüşür.
        </p>

        <div ref={ctaRef} className="mt-11 flex flex-col items-center gap-4 sm:flex-row">
          <button
            onClick={() => goToBuyNow(selectedVariantId())}
            className="border border-ivory bg-ivory px-10 py-4 text-[11px] uppercase tracking-widest2 text-ink transition-all duration-500 hover:bg-transparent hover:text-ivory"
          >
            Hemen Satın Al
          </button>
          <button
            onClick={handleExplore}
            className="border border-ivory/50 px-10 py-4 text-[11px] uppercase tracking-widest2 text-ivory transition-all duration-500 hover:border-ivory hover:bg-ivory/10"
          >
            Keşfet
          </button>
        </div>
      </div>

      <div
        ref={scrollCueRef}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 opacity-0"
      >
        <span className="text-[10px] uppercase tracking-widest2 text-ivory/60">Kaydır</span>
        <ChevronDown size={16} strokeWidth={1.25} className="text-ivory/60" />
      </div>
    </section>
  );
}
