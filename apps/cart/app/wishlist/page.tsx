import type { Metadata } from 'next';
import { WishlistView } from '@/components/WishlistView';

export const metadata: Metadata = {
  title: 'Wishlist · Beeraz',
};

export default function WishlistPage() {
  return (
    <>
      <div className="mf-page-header">
        <div>
          <h1>Wishlist</h1>
          <p className="mf-muted">Saved items · move to cart whenever you are ready</p>
        </div>
      </div>
      <WishlistView />
    </>
  );
}
