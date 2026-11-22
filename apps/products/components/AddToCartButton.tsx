'use client';

import { useEffect, useState } from 'react';
import { Button, QuantityStepper, type ButtonSize } from '@beeraz/ui';
import type { Product } from '@beeraz/ui/data';
import { useCartStore } from '@beeraz/ui/store';

export function AddToCartButton({
  product,
  size = 'md',
  fullWidth,
  withQuantity,
}: {
  product: Product;
  size?: ButtonSize;
  fullWidth?: boolean;
  withQuantity?: boolean;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1500);
    return () => clearTimeout(t);
  }, [added]);

  const handleAdd = () => {
    const { id, name, price, emoji, color } = product;
    addItem({ id, name, price, emoji, color }, quantity);
    setAdded(true);
  };

  const button = (
    <Button size={size} fullWidth={fullWidth} onClick={handleAdd}>
      {added ? '✓ Added' : 'Add to cart'}
    </Button>
  );

  if (!withQuantity) return button;

  return (
    <div className="mf-row">
      <QuantityStepper value={quantity} onChange={setQuantity} />
      {button}
    </div>
  );
}
