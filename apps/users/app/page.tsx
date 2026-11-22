import { UsersView } from '@/components/UsersView';

export default function UsersPage() {
  return (
    <>
      <div className="mf-page-header">
        <div>
          <h1>Users &amp; Addresses</h1>
          <p className="mf-muted">
            Manage your Beeraz profile and delivery addresses · served by the users zone (:3004)
          </p>
        </div>
      </div>
      <UsersView />
    </>
  );
}
