// src/components/website/sections/collection/CollectionIntro.tsx
import React from 'react';

export default function CollectionIntro() {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
      <div className="max-w-3xl">
        <span className="block text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#B8935A] mb-6 md:mb-8">
          Perfumes
        </span>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#2A2520] leading-[1.1] mb-6 md:mb-8">
          The Shawq Collection
        </h1>
        <p className="text-sm md:text-base text-[#2A2520]/70 leading-relaxed max-w-xl font-light">
          A collection of compositions shaped by memory, identity, desire and presence — distilled in small batches, finished slowly, made to be worn close to the skin.
        </p>
      </div>
    </section>
  );
}