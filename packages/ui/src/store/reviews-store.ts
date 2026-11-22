'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewsState {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'headphones',
    author: 'Amina K.',
    rating: 5,
    comment: 'Super comfortable for long flights and the ANC blocks out cabin noise effortlessly.',
    createdAt: '2026-10-12T10:00:00.000Z',
  },
  {
    id: 'rev-2',
    productId: 'keyboard',
    author: 'Rafi M.',
    rating: 5,
    comment: 'Tactile switches feel crisp right out of the box. Great compact 75% layout.',
    createdAt: '2026-10-18T14:30:00.000Z',
  },
  {
    id: 'rev-3',
    productId: 'camera',
    author: 'Sadia T.',
    rating: 5,
    comment: 'Sharp 24MP stills and reliable stabilization even in low light.',
    createdAt: '2026-11-02T09:15:00.000Z',
  },
];

export const REVIEWS_STORAGE_KEY = 'beeraz-reviews';

export const useReviewsStore = create<ReviewsState>()(
  persist(
    (set) => ({
      reviews: INITIAL_REVIEWS,
      addReview: (review) =>
        set((state) => ({
          reviews: [
            {
              ...review,
              id: `rev-${Date.now().toString(36)}`,
              createdAt: new Date().toISOString(),
            },
            ...state.reviews,
          ],
        })),
    }),
    {
      name: REVIEWS_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === REVIEWS_STORAGE_KEY) void useReviewsStore.persist.rehydrate();
  });
}
