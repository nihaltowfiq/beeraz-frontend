'use client';

import { useSearchParams } from 'next/navigation';
import { ButtonLink, Card, CardBody, CardFooter, CardHeader } from '@beeraz/ui';

const shellUrl = process.env.NEXT_PUBLIC_SHELL_URL ?? '';

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
        <ButtonLink href={orderId ? `${shellUrl}/orders/${orderId}` : `${shellUrl}/orders`}>
          Track order →
        </ButtonLink>
        <ButtonLink href={`${shellUrl}/products`} variant="ghost">
          Continue shopping
        </ButtonLink>
      </CardFooter>
    </Card>
  );
}
