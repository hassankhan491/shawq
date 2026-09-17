// src/components/website/sections/checkout/ExpressCheckout.tsx
'use client';

export function ExpressCheckout() {
  return (
    <section className="space-y-4">
      <p className="text-xs uppercase tracking-[0.25em] text-[#2A2520]/60 text-center">
        Express checkout
      </p>
      <div className="grid grid-cols-3 gap-3">
        <button className="py-3 bg-[#5B35FF] text-white text-sm font-medium hover:opacity-90 transition-opacity">
          shop
        </button>
        <button className="py-3 bg-[#FFD700] text-[#2A2520] text-sm font-medium hover:opacity-90 transition-opacity">
          PayPal
        </button>
        <button className="py-3 bg-[#2A2520] text-white text-sm font-medium hover:opacity-90 transition-opacity">
          G Pay
        </button>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#2A2520]/20" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-wider text-[#2A2520]/60">
          <span className="bg-[#FAF7F2] px-4">OR</span>
        </div>
      </div>
    </section>
  );
}