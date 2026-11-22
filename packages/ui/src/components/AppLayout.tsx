import type { ReactNode } from 'react';
import { Header, type Zone } from './Header';

/** Page chrome (header + main + footer) used by the root layout of every zone. */
export function AppLayout({
  active,
  shellUrl,
  children,
}: {
  active: Zone;
  shellUrl?: string;
  children: ReactNode;
}) {
  return (
    <div className="mf-app">
      <Header active={active} shellUrl={shellUrl} />
      <main className="mf-container mf-main">{children}</main>
      <footer className="mf-footer">
        <div className="mf-container">Beeraz · Next.js Multi-Zone Micro-Frontends · Turbopack + SWC</div>
      </footer>
    </div>
  );
}
