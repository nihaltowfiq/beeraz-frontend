'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  EmptyState,
  ProductImage,
  formatPrice,
} from '@beeraz/ui';
import type { Product } from '@beeraz/ui/data';
import { AddToCartButton } from '@/components/AddToCartButton';
import { WishlistButton } from '@/components/WishlistButton';

type SortBy = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export function ProductsCatalog({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState<SortBy>('featured');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(products.map((p) => p.category)))],
    [products],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter((p) => {
      const matchesCat = category === 'All' || p.category === category;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });

    if (sortBy === 'price-asc') return [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') return [...list].sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') return [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, query, category, sortBy]);

  return (
    <div className="mf-stack">
      <div className="mf-form-grid mf-form-grid--2">
        <div className="mf-field">
          <label htmlFor="product-search" className="mf-label">
            Search products
          </label>
          <input
            id="product-search"
            type="search"
            className="mf-input"
            placeholder="Search by name, category, or keyword…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="mf-field">
          <label htmlFor="product-sort" className="mf-label">
            Sort by
          </label>
          <select
            id="product-sort"
            className="mf-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="mf-tabs" style={{ marginBottom: '0.5rem' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`mf-tab ${category === cat ? 'mf-tab--active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No matching products"
          description={`Nothing matched "${query}"${category !== 'All' ? ` in ${category}` : ''}.`}
        />
      ) : (
        <div className="mf-grid">
          {filtered.map((p) => (
            <Card key={p.id} interactive>
              {/* next/link inside a zone: basePath (/products) is prepended automatically */}
              <Link href={`/${p.id}`}>
                <ProductImage emoji={p.emoji} color={p.color} />
              </Link>
              <CardBody>
                <div className="mf-row">
                  <Badge>{p.category}</Badge>
                  <span className="mf-spacer" />
                  <Badge tone="warning">★ {p.rating}</Badge>
                </div>
                <Link href={`/${p.id}`}>
                  <h3 style={{ marginTop: '0.75rem' }}>{p.name}</h3>
                </Link>
                <p className="mf-muted">{p.description}</p>
              </CardBody>
              <CardFooter>
                <span className="mf-price">{formatPrice(p.price)}</span>
                <div className="mf-row" style={{ gap: '0.4rem' }}>
                  <WishlistButton product={p} size="sm" />
                  <AddToCartButton product={p} size="sm" />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
