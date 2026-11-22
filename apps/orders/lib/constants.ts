import type { OrderStatus } from '@beeraz/ui/store';

export const statusTone: Record<OrderStatus, 'info' | 'warning' | 'success'> = {
  processing: 'warning',
  shipped: 'info',
  delivered: 'success',
};

export const shellUrl = process.env.NEXT_PUBLIC_SHELL_URL ?? '';
