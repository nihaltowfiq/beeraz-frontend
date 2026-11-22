import { Badge, ButtonLink, Card, CardBody, CardFooter, ProductImage, formatPrice } from '@beeraz/ui';
import { products } from '@beeraz/ui/data';
import { LiveStats } from '@/components/LiveStats';

const ZONES = [
  { name: 'Products', href: '/products', port: 3001, icon: '🛍️', text: 'Browse, search, and review products.' },
  { name: 'Orders', href: '/orders', port: 3002, icon: '📦', text: 'Track the orders you have placed.' },
  { name: 'Cart', href: '/cart', port: 3003, icon: '🛒', text: 'Manage cart, wishlist, and checkout payments.' },
  { name: 'Users', href: '/users', port: 3004, icon: '👤', text: 'Manage your profile and delivery addresses.' },
];

export default function HomePage() {
  const featured = products.slice(0, 3);

  return (
    <>
      <section className="mf-hero">
        <Badge tone="info">Shell · localhost:3000</Badge>
        <h1 style={{ marginTop: '0.75rem' }}>Welcome to Beeraz</h1>
        <p>
          This page is served by the <strong>shell</strong>. Products, Orders, Cart and Users are
          independent Next.js apps stitched together under one domain with Multi-Zones — built with
          Turbopack &amp; SWC, no webpack.
        </p>
        <ButtonLink href="/products" variant="secondary" size="lg">
          Start shopping →
        </ButtonLink>
      </section>

      <LiveStats />

      <h2 className="mf-section-title">Micro-frontends</h2>
      <div className="mf-grid">
        {ZONES.map((zone) => (
          <a key={zone.name} href={zone.href}>
            <Card interactive>
              <CardBody>
                <div style={{ fontSize: '2rem' }}>{zone.icon}</div>
                <h3 style={{ marginTop: '0.5rem' }}>{zone.name}</h3>
                <p className="mf-muted">{zone.text}</p>
              </CardBody>
              <CardFooter>
                <code className="mf-code">{zone.href}</code>
                <Badge>:{zone.port}</Badge>
              </CardFooter>
            </Card>
          </a>
        ))}
      </div>

      <h2 className="mf-section-title">Featured products</h2>
      <div className="mf-grid">
        {featured.map((p) => (
          <a key={p.id} href={`/products/${p.id}`}>
            <Card interactive>
              <ProductImage emoji={p.emoji} color={p.color} />
              <CardBody>
                <h3>{p.name}</h3>
                <p className="mf-muted">{p.category}</p>
              </CardBody>
              <CardFooter>
                <span className="mf-price">{formatPrice(p.price)}</span>
                <Badge tone="warning">★ {p.rating}</Badge>
              </CardFooter>
            </Card>
          </a>
        ))}
      </div>
    </>
  );
}
