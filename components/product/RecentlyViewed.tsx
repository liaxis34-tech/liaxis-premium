"use client";

import { useEffect } from "react";
import ProductCard from "./ProductCard";
import SectionLabel from "../ui/SectionLabel";
import { useRecentlyViewed } from "@/lib/store";
import { getMockProduct } from "@/lib/mock-data";

// Reads from local storage on the client. Once connected to a live store,
// this would resolve handles through a small `/api/products` route instead
// of the local catalog, since the Storefront token stays server-only.
export default function RecentlyViewed({ currentHandle }: { currentHandle: string }) {
  const { handles, add } = useRecentlyViewed();

  useEffect(() => {
    add(currentHandle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHandle]);

  const products = handles
    .filter((h) => h !== currentHandle)
    .map((h) => getMockProduct(h))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (products.length === 0) return null;

  return (
    <section className="border-t border-blush-100 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionLabel>Recently Viewed</SectionLabel>
        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
