import { create } from "zustand";
import { CharmId, MAX_CHARMS } from "./shopify";

interface CharmoraState {
  charms: CharmId[];
  toggleCharm: (id: CharmId) => void;
  isReserveOpen: boolean;
  openReserve: () => void;
  closeReserve: () => void;
}

export const useCharmoraStore = create<CharmoraState>((set, get) => ({
  charms: ["flower", "star", "gem"],
  toggleCharm: (id) => {
    const { charms } = get();
    if (charms.includes(id)) {
      set({ charms: charms.filter((c) => c !== id) });
    } else if (charms.length < MAX_CHARMS) {
      set({ charms: [...charms, id] });
    }
  },
  isReserveOpen: false,
  openReserve: () => set({ isReserveOpen: true }),
  closeReserve: () => set({ isReserveOpen: false }),
}));
