import Link from 'next/link';
import { OrderDetail } from '@/components/OrderDetail';

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <>
      <Link href="/" className="mf-back">
        ← All orders
      </Link>
      <OrderDetail id={id} />
    </>
  );
}
