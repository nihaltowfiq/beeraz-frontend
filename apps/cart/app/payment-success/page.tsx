import { Suspense } from 'react';
import type { Metadata } from 'next';
import { PaymentSuccessView } from '@/components/PaymentSuccessView';

export const metadata: Metadata = {
  title: 'Payment Successful · Beeraz',
};

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<p className="mf-muted">Loading confirmation…</p>}>
      <PaymentSuccessView />
    </Suspense>
  );
}
