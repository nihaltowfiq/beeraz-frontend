import { products } from '@beeraz/ui/data';
import { ProductsCatalog } from '@/components/ProductsCatalog';

export default function ProductsPage() {
  return (
    <>
      <div className="mf-page-header">
        <div>
          <h1>Products</h1>
          <p className="mf-muted">
            {products.length} items · search, filter &amp; reviews in the products zone (:3001)
          </p>
        </div>
      </div>

      <ProductsCatalog products={products} />
    </>
  );
}
