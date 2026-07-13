import Image from "next/image";
import Reveal from "./ui/Reveal";
import SectionLabel from "./ui/SectionLabel";

const GALLERY_IMAGES = [
  { src: "/images/hero-petals.webp", alt: "Charmora ear cuff floating among falling petals", tall: true },
  { src: "/images/lifestyle-worn.webp", alt: "Charmora ear cuff worn close up", tall: false },
  { src: "/images/product-glass.webp", alt: "Charmora ear cuff resting on glass panels", tall: false },
  { src: "/images/community-hold.webp", alt: "Charmora ear cuff held up to the camera", tall: true },
  { src: "/images/product-clean.webp", alt: "Charmora signature charm ear cuff", tall: false },
];

export default function GalleryMasonry() {
  return (
    <section id="gallery" className="relative bg-blush-50 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>The Gallery</SectionLabel>
          <h2 className="mt-6 font-display text-4xl font-light text-ink-deep md:text-5xl">
            Every angle, every detail
          </h2>
        </Reveal>

        <div className="mt-16 columns-2 gap-4 md:columns-3 md:gap-6">
          {GALLERY_IMAGES.map((image, i) => (
            <Reveal key={image.src} delay={i * 0.08} className="mb-4 break-inside-avoid overflow-hidden rounded-[2px] md:mb-6">
              <div className={`group relative w-full ${image.tall ? "aspect-[3/4]" : "aspect-square"}`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  sizes="(min-width: 768px) 32vw, 46vw"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
