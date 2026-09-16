// src/components/website/sections/product/CartDrawer.tsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

interface CartItem {
  product: {
    id: string;
    name: string;
    images: string[];
    sizes: { size: string; price: number }[];
  };
  size: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onRemove: (size: string) => void;
  onUpdateQuantity: (size: string, quantity: number) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  total,
  onRemove,
  onUpdateQuantity,
}: CartDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!drawerRef.current || !backdropRef.current) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(backdropRef.current, { opacity: 1, duration: 0.3 });
      gsap.fromTo(drawerRef.current, { x: '100%' }, { x: '0%', duration: 0.4, ease: 'power2.out' });
    } else {
      document.body.style.overflow = '';
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.25 });
      gsap.to(drawerRef.current, { x: '100%', duration: 0.35, ease: 'power2.in' });
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={onClose}
        className="fixed inset-0 bg-[#2A2520]/30 backdrop-blur-sm z-50 opacity-0 pointer-events-none"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#FAF7F2] z-50 shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2A2520]/10">
          <h2 className="text-sm uppercase tracking-[0.25em] text-[#2A2520]">
            Cart ({items.reduce((sum, item) => sum + item.quantity, 0)})
          </h2>
          <button onClick={onClose} className="text-2xl text-[#2A2520]/60 hover:text-[#2A2520]">
            ×
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <p className="text-center text-[#2A2520]/60 py-12">Your cart is empty</p>
          ) : (
            items.map((item) => {
              const itemPrice = item.product.sizes.find((s) => s.size === item.size)?.price || 0;
              return (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                  <div className="w-20 h-24 bg-[#EFEAE0] relative flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-sm text-[#2A2520]">{item.product.name}</h3>
                    <p className="text-xs text-[#2A2520]/60 mt-1">{item.size}</p>
                    <p className="text-sm text-[#2A2520] mt-2">${itemPrice}</p>
                    
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => onUpdateQuantity(item.size, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center border border-[#2A2520]/20 text-xs hover:border-[#2A2520]"
                      >
                        −
                      </button>
                      <span className="text-xs w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.size, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center border border-[#2A2520]/20 text-xs hover:border-[#2A2520]"
                      >
                        +
                      </button>
                      <button
                        onClick={() => onRemove(item.size)}
                        className="ml-auto text-[10px] uppercase tracking-[0.2em] text-[#2A2520]/60 hover:text-[#2A2520]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#2A2520]/10 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.25em] text-[#2A2520]/60">Subtotal</span>
              <span className="text-lg font-serif text-[#2A2520]">${total}</span>
            </div>
            <button className="w-full bg-[#2A2520] text-[#FAF7F2] py-4 text-xs uppercase tracking-[0.25em] hover:bg-[#B8935A] transition-colors">
              Checkout
            </button>
            <p className="text-[10px] text-center text-[#2A2520]/60">
              Free shipping on orders over $300
            </p>
          </div>
        )}
      </div>
    </>
  );
}