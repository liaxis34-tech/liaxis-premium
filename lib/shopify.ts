import type { Cart, Collection, Product } from "./types";
import { getMockProduct, MOCK_PRODUCTS } from "./mock-data";

// ---------------------------------------------------------------------------
// Shopify Storefront API client
// ---------------------------------------------------------------------------
// This file is the single integration point for Shopify. It is written
// against the real Storefront GraphQL API so a live store can be connected
// by setting the two env vars below — no component code needs to change.
//
//   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
//   SHOPIFY_STOREFRONT_ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//
// Until those are set, every fetcher below falls back to the local catalog
// in lib/mock-data.ts so the site stays fully demoable.

export const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "";
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? "";
const API_VERSION = "2025-01";

export const isShopifyConfigured = Boolean(SHOPIFY_DOMAIN && STOREFRONT_TOKEN);

function endpoint() {
  return `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`;
}

async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
  tags: string[] = []
): Promise<T> {
  if (!isShopifyConfigured) {
    throw new Error(
      "Shopify Storefront API is not configured. Set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN."
    );
  }

  const res = await fetch(endpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { tags },
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join("; "));
  }
  return json.data as T;
}

// ---------------------------------------------------------------------------
// GraphQL fragments & queries
// ---------------------------------------------------------------------------

const MONEY_FRAGMENT = /* GraphQL */ `
  fragment MoneyFields on MoneyV2 {
    amount
    currencyCode
  }
`;

const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    tags
    images(first: 10) {
      nodes {
        url
        altText
        width
        height
      }
    }
    options {
      id
      name
      values
    }
    variants(first: 25) {
      nodes {
        id
        title
        availableForSale
        price {
          ...MoneyFields
        }
        compareAtPrice {
          ...MoneyFields
        }
        selectedOptions {
          name
          value
        }
        image {
          url
          altText
        }
      }
    }
    priceRange {
      minVariantPrice {
        ...MoneyFields
      }
      maxVariantPrice {
        ...MoneyFields
      }
    }
  }
  ${MONEY_FRAGMENT}
`;

const PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFields
    }
  }
  ${PRODUCT_FRAGMENT}
`;

const ALL_PRODUCTS_QUERY = /* GraphQL */ `
  query AllProducts($first: Int = 24) {
    products(first: $first) {
      nodes {
        ...ProductFields
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

const COLLECTION_BY_HANDLE_QUERY = /* GraphQL */ `
  query CollectionByHandle($handle: String!, $first: Int = 24) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        url
        altText
      }
      products(first: $first) {
        nodes {
          ...ProductFields
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        ...MoneyFields
      }
      totalAmount {
        ...MoneyFields
      }
    }
    lines(first: 50) {
      nodes {
        id
        quantity
        attributes {
          key
          value
        }
        cost {
          totalAmount {
            ...MoneyFields
          }
        }
        merchandise {
          ... on ProductVariant {
            id
            title
            availableForSale
            price {
              ...MoneyFields
            }
            compareAtPrice {
              ...MoneyFields
            }
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
            }
            product {
              handle
              title
              images(first: 1) {
                nodes {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
  ${MONEY_FRAGMENT}
`;

const CART_CREATE_MUTATION = /* GraphQL */ `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        ...CartFields
      }
      userErrors {
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

const CART_LINES_ADD_MUTATION = /* GraphQL */ `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

const CART_LINES_UPDATE_MUTATION = /* GraphQL */ `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

const CART_LINES_REMOVE_MUTATION = /* GraphQL */ `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFields
      }
      userErrors {
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

const CART_QUERY = /* GraphQL */ `
  query CartById($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFields
    }
  }
  ${CART_FRAGMENT}
`;

// ---------------------------------------------------------------------------
// Public product / collection API
// ---------------------------------------------------------------------------

export async function getProduct(handle: string): Promise<Product | undefined> {
  if (!isShopifyConfigured) return getMockProduct(handle);
  const data = await shopifyFetch<{ product: Product | null }>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle },
    ["products", `product-${handle}`]
  );
  return data.product ?? undefined;
}

export async function getAllProducts(first = 24): Promise<Product[]> {
  if (!isShopifyConfigured) return MOCK_PRODUCTS;
  const data = await shopifyFetch<{ products: { nodes: Product[] } }>(
    ALL_PRODUCTS_QUERY,
    { first },
    ["products"]
  );
  return data.products.nodes;
}

export async function getCollection(handle: string): Promise<Collection | undefined> {
  if (!isShopifyConfigured) {
    return {
      id: `mock-collection-${handle}`,
      handle,
      title: "Charm Jewelry",
      description: "",
      image: null,
      products: MOCK_PRODUCTS,
    };
  }
  const data = await shopifyFetch<{ collection: Collection | null }>(
    COLLECTION_BY_HANDLE_QUERY,
    { handle },
    ["collections", `collection-${handle}`]
  );
  return data.collection ?? undefined;
}

export async function getRelatedProducts(handle: string, limit = 4): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.handle !== handle).slice(0, limit);
}

// ---------------------------------------------------------------------------
// Cart (Storefront Cart API)
// ---------------------------------------------------------------------------

export interface CartLineInput {
  merchandiseId: string;
  quantity: number;
  attributes?: { key: string; value: string }[];
}

export async function createCart(lines: CartLineInput[]): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: { cart: Cart } }>(CART_CREATE_MUTATION, {
    lines,
  });
  return data.cartCreate.cart;
}

export async function addCartLines(cartId: string, lines: CartLineInput[]): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: Cart } }>(CART_LINES_ADD_MUTATION, {
    cartId,
    lines,
  });
  return data.cartLinesAdd.cart;
}

export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: Cart } }>(
    CART_LINES_UPDATE_MUTATION,
    { cartId, lines }
  );
  return data.cartLinesUpdate.cart;
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: Cart } }>(
    CART_LINES_REMOVE_MUTATION,
    { cartId, lineIds }
  );
  return data.cartLinesRemove.cart;
}

export async function getCart(cartId: string): Promise<Cart | undefined> {
  const data = await shopifyFetch<{ cart: Cart | null }>(CART_QUERY, { cartId });
  return data.cart ?? undefined;
}

export function getCheckoutUrl(cart: Cart | null): string | undefined {
  return cart?.checkoutUrl;
}
