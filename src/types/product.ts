// src/types/product.ts
// Canonical shared catalog type — MUST match src/data/products.ts.
// NOTE: CollectionClient.tsx and ProductClient.tsx use their OWN local
// interfaces and do NOT import from here. Changing this file is safe.

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
  title: string;            // ← matches data (was wrongly "name")
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;  // optional — only some products have it
  images: ProductImage[];   // { id, url, altText } — matches data
  category: string;         // ← matches data (was wrongly "type")
  tags: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
}