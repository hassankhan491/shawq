// src/types/detailed-product.ts
import { Product } from './product'; // Import the base type

export interface DetailedProductSize {
  size: string;
  price: number;
}

export interface DetailedProductNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface DetailedProductIngredient {
  name: string;
  description: string;
  image: string;
}

// This is the FULL shape used by ProductClient
export interface DetailedProduct extends Omit<Product, 'images'> {
  // Override images to support both formats if needed, or stick to strings for PDP gallery
  images: string[]; 
  
  // Extra fields specific to Detail Page
  name: string;       // Alias for title for legacy compatibility
  type: string;       // e.g., "EXTRAIT DE PARFUM"
  scentFamily: string;
  fullDescription: string;
  sizes: DetailedProductSize[];
  notes: DetailedProductNotes;
  intensity: number;
  ingredients: DetailedProductIngredient[];
}