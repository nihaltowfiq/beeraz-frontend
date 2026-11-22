'use client';

import Link from 'next/link';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  EmptyState,
  ProductImage,
  formatDate,
  formatPrice,
} from '@beeraz/ui';
import { useHydrated, useOrdersStore } from '@beeraz/ui/store';
import { statusTone } from '@/lib/constants';

export function OrderDetail({ id }: { id: string }) {
  const hydrated = useHydrated();
  const order = useOrdersStore((s) => s.orders.find((o) => o.id === id));

  if (!hydrated) return <p className="mf-muted">Loading order…</p>;

  if (!order) {
    return (
      <EmptyState
        icon="🔍"
        title="Order not found"
        description={`No order with id ${id} exists in this browser.`}
        action={
          <Link href="/" className="mf-btn mf-btn--primary mf-btn--md">
            Back to orders
          </Link>
        }
      />
    );
  }

  return (
    <div className="mf-two-col">
      <Card>
        <CardHeader>Items</CardHeader>
        <ul className="mf-list">
          {order.items.map((item) => (
            <li key={item.id}>
              <ProductImage emoji={item.emoji} color={item.color} size="sm" />
              <div>
                <strong>{item.name}</strong>
                <p className="mf-muted">
                  {item.quantity} × {formatPrice(item.price)}
                </p>
              </div>
              <span className="mf-spacer" />
              <span className="mf-price">{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <CardHeader>Order {order.id}</CardHeader>
        <CardBody>
          <div className="mf-summary-row">
            <span className="mf-muted">Status</span>
            <Badge tone={statusTone[order.status]}>{order.status}</Badge>
          </div>
          <div className="mf-summary-row">
            <span className="mf-muted">Placed</span>
            <span>{formatDate(order.createdAt)}</span>
          </div>
          {order.paymentMethod && (
            <div className="mf-summary-row">
              <span className="mf-muted">Payment</span>
              <span>{order.paymentMethod}</span>
            </div>
          )}
          {order.shippingAddress && (
            <div className="mf-summary-row">
              <span className="mf-muted">Ship to</span>
              <span style={{ textAlign: 'right', maxWidth: 220 }}>{order.shippingAddress}</span>
            </div>
          )}
          <div className="mf-summary-row mf-summary-row--total">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
