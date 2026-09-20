'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

// --- Section Component ---
export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-6">
      <h2 className="text-sm font-medium text-[#2A2520]">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

// --- Email Field ---
export function Email({
  value,
  onChange,
  newsletter,
  onNewsletterChange,
}: {
  value: string;
  onChange: (value: string) => void;
  newsletter: boolean;
  onNewsletterChange: (value: boolean) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-3 bg-[#EFEAE0] border border-[#2A2520]/10 text-[#2A2520] placeholder:text-[#2A2520]/40 focus:outline-none focus:ring-1 focus:ring-[#B8935A]"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-wider text-[#2A2520]/60 hover:text-[#2A2520]">
          Sign in
        </button>
      </div>
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={newsletter}
          onChange={(e) => onNewsletterChange(e.target.checked)}
          className="w-4 h-4 border border-[#2A2520]/20 rounded-sm checked:bg-[#2A2520]"
        />
        <span className="text-sm text-[#2A2520]/70">Email me with news and offers</span>
      </label>
    </div>
  );
}

// --- Delivery Form ---
export function Delivery({
  formData,
  onChange,
}: {
  formData: any;
  onChange: (field: string, value: any) => void;
}) {
  return (
    <div className="space-y-4">
      <select
        value={formData.country}
        onChange={(e) => onChange('country', e.target.value)}
        className="w-full px-4 py-3 bg-[#EFEAE0] border border-[#2A2520]/10 text-[#2A2520] focus:outline-none focus:ring-1 focus:ring-[#B8935A]"
      >
        <option>United States</option>
        <option>Canada</option>
        <option>United Kingdom</option>
        <option>Australia</option>
      </select>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          value={formData.firstName}
          onChange={(e) => onChange('firstName', e.target.value)}
          placeholder="First name (optional)"
          className="w-full px-4 py-3 bg-[#EFEAE0] border border-[#2A2520]/10 text-[#2A2520] placeholder:text-[#2A2520]/40 focus:outline-none focus:ring-1 focus:ring-[#B8935A]"
        />
        <input
          type="text"
          value={formData.lastName}
          onChange={(e) => onChange('lastName', e.target.value)}
          placeholder="Last name"
          className="w-full px-4 py-3 bg-[#EFEAE0] border border-[#2A2520]/10 text-[#2A2520] placeholder:text-[#2A2520]/40 focus:outline-none focus:ring-1 focus:ring-[#B8935A]"
        />
      </div>

      <input
        type="text"
        value={formData.company}
        onChange={(e) => onChange('company', e.target.value)}
        placeholder="Company (optional)"
        className="w-full px-4 py-3 bg-[#EFEAE0] border border-[#2A2520]/10 text-[#2A2520] placeholder:text-[#2A2520]/40 focus:outline-none focus:ring-1 focus:ring-[#B8935A]"
      />

      <div className="relative">
        <input
          type="text"
          value={formData.address}
          onChange={(e) => onChange('address', e.target.value)}
          placeholder="Address"
          className="w-full px-4 py-3 bg-[#EFEAE0] border border-[#2A2520]/10 text-[#2A2520] placeholder:text-[#2A2520]/40 focus:outline-none focus:ring-1 focus:ring-[#B8935A] pr-10"
        />
        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2A2520]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <input
        type="text"
        value={formData.apartment}
        onChange={(e) => onChange('apartment', e.target.value)}
        placeholder="Apartment, suite, etc. (optional)"
        className="w-full px-4 py-3 bg-[#EFEAE0] border border-[#2A2520]/10 text-[#2A2520] placeholder:text-[#2A2520]/40 focus:outline-none focus:ring-1 focus:ring-[#B8935A]"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          value={formData.city}
          onChange={(e) => onChange('city', e.target.value)}
          placeholder="City"
          className="w-full px-4 py-3 bg-[#EFEAE0] border border-[#2A2520]/10 text-[#2A2520] placeholder:text-[#2A2520]/40 focus:outline-none focus:ring-1 focus:ring-[#B8935A]"
        />
        <div className="grid grid-cols-2 gap-4">
          <select
            value={formData.state}
            onChange={(e) => onChange('state', e.target.value)}
            className="w-full px-4 py-3 bg-[#EFEAE0] border border-[#2A2520]/10 text-[#2A2520] focus:outline-none focus:ring-1 focus:ring-[#B8935A]"
          >
            <option>State</option>
            <option>NY</option>
            <option>CA</option>
            <option>TX</option>
          </select>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => onChange('zipCode', e.target.value)}
            placeholder="ZIP code"
            className="w-full px-4 py-3 bg-[#EFEAE0] border border-[#2A2520]/10 text-[#2A2520] placeholder:text-[#2A2520]/40 focus:outline-none focus:ring-1 focus:ring-[#B8935A]"
          />
        </div>
      </div>

      <div className="relative">
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          placeholder="Phone (optional)"
          className="w-full px-4 py-3 bg-[#EFEAE0] border border-[#2A2520]/10 text-[#2A2520] placeholder:text-[#2A2520]/40 focus:outline-none focus:ring-1 focus:ring-[#B8935A] pr-10"
        />
        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2A2520]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={formData.smsNewsletter}
          onChange={(e) => onChange('smsNewsletter', e.target.checked)}
          className="w-4 h-4 border border-[#2A2520]/20 rounded-sm checked:bg-[#2A2520]"
        />
        <span className="text-sm text-[#2A2520]/70">Text me with news and offers</span>
      </label>
    </div>
  );
}

