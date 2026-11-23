'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ButtonLink, Card, CardBody, CardFooter, CardHeader } from '@beeraz/ui';
import { shellUrl } from '@/lib/constants';

export function PaymentSuccessView() {
  const params = useSearchParams();
  const orderId = params.get('orderId');

  return (
    <Card style={{ maxWidth: 560, margin: '2rem auto' }}>
      <CardHeader>Payment Confirmed ✓</CardHeader>
      <CardBody className="mf-stack">
        <div style={{ fontSize: '2.5rem' }}>🎉</div>
        <h2>Thank you for your order!</h2>
        <p className="mf-muted">
          {orderId
            ? `Order ${orderId} has been placed and is now processing.`
            : 'Your payment succeeded and your order is now processing.'}
        </p>
      </CardBody>
      <CardFooter>
        <Link
          href={orderId ? `/${orderId}` : '/'}
          className="mf-btn mf-btn--primary mf-btn--md"
        >
          Track order →
        </Link>
        <ButtonLink href={`${shellUrl}/products`} variant="ghost">
          Continue shopping
        </ButtonLink>
      </CardFooter>
    </Card>
  );
}
