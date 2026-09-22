// src/app/(website)/collections/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CollectionClient from '@/components/website/sections/collection/CollectionClient';
import { products } from '@/data/products';

// Define all valid slugs (must match your FullScreenMenu hrefs)
const VALID_SLUGS = [
  'all',
  'new-arrivals',
  'best-sellers',
  'limited-edition',
  'oud-woody',
  'fresh-aquatic',
  'floral-romantic',
  'citrus-zesty',
  'signature-scents',
  'evening-elegance',
  'daily-fresh',
  'gift-sets',
];

export async function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  const titles: Record<string, string> = {
    'all': 'All Perfumes',
    'new-arrivals': 'New Arrivals',
    'best-sellers': 'Best Sellers',
    'limited-edition': 'Limited Edition',
    'oud-woody': 'Oud & Woody',
    'fresh-aquatic': 'Fresh & Aquatic',
    'floral-romantic': 'Floral & Romantic',
    'citrus-zesty': 'Citrus & Zesty',
    'signature-scents': 'Signature Scents',
    'evening-elegance': 'Evening Elegance',
    'daily-fresh': 'Daily Fresh',
    'gift-sets': 'Gift Sets',
  };

  const descriptions: Record<string, string> = {
    'all': 'Explore the complete Shawq fragrance collection.',
    'new-arrivals': 'Discover our latest compositions, crafted with intention and finished slowly.',
    'best-sellers': 'The fragrances most loved by our community.',
    'limited-edition': 'Rare batches, numbered and finite. Once they’re gone, they’re gone.',
    'oud-woody': 'Deep, resinous, and grounding — oud, sandalwood, cedar, and amber.',
    'fresh-aquatic': 'Clean air, sea salt, citrus rind, and cool stone.',
    'floral-romantic': 'Petals at dusk — rose, jasmine, iris, and soft musk.',
    'citrus-zesty': 'Bright openings that sparkle like sunlight on water.',
    'signature-scents': 'The core identity of Shawq — scents we return to again and again.',
    'evening-elegance': 'For candlelit rooms and long conversations after dark.',
    'daily-fresh': 'Light, wearable compositions for everyday presence.',
    'gift-sets': 'Curated boxes designed to be given — and remembered.',
  };

  return {
    title: titles[slug] || 'Collection',
    description: descriptions[slug] || 'Browse the Shawq collection.',
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!VALID_SLUGS.includes(slug)) {
    notFound();
  }

  // Filter products based on slug
  let filteredProducts = [...products];

  switch (slug) {
    case 'new-arrivals':
      filteredProducts = products.filter(p => p.tags?.includes('New'));
      break;
    case 'best-sellers':
      filteredProducts = products.filter(p => p.rating >= 4.5);
      break;
    case 'limited-edition':
      filteredProducts = products.filter(p => p.tags?.includes('Limited'));
      break;
    case 'oud-woody':
      filteredProducts = products.filter(p => 
        p.category === 'Oud' || p.tags?.some(t => ['Woody', 'Amber'].includes(t))
      );
      break;
    case 'fresh-aquatic':
      filteredProducts = products.filter(p => 
        p.category === 'Fresh' || p.tags?.some(t => ['Aquatic', 'Citrus'].includes(t))
      );
      break;
    case 'floral-romantic':
      filteredProducts = products.filter(p => 
        p.category === 'Floral' || p.tags?.some(t => ['Romantic', 'Vanilla'].includes(t))
      );
      break;
    case 'citrus-zesty':
      filteredProducts = products.filter(p => 
        p.tags?.some(t => ['Citrus', 'Zesty'].includes(t))
      );
      break;
    case 'signature-scents':
      filteredProducts = products.filter(p => p.tags?.includes('Signature'));
      break;
    case 'evening-elegance':
      filteredProducts = products.filter(p => p.tags?.includes('Evening'));
      break;
    case 'daily-fresh':
      filteredProducts = products.filter(p => p.tags?.includes('Daily'));
      break;
    case 'gift-sets':
      // No matching logic yet — show empty or fallback
      filteredProducts = [];
      break;
    case 'all':
    default:
      // Show everything
      break;
  }

  return (
  // ✅ FORCE THE LIGHT BACKGROUND HERE
  <main className="bg-[#FAF7F2] text-[#2A2520] antialiased min-h-screen">
    <CollectionClient initialCategory={slug} products={filteredProducts} />
  </main>
);
}