// --- Gift Options ---
export function GiftOptions({
  giftWrapping,
  onGiftWrappingChange,
  giftFrom,
  giftTo,
  giftMessage,
  onGiftFromChange,
  onGiftToChange,
  onGiftMessageChange,
}: {
  giftWrapping: boolean;
  onGiftWrappingChange: (value: boolean) => void;
  giftFrom: string;
  giftTo: string;
  giftMessage: string;
  onGiftFromChange: (value: string) => void;
  onGiftToChange: (value: string) => void;
  onGiftMessageChange: (value: string) => void;
}) {
  return (
    <div className="space-y-4">
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={giftWrapping}
          onChange={(e) => onGiftWrappingChange(e.target.checked)}
          className="w-4 h-4 mt-1 border border-[#2A2520]/20 rounded-sm checked:bg-[#2A2520]"
        />
        <div>
          <p className="text-sm font-medium text-[#2A2520]">Flat-fee gift wrapping for all items in your order</p>
          <p className="text-xs text-[#2A2520]/60 mt-1">Each item is wrapped individually. Customizable Sample Set cannot be gift wrapped.</p>
        </div>
      </label>

      {giftWrapping && (
        <div className="space-y-3 pl-7">
          <input
            type="text"
            value={giftFrom}
            onChange={(e) => onGiftFromChange(e.target.value)}
            placeholder="From"
            className="w-full px-4 py-3 bg-[#EFEAE0] border border-[#2A2520]/10 text-[#2A2520] placeholder:text-[#2A2520]/40 focus:outline-none focus:ring-1 focus:ring-[#B8935A]"
          />
          <input
            type="text"
            value={giftTo}
            onChange={(e) => onGiftToChange(e.target.value)}
            placeholder="To"
            className="w-full px-4 py-3 bg-[#EFEAE0] border border-[#2A2520]/10 text-[#2A2520] placeholder:text-[#2A2520]/40 focus:outline-none focus:ring-1 focus:ring-[#B8935A]"
          />
          <textarea
            value={giftMessage}
            onChange={(e) => onGiftMessageChange(e.target.value)}
            placeholder="Message (250 characters maximum)"
            rows={3}
            className="w-full px-4 py-3 bg-[#EFEAE0] border border-[#2A2520]/10 text-[#2A2520] placeholder:text-[#2A2520]/40 focus:outline-none focus:ring-1 focus:ring-[#B8935A] resize-none"
          />
        </div>
      )}
    </div>
  );
}

// --- Shipping Method ---
export function ShippingMethod() {
  return (
    <div className="p-4 bg-[#EFEAE0] border border-[#2A2520]/10 text-center text-sm text-[#2A2520]/60">
      Enter your shipping address to view available shipping methods.
    </div>
  );
}

// --- Recommendations Slider ---
// src/components/website/sections/checkout/CheckoutForm.tsx

// ... (keep Section, Email, Delivery, GiftOptions, ShippingMethod exactly as they are)

