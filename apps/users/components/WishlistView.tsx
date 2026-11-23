'use client';

import {
  Button,
  ButtonLink,
  Card,
  CardBody,
  CardFooter,
  EmptyState,
  ProductImage,
  formatPrice,
} from '@beeraz/ui';
import { useCartStore, useHydrated, useWishlistStore } from '@beeraz/ui/store';
import { UsersTabs } from '@/components/UsersTabs';

const shellUrl = process.env.NEXT_PUBLIC_SHELL_URL ?? '';

export function WishlistView() {
  const hydrated = useHydrated();
  const items = useWishlistStore((s) => s.items);
  const { removeItem, clear } = useWishlistStore.getState();
  const addToCart = useCartStore((s) => s.addItem);

  if (!hydrated) {
    return (
      <>
        <UsersTabs active="wishlist" />
        <p className="mf-muted">Loading wishlist…</p>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <UsersTabs active="wishlist" />
        <EmptyState
          icon="♡"
          title="Your wishlist is empty"
          description="Save items you love from the products catalog."
          action={<ButtonLink href={`${shellUrl}/products`}>Browse products</ButtonLink>}
        />
      </>
    );
  }

  const handleMoveToCart = (item: (typeof items)[number]) => {
    addToCart(item, 1);
    removeItem(item.id);
  };

  return (
    <>
      <UsersTabs active="wishlist" />
      <div className="mf-stack">
        <div className="mf-grid">
          {items.map((item) => (
            <Card key={item.id}>
              <a href={`${shellUrl}/products/${item.id}`}>
                <ProductImage emoji={item.emoji} color={item.color} />
              </a>
              <CardBody>
                <a href={`${shellUrl}/products/${item.id}`}>
                  <h3>{item.name}</h3>
                </a>
                <p className="mf-price" style={{ marginTop: '0.5rem' }}>
                  {formatPrice(item.price)}
                </p>
              </CardBody>
              <CardFooter>
                <Button size="sm" onClick={() => handleMoveToCart(item)}>
                  Move to cart
                </Button>
                <Button variant="danger" size="sm" onClick={() => removeItem(item.id)}>
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div>
          <Button variant="ghost" size="sm" onClick={clear}>
            Clear wishlist
          </Button>
        </div>
      </div>
    </>
  );
}
