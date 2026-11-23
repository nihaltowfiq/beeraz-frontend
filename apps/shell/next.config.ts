import path from 'node:path';
import type { NextConfig } from 'next';

/**
 * SHELL (host / consumer) — http://localhost:3000
 *
 * Owns `/` and composes the other zones (providers) under a single origin
 * using rewrites (Next.js Multi-Zones). No webpack / Module Federation:
 * every app is compiled by Turbopack + SWC.
 */
/**
 * Zone origins come from the env files (.env.development / .env.qa /
 * .env.production). Localhost fallbacks only apply to `next dev`; a
 * production/QA build fails fast if a zone URL is missing.
 */
function zoneUrl(name: string, devFallback: string): string {
  const value = process.env[name]?.trim();
  if (value) return value.replace(/\/+$/, '');
  if (process.env.NODE_ENV === 'production') {
    throw new Error(`[shell] Missing required env var ${name} (set it in .env.${process.env.NEXT_PUBLIC_APP_ENV ?? 'production'})`);
  }
  return devFallback;
}

const zones = {
  products: zoneUrl('PRODUCTS_URL', 'http://localhost:3001'),
  orders: zoneUrl('ORDERS_URL', 'http://localhost:3002'),
  users: zoneUrl('USERS_URL', 'http://localhost:3004'),
};

const nextConfig: NextConfig = {
  // Compile the shared UI library's TS/TSX source with SWC.
  transpilePackages: ['@beeraz/ui'],
  turbopack: {
    root: path.resolve(process.cwd(), '../..'),
  },
  async rewrites() {
    return Object.entries(zones).flatMap(([zone, url]) => [
      { source: `/${zone}`, destination: `${url}/${zone}` },
      { source: `/${zone}/:path+`, destination: `${url}/${zone}/:path+` },
    ]);
  },
};

export default nextConfig;
