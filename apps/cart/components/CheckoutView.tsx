'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  Badge,
  Button,
  ButtonLink,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  EmptyState,
  formatPrice,
} from '@beeraz/ui';
import {
  selectTotalPrice,
  useCartStore,
  useHydrated,
  useOrdersStore,
  useUsersStore,
} from '@beeraz/ui/store';
import { CartTabs } from '@/components/CartTabs';

const shellUrl = process.env.NEXT_PUBLIC_SHELL_URL ?? '';
const SHIPPING_FREE_FROM = 500;
const SHIPPING_FEE = 9.99;

type PaymentMethod = 'card' | 'wallet' | 'cod';

export function CheckoutView() {
  const router = useRouter();
  const hydrated = useHydrated();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore(selectTotalPrice);
  const clearCart = useCartStore((s) => s.clear);
  const placeOrder = useOrdersStore((s) => s.placeOrder);
  const addresses = useUsersStore((s) => s.addresses);

  const defaultAddr = addresses.find((a) => a.isDefault) ?? addresses[0];
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [walletProvider, setWalletProvider] = useState('bKash / Nagad');
  const [submitting, setSubmitting] = useState(false);

  if (!hydrated) {
    return (
      <>
        <CartTabs active="checkout" />
        <p className="mf-muted">Loading checkout…</p>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <CartTabs active="checkout" />
        <EmptyState
          icon="💳"
          title="Nothing to check out"
          description="Add items to your cart before proceeding to payment."
          action={<ButtonLink href={`${shellUrl}/products`}>Browse products</ButtonLink>}
        />
      </>
    );
  }

  const activeAddress =
    addresses.find((a) => a.id === selectedAddressId) ?? defaultAddr;
  const shipping = subtotal >= SHIPPING_FREE_FROM ? 0 : SHIPPING_FEE;

  const handlePay = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const shippingAddress = activeAddress
      ? `${activeAddress.fullName}, ${activeAddress.street}, ${activeAddress.city} ${activeAddress.postalCode}, ${activeAddress.country}`
      : 'Standard Delivery';

    const paymentLabel =
      paymentMethod === 'card'
        ? `Card ending in ${cardNumber.replace(/\s+/g, '').slice(-4) || '4242'}`
        : paymentMethod === 'wallet'
          ? `Digital Wallet (${walletProvider})`
          : 'Cash on Delivery';

    const order = placeOrder(items, shipping, {
      shippingAddress,
      paymentMethod: paymentLabel,
    });
    clearCart();
    router.push(`/payment-success?orderId=${encodeURIComponent(order.id)}`);
  };

  return (
    <>
      <CartTabs active="checkout" />
      <form onSubmit={handlePay} className="mf-two-col">
        <div className="mf-stack">
          <Card>
            <CardHeader>
              <div className="mf-row">
                <span>1. Delivery Address</span>
                <span className="mf-spacer" />
                <a href={`${shellUrl}/users`} className="mf-muted" style={{ fontSize: '0.85rem' }}>
                  Manage addresses →
                </a>
              </div>
            </CardHeader>
            <CardBody className="mf-stack">
              {addresses.length === 0 ? (
                <p className="mf-muted">
                  No saved addresses.{' '}
                  <a href={`${shellUrl}/users`} style={{ textDecoration: 'underline' }}>
                    Add one in Users
                  </a>
                  .
                </p>
              ) : (
                addresses.map((addr) => {
                  const checked = activeAddress?.id === addr.id;
                  return (
                    <label
                      key={addr.id}
                      style={{
                        display: 'flex',
                        gap: '0.75rem',
                        alignItems: 'flex-start',
                        padding: '0.75rem',
                        borderRadius: 8,
                        border: `1px solid ${checked ? 'var(--mf-primary)' : 'var(--mf-border)'}`,
                        cursor: 'pointer',
                      }}
                    >
                      <input
                        type="radio"
                        name="address"
                        checked={checked}
                        onChange={() => setSelectedAddressId(addr.id)}
                        style={{ marginTop: '0.25rem' }}
                      />
                      <div>
                        <div className="mf-row">
                          <strong>{addr.label}</strong>
                          {addr.isDefault && <Badge tone="info">Default</Badge>}
                        </div>
                        <p className="mf-muted" style={{ fontSize: '0.9rem' }}>
                          {addr.fullName} · {addr.street}, {addr.city} {addr.postalCode}, {addr.country}
                        </p>
                      </div>
                    </label>
                  );
                })
              )}
            </CardBody>
          </Card>

          <Card>
            <CardHeader>2. Payment Method</CardHeader>
            <CardBody className="mf-stack">
              <div className="mf-tabs" style={{ marginBottom: 0 }}>
                <button
                  type="button"
                  className={`mf-tab ${paymentMethod === 'card' ? 'mf-tab--active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  💳 Credit / Debit Card
                </button>
                <button
                  type="button"
                  className={`mf-tab ${paymentMethod === 'wallet' ? 'mf-tab--active' : ''}`}
                  onClick={() => setPaymentMethod('wallet')}
                >
                  📱 Digital Wallet
                </button>
                <button
                  type="button"
                  className={`mf-tab ${paymentMethod === 'cod' ? 'mf-tab--active' : ''}`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  💵 Cash on Delivery
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="mf-stack">
                  <div className="mf-field">
                    <label htmlFor="card-name" className="mf-label">
                      Cardholder name
                    </label>
                    <input
                      id="card-name"
                      className="mf-input"
                      required
                      placeholder="Nihal Rahman"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>
                  <div className="mf-field">
                    <label htmlFor="card-number" className="mf-label">
                      Card number
                    </label>
                    <input
                      id="card-number"
                      className="mf-input"
                      required
                      inputMode="numeric"
                      placeholder="4242 4242 4242 4242"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div className="mf-form-grid mf-form-grid--2">
                    <div className="mf-field">
                      <label htmlFor="card-expiry" className="mf-label">
                        Expiry (MM/YY)
                      </label>
                      <input
                        id="card-expiry"
                        className="mf-input"
                        required
                        placeholder="12/28"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                      />
                    </div>
                    <div className="mf-field">
                      <label htmlFor="card-cvc" className="mf-label">
                        CVC
                      </label>
                      <input
                        id="card-cvc"
                        className="mf-input"
                        required
                        inputMode="numeric"
                        placeholder="123"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'wallet' && (
                <div className="mf-field">
                  <label htmlFor="wallet-provider" className="mf-label">
                    Wallet provider
                  </label>
                  <select
                    id="wallet-provider"
                    className="mf-select"
                    value={walletProvider}
                    onChange={(e) => setWalletProvider(e.target.value)}
                  >
                    <option value="bKash / Nagad">bKash / Nagad</option>
                    <option value="Apple Pay">Apple Pay</option>
                    <option value="Google Pay">Google Pay</option>
                  </select>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <p className="mf-muted">
                  Pay in cash when your order is delivered to your selected address.
                </p>
              )}
            </CardBody>
          </Card>
        </div>

        <Card style={{ alignSelf: 'start' }}>
          <CardHeader>Payment Summary</CardHeader>
          <CardBody className="mf-stack">
            {items.map((item) => (
              <div key={item.id} className="mf-summary-row">
                <span className="mf-muted">
                  {item.emoji} {item.name} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
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
            <Button type="submit" size="lg" fullWidth disabled={submitting}>
              {submitting ? 'Processing payment…' : `Pay ${formatPrice(subtotal + shipping)}`}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
