import path from 'node:path';
import type { NextConfig } from 'next';

/**
 * USERS zone (provider) — http://localhost:3004/users
 * Served to the shell at http://localhost:3000/users via rewrites.
 */
const nextConfig: NextConfig = {
  basePath: '/users',
  transpilePackages: ['@beeraz/ui'],
  turbopack: {
    root: path.resolve(process.cwd(), '../..'),
  },
  async redirects() {
    return [{ source: '/', destination: '/users', basePath: false, permanent: false }];
  },
};

export default nextConfig;
