import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { AppLayout } from '@beeraz/ui';
import '@beeraz/ui/styles.css';

export const metadata: Metadata = {
  title: 'Beeraz · Shell',
  description: 'Next.js micro-frontend shell (host)',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppLayout active="home">{children}</AppLayout>
      </body>
    </html>
  );
}
