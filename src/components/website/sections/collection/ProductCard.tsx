// src/components/website/sections/collection/ProductCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define the shape of the product data you'll pass to this card
export interface ProductCardData {
  id: string;
  slug: string;
  name: string;
  type: string; // e.g., "EXTRAIT DE PARFUM"
  description: string; // e.g., "Aged oud · saffron · amber"
  price: number;
  image: string;
  hoverImage?: string; // Optional second image for hover effect
}

interface ProductCardProps {
  product: ProductCardData;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex flex-col">
      {/* Image Container */}
      <Link 
        href={`/products/${product.slug}`} 
        className="relative block aspect-[4/5] w-full overflow-hidden bg-[#EFEAE0] mb-5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B8935A]"
        aria-label={`View details for ${product.name}`}
      >
        {/* Primary Image */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-contain p-8 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          priority={false} // Lazy load by default, set true for first few if needed
        />

        {/* Hover Image (Optional) */}
        {product.hoverImage && (
          <Image
            src={product.hoverImage}
            alt={`${product.name} detail`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="absolute inset-0 object-contain p-8 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
          />
        )}

        {/* Quick View Action - Hidden on mobile, revealed on desktop hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 hidden md:block">
          <div className="w-full bg-[#2A2520] py-3 text-center text-[10px] uppercase tracking-[0.2em] text-[#FAF7F2] hover:bg-[#B8935A] transition-colors">
            Quick View
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex flex-col flex-grow space-y-1.5 px-1">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#B8935A]">
          {product.type}
        </p>
        
        <Link href={`/products/${product.slug}`} className="group/title">
          <h3 className="font-serif text-lg md:text-xl text-[#2A2520] transition-colors group-hover/title:text-[#B8935A]">
            {product.name}
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