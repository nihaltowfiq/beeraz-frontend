import path from 'node:path';
import type { NextConfig } from 'next';

/**
 * CART zone (provider) — http://localhost:3003/cart
 * Served to the shell at http://localhost:3000/cart via rewrites.
 */
const nextConfig: NextConfig = {
  basePath: '/cart',
  transpilePackages: ['@beeraz/ui'],
  turbopack: {
    root: path.resolve(process.cwd(), '../..'),
  },
  async redirects() {
    return [{ source: '/', destination: '/cart', basePath: false, permanent: false }];
  },
};

export default nextConfig;
