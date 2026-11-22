import type { ReactNode } from 'react';

export function EmptyState({
  icon = '📭',
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mf-empty">
      <div className="mf-empty__icon">{icon}</div>
      <h2 className="mf-empty__title">{title}</h2>
      {description && <p className="mf-muted">{description}</p>}
      {action && <div className="mf-empty__action">{action}</div>}
    </div>
  );
}
