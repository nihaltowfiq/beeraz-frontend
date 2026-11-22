import type { HTMLAttributes } from 'react';
import { cn } from '../utils';

type DivProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, interactive, ...rest }: DivProps & { interactive?: boolean }) {
  return <div className={cn('mf-card', interactive && 'mf-card--interactive', className)} {...rest} />;
}

export function CardHeader({ className, ...rest }: DivProps) {
  return <div className={cn('mf-card__header', className)} {...rest} />;
}

export function CardBody({ className, ...rest }: DivProps) {
  return <div className={cn('mf-card__body', className)} {...rest} />;
}

export function CardFooter({ className, ...rest }: DivProps) {
  return <div className={cn('mf-card__footer', className)} {...rest} />;
}
