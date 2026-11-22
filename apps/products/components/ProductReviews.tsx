'use client';

import { useState, type FormEvent } from 'react';
import { Badge, Button, Card, CardBody, CardHeader, formatDate } from '@beeraz/ui';
import { useHydrated, useReviewsStore } from '@beeraz/ui/store';

export function ProductReviews({ productId, baseRating }: { productId: string; baseRating: number }) {
  const hydrated = useHydrated();
  const allReviews = useReviewsStore((s) => s.reviews);
  const addReview = useReviewsStore((s) => s.addReview);

  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const reviews = hydrated ? allReviews.filter((r) => r.productId === productId) : [];
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : baseRating.toFixed(1);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;
    addReview({
      productId,
      author: author.trim(),
      rating,
      comment: comment.trim(),
    });
    setAuthor('');
    setRating(5);
    setComment('');
  };

  return (
    <div style={{ marginTop: '2rem' }} className="mf-two-col">
      <Card>
        <CardHeader>
          <div className="mf-row">
            <span>Customer Reviews ({reviews.length})</span>
            <span className="mf-spacer" />
            <Badge tone="warning">★ {avgRating}</Badge>
          </div>
        </CardHeader>
        <CardBody className="mf-stack">
          {!hydrated ? (
            <p className="mf-muted">Loading reviews…</p>
          ) : reviews.length === 0 ? (
            <p className="mf-muted">No reviews yet. Be the first to review this product!</p>
          ) : (
            reviews.map((rev) => (
              <div
                key={rev.id}
                style={{
                  paddingBottom: '0.9rem',
                  borderBottom: '1px solid var(--mf-border)',
                }}
              >
                <div className="mf-row">
                  <strong>{rev.author}</strong>
                  <Badge tone="warning">{'★'.repeat(rev.rating)}</Badge>
                  <span className="mf-spacer" />
                  <span className="mf-muted" style={{ fontSize: '0.8rem' }}>
                    {formatDate(rev.createdAt)}
                  </span>
                </div>
                <p style={{ margin: '0.4rem 0 0' }}>{rev.comment}</p>
              </div>
            ))
          )}
        </CardBody>
      </Card>

      <Card style={{ alignSelf: 'start' }}>
        <CardHeader>Write a review</CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="mf-stack">
            <div className="mf-field">
              <label htmlFor="review-author" className="mf-label">
                Your name
              </label>
              <input
                id="review-author"
                className="mf-input"
                required
                placeholder="e.g. Tariq A."
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="mf-field">
              <label htmlFor="review-rating" className="mf-label">
                Rating
              </label>
              <select
                id="review-rating"
                className="mf-select"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                <option value={5}>5 ★ — Excellent</option>
                <option value={4}>4 ★ — Very good</option>
                <option value={3}>3 ★ — Good</option>
                <option value={2}>2 ★ — Fair</option>
                <option value={1}>1 ★ — Poor</option>
              </select>
            </div>
            <div className="mf-field">
              <label htmlFor="review-comment" className="mf-label">
                Comment
              </label>
              <textarea
                id="review-comment"
                className="mf-textarea"
                rows={3}
                required
                placeholder="Share your experience with this product…"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <Button type="submit" fullWidth>
              Submit review
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
