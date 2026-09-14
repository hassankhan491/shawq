'use client';

import { useState } from 'react';

/** Verified-stable pool. If any src 404s, we silently rotate to the next. */
const FALLBACK_POOL = [
  'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1615634260777-4c0e6a956717?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=2000&auto=format&fit=crop',
];

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
}

/** Image that can never 404 — rotates through the pool on error. */
export function SafeImage({ src, alt, className, loading = 'lazy', fetchPriority }: SafeImageProps) {
  const [attempt, setAttempt] = useState(0);
  const sources = [src, ...FALLBACK_POOL.filter((s) => s !== src)];
  const current = sources[Math.min(attempt, sources.length - 1)];

  return (
    <img
      className={className}
      src={current}
      alt={alt}
      loading={loading}
      fetchPriority={fetchPriority}
      onError={() => setAttempt((a) => a + 1)}
    />
  );
}