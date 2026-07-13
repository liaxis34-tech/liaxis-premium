import Reveal from "../ui/Reveal";
import SectionLabel from "../ui/SectionLabel";
import ProductCard from "./ProductCard";
import { getRelatedProducts } from "@/lib/shopify";

export default async function RelatedProducts({ handle }: { handle: string }) {
  const products = await getRelatedProducts(handle, 4);
  if (products.length === 0) return null;

  return (
    <section className="border-t border-blush-100 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <SectionLabel>You May Also Love</SectionLabel>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.08}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
