// src/app/(store)/page.tsx
import SmoothScroll from '@/components/SmoothScroll';
import HeroSection from '@/components/sections/home/HeroSection';
import CategorySection from "@/components/sections/home/CategorySection";
import EmpoweringSection from '@/components/sections/home/EmpoweringSection';
import SignatureCollectionSection from '@/components/sections/home/SignatureCollectionSection';
import ProductShowcase from '@/components/sections/home/ProductShowcase';
import BestSellersSections from "@/components/sections/home/BestSellersSections";
import NewsletterSection from "@/components/sections/home/NewsletterSection";
import ShawqStorySection  from "@/components/sections/home/ShawqStorySection";
import ShawqManifesto from "@/components/sections/home/ShawqManifesto";

export default function HomePage() {
  return (
    <SmoothScroll>

      {/* 1. HERO SECTION (Video Expansion Banner) */}
      <HeroSection />

    
      {/* 2. CATEGORY SECTION (NEB WOMEN UNISEX*/}
      <CategorySection />

      {/* 3. SCROLL EXPERIENCE SECTION */}
      <ShawqStorySection  />
      

      {/* 4. Signature Collection SECTION */}
      <SignatureCollectionSection />

      {/* 5. EMPOWERING SECTION */}
      <EmpoweringSection />

      {/* 6. MANIFESTO SECTION */}
      <ShawqManifesto />

      {/* 7. New Product Showcase Section */}
      <ProductShowcase />

      {/* 8. Best Sellers Section */}
       <BestSellersSections />

      

      {/* NEWS LETTER */}
      <NewsletterSection />
    </SmoothScroll>
  );
}