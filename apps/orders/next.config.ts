import path from 'node:path';
import type { NextConfig } from 'next';

/**
 * ORDERS zone (provider) — http://localhost:3002/orders
 * Served to the shell at http://localhost:3000/orders via rewrites.
 */
const nextConfig: NextConfig = {
  basePath: '/orders',
  transpilePackages: ['@beeraz/ui'],
  turbopack: {
    root: path.resolve(process.cwd(), '../..'),
  },
  async redirects() {
    return [{ source: '/', destination: '/orders', basePath: false, permanent: false }];
  },
};

export default nextConfig;
