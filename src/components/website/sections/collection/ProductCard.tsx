'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext'; // ✅ Import Cart Context

// Define the shape of the product data you'll pass to this card
export interface ProductCardData {
  id: string;
  slug: string;
  name?: string;       // Optional (for mock data)
  title?: string;      // Optional (for real DB data)
  type?: string;       // Optional (for mock data)
  category?: string;   // Optional (for real DB data)
  description: string; 
  price: number;
  
  // Flexible Image Handling
  image?: string;              // Simple string (Mock Data)
  images?: Array<{             // Array of objects (Real Data)
    url: string;
    altText?: string;
  }>;
  
  hoverImage?: string; 
}

interface ProductCardProps {
  product: ProductCardData;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, setIsCartOpen } = useCart();
  const [isAdded, setIsAdded] = React.useState(false);

  // ✅ HELPER: Extracts image URL regardless of data source (Mock vs Real)
  const getImageUrl = () => {
    if (product.images && product.images.length > 0) {
      return product.images[0].url;
    }
    if (product.image) {
      return product.image;
    }
    return '/images/placeholder.jpg'; // Fallback
  };

  // ✅ HELPER: Extracts Name regardless of data source
  const getName = () => product.name || product.title || 'Unnamed Perfume';

  // ✅ HELPER: Extracts Type/Category for the small label
  const getTypeLabel = () => product.type || product.category || 'FRAGRANCE';

  const imageUrl = getImageUrl();
  const productName = getName();
  const productType = getTypeLabel();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: product.id,
      name: productName,
      size: 'Default', // You might want to add size selection later
      price: product.price,
      quantity: 1,
      image: imageUrl,
    });

    setIsCartOpen(true);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <article className="group flex flex-col">
      {/* Image Container */}
      <Link 
        href={`/products/${product.slug}`} 
        className="relative block aspect-[4/5] w-full overflow-hidden bg-[#EFEAE0] mb-5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B8935A]"
        aria-label={`View details for ${productName}`}
      >
        {/* Primary Image */}
        <Image
          src={imageUrl} // ✅ Uses normalized URL
          alt={productName}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-contain p-8 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          priority={false} 
        />

        {/* Hover Image (Optional - Only works if explicit hoverImage exists) */}
        {product.hoverImage && (
          <Image
            src={product.hoverImage}
            alt={`${productName} detail`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="absolute inset-0 object-contain p-8 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
          />
        )}

        {/* Quick Add Action - Hidden on mobile, revealed on desktop hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 hidden md:block">
          <button
            onClick={handleQuickAdd}
            className={`w-full py-3 text-center text-[10px] uppercase tracking-[0.2em] transition-colors ${
              isAdded 
                ? 'bg-[#B8935A] text-white' 
                : 'bg-[#2A2520] text-[#FAF7F2] hover:bg-[#B8935A]'
            }`}
          >
            {isAdded ? '✓ Added' : 'Add to Bag'}
          </button>
        </div>
        
        {/* Mobile Quick Add (Always visible but subtle) */}
        <div className="md:hidden absolute bottom-4 left-4 right-4">
           <button
            onClick={handleQuickAdd}
            className={`w-full py-2 text-center text-[10px] uppercase tracking-[0.2em] border backdrop-blur-sm ${
              isAdded 
                ? 'bg-[#B8935A] text-white border-transparent' 
                : 'bg-white/80 text-[#2A2520] border-[#2A2520]/10'
            }`}
          >
            {isAdded ? '✓ Added' : '+ Bag'}
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex flex-col flex-grow space-y-1.5 px-1">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#B8935A]">
          {productType}
        </p>
        
        <Link href={`/products/${product.slug}`} className="group/title">
          <h3 className="font-serif text-lg md:text-xl text-[#2A2520] transition-colors group-hover/title:text-[#B8935A]">
            {productName}
          </h3>
        </Link>

        <p className="text-xs text-[#2A2520]/60 leading-relaxed line-clamp-2">
          {product.description}
        </p>

        <p className="text-sm text-[#2A2520] pt-2 font-medium">
          ${product.price}
        </p>
      </div>
    </article>
  );
}