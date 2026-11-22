'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { CartItem } from './cart-store';

export type OrderStatus = 'processing' | 'shipped' | 'delivered';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  shippingAddress?: string;
  paymentMethod?: string;
}

interface OrdersState {
  orders: Order[];
  placeOrder: (
    items: CartItem[],
    shipping?: number,
    meta?: { shippingAddress?: string; paymentMethod?: string },
  ) => Order;
  getOrder: (id: string) => Order | undefined;
  clearOrders: () => void;
}

export const ORDERS_STORAGE_KEY = 'mf-orders';

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      placeOrder: (items, shipping = 0, meta) => {
        const order: Order = {
          id: `ORD-${Date.now().toString(36).toUpperCase()}`,
          items,
          total: items.reduce((sum, i) => sum + i.price * i.quantity, 0) + shipping,
          status: 'processing',
          createdAt: new Date().toISOString(),
          shippingAddress: meta?.shippingAddress,
          paymentMethod: meta?.paymentMethod,
        };
        set((state) => ({ orders: [order, ...state.orders] }));
        return order;
      },
      getOrder: (id) => get().orders.find((o) => o.id === id),
      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: ORDERS_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === ORDERS_STORAGE_KEY) void useOrdersStore.persist.rehydrate();
  });
}
