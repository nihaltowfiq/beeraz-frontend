import { OrdersList } from '@/components/OrdersList';

export default function OrdersPage() {
  return (
    <>
      <div className="mf-page-header">
        <div>
          <h1>Your orders</h1>
          <p className="mf-muted">Served by the orders zone (:3002)</p>
        </div>
      </div>
      <OrdersList />
    </>
  );
}
