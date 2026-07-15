import { create } from "zustand";
import { CharmId, MAX_CHARMS, PRODUCTS, getProduct, goToCheckout } from "./shopify";

interface CharmoraState {
  activeProductId: string;
  setActiveProduct: (id: string) => void;
  charms: CharmId[];
  toggleCharm: (id: CharmId) => void;
  checkoutUnavailable: boolean;
  buyActiveProduct: () => void;
}

let noticeTimeout: ReturnType<typeof setTimeout> | undefined;

export const useCharmoraStore = create<CharmoraState>((set, get) => ({
  activeProductId: PRODUCTS[0].id,
  setActiveProduct: (id) => set({ activeProductId: id, checkoutUnavailable: false }),
  charms: ["flower", "star", "gem"],
  toggleCharm: (id) => {
    const { charms } = get();
    if (charms.includes(id)) {
      set({ charms: charms.filter((c) => c !== id) });
    } else if (charms.length < MAX_CHARMS) {
      set({ charms: [...charms, id] });
    }
  },
  checkoutUnavailable: false,
  buyActiveProduct: () => {
    const product = getProduct(get().activeProductId);
    const ok = goToCheckout(product, get().charms);
    if (!ok) {
      set({ checkoutUnavailable: true });
      clearTimeout(noticeTimeout);
      noticeTimeout = setTimeout(() => set({ checkoutUnavailable: false }), 3200);
    }
  },
}));
