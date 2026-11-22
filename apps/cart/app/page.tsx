import { CartView } from '@/components/CartView';

export default function CartPage() {
  return (
    <>
      <div className="mf-page-header">
        <div>
          <h1>Shopping cart</h1>
          <p className="mf-muted">Served by the cart zone (:3003)</p>
        </div>
      </div>
      <CartView />
    </>
  );
}
