import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ReviewSection from "@/components/product/ReviewSection";
import RelatedProducts from "@/components/product/RelatedProducts";
import RecentlyViewed from "@/components/product/RecentlyViewed";
import StickyAddToCart from "@/components/product/StickyAddToCart";
import { getProduct } from "@/lib/shopify";
import { getReviewSummary } from "@/lib/reviews";

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return {};
  return {
    title: product.title,
    description: product.description,
    openGraph: { title: product.title, description: product.description },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const reviewSummary = await getReviewSummary(handle);
  const basePrice = Number(product.priceRange.minVariantPrice.amount);
  const compareAtVariant = product.variants.find((v) => v.compareAtPrice);
  const compareAtPrice = compareAtVariant?.compareAtPrice
    ? Number(compareAtVariant.compareAtPrice.amount)
    : undefined;

  return (
    <>
      <Header />
      <main className="pt-24">
        <section className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <ProductGallery charms={["flower", "star", "moon", "gem"]} />
            <ProductInfo
              productHandle={product.handle}
              title={product.title}
              description={product.description}
              basePrice={basePrice}
              compareAtPrice={compareAtPrice}
              reviewSummary={reviewSummary}
            />
          </div>
        </section>

        <ReviewSection productHandle={handle} />
        <RelatedProducts handle={handle} />
        <RecentlyViewed currentHandle={handle} />
      </main>
      <Footer />
      <StickyAddToCart productHandle={product.handle} title={product.title} basePrice={basePrice} />
    </>
  );
}
