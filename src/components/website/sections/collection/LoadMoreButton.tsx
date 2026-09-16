// src/components/website/sections/collection/LoadMoreButton.tsx
'use client';

import React from 'react';

interface LoadMoreButtonProps {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
}

export default function LoadMoreButton({ hasMore, isLoading, onLoadMore }: LoadMoreButtonProps) {
  if (!hasMore) return null;

  return (
    <div className="w-full flex justify-center py-16 md:py-24">
      <button
        onClick={onLoadMore}
        disabled={isLoading}
        className="
          group relative px-10 py-4 text-[11px] md:text-xs uppercase tracking-[0.25em] 
          text-[#2A2520] border border-[#2A2520]/20 transition-all duration-300
          hover:border-[#2A2520] hover:bg-[#2A2520] hover:text-[#FAF7F2]
          disabled:opacity-50 disabled:cursor-not-allowed
          focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B8935A]
        "
      >
        {isLoading ? 'Loading...' : 'View More Perfumes'}
      </button>
    </div>
  );
}