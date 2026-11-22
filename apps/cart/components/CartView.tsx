'use client';

import Link from 'next/link';
import {
  Button,
  ButtonLink,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  EmptyState,
  ProductImage,
  QuantityStepper,
  formatPrice,
} from '@beeraz/ui';
import {
  selectTotalItems,
  selectTotalPrice,
  useCartStore,
  useHydrated,
  useWishlistStore,
} from '@beeraz/ui/store';
import { CartTabs } from '@/components/CartTabs';

const shellUrl = process.env.NEXT_PUBLIC_SHELL_URL ?? '';
const SHIPPING_FREE_FROM = 500;
const SHIPPING_FEE = 9.99;

export function CartView() {
  const hydrated = useHydrated();
  const items = useCartStore((s) => s.items);
  const totalItems = useCartStore(selectTotalItems);
  const subtotal = useCartStore(selectTotalPrice);
  const { updateQuantity, removeItem, clear } = useCartStore.getState();
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const wishlistItems = useWishlistStore((s) => s.items);

  if (!hydrated) {
    return (
      <>
        <CartTabs active="cart" />
        <p className="mf-muted">Loading cart…</p>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <CartTabs active="cart" />
        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          description="Add something from the products zone or move items from your wishlist."
          action={<ButtonLink href={`${shellUrl}/products`}>Browse products</ButtonLink>}
        />
      </>
    );
  }

  const shipping = subtotal >= SHIPPING_FREE_FROM ? 0 : SHIPPING_FEE;

  const handleSaveForLater = (item: (typeof items)[number]) => {
    const alreadySaved = wishlistItems.some((w) => w.id === item.id);
    if (!alreadySaved) {
      toggleWishlist({
        id: item.id,
        name: item.name,
        price: item.price,
        emoji: item.emoji,
        color: item.color,
      });
    }
    removeItem(item.id);
  };

  return (
    <>
      <CartTabs active="cart" />
      <div className="mf-two-col">
        <Card>
          <CardHeader>
            {totalItems} item{totalItems === 1 ? '' : 's'}
          </CardHeader>
          <ul className="mf-list">
            {items.map((item) => (
              <li key={item.id}>
                <ProductImage emoji={item.emoji} color={item.color} size="sm" />
                <div>
                  <a href={`${shellUrl}/products/${item.id}`}>
                    <strong>{item.name}</strong>
                  </a>
                  <p className="mf-muted">{formatPrice(item.price)} each</p>
                </div>
                <span className="mf-spacer" />
                <QuantityStepper value={item.quantity} onChange={(q) => updateQuantity(item.id, q)} />
                <span className="mf-price" style={{ minWidth: 90, textAlign: 'right' }}>
                  {formatPrice(item.price * item.quantity)}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSaveForLater(item)}
                  title="Move to wishlist"
                >
                  ♡
                </Button>
                <Button variant="danger" size="sm" onClick={() => removeItem(item.id)} aria-label="Remove">
                  ✕
                </Button>
              </li>
            ))}
          </ul>
          <CardFooter>
            <ButtonLink href={`${shellUrl}/products`} variant="ghost" size="sm">
              ← Continue shopping
            </ButtonLink>
            <Button variant="danger" size="sm" onClick={clear}>
              Clear cart
            </Button>
          </CardFooter>
        </Card>

        <Card style={{ alignSelf: 'start' }}>
          <CardHeader>Order summary</CardHeader>
          <CardBody>
            <div className="mf-summary-row">
              <span className="mf-muted">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="mf-summary-row">
              <span className="mf-muted">Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div className="mf-summary-row mf-summary-row--total">
              <span>Total</span>
              <span>{formatPrice(subtotal + shipping)}</span>
            </div>
          </CardBody>
          <CardFooter>
            <Link href="/checkout" className="mf-btn mf-btn--primary mf-btn--lg mf-btn--full">
              Proceed to Checkout →
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
