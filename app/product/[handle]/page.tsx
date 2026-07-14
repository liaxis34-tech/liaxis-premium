import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ReviewsSection from "@/components/reviews/ReviewsSection";
import RelatedProducts from "@/components/product/RelatedProducts";
import RecentlyViewed from "@/components/product/RecentlyViewed";
import StickyAddToCart from "@/components/product/StickyAddToCart";
import { getProduct } from "@/lib/shopify";
import { getReviewSummary } from "@/lib/reviews";
import { SIGNATURE_PRODUCT_IMAGES } from "@/lib/mock-data";

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
            <ProductGallery images={SIGNATURE_PRODUCT_IMAGES} />
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

        <section id="reviews" className="border-t border-blush-100 py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6 md:px-10">
            <ReviewsSection productHandle={handle} />
          </div>
        </section>
        <RelatedProducts handle={handle} />
        <RecentlyViewed currentHandle={handle} />
      </main>
      <Footer />
      <StickyAddToCart productHandle={product.handle} title={product.title} basePrice={basePrice} />
    </>
  );
}
