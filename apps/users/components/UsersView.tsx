'use client';

import { useState, type FormEvent } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader } from '@beeraz/ui';
import { useHydrated, useUsersStore } from '@beeraz/ui/store';

export function UsersView() {
  const hydrated = useHydrated();
  const profile = useUsersStore((s) => s.profile);
  const addresses = useUsersStore((s) => s.addresses);
  const { updateProfile, addAddress, removeAddress, setDefaultAddress } =
    useUsersStore.getState();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profileSaved, setProfileSaved] = useState(false);

  const [label, setLabel] = useState('');
  const [fullName, setFullName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('Bangladesh');
  const [isDefault, setIsDefault] = useState(false);

  if (!hydrated) return <p className="mf-muted">Loading user profile &amp; addresses…</p>;

  const handleProfileSave = (e: FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: (name || profile.name).trim(),
      email: (email || profile.email).trim(),
      phone: (phone || profile.phone).trim(),
    });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  const handleAddAddress = (e: FormEvent) => {
    e.preventDefault();
    if (!label.trim() || !fullName.trim() || !street.trim() || !city.trim()) return;
    addAddress({
      label: label.trim(),
      fullName: fullName.trim(),
      street: street.trim(),
      city: city.trim(),
      postalCode: postalCode.trim(),
      country: country.trim(),
      isDefault,
    });
    setLabel('');
    setFullName('');
    setStreet('');
    setCity('');
    setPostalCode('');
    setIsDefault(false);
  };

  return (
    <div className="mf-stack" style={{ gap: '1.5rem' }}>
      <Card>
        <CardHeader>Profile</CardHeader>
        <form onSubmit={handleProfileSave}>
          <CardBody className="mf-form-grid mf-form-grid--2">
            <div className="mf-field">
              <label htmlFor="profile-name" className="mf-label">
                Full name
              </label>
              <input
                id="profile-name"
                className="mf-input"
                defaultValue={profile.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mf-field">
              <label htmlFor="profile-email" className="mf-label">
                Email
              </label>
              <input
                id="profile-email"
                type="email"
                className="mf-input"
                defaultValue={profile.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mf-field">
              <label htmlFor="profile-phone" className="mf-label">
                Phone
              </label>
              <input
                id="profile-phone"
                className="mf-input"
                defaultValue={profile.phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </CardBody>
          <CardFooter>
            <span className="mf-muted" style={{ fontSize: '0.85rem' }}>
              {profileSaved ? '✓ Profile saved' : 'Synced across Beeraz zones'}
            </span>
            <Button type="submit" size="sm">
              Save profile
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="mf-two-col">
        <Card>
          <CardHeader>Saved Addresses ({addresses.length})</CardHeader>
          <CardBody className="mf-stack">
            {addresses.length === 0 ? (
              <p className="mf-muted">No addresses saved yet. Add one on the right.</p>
            ) : (
              addresses.map((addr) => (
                <div
                  key={addr.id}
                  style={{
                    padding: '0.9rem',
                    borderRadius: 10,
                    border: '1px solid var(--mf-border)',
                  }}
                >
                  <div className="mf-row">
                    <strong>{addr.label}</strong>
                    {addr.isDefault && <Badge tone="info">Default</Badge>}
                    <span className="mf-spacer" />
                    {!addr.isDefault && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDefaultAddress(addr.id)}
                      >
                        Set default
                      </Button>
                    )}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeAddress(addr.id)}
                      aria-label="Delete address"
                    >
                      ✕
                    </Button>
                  </div>
                  <p style={{ margin: '0.4rem 0 0', fontWeight: 500 }}>{addr.fullName}</p>
                  <p className="mf-muted" style={{ fontSize: '0.9rem' }}>
                    {addr.street}, {addr.city} {addr.postalCode}, {addr.country}
                  </p>
                </div>
              ))
            )}
          </CardBody>
        </Card>

        <Card style={{ alignSelf: 'start' }}>
          <CardHeader>Add New Address</CardHeader>
          <form onSubmit={handleAddAddress}>
            <CardBody className="mf-stack">
              <div className="mf-form-grid mf-form-grid--2">
                <div className="mf-field">
                  <label htmlFor="addr-label" className="mf-label">
                    Label
                  </label>
                  <input
                    id="addr-label"
                    className="mf-input"
                    required
                    placeholder="Home / Office"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                  />
                </div>
                <div className="mf-field">
                  <label htmlFor="addr-fullname" className="mf-label">
                    Recipient name
                  </label>
                  <input
                    id="addr-fullname"
                    className="mf-input"
                    required
                    placeholder="Nihal Rahman"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
              <div className="mf-field">
                <label htmlFor="addr-street" className="mf-label">
                  Street address
                </label>
                <input
                  id="addr-street"
                  className="mf-input"
                  required
                  placeholder="House 24, Road 7"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
              <div className="mf-form-grid mf-form-grid--2">
                <div className="mf-field">
                  <label htmlFor="addr-city" className="mf-label">
                    City
                  </label>
                  <input
                    id="addr-city"
                    className="mf-input"
                    required
                    placeholder="Dhaka"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="mf-field">
                  <label htmlFor="addr-postal" className="mf-label">
                    Postal code
                  </label>
                  <input
                    id="addr-postal"
                    className="mf-input"
                    required
                    placeholder="1205"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
              </div>
              <div className="mf-field">
                <label htmlFor="addr-country" className="mf-label">
                  Country
                </label>
                <input
                  id="addr-country"
                  className="mf-input"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <label className="mf-row" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                />
                Set as default delivery address
              </label>
            </CardBody>
            <CardFooter>
              <Button type="submit" fullWidth>
                Add address
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
