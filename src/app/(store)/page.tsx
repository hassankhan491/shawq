// src/app/(store)/page.tsx
import SmoothScroll from '@/components/SmoothScroll';
import HeroSection from '@/components/sections/HeroSection';
import EmpoweringSection from '@/components/sections/EmpoweringSection';
import ProductShowcase from '@/components/sections/ProductShowcase';

export default function HomePage() {
  return (
    <>
      {/* ✅ Smooth scrolling */}
      <SmoothScroll />

      {/* 1. HERO SECTION (Video Expansion Banner) */}
      <HeroSection />

      {/* 3. New Product Showcase Section */}
      <ProductShowcase />

      {/* 2. EMPOWERING SECTION */}
      <EmpoweringSection />
    </>
  );
}