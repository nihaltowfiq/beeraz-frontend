import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge, Card, CardBody, ProductImage, formatPrice } from '@beeraz/ui';
import { getProduct, products } from '@beeraz/ui/data';
import { AddToCartButton } from '@/components/AddToCartButton';
import { ProductReviews } from '@/components/ProductReviews';
import { WishlistButton } from '@/components/WishlistButton';

type Params = Promise<{ id: string }>;

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  return { title: product ? `${product.name} · Beeraz` : 'Product not found' };
}

export default async function ProductDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <>
      <Link href="/" className="mf-back">
        ← All products
      </Link>
      <div className="mf-two-col">
        <Card>
          <ProductImage emoji={product.emoji} color={product.color} size="lg" />
        </Card>
        <Card>
          <CardBody className="mf-stack">
            <div className="mf-row">
              <Badge>{product.category}</Badge>
              <Badge tone="warning">★ {product.rating}</Badge>
            </div>
            <h1>{product.name}</h1>
            <p className="mf-muted">{product.description}</p>
            <span className="mf-price" style={{ fontSize: '1.75rem' }}>
              {formatPrice(product.price)}
            </span>
            <AddToCartButton product={product} size="lg" fullWidth withQuantity />
            <WishlistButton product={product} size="md" />
          </CardBody>
        </Card>
      </div>

      <ProductReviews productId={product.id} baseRating={product.rating} />
    </>
  );
}
