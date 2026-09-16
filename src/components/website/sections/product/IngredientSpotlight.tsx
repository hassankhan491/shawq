// src/components/website/sections/product/IngredientSpotlight.tsx
'use client';

import Image from 'next/image';

interface IngredientSpotlightProps {
  ingredients: {
    name: string;
    description: string;
    image: string;
  }[];
}

export function IngredientSpotlight({ ingredients }: IngredientSpotlightProps) {
  return (
    <section className="px-6 md:px-12 lg:px-24 py-20">
      <h2 className="font-serif text-3xl md:text-4xl text-center mb-16 text-[#2A2520]">
        Key Ingredients
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {ingredients.map((ingredient, index) => (
          <div
            key={ingredient.name}
            className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} gap-8 items-center`}
          >
            <div className="w-full aspect-square bg-[#EFEAE0] relative overflow-hidden">
              <Image
                src={ingredient.image}
                alt={ingredient.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex-1 space-y-4">
              <h3 className="font-serif text-2xl md:text-3xl text-[#2A2520]">
                {ingredient.name}
              </h3>
              <p className="text-sm leading-relaxed text-[#2A2520]/70">
                {ingredient.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}