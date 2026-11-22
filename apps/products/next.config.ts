import path from 'node:path';
import type { NextConfig } from 'next';

/**
 * PRODUCTS zone (provider) — http://localhost:3001/products
 * Served to the shell at http://localhost:3000/products via rewrites.
 */
const nextConfig: NextConfig = {
  // Every route AND every asset (/products/_next/...) lives under this prefix,
  // so the shell can proxy the whole zone with a single rewrite.
  basePath: '/products',
  transpilePackages: ['@beeraz/ui'],
  turbopack: {
    root: path.resolve(process.cwd(), '../..'),
  },
  async redirects() {
    // Standalone convenience: http://localhost:3001 -> /products
    return [{ source: '/', destination: '/products', basePath: false, permanent: false }];
  },
};

export default nextConfig;
