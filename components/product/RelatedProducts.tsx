import Reveal from "../ui/Reveal";
import SectionLabel from "../ui/SectionLabel";
import ProductCard from "./ProductCard";
import { getRelatedProducts } from "@/lib/shopify";

export default async function RelatedProducts({ handle }: { handle: string }) {
  const products = await getRelatedProducts(handle, 4);
  if (products.length === 0) return null;

  return (
    <section className="border-t border-blush-100 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="text-center sm:text-left">
          <SectionLabel>You May Also Love</SectionLabel>
          <h2 className="mt-5 font-display text-3xl font-light text-ink-deep md:text-4xl">
            Complete your story
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3 lg:gap-x-10">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.1}>
              <ProductCard product={product} index={i + 1} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
