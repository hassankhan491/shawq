// src/components/website/sections/product/ProductGallery.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

interface ProductGalleryProps {
  images: string[];
  selectedImage: number;
  onSelectImage: (index: number) => void;
  productName: string;
}

export function ProductGallery({ images, selectedImage, onSelectImage, productName }: ProductGalleryProps) {
  const [loadedImages, setLoadedImages] = useState<boolean[]>(new Array(images.length).fill(false));

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-[4/5] relative bg-[#EFEAE0] overflow-hidden">
        {images.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === selectedImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`${productName} - Image ${index + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-8 md:p-12"
              onLoadingComplete={() => handleImageLoad(index)}
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={image}
              onClick={() => onSelectImage(index)}
              className={`aspect-square relative bg-[#EFEAE0] overflow-hidden transition-all duration-300 ${
                selectedImage === index
                  ? 'ring-2 ring-[#2A2520]'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                sizes="(max-width: 1024px) 25vw, 12vw"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}