'use client';

import ProductCard from '@/components/website/sections/collection/ProductCard';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

// --- Types ---
export interface Product {
  id: string;
  slug: string;
  name: string;
  type: string;
  scentFamily: string;
  description: string;
  fullDescription: string;
  price: number;
  sizes: { size: string; price: number }[];
  images: string[];
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  intensity: number;
  ingredients: {
    name: string;
    description: string;
    image: string;
  }[];
}

interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

// --- Main Component ---
export default function ProductClient({ 
  product, 
  recommendedProducts 
}: { 
  product: Product; 
  recommendedProducts: Product[]; 
}) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = () => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === selectedSize.size
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === selectedSize.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, size: selectedSize.size, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemove = (size: string) => {
    setCartItems((prev) => prev.filter((item) => !(item.product.id === product.id && item.size === size)));
  };

  const handleUpdateQty = (size: string, qty: number) => {
    if (qty < 1) return handleRemove(size);
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === product.id && item.size === size ? { ...item, quantity: qty } : item
      )
    );
  };

  const cartTotal = cartItems.reduce((sum, item) => {
    const price = item.product.sizes.find((s) => s.size === item.size)?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <main className="bg-[#FAF7F2] text-[#2A2520] min-h-screen">
      <div className="max-w-[1600px] mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 px-6 md:px-12 lg:px-24 py-12 lg:py-20">
          
          {/* Left: Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] relative bg-[#EFEAE0] overflow-hidden">
              {product.images.map((img, i) => (
                <div key={img} className={`absolute inset-0 transition-opacity duration-500 ${i === selectedImage ? 'opacity-100' : 'opacity-0'}`}>
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-8 md:p-12" priority={i === 0} />
                </div>
              ))}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, i) => (
                  <button key={img} onClick={() => setSelectedImage(i)} className={`aspect-square relative bg-[#EFEAE0] overflow-hidden transition-all ${selectedImage === i ? 'ring-2 ring-[#2A2520]' : 'opacity-60 hover:opacity-100'}`}>
                    <Image src={img} alt={`thumb ${i}`} fill sizes="25vw" className="object-contain p-2" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="lg:sticky lg:top-32 lg:self-start space-y-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#B8935A] mb-2">{product.type} · {product.scentFamily}</p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2A2520] leading-tight">{product.name}</h1>
              <p className="text-sm text-[#2A2520]/70 mt-3 italic">{product.description}</p>
            </div>

            <div className="text-2xl font-light text-[#2A2520]">${selectedSize.price}</div>
            <p className="text-sm leading-relaxed text-[#2A2520]/80 max-w-md">{product.fullDescription}</p>

            <div className="flex items-center gap-3 pt-4 border-t border-[#2A2520]/10">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#2A2520]/60">Intensity</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <div key={lvl} className={`w-2 h-2 rounded-full ${lvl <= product.intensity ? 'bg-[#2A2520]' : 'bg-[#2A2520]/20'}`} />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#2A2520]/60">Select Size</p>
              <div className="grid grid-cols-3 gap-3">
                {product.sizes.map((s) => (
                  <button key={s.size} onClick={() => setSelectedSize(s)} className={`py-3 text-xs uppercase tracking-[0.2em] transition-all ${selectedSize.size === s.size ? 'bg-[#2A2520] text-[#FAF7F2]' : 'bg-[#EFEAE0] text-[#2A2520] hover:bg-[#2A2520]/10'}`}>
                    {s.size}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleAddToCart} className="w-full bg-[#2A2520] text-[#FAF7F2] py-4 text-xs uppercase tracking-[0.25em] hover:bg-[#B8935A] transition-colors">
              Add to Cart
            </button>

            <div className="mt-12 pt-12 border-t border-[#2A2520]/10">
              <h3 className="text-xs uppercase tracking-[0.3em] text-[#2A2520] mb-8">Fragrance Notes</h3>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#2A2520]/60 mb-3">Top</p>
                  <ul className="space-y-1 text-sm">{product.notes.top.map((n) => <li key={n}>{n}</li>)}</ul>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#2A2520]/60 mb-3">Heart</p>
                  <ul className="space-y-1 text-sm">{product.notes.heart.map((n) => <li key={n}>{n}</li>)}</ul>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#2A2520]/60 mb-3">Base</p>
                  <ul className="space-y-1 text-sm">{product.notes.base.map((n) => <li key={n}>{n}</li>)}</ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <section className="px-6 md:px-12 lg:px-24 py-20">
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-16 text-[#2A2520]">Key Ingredients</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {product.ingredients.map((ing, i) => (
              <div key={ing.name} className={`flex flex-col ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''} gap-8 items-center`}>
                <div className="w-full aspect-square bg-[#EFEAE0] relative overflow-hidden">
                  <Image src={ing.image} alt={ing.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="font-serif text-2xl md:text-3xl text-[#2A2520]">{ing.name}</h3>
                  <p className="text-sm leading-relaxed text-[#2A2520]/70">{ing.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Sticky Mobile Bar */}
      {isScrolled && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#FAF7F2] border-t border-[#2A2520]/10 p-4 lg:hidden z-40 flex justify-between items-center">
          <div>
            <p className="text-xs text-[#2A2520]/60">Price</p>
            <p className="text-lg font-serif">${selectedSize.price}</p>
          </div>
          <button onClick={handleAddToCart} className="flex-1 ml-4 bg-[#2A2520] text-[#FAF7F2] py-3 text-xs uppercase tracking-[0.25em]">Add to Cart</button>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cartItems} total={cartTotal} onRemove={handleRemove} onUpdate={handleUpdateQty} />

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
        <section className="px-6 md:px-12 lg:px-24 py-20 border-t border-[#2A2520]/10">
          <div className="max-w-[1600px] mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-center mb-12 text-[#2A2520]">
              Discover More
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8">
              {recommendedProducts.map((recProduct) => (
                <ProductCard
                  key={recProduct.id}
                  product={{
                    id: recProduct.id,
                    slug: recProduct.slug,
                    name: recProduct.name,
                    type: recProduct.type,
                    description: recProduct.description,
                    price: recProduct.price,
                    image: recProduct.images[0], // Use the first image for the card
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}


    </main>
  );
}

// --- Cart Drawer Component ---
function CartDrawer({ isOpen, onClose, items, total, onRemove, onUpdate }: { isOpen: boolean; onClose: () => void; items: CartItem[]; total: number; onRemove: (s: string) => void; onUpdate: (s: string, q: number) => void }) {
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
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <div ref={backdropRef} onClick={onClose} className="fixed inset-0 bg-[#2A2520]/30 backdrop-blur-sm z-50 opacity-0 pointer-events-none" />
      <div ref={drawerRef} className="fixed top-0 right-0 h-full w-full max-w-md bg-[#FAF7F2] z-50 shadow-2xl flex flex-col" style={{ transform: 'translateX(100%)' }}>
        <div className="flex justify-between p-6 border-b border-[#2A2520]/10">
          <h2 className="text-sm uppercase tracking-[0.25em]">Cart ({items.reduce((s, i) => s + i.quantity, 0)})</h2>
          <button onClick={onClose} className="text-2xl">×</button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? <p className="text-center py-12 opacity-60">Cart is empty</p> : items.map((item) => {
            const price = item.product.sizes.find(s => s.size === item.size)?.price || 0;
            return (
              <div key={item.size} className="flex gap-4">
                <div className="w-20 h-24 bg-[#EFEAE0] relative flex-shrink-0">
                  <Image src={item.product.images[0]} alt={item.product.name} fill className="object-contain p-2" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-sm">{item.product.name}</h3>
                  <p className="text-xs opacity-60 mt-1">{item.size}</p>
                  <p className="text-sm mt-2">${price}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <button onClick={() => onUpdate(item.size, item.quantity - 1)} className="w-6 h-6 border border-[#2A2520]/20 flex items-center justify-center">-</button>
                    <span className="text-xs w-6 text-center">{item.quantity}</span>
                    <button onClick={() => onUpdate(item.size, item.quantity + 1)} className="w-6 h-6 border border-[#2A2520]/20 flex items-center justify-center">+</button>
                    <button onClick={() => onRemove(item.size)} className="ml-auto text-[10px] uppercase tracking-wider opacity-60 hover:opacity-100">Remove</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {items.length > 0 && (
          <div className="border-t border-[#2A2520]/10 p-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-xs uppercase tracking-[0.25em] opacity-60">Subtotal</span>
              <span className="text-lg font-serif">${total}</span>
            </div>
            <button className="w-full bg-[#2A2520] text-[#FAF7F2] py-4 text-xs uppercase tracking-[0.25em] hover:bg-[#B8935A] transition-colors">Checkout</button>
          </div>
        )}
      </div>
    </>
  );
}