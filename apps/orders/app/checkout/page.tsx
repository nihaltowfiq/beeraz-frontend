import type { Metadata } from 'next';
import { CheckoutView } from '@/components/CheckoutView';

export const metadata: Metadata = {
  title: 'Checkout & Payment · Beeraz',
};

export default function CheckoutPage() {
  return (
    <>
      <div className="mf-page-header">
        <div>
          <h1>Checkout &amp; Payment</h1>
          <p className="mf-muted">Select your delivery address and complete payment</p>
        </div>
      </div>
      <CheckoutView />
    </>
  );
}
