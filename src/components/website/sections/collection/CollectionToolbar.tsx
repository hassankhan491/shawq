// src/components/website/sections/collection/CollectionToolbar.tsx
'use client';

import React from 'react';

interface CollectionToolbarProps {
  count: number;
  sort: string;
  onSortChange: (value: string) => void;
  onFilterClick: () => void;
}

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'alpha', label: 'A – Z' },
];

export default function CollectionToolbar({ 
  count, 
  sort, 
  onSortChange, 
  onFilterClick 
}: CollectionToolbarProps) {
  return (
    <div className="w-full border-b border-[#2A2520]/10 py-5 md:py-6">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between">
        
        {/* Product Count */}
        <p className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-[#2A2520]/60">
          {count} {count === 1 ? 'Perfume' : 'Perfumes'}
        </p>

        {/* Controls */}
        <div className="flex items-center gap-6 md:gap-8">
          
          {/* Sort Dropdown */}
          <div className="relative flex items-center">
            <label htmlFor="sort-select" className="sr-only">Sort by</label>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-transparent pr-5 text-[11px] md:text-xs uppercase tracking-[0.2em] text-[#2A2520] outline-none cursor-pointer focus:text-[#B8935A] transition-colors"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%232A2520' stroke-width='1.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right center',
                backgroundSize: '12px',
              }}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Button */}
          <button
            onClick={onFilterClick}
            className="flex items-center gap-2 text-[11px] md:text-xs uppercase tracking-[0.2em] text-[#2A2520] transition-colors hover:text-[#B8935A] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B8935A] rounded-sm"
            aria-label="Open filters"
          >
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M3 6h18M6 12h12M10 18h4" />
            </svg>
            Filter
          </button>
        </div>
      </div>
    </div>
  );
}