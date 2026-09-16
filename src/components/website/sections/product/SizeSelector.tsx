// src/components/website/sections/product/SizeSelector.tsx
'use client';

interface SizeSelectorProps {
  sizes: { size: string; price: number }[];
  selectedSize: { size: string; price: number };
  onSelectSize: (size: { size: string; price: number }) => void;
}

export function SizeSelector({ sizes, selectedSize, onSelectSize }: SizeSelectorProps) {
  return (
    <div className="space-y-3">
      <p className="text-[10px] uppercase tracking-[0.25em] text-[#2A2520]/60">
        Select Size
      </p>
      <div className="grid grid-cols-3 gap-3">
        {sizes.map((sizeOption) => (
          <button
            key={sizeOption.size}
            onClick={() => onSelectSize(sizeOption)}
            className={`py-3 px-4 text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
              selectedSize.size === sizeOption.size
                ? 'bg-[#2A2520] text-[#FAF7F2]'
                : 'bg-[#EFEAE0] text-[#2A2520] hover:bg-[#2A2520]/10'
            }`}
          >
            {sizeOption.size}
          </button>
        ))}
      </div>
    </div>
  );
}