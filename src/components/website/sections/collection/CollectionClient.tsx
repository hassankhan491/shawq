// src/components/website/sections/collection/CollectionClient.tsx
"use client";

import React, { useState, useMemo, useEffect } from "react";
import CollectionIntro from "./CollectionIntro";
import CategoryTabs from "./CategoryTabs";
import CollectionToolbar from "./CollectionToolbar";
import ProductGrid from "./ProductGrid";
import FilterDrawer, { type FilterState } from "./FilterDrawer";

interface Product {
  id: string;
  slug: string;
  name: string;
  type: string;
  description: string;
  price: number;
  image: string;
  hoverImage?: string;
  scentFamily: string;
  collection: string;
  size: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
}

// Using YOUR actual images from public/images/ folder
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "oud-royale",
    name: "Oud Royale",
    type: "EXTRAIT DE PARFUM",
    description: "Aged oud · saffron · amber",
    price: 245,
    image: "/images/NB-01.jpg",
    scentFamily: "oud-woody",
    collection: "signature",
    size: ["50ml", "100ml"],
    isBestSeller: true,
  },
  {
    id: "2",
    slug: "velvet-saffron",
    name: "Velvet Saffron",
    type: "EAU DE PARFUM",
    description: "Saffron · leather · vanilla",
    price: 195,
    image: "/images/NB-02.jpg",
    scentFamily: "oud-woody",
    collection: "new-arrivals",
    size: ["50ml"],
    isNew: true,
  },
  {
    id: "3",
    slug: "neroli-memory",
    name: "Neroli Memory",
    type: "EAU DE PARFUM",
    description: "Neroli · orange blossom · white musk",
    price: 175,
    image: "/images/NB-03.jpg",
    scentFamily: "fresh-aquatic",
    collection: "signature",
    size: ["10ml", "50ml"],
  },
  {
    id: "4",
    slug: "amber-dusk",
    name: "Amber Dusk",
    type: "EXTRAIT DE PARFUM",
    description: "Amber · benzoin · sandalwood",
    price: 225,
    image: "/images/NB-04.jpg",
    scentFamily: "oud-woody",
    collection: "best-sellers",
    size: ["50ml", "100ml"],
    isBestSeller: true,
  },
  {
    id: "5",
    slug: "rose-afterglow",
    name: "Rose Afterglow",
    type: "EAU DE PARFUM",
    description: "Turkish rose · peony · cashmere wood",
    price: 189,
    image: "/images/NB-05.jpg",
    scentFamily: "floral-romantic",
    collection: "signature",
    size: ["50ml"],
  },
  {
    id: "6",
    slug: "citrus-vert",
    name: "Citrus Vert",
    type: "EAU DE TOILETTE",
    description: "Bergamot · lime · vetiver",
    price: 145,
    image: "/images/NB-06.jpg",
    scentFamily: "citrus-zesty",
    collection: "new-arrivals",
    size: ["50ml", "100ml"],
    isNew: true,
  },
  {
    id: "7",
    slug: "midnight-oud",
    name: "Midnight Oud",
    type: "EXTRAIT DE PARFUM",
    description: "Black oud · incense · dark plum",
    price: 285,
    image: "/images/NB-07.jpg",
    scentFamily: "oud-woody",
    collection: "limited-edition",
    size: ["50ml"],
  },
  {
    id: "8",
    slug: "sea-salt",
    name: "Sea Salt & Skin",
    type: "EAU DE PARFUM",
    description: "Sea salt · driftwood · musk",
    price: 165,
    image: "/images/NB-08.jpg",
    scentFamily: "fresh-aquatic",
    collection: "new-arrivals",
    size: ["50ml"],
    isNew: true,
  },
  {
    id: "9",
    slug: "jasmine-veil",
    name: "Jasmine Veil",
    type: "EAU DE PARFUM",
    description: "Sambac jasmine · ylang · tonka",
    price: 199,
    image: "/images/NB-09.jpg",
    scentFamily: "floral-romantic",
    collection: "best-sellers",
    size: ["50ml"],
    isBestSeller: true,
  },
  {
    id: "10",
    slug: "bitter-orange",
    name: "Bitter Orange",
    type: "EAU DE COLOGNE",
    description: "Bitter orange · petitgrain · cedar",
    price: 135,
    image: "/images/NB-10.jpg",
    scentFamily: "citrus-zesty",
    collection: "signature",
    size: ["50ml", "100ml"],
  },
  {
    id: "11",
    slug: "saffron-leather",
    name: "Saffron Leather",
    type: "EXTRAIT DE PARFUM",
    description: "Saffron · suede · tobacco",
    price: 255,
    image: "/images/NB-11.jpg",
    scentFamily: "oud-woody",
    collection: "limited-edition",
    size: ["50ml"],
  },
  {
    id: "12",
    slug: "white-tea",
    name: "White Tea Ritual",
    type: "EAU DE PARFUM",
    description: "White tea · fig · white cedar",
    price: 179,
    image: "/images/NB-12.jpg",
    scentFamily: "fresh-aquatic",
    collection: "new-arrivals",
    size: ["50ml"],
    isNew: true,
  },
];

export default function CollectionClient() {
  const [mounted, setMounted] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("featured");
  const [filters, setFilters] = useState<FilterState>({
    scentFamily: [],
    collection: [],
    size: [],
  });
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Only mount on client to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFilterChange = (category: keyof FilterState, value: string[]) => {
    setFilters((prev) => ({ ...prev, [category]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ scentFamily: [], collection: [], size: [] });
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setIsLoadingMore(false);
    }, 1500);
  };

  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    if (activeCategory !== "all") {
      const isScent = [
        "oud-woody",
        "fresh-aquatic",
        "floral-romantic",
        "citrus-zesty",
      ].includes(activeCategory);
      if (isScent) {
        result = result.filter((p) => p.scentFamily === activeCategory);
      } else {
        result = result.filter((p) => p.collection === activeCategory);
      }
    }

    if (filters.scentFamily && filters.scentFamily.length > 0) {
      result = result.filter((p) =>
        filters.scentFamily!.includes(p.scentFamily)
      );
    }
    if (filters.collection && filters.collection.length > 0) {
      result = result.filter((p) => filters.collection!.includes(p.collection));
    }
    if (filters.size && filters.size.length > 0) {
      result = result.filter((p) =>
        p.size.some((s) => filters.size!.includes(s))
      );
    }

    switch (sortOrder) {
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "alpha":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "best-selling":
        result.sort(
          (a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0)
        );
        break;
    }

    return result;
  }, [activeCategory, filters, sortOrder]);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <>
      <CollectionIntro />

      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <CollectionToolbar
        count={filteredProducts.length}
        sort={sortOrder}
        onSortChange={setSortOrder}
        onFilterClick={() => setIsDrawerOpen(true)}
      />

      <ProductGrid
        products={filteredProducts}
        hasMore={true}
        isLoadingMore={isLoadingMore}
        onLoadMore={handleLoadMore}
      />

      <FilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeFilters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />
    </>
  );
}