// src/components/website/sections/collection/CategoryTabs.tsx
'use client';

import React from 'react';

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', label: 'All Perfumes' },
  { id: 'new-arrivals', label: 'New Arrivals' },
  { id: 'best-sellers', label: 'Best Sellers' },
  { id: 'limited-edition', label: 'Limited Edition' },
  { id: 'oud-woody', label: 'Oud & Woody' },
  { id: 'fresh-aquatic', label: 'Fresh & Aquatic' },
  { id: 'floral-romantic', label: 'Floral & Romantic' },
  { id: 'citrus-zesty', label: 'Citrus & Zesty' },
];

export default function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="w-full border-b border-[#2A2520]/10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        <nav 
          className="flex overflow-x-auto scrollbar-hide gap-8 md:gap-12 py-4" 
          role="tablist" 
          aria-label="Perfume Categories"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => onCategoryChange(cat.id)}
                className={`
                  relative whitespace-nowrap pb-4 pt-2 text-[11px] md:text-xs uppercase tracking-[0.2em] transition-colors duration-300 outline-none focus-visible:ring-1 focus-visible:ring-[#B8935A] rounded-sm
                  ${isActive ? 'text-[#2A2520]' : 'text-[#2A2520]/50 hover:text-[#2A2520]/80'}
                `}
              >
                {cat.label}
                {/* Elegant animated underline */}
                <span
                  className={`
                    absolute bottom-0 left-0 w-full h-[1px] bg-[#B8935A] origin-left transition-transform duration-300 ease-out
                    ${isActive ? 'scale-x-100' : 'scale-x-0'}
                  `}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}