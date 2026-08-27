// src/app/(store)/page.tsx
import SmoothScroll from '@/components/SmoothScroll';
import HeroSection from '@/components/sections/HeroSection';
import EmpoweringSection from '@/components/sections/EmpoweringSection';

export default function HomePage() {
  return (
    <>
      {/* ✅ Smooth scrolling */}
      <SmoothScroll />

      {/* 1. HERO SECTION (Video Expansion Banner) */}
      <HeroSection />

      {/* 2. EMPOWERING SECTION */}
      <EmpoweringSection />
    </>
  );
}