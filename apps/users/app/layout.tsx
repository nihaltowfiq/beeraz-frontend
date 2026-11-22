import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { AppLayout } from '@beeraz/ui';
import '@beeraz/ui/styles.css';

export const metadata: Metadata = {
  title: 'Beeraz · Users',
  description: 'User profile & address book micro-frontend',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppLayout active="users" shellUrl={process.env.NEXT_PUBLIC_SHELL_URL}>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