// --- Recommendations Slider (UPDATED) ---
export function Recommendations({ 
  products, 
  onAdd 
}: { 
  products: any[]; 
  onAdd?: (product: any) => void; // ✅ Added onAdd prop
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  const itemsPerView = 3; 
  const totalPages = Math.max(1, Math.ceil(products.length / itemsPerView));

  const scrollToPage = (pageIndex: number) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * pageIndex;
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
      setActiveDot(pageIndex);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const pageWidth = scrollRef.current.clientWidth;
      const newIndex = Math.round(scrollLeft / pageWidth);
      
      if (newIndex !== activeDot && newIndex >= 0 && newIndex < totalPages) {
        setActiveDot(newIndex);
      }
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="relative group">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide scroll-smooth"
        >
          <style>{`
            .scrollbar-hide::-webkit-scrollbar { display: none; }
            .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>

          {products.map((product) => (
            <div 
              key={product.id} 
              className="min-w-full sm:min-w-[calc(50%-0.5rem)] lg:min-w-[calc(33.333%-0.666rem)] snap-start flex-shrink-0"
            >
              <div className="space-y-3">
                <div className="aspect-square bg-[#EFEAE0] relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#2A2520] truncate">{product.name}</p>
                  <p className="text-xs text-[#2A2520]/60 mt-1">${product.price}</p>
                </div>
                {/* ✅ Added onClick handler here */}
                <button 
                  onClick={() => onAdd?.(product)}
                  className="w-full py-3 bg-[#2A2520] text-[#FAF7F2] text-[10px] uppercase tracking-wider hover:bg-[#B8935A] transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <>
            <button 
              onClick={() => scrollToPage(Math.max(0, activeDot - 1))}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-[#2A2520] shadow-sm hover:bg-white transition-all z-10"
              aria-label="Scroll left"
            >
              ←
            </button>
            <button 
              onClick={() => scrollToPage(Math.min(totalPages - 1, activeDot + 1))}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-[#2A2520] shadow-sm hover:bg-white transition-all z-10"
              aria-label="Scroll right"
            >
              →
            </button>
          </>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToPage(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeDot === index ? 'bg-[#2A2520] w-4' : 'bg-[#2A2520]/20 w-2'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ... (keep Payment and CheckoutForm export exactly as they are)
// --- Payment Form ---
export function Payment({
  formData,
  onChange,
}: {
  formData: any;
  onChange: (field: string, value: any) => void;
}) {
  const [paymentMethod, setPaymentMethod] = useState('credit');

  return (
    <div className="space-y-6">
      {/* 1. Credit Card Section */}
      <div className="border border-[#2A2520]/20 rounded-sm overflow-hidden">
        <label className="flex items-center justify-between p-4 cursor-pointer bg-white hover:bg-[#FAF7F2]">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="payment"
              value="credit"
              checked={paymentMethod === 'credit'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-4 h-4 accent-[#2A2520]"
            />
            <span className="text-sm text-[#2A2520] font-medium">Credit card</span>
          </div>
          <div className="flex gap-1">
            <div className="w-8 h-5 bg-blue-600 rounded text-[8px] text-white flex items-center justify-center font-bold">VISA</div>
            <div className="w-8 h-5 bg-red-600 rounded text-[8px] text-white flex items-center justify-center font-bold">MC</div>
            <div className="w-8 h-5 bg-yellow-600 rounded text-[8px] text-white flex items-center justify-center font-bold">AMEX</div>
          </div>
        </label>

        {paymentMethod === 'credit' && (
          <div className="p-4 bg-[#FAF7F2] border-t border-[#2A2520]/10 space-y-3">
            <input
              type="text"
              placeholder="Card number"
              className="w-full p-3 border border-[#2A2520]/20 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#B8935A]"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Expiration date (MM / YY)"
                className="w-full p-3 border border-[#2A2520]/20 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#B8935A]"
              />
              <input
                type="text"
                placeholder="Security code"
                className="w-full p-3 border border-[#2A2520]/20 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#B8935A]"
              />
            </div>
            <input
              type="text"
              placeholder="Name on card"
              className="w-full p-3 border border-[#2A2520]/20 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#B8935A]"
            />
          </div>
        )}
      </div>

      {/* 2. Billing Address Section */}
      <div className="pt-2">
        <h3 className="text-sm font-medium text-[#2A2520] mb-3">Billing address</h3>
        
        <div className="space-y-2">
          <label className="flex items-center gap-3 p-3 border border-[#2A2520]/20 rounded-sm cursor-pointer hover:bg-[#FAF7F2] transition-colors">
            <input
              type="radio"
              name="billing"
              checked={formData.billingSameAsShipping}
              onChange={() => onChange('billingSameAsShipping', true)}
              className="w-4 h-4 accent-[#2A2520]"
            />
            <span className="text-sm text-[#2A2520]">Same as shipping address</span>
          </label>

          <label className="flex items-center gap-3 p-3 border border-[#2A2520]/20 rounded-sm cursor-pointer hover:bg-[#FAF7F2] transition-colors">
            <input
              type="radio"
              name="billing"
              checked={!formData.billingSameAsShipping}
              onChange={() => onChange('billingSameAsShipping', false)}
              className="w-4 h-4 accent-[#2A2520]"
            />
            <span className="text-sm text-[#2A2520]">Use a different billing address</span>
          </label>
        </div>

        {/* Conditional Billing Form */}
        {!formData.billingSameAsShipping && (
          <div className="mt-4 space-y-4 p-5 bg-[#FAF7F2] border border-[#2A2520]/10 rounded-sm transition-all duration-300 ease-in-out">
            <select className="w-full p-3 border border-[#2A2520]/20 bg-white text-sm text-[#2A2520] focus:outline-none focus:ring-1 focus:ring-[#B8935A]">
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
              <option>Australia</option>
            </select>

            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="First name (optional)" className="w-full p-3 border border-[#2A2520]/20 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#B8935A]" />
              <input type="text" placeholder="Last name" className="w-full p-3 border border-[#2A2520]/20 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#B8935A]" />
            </div>

            <input type="text" placeholder="Company (optional)" className="w-full p-3 border border-[#2A2520]/20 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#B8935A]" />

            <div className="relative">
              <input type="text" placeholder="Address" className="w-full p-3 border border-[#2A2520]/20 bg-white text-sm pr-10 focus:outline-none focus:ring-1 focus:ring-[#B8935A]" />
              <svg className="absolute right-3 top-3.5 w-4 h-4 text-[#2A2520]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full p-3 border border-[#2A2520]/20 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#B8935A]" />

            <div className="grid grid-cols-6 gap-3">
              <div className="col-span-3">
                <input type="text" placeholder="City" className="w-full p-3 border border-[#2A2520]/20 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#B8935A]" />
              </div>
              <div className="col-span-2">
                <select className="w-full p-3 border border-[#2A2520]/20 bg-white text-sm text-[#2A2520] focus:outline-none focus:ring-1 focus:ring-[#B8935A]">
                  <option>State</option>
                  <option>NY</option>
                  <option>CA</option>
                  <option>TX</option>
                </select>
              </div>
              <div className="col-span-1">
                <input type="text" placeholder="ZIP code" className="w-full p-3 border border-[#2A2520]/20 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#B8935A]" />
              </div>
            </div>

            <div className="relative">
              <input type="tel" placeholder="Phone (optional)" className="w-full p-3 border border-[#2A2520]/20 bg-white text-sm pr-10 focus:outline-none focus:ring-1 focus:ring-[#B8935A]" />
              <svg className="absolute right-3 top-3.5 w-4 h-4 text-[#2A2520]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* 3. Other Payment Methods */}
      <div className="space-y-2 pt-2">
        <label className="flex items-center justify-between p-4 border border-[#2A2520]/20 rounded-sm cursor-pointer hover:bg-[#FAF7F2] transition-colors">
          <div className="flex items-center gap-3">
            <input type="radio" name="payment" value="shop" checked={paymentMethod === 'shop'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 accent-[#2A2520]" />
            <span className="text-sm text-[#2A2520]">Shop Pay <span className="text-[#2A2520]/60 font-normal">• Pay in full or in installments</span></span>
          </div>
          <span className="text-purple-600 font-bold text-sm">shop</span>
        </label>

        <label className="flex items-center justify-between p-4 border border-[#2A2520]/20 rounded-sm cursor-pointer hover:bg-[#FAF7F2] transition-colors">
          <div className="flex items-center gap-3">
            <input type="radio" name="payment" value="paypal" checked={paymentMethod === 'paypal'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 accent-[#2A2520]" />
            <span className="text-sm text-[#2A2520]">PayPal</span>
          </div>
          <span className="text-blue-600 font-bold text-sm">PayPal</span>
        </label>

        <label className="flex items-center justify-between p-4 border border-[#2A2520]/20 rounded-sm cursor-pointer hover:bg-[#FAF7F2] transition-colors">
          <div className="flex items-center gap-3">
            <input type="radio" name="payment" value="afterpay" checked={paymentMethod === 'afterpay'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 accent-[#2A2520]" />
            <span className="text-sm text-[#2A2520]">Afterpay</span>
          </div>
          <span className="text-teal-500 font-bold text-sm">Afterpay</span>
        </label>
      </div>

      {/* 4. Save Info & Pay Button */}
      <div className="pt-6 border-t border-[#2A2520]/10">
        <label className="flex items-start gap-3 cursor-pointer mb-6">
          <input type="checkbox" checked={formData.saveInfo} onChange={(e) => onChange('saveInfo', e.target.checked)} className="w-4 h-4 mt-1 accent-[#2A2520]" />
          <div className="flex-1">
            <p className="text-sm text-[#2A2520] font-medium">Save my information for a faster checkout</p>
            <p className="text-xs text-[#2A2520]/60 mt-1">By paying, you agree to create a Shop account subject to Shop's Terms and Privacy Policy</p>
          </div>
          <button className="text-xs text-[#2A2520]/60 hover:text-[#2A2520] whitespace-nowrap">Not now</button>
        </label>

        <button className="w-full py-4 bg-[#2A2520] text-[#FAF7F2] text-xs uppercase tracking-[0.25em] hover:bg-[#B8935A] transition-colors font-medium">
          Pay now
        </button>
      </div>
    </div>
  );
}

// --- Compound Component Export ---
export const CheckoutForm = {
  Section,
  Email,
  Delivery,
  GiftOptions,
  ShippingMethod,
  Recommendations,
  Payment,
};