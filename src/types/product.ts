// src/types/product.ts
// Canonical shared catalog type — MUST match src/data/products.ts.
// NOTE: CollectionClient.tsx and ProductClient.tsx use their OWN local
// interfaces and do NOT import from here. Changing this file is safe.


export interface ProductSize {
  size: string; // e.g., '50ml'
  price: number;
}

export interface ProductNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface ProductIngredient {
  name: string;
  description: string;
  image: string;
}


export interface ProductImage {
  id: string;
  url: string;
  altText: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: ProductImage[];
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
  sizes?: ProductSize[];
  notes?: ProductNotes;
  intensity?: number;
  ingredients?: ProductIngredient[];
}