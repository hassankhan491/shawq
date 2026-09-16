// src/components/website/sections/product/ProductInfo.tsx
'use client';

interface ProductInfoProps {
  name: string;
  type: string;
  scentFamily: string;
  description: string;
  fullDescription: string;
  price: number;
  intensity: number;
}

export function ProductInfo({
  name,
  type,
  scentFamily,
  description,
  fullDescription,
  price,
  intensity,
}: ProductInfoProps) {
  return (
    <div className="space-y-6 mb-8">
      {/* Category & Name */}
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#B8935A] mb-2">
          {type} · {scentFamily}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2A2520] leading-tight">
          {name}
        </h1>
        <p className="text-sm text-[#2A2520]/70 mt-3 italic">{description}</p>
      </div>

      {/* Price */}
      <div className="text-2xl font-light text-[#2A2520]">${price}</div>

      {/* Full Description */}
      <p className="text-sm leading-relaxed text-[#2A2520]/80 max-w-md">
        {fullDescription}
      </p>

      {/* Intensity Indicator */}
      <div className="flex items-center gap-3 pt-4 border-t border-[#2A2520]/10">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#2A2520]/60">
          Intensity
        </span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`w-2 h-2 rounded-full ${
                level <= intensity ? 'bg-[#2A2520]' : 'bg-[#2A2520]/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}