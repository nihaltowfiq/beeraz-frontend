'use client';

import { Button, type ButtonSize } from '@beeraz/ui';
import type { Product } from '@beeraz/ui/data';
import { useHydrated, useWishlistStore } from '@beeraz/ui/store';

export function WishlistButton({
  product,
  size = 'sm',
}: {
  product: Product;
  size?: ButtonSize;
}) {
  const hydrated = useHydrated();
  const inWishlist = useWishlistStore((s) => s.items.some((i) => i.id === product.id));
  const toggleItem = useWishlistStore((s) => s.toggleItem);

  const saved = hydrated && inWishlist;

  return (
    <Button
      variant={saved ? 'secondary' : 'ghost'}
      size={size}
      onClick={() =>
        toggleItem({
          id: product.id,
          name: product.name,
          price: product.price,
          emoji: product.emoji,
          color: product.color,
        })
      }
      aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
      title={saved ? 'Saved in wishlist' : 'Save to wishlist'}
    >
      {saved ? '♥ Saved' : '♡ Save'}
    </Button>
  );
}
