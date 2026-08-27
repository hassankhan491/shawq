// src/app/(store)/page.tsx
import Link from 'next/link';
import EmpoweringSection from '@/components/sections/EmpoweringSection';

export default function HomePage() {
  return (
    <>
      {/* ========================================== */}
      {/* 1. HERO SECTION (Dark Luxury Banner)       */}
      {/* ========================================== */}
      <div className="relative min-h-screen flex items-center bg-[#0f0a08] -mt-20">
        
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-[url('/images/dark.JFIF')] bg-cover bg-center bg-no-repeat"
          style={{ backgroundPosition: 'center 30%' }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0a08]/90 via-[#0f0a08]/40 to-transparent" />

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-20">
          <div className="max-w-2xl space-y-8">
            
            {/* Tagline */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-[#c9a962]" />
              <span className="text-[#c9a962] text-xs tracking-[0.3em] uppercase font-medium">
                SHAWQ FRAGRANCE
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-[#f5f0eb]">
              Discover Your
              <span className="block italic text-[#c9a962]">Signature Scent</span>
              
            </h1>

            {/* Subtitle */}
            <p className="text-[#a89f95] text-base md:text-lg max-w-md leading-relaxed">
              Experience the essence of craftsmanship through our 
              exclusive collection of oud, amber, and rare botanicals.
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <Link 
                href="/products"
                className="inline-block px-8 py-4 bg-[#c9a962] text-[#0f0a08] font-medium text-sm tracking-wider uppercase hover:bg-[#e0c78a] transition-all"
              >
                Explore Collection
              </Link>
            </div>
            
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* 2. WHITE TRANSITION SPACER                 */}
      {/* ========================================== */}
      {/* Hero (dark) aur Empowering (white) ke beech clean transition */}
      <div className="h-[30vh] bg-white" />

      {/* ========================================== */}
      {/* 3. EMPOWERING SECTION (Scroll Animation)   */}
      {/* ========================================== */}
      <EmpoweringSection />

      {/* ========================================== */}
      {/* 4. BOTTOM SPACER (Optional)                */}
      {/* ========================================== */}
      {/* Taake page ke end mein thoda white space rahe */}
      <div className="h-[50vh] bg-white" />
      
    </>
  );
}