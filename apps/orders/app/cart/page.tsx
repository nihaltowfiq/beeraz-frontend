import type { Metadata } from 'next';
import { CartView } from '@/components/CartView';

export const metadata: Metadata = {
  title: 'Shopping Cart · Beeraz',
};

export default function CartPage() {
  return (
    <>
      <div className="mf-page-header">
        <div>
          <h1>Shopping cart</h1>
          <p className="mf-muted">Served by the orders zone (:3002)</p>
        </div>
      </div>
      <CartView />
    </>
  );
}
