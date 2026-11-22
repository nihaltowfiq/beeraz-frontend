'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  emoji: string;
  color: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
}

export const CART_STORAGE_KEY = 'mf-cart';

/**
 * Cart store shared by all zones.
 *
 * Every zone bundles its own copy of this store, but because all zones are
 * served from the same origin (through the shell's rewrites) they share the
 * same localStorage entry. `persist` makes the state survive cross-zone
 * (hard) navigations, and the `storage` listener below keeps open tabs in sync.
 */
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity }] };
        }),
      removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: CART_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const selectTotalItems = (s: CartState) => s.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectTotalPrice = (s: CartState) =>
  s.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === CART_STORAGE_KEY) void useCartStore.persist.rehydrate();
  });
}
