// src/components/website/sections/product/StickyAddToCart.tsx
'use client';

interface StickyAddToCartProps {
  price: number;
  onAddToCart: () => void;
}

export function StickyAddToCart({ price, onAddToCart }: StickyAddToCartProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#FAF7F2] border-t border-[#2A2520]/10 p-4 lg:hidden z-40">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-[#2A2520]/60">Price</p>
          <p className="text-lg font-serif text-[#2A2520]">${price}</p>
        </div>
        <button
          onClick={onAddToCart}
          className="flex-1 bg-[#2A2520] text-[#FAF7F2] py-3 px-6 text-xs uppercase tracking-[0.25em] hover:bg-[#B8935A] transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}