// src/components/website/sections/collection/ProductGrid.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoadMoreButton from "./LoadMoreButton";
import ProductCard, { type ProductCardData } from "./ProductCard";
import EditorialTile from "./EditorialTile";

// Register ScrollTrigger once
gsap.registerPlugin(ScrollTrigger);

interface ProductGridProps {
  products: ProductCardData[];
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
}

export default function ProductGrid({
  products,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
}: ProductGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    // Select all elements with the data-reveal attribute
    const revealElements =
      gridRef.current.querySelectorAll<HTMLElement>("[data-reveal]");

    // Create the animation context for easy cleanup
    const ctx = gsap.context(() => {
      gsap.fromTo(
        revealElements,
        {
          opacity: 0,
          y: 40, // Start slightly lower
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out", // Smooth, premium easing
          stagger: 0.06, // Slight delay between each card
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%", // Start animation when top of grid hits 85% of viewport height
            toggleActions: "play none none reverse", // Play on enter, reverse on leave (optional)
          },
        },
      );
    }, gridRef);

    // Cleanup function to kill animations when component unmounts or products change
    return () => ctx.revert();
  }, [products]); // Re-run animation if the filtered product list changes

  if (products.length === 0) {
    return (
      <div className="w-full py-24 text-center">
        <p className="font-serif text-2xl text-[#2A2520] mb-2">
          No perfumes match
        </p>
        <p className="text-sm text-[#2A2520]/60">
          Try adjusting your filters or categories.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full py-12 md:py-16">
      <div
        ref={gridRef}
        className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16">
          {products.map((product, index) => (
            <React.Fragment key={product.id}>
              {/* Product Card */}
              <div data-reveal className="flex flex-col">
                <ProductCard product={product} />
              </div>

              {/* Editorial Tile Injection (after 9th product) */}
              {index === 8 && (
                <div data-reveal className="hidden lg:flex flex-col">
                  <EditorialTile />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
          {/* STEP D: Load More Button added here, outside the grid but inside the container */}
        <LoadMoreButton 
          hasMore={hasMore} 
          isLoading={isLoadingMore} 
          onLoadMore={onLoadMore || (() => {})} 
        />


      </div>
    </div>
  );
}
