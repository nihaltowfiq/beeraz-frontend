# Beeraz — E-Commerce Micro-Frontend Monorepo

Turborepo · Next.js Multi-Zones · Turbopack + SWC

```
beeraz/
├─ apps/
│  ├─ shell/      :3000  host / consumer   → owns "/" and proxies the zones
│  ├─ products/   :3001  provider          → basePath /products (catalog, search, reviews)
│  ├─ orders/     :3002  provider          → basePath /orders (orders, cart, checkout & payment)
│  └─ users/      :3004  provider          → basePath /users (profile, address book & wishlist)
├─ packages/
│  ├─ ui/                 @beeraz/ui  shared components, zustand stores, mock data, styles
│  └─ typescript-config/  @beeraz/typescript-config  shared tsconfig presets
├─ scripts/clean.mjs      cross-platform artifact cleanup
├─ turbo.json             Turborepo task pipeline
└─ pnpm-workspace.yaml
```

## How it works

| Concern | Solution |
| --- | --- |
| Monorepo | **pnpm workspaces + Turborepo** (task graph, caching, parallel runs). |
| Composition | **Next.js Multi-Zones**: the shell's `rewrites()` proxy `/products/*`, `/orders/*`, `/users/*` to the provider apps, so everything is served from one origin. |
| Bundler / compiler | **Turbopack** + **SWC**. No webpack, no Babel. |
| Shared UI | `@beeraz/ui`, compiled from TS source via `transpilePackages`. |
| Shared state | **zustand** + `persist` → `localStorage` (same origin via the shell). |

## Getting started

```bash
pnpm install
pnpm dev            # all 4 apps via turbo (development env)
```

Open **http://localhost:3000**.

## Scripts (run from the repo root)

| Command | Environment | What it does |
| --- | --- | --- |
| `pnpm dev` | development | `next dev` for all apps |
| `pnpm dev:qa` | qa | `next dev` with `.env.qa` |
| `pnpm dev:<app>` | development | single app (`shell`, `products`, `orders`, `users`) |
| `pnpm build` / `pnpm build:prod` | production | production build of all apps |
| `pnpm build:qa` | qa | optimized build using `.env.qa` |
| `pnpm start` / `pnpm start:prod` | production | build (cached) + start |
| `pnpm start:qa` | qa | QA build (cached) + start |
| `pnpm typecheck` | – | `next typegen` + `tsc` in every package |
| `pnpm clean` | – | remove `.next`, `.turbo`, etc. |

Filter any task to one app: `pnpm turbo run build:qa --filter=users`.

## Environments

Each app has its own env files:

| File | Loaded by | Committed? |
| --- | --- | --- |
| `.env.development` | `next dev` | ✅ (non-secret) |
| `.env.qa` | `*:qa` scripts (via `dotenv -c qa`) | ✅ (non-secret) |
| `.env.production` | `next build` / `next start` | ✅ (non-secret) |
| `.env.example` | documentation / template | ✅ |
| `.env.<env>.local`, `.env.local`, `.env` | overrides & **secrets** | ❌ git-ignored |

Precedence (highest first): real process env (CI/hosting) → `.env.<env>.local` → `.env.<env>` → `.env.local` → `.env`.

| Variable | App | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_ENV` | all | `development` / `qa` / `production` |
| `PRODUCTS_URL`, `ORDERS_URL`, `USERS_URL` | shell | origins of the deployed zones (required for QA/prod builds) |
| `NEXT_PUBLIC_SHELL_URL` | zones | header link target; empty = relative links (through the shell) |

> [!IMPORTANT]
> The QA/production zone URLs (`*.beeraz.example.com`) are placeholders — replace
> them with your real domains in `apps/shell/.env.qa` and `apps/shell/.env.production`,
> or override them in your CI/hosting environment. To run a production build locally,
> create `apps/shell/.env.production.local` pointing at `http://localhost:300x`.

> [!CAUTION]
> Never put secrets in the committed `.env.development` / `.env.qa` / `.env.production`
> files, and never prefix secrets with `NEXT_PUBLIC_` (those are inlined into client JS).
> Use `.env.<env>.local` locally and your CI/hosting secret store in pipelines.
