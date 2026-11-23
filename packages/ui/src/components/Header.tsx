'use client';

import { selectTotalItems, useCartStore } from '../store/cart-store';
import { useHydrated } from '../store/use-hydrated';
import { cn } from '../utils';

export type Zone = 'home' | 'products' | 'orders' | 'users';

const NAV: Array<{ zone: Zone; label: string; path: string }> = [
  { zone: 'home', label: 'Home', path: '/' },
  { zone: 'products', label: 'Products', path: '/products' },
  { zone: 'orders', label: 'Orders', path: '/orders' },
  { zone: 'users', label: 'Users', path: '/users' },
];

/**
 * Global header shared by every zone.
 *
 * Links are plain <a> tags on purpose: each zone is a separate Next.js app,
 * so crossing zones must be a hard navigation (next/link only works inside
 * a single app).
 */
export function Header({ active, shellUrl = '' }: { active: Zone; shellUrl?: string }) {
  const hydrated = useHydrated();
  const count = useCartStore(selectTotalItems);

  return (
    <header className="mf-header">
      <div className="mf-container mf-header__inner">
        <a href={`${shellUrl}/`} className="mf-header__brand">
          <span className="mf-header__logo">◆</span> Beeraz
        </a>
        <nav className="mf-header__nav">
          {NAV.map((item) => (
            <a
              key={item.zone}
              href={`${shellUrl}${item.path}`}
              className={cn('mf-header__link', active === item.zone && 'mf-header__link--active')}
              aria-current={active === item.zone ? 'page' : undefined}
            >
              {item.label}
              {item.zone === 'orders' && hydrated && count > 0 && (
                <span className="mf-header__count" title="Items in cart">
                  {count}
                </span>
              )}
            </a>
          ))}
        </nav>
        <span className="mf-header__zone" title="Zone serving this page">
          zone: {active === 'home' ? 'shell' : active}
        </span>
      </div>
    </header>
  );
}
