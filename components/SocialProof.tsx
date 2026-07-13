import { Instagram, Star } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionLabel from "./ui/SectionLabel";
import { Sparkle } from "./icons/CharmIcons";
import { getProductReviews, getReviewSummary } from "@/lib/reviews";
import { getInstagramPosts } from "@/lib/social";
import { SIGNATURE_PRODUCT_HANDLE } from "@/lib/mock-data";

export default async function SocialProof() {
  const [summary, reviews, posts] = await Promise.all([
    getReviewSummary(SIGNATURE_PRODUCT_HANDLE),
    getProductReviews(SIGNATURE_PRODUCT_HANDLE),
    getInstagramPosts(8),
  ]);

  return (
    <section id="reviews" className="relative bg-blush-50 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>Loved, Worn, Shared</SectionLabel>
          <h2 className="mt-6 font-display text-4xl font-light text-ink-deep md:text-5xl">
            Real stories from real customers
          </h2>
          {summary.count > 0 ? (
            <div className="mt-5 flex items-center justify-center gap-2">
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.round(summary.averageRating) ? "currentColor" : "none"} strokeWidth={1.3} />
                ))}
              </div>
              <span className="text-sm text-ink-soft">
                {summary.averageRating.toFixed(1)} from {summary.count} reviews
              </span>
            </div>
          ) : (
            <p className="mt-5 text-sm font-light text-ink-soft">
              Be the first to share how you wear your Charmora.
            </p>
          )}
        </Reveal>

        {reviews.length > 0 ? (
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.slice(0, 6).map((review) => (
              <div key={review.id} className="rounded-[2px] border border-blush-200 bg-white p-7">
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} fill={i < review.rating ? "currentColor" : "none"} strokeWidth={1.3} />
                  ))}
                </div>
                {review.title && <p className="mt-3 font-display text-lg text-ink-deep">{review.title}</p>}
                <p className="mt-2 text-sm font-light leading-relaxed text-ink-soft">{review.body}</p>
                <p className="mt-4 text-[11px] uppercase tracking-widest2 text-ink-faint">
                  {review.author}
                  {review.verifiedBuyer ? " · Verified Buyer" : ""}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <Reveal delay={0.1} className="mx-auto mt-16 flex max-w-md flex-col items-center rounded-[2px] border border-dashed border-blush-300 bg-white/50 px-10 py-14 text-center">
            <Sparkle className="h-6 w-6 text-gold" />
            <p className="mt-4 font-display text-xl text-ink-deep">Your story could be first</p>
            <p className="mt-2 text-sm font-light text-ink-soft">
              Reviews connect automatically once Loox or Judge.me is linked to this store.
            </p>
          </Reveal>
        )}

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
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex aspect-square items-center justify-center rounded-[2px] bg-blush-radial"
                >
                  <Sparkle className="h-6 w-6 text-blush-400" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
