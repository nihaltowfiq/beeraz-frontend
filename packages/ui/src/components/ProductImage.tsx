import { cn } from '../utils';

export function ProductImage({
  emoji,
  color,
  size = 'md',
}: {
  emoji: string;
  color: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  return (
    <div className={cn('mf-product-image', `mf-product-image--${size}`)} style={{ background: color }}>
      <span aria-hidden>{emoji}</span>
    </div>
  );
}
