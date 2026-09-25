// src/data/products.ts
import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    title: 'Oud Royale',
    slug: 'oud-royale',
    description: 'Aged oud · saffron · amber',
    price: 245,
    compareAtPrice: undefined,
    images: [
      { id: 'img1', url: '/images/NB-01.jpg', altText: 'Oud Royale Bottle' },
      { id: 'img2', url: '/images/NB-02.jpg', altText: 'Oud Royale Detail' },
      { id: 'img3', url: '/images/NB-03.jpg', altText: 'Oud Royale Box' },
    ],
    category: 'Oud & Woody',
    tags: ['Woody', 'Evening', 'Luxury'],
    rating: 4.8,
    reviewCount: 120,
    stock: 50,
    reviews: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    
    // ✅ RICH DATA
    sizes: [{ size: '10ml', price: 65 }, { size: '50ml', price: 245 }, { size: '100ml', price: 380 }],
    notes: { 
      top: ['Saffron', 'Bergamot'], 
      heart: ['Rose Absolute', 'Oud'], 
      base: ['Amber', 'Sandalwood', 'Musk'] 
    },
    intensity: 4,
    ingredients: [
      { name: 'Oud', description: 'The king of ingredients. Aged oud wood provides depth and complexity.', image: '/images/oud.jpg' },
      { name: 'Saffron', description: 'Precious and rare, saffron adds a leathery, honeyed warmth.', image: '/images/saffron.jpg' },
    ],
  },
  {
    id: '2',
    title: 'Velvet Saffron',
    slug: 'velvet-saffron',
    description: 'Saffron · leather · vanilla',
    price: 195,
    compareAtPrice: undefined,
    images: [
      { id: 'img1', url: '/images/NB-04.jpg', altText: 'Velvet Saffron Bottle' },
      { id: 'img2', url: '/images/NB-05.jpg', altText: 'Velvet Saffron Detail' },
    ],
    category: 'Oud & Woody',
    tags: ['Spicy', 'Warm', 'Signature'],
    rating: 4.6,
    reviewCount: 85,
    stock: 100,
    reviews: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    
    // ✅ RICH DATA
    sizes: [{ size: '50ml', price: 195 }, { size: '100ml', price: 295 }],
    notes: { 
      top: ['Saffron', 'Bergamot'], 
      heart: ['Leather', 'Iris'], 
      base: ['Vanilla', 'Musk', 'Amber'] 
    },
    intensity: 3,
    ingredients: [
      { name: 'Saffron', description: 'Harvested at dawn, our saffron brings warmth and sophistication.', image: '/images/saffron.jpg' },
      { name: 'Leather', description: 'Soft, supple leather adds depth and sensuality.', image: '/images/NB-07.jpg' },
    ],
  },
  {
    id: '3',
    title: 'Neroli Memory',
    slug: 'neroli-memory',
    description: 'Neroli · orange blossom · white musk',
    price: 175,
    compareAtPrice: undefined,
    images: [
      { id: 'img1', url: '/images/NB-08.jpg', altText: 'Neroli Memory Bottle' },
      { id: 'img2', url: '/images/NB-09.jpg', altText: 'Neroli Memory Detail' },
    ],
    category: 'Fresh & Aquatic',
    tags: ['Citrus', 'Clean', 'Daily'],
    rating: 4.5,
    reviewCount: 90,
    stock: 75,
    reviews: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    
    // ✅ RICH DATA
    sizes: [{ size: '10ml', price: 55 }, { size: '50ml', price: 175 }],
    notes: { 
      top: ['Neroli', 'Bitter Orange'], 
      heart: ['Orange Blossom', 'Jasmine'], 
      base: ['White Musk', 'Ambrette'] 
    },
    intensity: 2,
    ingredients: [
      { name: 'Neroli', description: 'Distilled from bitter orange blossoms, neroli brings a honeyed floralcy.', image: '/images/bergamot.jpg' },
      { name: 'White Musk', description: 'Clean, soft, and intimate musk that clings to the skin.', image: '/images/musk.jpg' },
    ],
  },
  {
    id: '4',
    title: 'Amber Dusk',
    slug: 'amber-dusk',
    description: 'Amber · benzoin · sandalwood',
    price: 225,
    compareAtPrice: undefined,
    images: [
      { id: 'img1', url: '/images/NB-11.jpg', altText: 'Amber Dusk Bottle' },
      { id: 'img2', url: '/images/NB-12.jpg', altText: 'Amber Dusk Detail' },
    ],
    category: 'Oud & Woody',
    tags: ['Amber', 'Cozy', 'Evening'],
    rating: 4.7,
    reviewCount: 110,
    stock: 60,
    reviews: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    
    // ✅ RICH DATA
    sizes: [{ size: '50ml', price: 225 }, { size: '100ml', price: 345 }],
    notes: { 
      top: ['Cardamom', 'Pink Pepper'], 
      heart: ['Amber', 'Labdanum'], 
      base: ['Sandalwood', 'Benzoin', 'Vanilla'] 
    },
    intensity: 4,
    ingredients: [
      { name: 'Amber', description: 'A golden accord of warmth and sensuality.', image: '/images/oud.jpg' },
      { name: 'Sandalwood', description: 'Creamy, soft, and endlessly comforting.', image: '/images/NB-14.jpg' },
    ],
  },
  {
    id: '5',
    title: 'Rose Afterglow',
    slug: 'rose-afterglow',
    description: 'Turkish rose · peony · cashmere wood',
    price: 189,
    compareAtPrice: undefined,
    images: [
      { id: 'img1', url: '/images/NB-15.jpg', altText: 'Rose Afterglow Bottle' },
      { id: 'img2', url: '/images/NB-16.jpg', altText: 'Rose Afterglow Detail' },
    ],
    category: 'Floral & Romantic',
    tags: ['Floral', 'Romantic', 'Soft'],
    rating: 4.9,
    reviewCount: 200,
    stock: 30,
    reviews: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    
    // ✅ RICH DATA
    sizes: [{ size: '50ml', price: 189 }],
    notes: { 
      top: ['Pink Pepper', 'Lychee'], 
      heart: ['Turkish Rose', 'Peony'], 
      base: ['Cashmere Wood', 'White Musk'] 
    },
    intensity: 3,
    ingredients: [
      { name: 'Turkish Rose', description: 'The queen of flowers, distilled to perfection.', image: '/images/rose.jpg' },
      { name: 'Cashmere Wood', description: 'Soft, warm woods that feel like an embrace.', image: '/images/NB-17.jpg' },
    ],
  },
  {
    id: '6',
    title: 'Citrus Vert',
    slug: 'citrus-vert',
    description: 'Bergamot · lime · vetiver',
    price: 145,
    compareAtPrice: undefined,
    images: [
      { id: 'img1', url: '/images/NB-05.jpg', altText: 'Citrus Vert Bottle' },
      { id: 'img2', url: '/images/NB-18.jpg', altText: 'Citrus Vert Detail' },
    ],
    category: 'Citrus & Zesty',
    tags: ['Zesty', 'Bright', 'Summer'],
    rating: 4.4,
    reviewCount: 70,
    stock: 120,
    reviews: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    
    // ✅ RICH DATA
    sizes: [{ size: '50ml', price: 145 }, { size: '100ml', price: 215 }],
    notes: { 
      top: ['Bergamot', 'Lime', 'Lemon'], 
      heart: ['Petitgrain', 'Neroli'], 
      base: ['Vetiver', 'Cedar'] 
    },
    intensity: 2,
    ingredients: [
      { name: 'Bergamot', description: 'The crown jewel of citrus, bright and sophisticated.', image: '/images/bergamot.jpg' },
      { name: 'Vetiver', description: 'Earthy, smoky, and grounding.', image: '/images/NB-20.jpg' },
    ],
  },
  {
    id: '7',
    title: 'Midnight Oud',
    slug: 'midnight-oud',
    description: 'Black oud · incense · dark plum',
    price: 285,
    compareAtPrice: undefined,
    images: [
      { id: 'img1', url: '/images/NB-07.jpg', altText: 'Midnight Oud Bottle' },
      { id: 'img2', url: '/images/NB-19.jpg', altText: 'Midnight Oud Detail' },
    ],
    category: 'Oud & Woody',
    tags: ['Dark', 'Mysterious', 'Limited'],
    rating: 4.8,
    reviewCount: 50,
    stock: 10,
    reviews: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    
    // ✅ RICH DATA
    sizes: [{ size: '50ml', price: 285 }, { size: '100ml', price: 420 }],
    notes: { 
      top: ['Incense', 'Plum'], 
      heart: ['Black Oud', 'Patchouli'], 
      base: ['Leather', 'Smoke', 'Musk'] 
    },
    intensity: 5,
    ingredients: [
      { name: 'Black Oud', description: 'Deep, resinous oud harvested from aged trees.', image: '/images/oud.jpg' },
      { name: 'Incense', description: 'Sacred frankincense smoke that lingers in memory.', image: '/images/incense.jpg' },
    ],
  },
  {
    id: '8',
    title: 'Sea Salt & Skin',
    slug: 'sea-salt',
    description: 'Sea salt · driftwood · musk',
    price: 165,
    compareAtPrice: undefined,
    images: [
      { id: 'img1', url: '/images/NB-08.jpg', altText: 'Sea Salt Bottle' },
      { id: 'img2', url: '/images/NB-21.jpg', altText: 'Sea Salt Detail' },
    ],
    category: 'Fresh & Aquatic',
    tags: ['Aquatic', 'Minimalist', 'Skin-like'],
    rating: 4.6,
    reviewCount: 95,
    stock: 80,
    reviews: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    
    // ✅ RICH DATA
    sizes: [{ size: '50ml', price: 165 }],
    notes: { 
      top: ['Sea Salt', 'Algae'], 
      heart: ['Driftwood', 'Ambergris'], 
      base: ['White Musk', 'Sand'] 
    },
    intensity: 2,
    ingredients: [
      { name: 'Sea Salt', description: 'Crystalline minerals captured from ocean spray.', image: '/images/seasalt.jpg' },
      { name: 'Driftwood', description: 'Sun-bleached wood carrying the scent of the tide.', image: '/images/driftwood.jpg' },
    ],
  },
  {
    id: '9',
    title: 'Jasmine Veil',
    slug: 'jasmine-veil',
    description: 'Sambac jasmine · ylang · tonka',
    price: 199,
    compareAtPrice: undefined,
    images: [
      { id: 'img1', url: '/images/NB-09.jpg', altText: 'Jasmine Veil Bottle' },
      { id: 'img2', url: '/images/NB-22.jpg', altText: 'Jasmine Veil Detail' },
    ],
    category: 'Floral & Romantic',
    tags: ['White Floral', 'Creamy', 'Elegant'],
    rating: 4.7,
    reviewCount: 130,
    stock: 55,
    reviews: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    
    // ✅ RICH DATA
    sizes: [{ size: '50ml', price: 199 }, { size: '100ml', price: 310 }],
    notes: { 
      top: ['Ylang Ylang', 'Green Leaves'], 
      heart: ['Sambac Jasmine', 'Tuberose'], 
      base: ['Tonka Bean', 'Vanilla Orchid'] 
    },
    intensity: 3,
    ingredients: [
      { name: 'Sambac Jasmine', description: 'Night-blooming jasmine with a creamy, fruity profile.', image: '/images/jasmine.jpg' },
      { name: 'Tonka Bean', description: 'Sweet, almond-like warmth that anchors the florals.', image: '/images/tonka.jpg' },
    ],
  },
  {
    id: '10',
    title: 'Bitter Orange',
    slug: 'bitter-orange',
    description: 'Bitter orange · petitgrain · cedar',
    price: 135,
    compareAtPrice: undefined,
    images: [
      { id: 'img1', url: '/images/NB-10.jpg', altText: 'Bitter Orange Bottle' },
      { id: 'img2', url: '/images/NB-23.jpg', altText: 'Bitter Orange Detail' },
    ],
    category: 'Citrus & Zesty',
    tags: ['Green Citrus', 'Sharp', 'Unisex'],
    rating: 4.5,
    reviewCount: 60,
    stock: 90,
    reviews: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    
    // ✅ RICH DATA
    sizes: [{ size: '50ml', price: 135 }, { size: '100ml', price: 200 }],
    notes: { 
      top: ['Bitter Orange', 'Grapefruit'], 
      heart: ['Petitgrain', 'Neroli'], 
      base: ['Atlas Cedar', 'Vetiver'] 
    },
    intensity: 2,
    ingredients: [
      { name: 'Bitter Orange', description: 'Zesty peel with a sharp, aromatic edge.', image: '/images/orange.jpg' },
      { name: 'Petitgrain', description: 'Young twigs and leaves offering a green, woody freshness.', image: '/images/petitgrain.jpg' },
    ],
  },
  {
    id: '11',
    title: 'Saffron Leather',
    slug: 'saffron-leather',
    description: 'Saffron · suede · tobacco',
    price: 255,
    compareAtPrice: undefined,
    images: [
      { id: 'img1', url: '/images/NB-11.jpg', altText: 'Saffron Leather Bottle' },
      { id: 'img2', url: '/images/NB-24.jpg', altText: 'Saffron Leather Detail' },
    ],
    category: 'Oud & Woody',
    tags: ['Leathery', 'Rich', 'Statement'],
    rating: 4.9,
    reviewCount: 40,
    stock: 15,
    reviews: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    
    // ✅ RICH DATA
    sizes: [{ size: '50ml', price: 255 }, { size: '100ml', price: 390 }],
    notes: { 
      top: ['Saffron', 'Raspberry'], 
      heart: ['Suede', 'Birch Tar'], 
      base: ['Tobacco Leaf', 'Hay', 'Amber'] 
    },
    intensity: 5,
    ingredients: [
      { name: 'Saffron', description: 'Expensive threads adding spice and metallic shine.', image: '/images/saffron.jpg' },
      { name: 'Suede', description: 'Soft, animalic leather note evoking luxury gloves.', image: '/images/leather.jpg' },
    ],
  },
  {
    id: '12',
    title: 'White Tea Ritual',
    slug: 'white-tea',
    description: 'White tea · fig · white cedar',
    price: 179,
    compareAtPrice: undefined,
    images: [
      { id: 'img1', url: '/images/NB-12.jpg', altText: 'White Tea Bottle' },
      { id: 'img2', url: '/images/NB-25.jpg', altText: 'White Tea Detail' },
    ],
    category: 'Fresh & Aquatic',
    tags: ['Tea', 'Calming', 'Transparent'],
    rating: 4.6,
    reviewCount: 85,
    stock: 70,
    reviews: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    
    // ✅ RICH DATA
    sizes: [{ size: '50ml', price: 179 }],
    notes: { 
      top: ['White Tea', 'Bergamot'], 
      heart: ['Fig Leaf', 'Green Mandarin'], 
      base: ['White Cedar', 'Musk', 'Oakmoss'] 
    },
    intensity: 2,
    ingredients: [
      { name: 'White Tea', description: 'Delicate buds steeped in tranquility and clarity.', image: '/images/teatree.jpg' },
      { name: 'White Cedar', description: 'Clean, dry woodiness that grounds the airy tea notes.', image: '/images/cedar.jpg' },
    ],
  },
];  