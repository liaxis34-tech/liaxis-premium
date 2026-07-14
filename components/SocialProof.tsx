import Image from "next/image";
import { Instagram } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionLabel from "./ui/SectionLabel";
import ReviewsSection from "./reviews/ReviewsSection";
import { getInstagramPosts } from "@/lib/social";
import { SIGNATURE_PRODUCT_HANDLE } from "@/lib/mock-data";

const BRAND_GALLERY = [
  "/images/hero-petals.webp",
  "/images/product-glass.webp",
  "/images/lifestyle-worn.webp",
  "/images/product-clean.webp",
];

export default async function SocialProof() {
  const posts = await getInstagramPosts(8);

  return (
    <section id="reviews" className="relative bg-blush-50 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          <Reveal className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[2px] shadow-luxe lg:mx-0">
            <Image
              src="/images/community-hold.webp"
              alt="A Charmora customer holding up her charm ear cuff to the camera"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 28rem, 90vw"
            />
          </Reveal>

          <div className="text-center lg:text-left">
            <SectionLabel>Loved, Worn, Shared</SectionLabel>
            <h2 className="mt-6 font-display text-4xl font-light text-ink-deep md:text-5xl">
              Real stories from real customers
            </h2>
          </div>
        </div>

        <ReviewsSection productHandle={SIGNATURE_PRODUCT_HANDLE} showHeading={false} limit={6} className="mt-16" />

        <div className="mt-20">
          <div className="mb-8 flex items-center justify-center gap-2">
            <Instagram size={16} strokeWidth={1.5} className="text-blush-700" />
            <span className="text-[11px] uppercase tracking-widest2 text-ink-soft">@charmora</span>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {posts.map((post) => (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden rounded-[2px] bg-blush-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.mediaUrl}
                    alt={post.caption ?? "Charmora on Instagram"}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </a>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {BRAND_GALLERY.map((src) => (
                  <div key={src} className="group relative aspect-square overflow-hidden rounded-[2px]">
                    <Image
                      src={src}
                      alt="Charmora official product photography"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(min-width: 640px) 24vw, 46vw"
                    />
                  </div>
                ))}
              </div>
              <p className="mt-5 text-center text-[11px] uppercase tracking-widest2 text-ink-faint">
                Official Charmora photography — tag @charmora to be featured here
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
