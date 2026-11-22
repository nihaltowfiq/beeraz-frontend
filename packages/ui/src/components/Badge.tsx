import type { HTMLAttributes } from 'react';
import { cn } from '../utils';

type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

export function Badge({
  tone = 'neutral',
  className,
  ...rest
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return <span className={cn('mf-badge', `mf-badge--${tone}`, className)} {...rest} />;
}
