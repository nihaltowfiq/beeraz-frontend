import { ButtonLink, EmptyState } from '@beeraz/ui';

export default function NotFound() {
  return (
    <EmptyState
      icon="🧭"
      title="Page not found"
      description="This route is not owned by the shell or any zone."
      action={<ButtonLink href="/">Go home</ButtonLink>}
    />
  );
}
