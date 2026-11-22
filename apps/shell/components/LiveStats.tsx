'use client';

import { Card, CardBody, formatPrice } from '@beeraz/ui';
import { selectTotalItems, selectTotalPrice, useCartStore, useHydrated, useOrdersStore } from '@beeraz/ui/store';

/** Reads the shared zustand stores — the same state the other zones write to. */
export function LiveStats() {
  const hydrated = useHydrated();
  const itemCount = useCartStore(selectTotalItems);
  const cartTotal = useCartStore(selectTotalPrice);
  const orderCount = useOrdersStore((s) => s.orders.length);

  const stats = [
    { label: 'Items in cart', value: hydrated ? itemCount : '—' },
    { label: 'Cart total', value: hydrated ? formatPrice(cartTotal) : '—' },
    { label: 'Orders placed', value: hydrated ? orderCount : '—' },
  ];

  return (
    <div className="mf-grid">
      {stats.map((s) => (
        <Card key={s.label}>
          <CardBody>
            <p className="mf-muted" style={{ margin: 0 }}>{s.label}</p>
            <p style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0.25rem 0 0' }}>{s.value}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
