// src/app/(store)/page.tsx
import SmoothScroll from '@/components/SmoothScroll';
import HeroSection from '@/components/sections/HeroSection';

import CategorySection from '@/components/sections/CategorySection';
import HeroGalleryScroll from "@/components/sections/HeroGalleryScroll";

import EmpoweringSection from '@/components/sections/EmpoweringSection';
import ShowcaseGrid from '@/components/sections/ShowcaseGrid';

import ProductShowcase from '@/components/sections/ProductShowcase';
import ProductGrid from "@/components/sections/ProductGrid";
import NewsletterSection from "@/components/sections/NewsletterSection";
import ShawqScrollExperience from "@/components/sections/ShawqScrollExperience";
import ShawqManifesto from "@/components/sections/ShawqManifesto";

export default function HomePage() {
  return (
    <>
      {/* ✅ Smooth scrolling */}
      <SmoothScroll />

      {/* 1. HERO SECTION (Video Expansion Banner) */}
      <HeroSection />

      <HeroGalleryScroll />

      {/* 1. CATEGORY SECTION */}
      <ShawqScrollExperience />
      {/* <CategorySection /> */}

      {/* 3. New Product Showcase Section */}
      <ProductShowcase />

       <ProductGrid />

{/* 2. MANIFESTO SECTION */}
      <ShawqManifesto />
      {/* 2. ShowcaseGrid SECTION */}
      <ShowcaseGrid />
      {/* 2. EMPOWERING SECTION */}
      <EmpoweringSection />
      

      {/* NEWS LETTER */}
      <NewsletterSection />
    </>
  );
}