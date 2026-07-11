"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Plus, Minus, RotateCw, ShoppingBag, Sparkles } from "lucide-react";
import { gsap } from "@/lib/gsap";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";
import VariantSelector from "./VariantSelector";
import { useSelectionStore } from "@/lib/store";
import { goToAddToCart, goToBuyNow } from "@/lib/shopify";

const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-ivory-soft">
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-gold/25 border-t-gold" />
    </div>
  ),
});

export default function ProductExperience() {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  const { color, size, selectedVariantId } = useSelectionStore();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        canvasWrapRef.current,
        { opacity: 0, scale: 0.88, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: canvasWrapRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleZoom = (direction: 1 | -1) => {
    const controls = controlsRef.current;
    if (!controls) return;
    const camera = controls.object;
    const dir = new THREE.Vector3().subVectors(camera.position, controls.target);
    const dist = dir.length();
    const next = THREE.MathUtils.clamp(
      dist - direction * 0.45,
      controls.minDistance,
      controls.maxDistance
    );
    dir.setLength(next);
    camera.position.copy(controls.target).add(dir);
    controls.update();
  };

  const handleReset = () => {
    const controls = controlsRef.current;
    if (!controls) return;
    controls.reset();
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative overflow-hidden bg-ivory-soft py-24 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-xl text-center">
          <SectionLabel>3D Ürün Deneyimi</SectionLabel>
          <h2 className="mt-6 font-display text-4xl font-light text-ink md:text-5xl">
            Her açıdan <span className="italic text-gold-dark">kusursuz</span>
          </h2>
          <p className="mt-5 text-sm font-light leading-relaxed text-ink/60 md:text-base">
            LIAXIS Postür Toparlayıcı Sütyen&apos;i 360° döndürün, yakınlaştırın
            ve her detayını keşfedin.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div
            ref={canvasWrapRef}
            className="relative order-1 aspect-square w-full overflow-hidden rounded-[2px] border border-gold/15 bg-gradient-to-b from-ivory to-beige-100 shadow-[0_40px_100px_-40px_rgba(26,23,18,0.35)] md:aspect-[4/3] lg:aspect-[5/4]"
            onPointerDown={() => setAutoRotate(false)}
          >
            <Scene3D controlsRef={controlsRef} autoRotate={autoRotate} />

            <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center pt-5">
              <span className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-ivory/80 px-4 py-1.5 text-[10px] uppercase tracking-widest2 text-ink/60 backdrop-blur">
                <Sparkles size={12} strokeWidth={1.5} className="text-gold" />
                Sürükle &amp; Döndür
              </span>
            </div>

            <div className="absolute bottom-5 right-5 flex flex-col gap-2">
              <button
                aria-label="Yakınlaştır"
                onClick={() => handleZoom(1)}
                className="flex h-10 w-10 items-center justify-center border border-ink/15 bg-ivory/90 text-ink transition-colors hover:bg-ink hover:text-ivory"
              >
                <Plus size={16} strokeWidth={1.5} />
              </button>
              <button
                aria-label="Uzaklaştır"
                onClick={() => handleZoom(-1)}
                className="flex h-10 w-10 items-center justify-center border border-ink/15 bg-ivory/90 text-ink transition-colors hover:bg-ink hover:text-ivory"
              >
                <Minus size={16} strokeWidth={1.5} />
              </button>
              <button
                aria-label="Sıfırla"
                onClick={() => {
                  handleReset();
                  setAutoRotate(true);
                }}
                className="flex h-10 w-10 items-center justify-center border border-ink/15 bg-ivory/90 text-ink transition-colors hover:bg-ink hover:text-ivory"
              >
                <RotateCw size={14} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <Reveal className="order-2 flex flex-col justify-center" delay={0.1}>
            <span className="text-[11px] uppercase tracking-widest2 text-gold-dark">
              LIAXIS Premium
            </span>
            <h3 className="mt-3 font-display text-3xl font-light text-ink md:text-4xl">
              Postür Toparlayıcı Sütyen
            </h3>
            <p className="mt-4 text-sm font-light leading-relaxed text-ink/60">
              Nefes alabilen mikro-modal kumaş, çelik iskeletsiz omurga
              desteği ve dikişsiz konfor — LIAXIS, duruşunuzu gün boyu
              nazikçe düzeltirken tenle bütünleşen bir zarafet sunar.
            </p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-3xl text-ink">₺1.890</span>
              <span className="text-sm text-ink/40 line-through">₺2.590</span>
              <span className="text-[11px] uppercase tracking-widest2 text-gold-dark">
                %27 İndirim
              </span>
            </div>

            <div className="mt-8 border-t border-ink/10 pt-8">
              <VariantSelector />
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => goToBuyNow(selectedVariantId())}
                className="flex flex-1 items-center justify-center gap-2 bg-ink px-8 py-4 text-[11px] uppercase tracking-widest2 text-ivory transition-colors duration-500 hover:bg-gold-dark"
              >
                Hemen Satın Al
              </button>
              <button
                onClick={() => goToAddToCart(selectedVariantId())}
                className="flex flex-1 items-center justify-center gap-2 border border-ink px-8 py-4 text-[11px] uppercase tracking-widest2 text-ink transition-colors duration-500 hover:bg-ink hover:text-ivory"
              >
                <ShoppingBag size={14} strokeWidth={1.5} />
                Sepete Ekle
              </button>
            </div>

            <p className="mt-4 text-[11px] uppercase tracking-widest2 text-ink/40">
              Seçili: {color} / {size}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
