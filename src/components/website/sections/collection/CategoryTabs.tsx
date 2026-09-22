// src/components/website/sections/collection/CategoryTabs.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface CategoryTab {
  label: string;
  slug: string; // Must match your [slug]/page.tsx VALID_SLUGS
}

const TABS: CategoryTab[] = [
  { label: 'All Perfumes', slug: 'all' },
  { label: 'New Arrivals', slug: 'new-arrivals' },
  { label: 'Best Sellers', slug: 'best-sellers' },
  { label: 'Limited Edition', slug: 'limited-edition' },
  { label: 'Oud & Woody', slug: 'oud-woody' },
  { label: 'Fresh & Aquatic', slug: 'fresh-aquatic' },
  { label: 'Floral & Romantic', slug: 'floral-romantic' },
  { label: 'Citrus & Zesty', slug: 'citrus-zesty' },
];

export default function CategoryTabs() {
  const pathname = usePathname();

  // Helper to determine if a tab is active based on the current URL
  // e.g., if pathname is '/collections/best-sellers', only 'best-sellers' is active
  const isActive = (slug: string) => {
    return pathname === `/collections/${slug}`;
  };

  return (
    <div className="w-full border-b border-[#2A2520]/10 mb-8 md:mb-12">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 overflow-x-auto scrollbar-hide">
        <nav className="flex gap-8 md:gap-12 whitespace-nowrap pb-4">
          {TABS.map((tab) => {
            const active = isActive(tab.slug);
            
            return (
              <Link
                key={tab.slug}
                href={`/collections/${tab.slug}`}
                className={`
                  relative text-xs uppercase tracking-[0.2em] transition-colors duration-300 pb-2
                  ${active 
                    ? 'text-[#2A2520]' 
                    : 'text-[#2A2520]/50 hover:text-[#2A2520]'
                  }
                `}
              >
                {tab.label}
                
                {/* Animated Underline for Active State */}
                <span 
                  className={`
                    absolute bottom-0 left-0 right-0 h-[1px] bg-[#B8935A] transition-transform duration-300 origin-left
                    ${active ? 'scale-x-100' : 'scale-x-0'}
                  `}
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}