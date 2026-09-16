// src/app/(website)/products/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProductClient from './ProductClient';

const PRODUCTS = {
  'oud-royale': {
    id: '1', slug: 'oud-royale', name: 'Oud Royale', type: 'EXTRAIT DE PARFUM',
    scentFamily: 'Oud & Woody', description: 'Aged oud · saffron · amber',
    fullDescription: 'A luxurious composition centered around aged oud, enriched with saffron and warmed by amber.',
    price: 245,
    sizes: [{ size: '10ml', price: 65 }, { size: '50ml', price: 245 }, { size: '100ml', price: 380 }],
    images: ['/images/NB-01.jpg', '/images/NB-02.jpg', '/images/NB-03.jpg', '/images/shawq-bottle.png'],
    notes: { top: ['Saffron', 'Bergamot'], heart: ['Rose Absolute', 'Oud'], base: ['Amber', 'Sandalwood', 'Musk'] },
    intensity: 4,
    ingredients: [
      { name: 'Oud', description: 'The king of ingredients. Aged oud wood provides depth and complexity.', image: '/images/oud.jpg' },
      { name: 'Saffron', description: 'Precious and rare, saffron adds a leathery, honeyed warmth.', image: '/images/saffron.jpg' },
    ],
  },
  'velvet-saffron': {
    id: '2', slug: 'velvet-saffron', name: 'Velvet Saffron', type: 'EAU DE PARFUM',
    scentFamily: 'Oud & Woody', description: 'Saffron · leather · vanilla',
    fullDescription: 'A bold exploration of saffron\'s multifaceted character, woven with supple leather.',
    price: 195,
    sizes: [{ size: '50ml', price: 195 }, { size: '100ml', price: 295 }],
    images: ['/images/NB-04.jpg', '/images/NB-05.jpg', '/images/NB-06.jpg'],
    notes: { top: ['Saffron', 'Bergamot'], heart: ['Leather', 'Iris'], base: ['Vanilla', 'Musk', 'Amber'] },
    intensity: 3,
    ingredients: [
      { name: 'Saffron', description: 'Harvested at dawn, our saffron brings warmth and sophistication.', image: '/images/saffron.jpg' },
      { name: 'Leather', description: 'Soft, supple leather adds depth and sensuality.', image: '/images/NB-07.jpg' },
    ],
  },
  'neroli-memory': {
    id: '3', slug: 'neroli-memory', name: 'Neroli Memory', type: 'EAU DE PARFUM',
    scentFamily: 'Fresh & Aquatic', description: 'Neroli · orange blossom · white musk',
    fullDescription: 'A luminous fragrance capturing the delicate beauty of neroli and orange blossom.',
    price: 175,
    sizes: [{ size: '10ml', price: 55 }, { size: '50ml', price: 175 }],
    images: ['/images/NB-08.jpg', '/images/NB-09.jpg', '/images/NB-10.jpg'],
    notes: { top: ['Neroli', 'Bitter Orange'], heart: ['Orange Blossom', 'Jasmine'], base: ['White Musk', 'Ambrette'] },
    intensity: 2,
    ingredients: [
      { name: 'Neroli', description: 'Distilled from bitter orange blossoms, neroli brings a honeyed floralcy.', image: '/images/bergamot.jpg' },
      { name: 'White Musk', description: 'Clean, soft, and intimate musk that clings to the skin.', image: '/images/musk.jpg' },
    ],
  },
  'amber-dusk': {
    id: '4', slug: 'amber-dusk', name: 'Amber Dusk', type: 'EXTRAIT DE PARFUM',
    scentFamily: 'Oud & Woody', description: 'Amber · benzoin · sandalwood',
    fullDescription: 'An opulent amber composition that glows with warmth, enriched by benzoin\'s vanilla sweetness.',
    price: 225,
    sizes: [{ size: '50ml', price: 225 }, { size: '100ml', price: 345 }],
    images: ['/images/NB-11.jpg', '/images/NB-12.jpg', '/images/NB-13.jpg'],
    notes: { top: ['Cardamom', 'Pink Pepper'], heart: ['Amber', 'Labdanum'], base: ['Sandalwood', 'Benzoin', 'Vanilla'] },
    intensity: 4,
    ingredients: [
      { name: 'Amber', description: 'A golden accord of warmth and sensuality.', image: '/images/oud.jpg' },
      { name: 'Sandalwood', description: 'Creamy, soft, and endlessly comforting.', image: '/images/NB-14.jpg' },
    ],
  },
  'rose-afterglow': {
    id: '5', slug: 'rose-afterglow', name: 'Rose Afterglow', type: 'EAU DE PARFUM',
    scentFamily: 'Floral & Romantic', description: 'Turkish rose · peony · cashmere wood',
    fullDescription: 'A modern rose composition, dewy and fresh, wrapped in the soft embrace of cashmere woods.',
    price: 189,
    sizes: [{ size: '50ml', price: 189 }],
    images: ['/images/NB-15.jpg', '/images/NB-16.jpg', '/images/rose.jpg'],
    notes: { top: ['Pink Pepper', 'Lychee'], heart: ['Turkish Rose', 'Peony'], base: ['Cashmere Wood', 'White Musk'] },
    intensity: 3,
    ingredients: [
      { name: 'Turkish Rose', description: 'The queen of flowers, distilled to perfection.', image: '/images/rose.jpg' },
      { name: 'Cashmere Wood', description: 'Soft, warm woods that feel like an embrace.', image: '/images/NB-17.jpg' },
    ],
  },
  'citrus-vert': {
    id: '6', slug: 'citrus-vert', name: 'Citrus Vert', type: 'EAU DE TOILETTE',
    scentFamily: 'Citrus & Zesty', description: 'Bergamot · lime · vetiver',
    fullDescription: 'A vibrant citrus explosion grounded by earthy vetiver. Fresh, energizing, and sophisticated.',
    price: 145,
    sizes: [{ size: '50ml', price: 145 }, { size: '100ml', price: 215 }],
    images: ['/images/NB-05.jpg', '/images/NB-18.jpg', '/images/NB-19.jpg'],
    notes: { top: ['Bergamot', 'Lime', 'Lemon'], heart: ['Petitgrain', 'Neroli'], base: ['Vetiver', 'Cedar'] },
    intensity: 2,
    ingredients: [
      { name: 'Bergamot', description: 'The crown jewel of citrus, bright and sophisticated.', image: '/images/bergamot.jpg' },
      { name: 'Vetiver', description: 'Earthy, smoky, and grounding.', image: '/images/NB-20.jpg' },
    ],
  },
};

// Helper to get 4 recommended products (excluding the current one)
function getRecommendedProducts(currentSlug: string) {
  const allProducts = Object.values(PRODUCTS);
  return allProducts
    .filter((p) => p.slug !== currentSlug)
    .sort(() => 0.5 - Math.random()) // Randomize for mock data
    .slice(0, 4);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS[slug as keyof typeof PRODUCTS];
  if (!product) {
    return { title: 'Product Not Found | SHAWQ' };
  }

  return {
    title: `${product.name} — SHAWQ`,
    description: product.fullDescription,
  };
}

export async function generateStaticParams() {
  return Object.keys(PRODUCTS).map((slug) => ({ slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS[slug as keyof typeof PRODUCTS];

  if (!product) {
    notFound();
  }

  // Generate recommendations on the server
  const recommendedProducts = getRecommendedProducts(slug);

  return (
    <ProductClient 
      product={product} 
      recommendedProducts={recommendedProducts} 
    />
  );
}