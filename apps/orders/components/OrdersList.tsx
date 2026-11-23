'use client';

import Link from 'next/link';
import { Badge, Button, ButtonLink, Card, EmptyState, formatDate, formatPrice } from '@beeraz/ui';
import { useHydrated, useOrdersStore } from '@beeraz/ui/store';
import { OrdersTabs } from '@/components/OrdersTabs';
import { shellUrl, statusTone } from '@/lib/constants';

export function OrdersList() {
  const hydrated = useHydrated();
  const orders = useOrdersStore((s) => s.orders);
  const clearOrders = useOrdersStore((s) => s.clearOrders);

  if (!hydrated) {
    return (
      <>
        <OrdersTabs active="orders" />
        <p className="mf-muted">Loading orders…</p>
      </>
    );
  }

  if (orders.length === 0) {
    return (
      <>
        <OrdersTabs active="orders" />
        <EmptyState
          icon="📦"
          title="No orders yet"
          description="Orders you place from your cart will show up here."
          action={<ButtonLink href={`${shellUrl}/products`}>Browse products</ButtonLink>}
        />
      </>
    );
  }

  return (
    <>
      <OrdersTabs active="orders" />
      <div className="mf-stack">
        <Card>
          <ul className="mf-list">
            {orders.map((order) => {
              const count = order.items.reduce((n, i) => n + i.quantity, 0);
              return (
                <li key={order.id}>
                  <div style={{ fontSize: '1.75rem' }}>{order.items[0]?.emoji ?? '📦'}</div>
                  <div>
                    <Link href={`/${order.id}`}>
                      <strong>{order.id}</strong>
                    </Link>
                    <p className="mf-muted">
                      {formatDate(order.createdAt)} · {count} item{count === 1 ? '' : 's'}
                    </p>
                  </div>
                  <span className="mf-spacer" />
                  <Badge tone={statusTone[order.status]}>{order.status}</Badge>
                  <span className="mf-price">{formatPrice(order.total)}</span>
                  <Link href={`/${order.id}`} className="mf-btn mf-btn--secondary mf-btn--sm">
                    View
                  </Link>
                </li>
              );
            })}
          </ul>
        </Card>
        <div>
          <Button variant="danger" size="sm" onClick={clearOrders}>
            Clear order history
          </Button>
        </div>
      </div>
    </>
  );
}
