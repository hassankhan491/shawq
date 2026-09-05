// src/app/(store)/page.tsx
import SmoothScroll from '@/components/SmoothScroll';
import HeroSection from '@/components/sections/HeroSection';
import CategorySection from "@/components/sections/CategorySection";
import EmpoweringSection from '@/components/sections/EmpoweringSection';
import SignatureCollectionSection from '@/components/sections/SignatureCollectionSection';
import ProductShowcase from '@/components/sections/ProductShowcase';
import BestSellersSections from "@/components/sections/BestSellersSections";
import NewsletterSection from "@/components/sections/NewsletterSection";
import ShawqStorySection  from "@/components/sections/ShawqStorySection";
import ShawqManifesto from "@/components/sections/ShawqManifesto";

export default function HomePage() {
  return (
    <>
      {/* ✅ Smooth scrolling */}
      <SmoothScroll />

      {/* 1. HERO SECTION (Video Expansion Banner) */}
      <HeroSection />

    
      {/* 2. CATEGORY SECTION (NEB WOMEN UNISEX*/}
      <CategorySection />

      {/* 3. SCROLL EXPERIENCE SECTION */}
      <ShawqStorySection  />
      

      {/* 4. Signature Collection SECTION */}
      <SignatureCollectionSection />

      

      {/* 6. MANIFESTO SECTION */}
      <ShawqManifesto />

      {/* 7. New Product Showcase Section */}
      <ProductShowcase />

      {/* 8. Best Sellers Section */}
       <BestSellersSections />

      {/* 5. EMPOWERING SECTION */}
      <EmpoweringSection />

      {/* NEWS LETTER */}
      <NewsletterSection />
      


     

    </>
  );
}