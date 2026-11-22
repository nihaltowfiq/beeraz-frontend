'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * Returns `false` during SSR / the hydration pass and `true` afterwards.
 * Use it to avoid hydration mismatches when rendering persisted (localStorage) state.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
