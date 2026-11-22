import Link from 'next/link';
import { EmptyState } from '@beeraz/ui';

export default function NotFound() {
  return (
    <EmptyState
      icon="🔍"
      title="Product not found"
      description="We couldn't find the product you were looking for."
      action={
        <Link href="/" className="mf-btn mf-btn--primary mf-btn--md">
          Back to products
        </Link>
      }
    />
  );
}
