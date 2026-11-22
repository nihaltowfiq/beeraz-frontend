import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { cn } from '../utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface StyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & StyleProps;
export type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & StyleProps;

function classes({ variant = 'primary', size = 'md', fullWidth }: StyleProps, extra?: string) {
  return cn('mf-btn', `mf-btn--${variant}`, `mf-btn--${size}`, fullWidth && 'mf-btn--full', extra);
}

export function Button({ variant, size, fullWidth, className, type = 'button', ...rest }: ButtonProps) {
  return <button type={type} className={classes({ variant, size, fullWidth }, className)} {...rest} />;
}

/**
 * Anchor styled as a button. Uses a plain <a> (hard navigation), which is
 * required when navigating between zones (e.g. shell -> products).
 */
export function ButtonLink({ variant, size, fullWidth, className, ...rest }: ButtonLinkProps) {
  return <a className={classes({ variant, size, fullWidth }, className)} {...rest} />;
}
