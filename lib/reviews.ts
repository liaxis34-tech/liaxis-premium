// Review architecture — provider-agnostic types + adapters for Loox and
// Judge.me. No review content is fabricated anywhere in this app: until a
// provider is configured with real API credentials, `getProductReviews` and
// `getReviewSummary` resolve to an empty state, and components render a
// "be the first to review" prompt instead of placeholder testimonials.

export type ReviewSource = "loox" | "judgeme" | "manual";

export interface ReviewMedia {
  type: "image" | "video";
  url: string;
  thumbnailUrl?: string;
}

export interface Review {
  id: string;
  source: ReviewSource;
  productHandle: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title?: string;
  body: string;
  createdAt: string;
  verifiedBuyer: boolean;
  media: ReviewMedia[];
}

export interface ReviewSummary {
  productHandle: string;
  averageRating: number;
  count: number;
  ratingBreakdown: Record<1 | 2 | 3 | 4 | 5, number>;
}

export interface ReviewProvider {
  name: ReviewSource;
  isConfigured(): boolean;
  fetchReviews(productHandle: string): Promise<Review[]>;
  fetchSummary(productHandle: string): Promise<ReviewSummary>;
}

function emptySummary(productHandle: string): ReviewSummary {
  return {
    productHandle,
    averageRating: 0,
    count: 0,
    ratingBreakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  };
}

// ---------------------------------------------------------------------------
// Loox adapter
// ---------------------------------------------------------------------------
// Docs: https://help.loox.io/en/articles/2277440-loox-api

class LooxProvider implements ReviewProvider {
  name: ReviewSource = "loox";
  private apiKey = process.env.LOOX_API_KEY ?? "";

  isConfigured() {
    return Boolean(this.apiKey);
  }

  async fetchReviews(productHandle: string): Promise<Review[]> {
    if (!this.isConfigured()) return [];
    const res = await fetch(
      `https://loox.io/api/reviews?api_key=${this.apiKey}&product=${encodeURIComponent(productHandle)}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const json = await res.json();
    return (json.reviews ?? []).map(
      (r: {
        id: string;
        name: string;
        rating: number;
        title?: string;
        content: string;
        created_at: string;
        verified: boolean;
        photos?: string[];
        videos?: string[];
      }) => ({
        id: `loox-${r.id}`,
        source: "loox" as const,
        productHandle,
        author: r.name,
        rating: r.rating as Review["rating"],
        title: r.title,
        body: r.content,
        createdAt: r.created_at,
        verifiedBuyer: r.verified,
        media: [
          ...(r.photos ?? []).map((url) => ({ type: "image" as const, url })),
          ...(r.videos ?? []).map((url) => ({ type: "video" as const, url })),
        ],
      })
    );
  }

  async fetchSummary(productHandle: string): Promise<ReviewSummary> {
    const reviews = await this.fetchReviews(productHandle);
    return summarize(productHandle, reviews);
  }
}

// ---------------------------------------------------------------------------
// Judge.me adapter
// ---------------------------------------------------------------------------
// Docs: https://judge.me/api/docs

class JudgeMeProvider implements ReviewProvider {
  name: ReviewSource = "judgeme";
  private apiToken = process.env.JUDGEME_API_TOKEN ?? "";
  private shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "";

  isConfigured() {
    return Boolean(this.apiToken && this.shopDomain);
  }

  async fetchReviews(productHandle: string): Promise<Review[]> {
    if (!this.isConfigured()) return [];
    const res = await fetch(
      `https://judge.me/api/v1/reviews?api_token=${this.apiToken}&shop_domain=${this.shopDomain}&product_handle=${encodeURIComponent(productHandle)}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const json = await res.json();
    return (json.reviews ?? []).map(
      (r: {
        id: number;
        reviewer: { name: string };
        rating: number;
        title?: string;
        body: string;
        created_at: string;
        verified: boolean;
        pictures?: { urls: { original: string } }[];
      }) => ({
        id: `judgeme-${r.id}`,
        source: "judgeme" as const,
        productHandle,
        author: r.reviewer?.name ?? "Anonymous",
        rating: r.rating as Review["rating"],
        title: r.title,
        body: r.body,
        createdAt: r.created_at,
        verifiedBuyer: r.verified,
        media: (r.pictures ?? []).map((p) => ({ type: "image" as const, url: p.urls.original })),
      })
    );
  }

  async fetchSummary(productHandle: string): Promise<ReviewSummary> {
    const reviews = await this.fetchReviews(productHandle);
    return summarize(productHandle, reviews);
  }
}

function summarize(productHandle: string, reviews: Review[]): ReviewSummary {
  if (reviews.length === 0) return emptySummary(productHandle);
  const ratingBreakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as ReviewSummary["ratingBreakdown"];
  let total = 0;
  for (const r of reviews) {
    ratingBreakdown[r.rating] += 1;
    total += r.rating;
  }
  return {
    productHandle,
    averageRating: total / reviews.length,
    count: reviews.length,
    ratingBreakdown,
  };
}

const providers: ReviewProvider[] = [new LooxProvider(), new JudgeMeProvider()];

function activeProvider(): ReviewProvider | undefined {
  return providers.find((p) => p.isConfigured());
}

export async function getProductReviews(productHandle: string): Promise<Review[]> {
  const provider = activeProvider();
  if (!provider) return [];
  return provider.fetchReviews(productHandle);
}

export async function getReviewSummary(productHandle: string): Promise<ReviewSummary> {
  const provider = activeProvider();
  if (!provider) return emptySummary(productHandle);
  return provider.fetchSummary(productHandle);
}
