// Shared domain types for the Shopify Storefront API integration.
// These mirror the shape of the Storefront GraphQL API so components can be
// written against real data from day one, even while `lib/mock-data.ts`
// stands in for a connected store.

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
}

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  compareAtPrice: Money | null;
  selectedOptions: { name: string; value: string }[];
  image: ShopifyImage | null;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  images: ShopifyImage[];
  videos?: { url: string; alt: string | null }[];
  variants: ProductVariant[];
  options: ProductOption[];
  priceRange: { minVariantPrice: Money; maxVariantPrice: Money };
  tags: string[];
  collections?: string[];
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
  products: Product[];
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: ProductVariant & { product: Pick<Product, "handle" | "title" | "images"> };
  attributes: { key: string; value: string }[];
  cost: { totalAmount: Money };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
  };
  lines: CartLine[];
}
