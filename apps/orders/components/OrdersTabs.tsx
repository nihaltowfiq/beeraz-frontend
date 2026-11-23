'use client';

import Link from 'next/link';
import { useCartStore, useHydrated, useOrdersStore } from '@beeraz/ui/store';

export type OrdersTab = 'orders' | 'cart' | 'checkout';

export function OrdersTabs({ active }: { active: OrdersTab }) {
  const hydrated = useHydrated();
  const ordersCount = useOrdersStore((s) => s.orders.length);
  const cartCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

  return (
    <div className="mf-tabs">
      <Link href="/" className={`mf-tab ${active === 'orders' ? 'mf-tab--active' : ''}`}>
        📦 Orders{hydrated && ordersCount > 0 ? ` (${ordersCount})` : ''}
      </Link>
      <Link href="/cart" className={`mf-tab ${active === 'cart' ? 'mf-tab--active' : ''}`}>
        🛒 Cart{hydrated && cartCount > 0 ? ` (${cartCount})` : ''}
      </Link>
      <Link href="/checkout" className={`mf-tab ${active === 'checkout' ? 'mf-tab--active' : ''}`}>
        💳 Checkout &amp; Payment
      </Link>
    </div>
  );
}
