// src/app/(website)/products/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProductClient from './ProductClient';
import { products } from '@/data/products'; // Imports CatalogProduct[]
import type { DetailedProduct } from '@/types/detailed-product'; // Imports the Rich Type

// Helper to convert Catalog Product -> Detailed Product
function toDetailedProduct(p: any): DetailedProduct {
  return {
    ...p,
    // Map Title -> Name for legacy components
    name: p.title || p.name,
    // Map Category -> Type/ScentFamily
    type: p.category || p.type || 'EAU DE PARFUM',
    scentFamily: p.scentFamily || p.category || '',
    
    // Ensure Images are strings for the Gallery component
    images: Array.isArray(p.images) 
      ? p.images.map((img: any) => typeof img === 'string' ? img : img.url)
      : [p.image],
      
    // Provide defaults for missing rich data
    fullDescription: p.fullDescription || p.description,
    sizes: p.sizes || [{ size: '50ml', price: p.price }],
    notes: p.notes || { top: [], heart: [], base: [] },
    intensity: p.intensity || 3,
    ingredients: p.ingredients || [],
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  
  if (!product) return { title: 'Not Found | SHAWQ' };

  return {
    title: `${product.title} — SHAWQ`,
    description: product.description,
  };
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const rawProduct = products.find((p) => p.slug === slug);

  if (!rawProduct) notFound();

  // ✅ Transform into the shape ProductClient expects
  const detailedProduct = toDetailedProduct(rawProduct);

  // Get recommendations (also transformed)
  const recommendedProducts = products
    .filter(p => p.slug !== slug)
    .slice(0, 4)
    .map(toDetailedProduct);

  return (
    <ProductClient 
      product={detailedProduct} 
      recommendedProducts={recommendedProducts} 
    />
  );
}