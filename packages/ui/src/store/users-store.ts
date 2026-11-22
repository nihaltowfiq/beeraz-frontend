'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

interface UsersState {
  profile: UserProfile;
  addresses: Address[];
  updateProfile: (profile: UserProfile) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

const INITIAL_PROFILE: UserProfile = {
  name: 'Nihal Rahman',
  email: 'nihal@beeraz.example.com',
  phone: '+880 1700-000000',
};

const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'addr-home',
    label: 'Home',
    fullName: 'Nihal Rahman',
    street: 'House 24, Road 7, Dhanmondi',
    city: 'Dhaka',
    postalCode: '1205',
    country: 'Bangladesh',
    isDefault: true,
  },
  {
    id: 'addr-office',
    label: 'Office',
    fullName: 'Nihal Rahman',
    street: 'Level 8, Gulshan Avenue',
    city: 'Dhaka',
    postalCode: '1212',
    country: 'Bangladesh',
    isDefault: false,
  },
];

export const USERS_STORAGE_KEY = 'beeraz-users';

export const useUsersStore = create<UsersState>()(
  persist(
    (set) => ({
      profile: INITIAL_PROFILE,
      addresses: INITIAL_ADDRESSES,
      updateProfile: (profile) => set({ profile }),
      addAddress: (address) =>
        set((state) => {
          const id = `addr-${Date.now().toString(36)}`;
          const next = address.isDefault
            ? state.addresses.map((a) => ({ ...a, isDefault: false }))
            : state.addresses;
          return {
            addresses: [...next, { ...address, id, isDefault: address.isDefault || next.length === 0 }],
          };
        }),
      removeAddress: (id) =>
        set((state) => {
          const remaining = state.addresses.filter((a) => a.id !== id);
          if (remaining.length > 0 && !remaining.some((a) => a.isDefault)) {
            remaining[0] = { ...remaining[0], isDefault: true };
          }
          return { addresses: remaining };
        }),
      setDefaultAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.map((a) => ({ ...a, isDefault: a.id === id })),
        })),
    }),
    {
      name: USERS_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === USERS_STORAGE_KEY) void useUsersStore.persist.rehydrate();
  });
}
