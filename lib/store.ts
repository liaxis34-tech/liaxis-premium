import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CHARM_OPTIONS, CharmOption, SIGNATURE_PRODUCT_HANDLE } from "./mock-data";

const MAX_CHARM_SLOTS = 4;

// ---------------------------------------------------------------------------
// Build Your Charm — selection state for the interactive charm builder
// ---------------------------------------------------------------------------

interface CharmBuilderState {
  selected: string[]; // ordered CharmOption ids, max MAX_CHARM_SLOTS
  toggleCharm: (id: string) => void;
  clear: () => void;
  charms: () => CharmOption[];
  totalPrice: (basePrice: number) => number;
  isFull: () => boolean;
}

export const useCharmBuilder = create<CharmBuilderState>((set, get) => ({
  selected: ["charm-flower", "charm-star"],
  toggleCharm: (id) =>
    set((state) => {
      if (state.selected.includes(id)) {
        return { selected: state.selected.filter((s) => s !== id) };
      }
      if (state.selected.length >= MAX_CHARM_SLOTS) return state;
      return { selected: [...state.selected, id] };
    }),
  clear: () => set({ selected: [] }),
  charms: () => {
    const { selected } = get();
    return selected
      .map((id) => CHARM_OPTIONS.find((c) => c.id === id))
      .filter((c): c is CharmOption => Boolean(c));
  },
  totalPrice: (basePrice) => {
    const charms = get().charms();
    return basePrice + charms.reduce((sum, c) => sum + c.price, 0);
  },
  isFull: () => get().selected.length >= MAX_CHARM_SLOTS,
}));

// ---------------------------------------------------------------------------
// Cart — works standalone (local, persisted) and is the shape a real
// Shopify Cart API response would hydrate into once lib/shopify.ts is
// connected to a live store.
// ---------------------------------------------------------------------------

export interface CartItem {
  lineId: string;
  productHandle: string;
  title: string;
  unitPrice: number;
  quantity: number;
  charms: { name: string; meaning: string }[];
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addItem: (item: Omit<CartItem, "lineId">) => void;
  removeItem: (lineId: string) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  totalQuantity: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, { ...item, lineId: crypto.randomUUID() }],
          isOpen: true,
        })),
      removeItem: (lineId) =>
        set((state) => ({ items: state.items.filter((i) => i.lineId !== lineId) })),
      setQuantity: (lineId, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.lineId === lineId ? { ...i, quantity } : i))
            .filter((i) => i.quantity > 0),
        })),
      totalQuantity: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () => get().items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
    }),
    { name: "charmora-cart" }
  )
);

// ---------------------------------------------------------------------------
// Recently viewed products
// ---------------------------------------------------------------------------

interface RecentlyViewedState {
  handles: string[];
  add: (handle: string) => void;
}

export const useRecentlyViewed = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      handles: [],
      add: (handle) => {
        const existing = get().handles.filter((h) => h !== handle);
        set({ handles: [handle, ...existing].slice(0, 6) });
      },
    }),
    { name: "charmora-recently-viewed" }
  )
);

export const DEFAULT_PRODUCT_HANDLE = SIGNATURE_PRODUCT_HANDLE;
