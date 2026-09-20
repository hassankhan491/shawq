'use client';

import { useState } from 'react';
import Image from 'next/image';

interface CartItem {
  id: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

interface Cart {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

interface UpsellProduct {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface OrderSummaryProps {
  cart: Cart;
  discountCode: string;
  onDiscountCodeChange: (value: string) => void;
  upsellProduct: UpsellProduct;
  onRemoveItem?: (id: string, size: string) => void;
  onUpdateQuantity?: (id: string, size: string, quantity: number) => void;
  onAddUpsell?: (product: UpsellProduct) => void; // Added for the "Add" button
}

export function OrderSummary({
  cart,
  discountCode,
  onDiscountCodeChange,
  upsellProduct,
  onRemoveItem,
  onUpdateQuantity,
  onAddUpsell,
}: OrderSummaryProps) {
  const [appliedDiscount, setAppliedDiscount] = useState<string | null>(null);

  const handleApplyDiscount = () => {
    if (discountCode.trim()) {
      setAppliedDiscount(discountCode);
    }
  };

  return (
    <div className="space-y-6 lg:sticky lg:top-32">
      {/* Cart Items */}
      <div className="space-y-4">
        {cart.items.length === 0 ? (
          <p className="text-center py-8 text-[#2A2520]/60">Your cart is empty</p>
        ) : (
          cart.items.map((item: CartItem, index: number) => (
            <div key={`${item.id}-${item.size}`} className="flex gap-4">
              <div className="relative">
                <div className="w-20 h-24 bg-[#EFEAE0] relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="absolute -top-2 -left-2 w-5 h-5 bg-[#2A2520] text-[#FAF7F2] rounded-full flex items-center justify-center text-xs">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-[#2A2520]">{item.name}</h3>
                <p className="text-xs text-[#2A2520]/60">{item.size}</p>
                {onRemoveItem && (
                  <button 
                    onClick={() => onRemoveItem(item.id, item.size)}
                    className="text-xs text-[#2A2520]/60 underline mt-1 hover:text-[#2A2520]"
                  >
                    remove
                  </button>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm text-[#2A2520]">${item.price.toFixed(2)}</p>
                {onUpdateQuantity && (
                  <div className="flex items-center justify-end gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.size, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center border border-[#2A2520]/20 text-xs hover:border-[#2A2520]"
                    >
                      −
                    </button>
                    <span className="text-xs w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.size, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center border border-[#2A2520]/20 text-xs hover:border-[#2A2520]"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Discount Code */}
      <div className="flex gap-2">
        <input
          type="text"
          value={discountCode}
          onChange={(e) => onDiscountCodeChange(e.target.value)}
          placeholder="Discount code or gift card"
          className="flex-1 px-4 py-3 bg-[#EFEAE0] border border-[#2A2520]/10 text-[#2A2520] placeholder:text-[#2A2520]/40 focus:outline-none focus:ring-1 focus:ring-[#B8935A]"
        />
        <button
          onClick={handleApplyDiscount}
          disabled={!discountCode.trim()}
          className="px-6 py-3 bg-[#2A2520] text-[#FAF7F2] text-xs uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#B8935A] transition-colors"
        >
          Apply
        </button>
      </div>

      {/* Totals */}
      <div className="space-y-3 pt-6 border-t border-[#2A2520]/10">
        <div className="flex justify-between text-sm">
          <span className="text-[#2A2520]/70">Subtotal · {cart.items.length} items</span>
          <span className="text-[#2A2520]">${cart.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#2A2520]/70">Shipping</span>
          <span className="text-[#2A2520]/60">
            {cart.shipping > 0 ? `$${cart.shipping.toFixed(2)}` : 'Enter shipping address'}
          </span>
        </div>
        {cart.tax > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-[#2A2520]/70">Taxes</span>
            <span className="text-[#2A2520]">${cart.tax.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between items-center pt-3 border-t border-[#2A2520]/10">
          <span className="text-base font-medium text-[#2A2520]">Total</span>
          <span className="text-lg font-medium text-[#2A2520]">USD ${cart.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Upsell Section */}
      <div className="p-6 bg-[#EFEAE0] border border-[#2A2520]/10 space-y-4">
        <h3 className="text-sm font-medium text-[#2A2520]">For The Car</h3>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-[#FAF7F2] relative">
            <Image
              src={upsellProduct.image}
              alt={upsellProduct.name}
              fill
              className="object-contain p-2"
            />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-[#2A2520]">{upsellProduct.name}</h4>
            <p className="text-xs text-[#2A2520]/60">1 card</p>
            <p className="text-sm text-[#2A2520] mt-1">${upsellProduct.price.toFixed(2)}</p>
          </div>
          <button 
            onClick={() => onAddUpsell?.(upsellProduct)}
            className="px-4 py-2 bg-[#2A2520] text-[#FAF7F2] text-xs uppercase tracking-wider hover:bg-[#B8935A] transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Quote */}
      <blockquote className="text-xs text-[#2A2520]/60 italic pt-4 border-t border-[#2A2520]/10">
        &ldquo;A great perfume is a keyhole into another realm; an invisible landscape that you can enter and explore any time.&rdquo;
        <footer className="text-[#2A2520] not-italic mt-2">— DS</footer>
      </blockquote>
    </div>
  );
}