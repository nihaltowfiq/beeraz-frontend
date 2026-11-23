'use client';

import Link from 'next/link';
import { useHydrated, useWishlistStore } from '@beeraz/ui/store';

export type UsersTab = 'profile' | 'wishlist';

export function UsersTabs({ active }: { active: UsersTab }) {
  const hydrated = useHydrated();
  const wishlistCount = useWishlistStore((s) => s.items.length);

  return (
    <div className="mf-tabs">
      <Link href="/" className={`mf-tab ${active === 'profile' ? 'mf-tab--active' : ''}`}>
        👤 Profile &amp; Addresses
      </Link>
      <Link href="/wishlist" className={`mf-tab ${active === 'wishlist' ? 'mf-tab--active' : ''}`}>
        ♥ Wishlist{hydrated && wishlistCount > 0 ? ` (${wishlistCount})` : ''}
      </Link>
    </div>
  );
}
