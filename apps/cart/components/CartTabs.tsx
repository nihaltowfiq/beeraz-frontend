'use client';

import Link from 'next/link';
import { useCartStore, useHydrated, useWishlistStore } from '@beeraz/ui/store';

export type CartTab = 'cart' | 'wishlist' | 'checkout';

export function CartTabs({ active }: { active: CartTab }) {
  const hydrated = useHydrated();
  const cartCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const wishlistCount = useWishlistStore((s) => s.items.length);

  return (
    <div className="mf-tabs">
      <Link href="/" className={`mf-tab ${active === 'cart' ? 'mf-tab--active' : ''}`}>
        🛒 Cart{hydrated && cartCount > 0 ? ` (${cartCount})` : ''}
      </Link>
      <Link href="/wishlist" className={`mf-tab ${active === 'wishlist' ? 'mf-tab--active' : ''}`}>
        ♥ Wishlist{hydrated && wishlistCount > 0 ? ` (${wishlistCount})` : ''}
      </Link>
      <Link href="/checkout" className={`mf-tab ${active === 'checkout' ? 'mf-tab--active' : ''}`}>
        💳 Checkout &amp; Payment
      </Link>
    </div>
  );
}
