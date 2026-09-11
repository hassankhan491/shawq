import { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import AboutHero from "@/components/sections/about/AboutHero";
import HouseIntro from "@/components/sections/about/HouseIntro";
import StoryChapters from "@/components/sections/about/StoryChapters";
import HouseNumbers from "@/components/sections/about/HouseNumbers";
import BukhoorRitual from "@/components/sections/about/BukhoorRitual";
import CollectionSegments from "@/components/sections/about/CollectionSegments";
import TheAtelier from "@/components/sections/about/TheAtelier";

export const metadata: Metadata = {
  title: "Our Story | SHAWQ Fragrances — The Art of Scent",
  description:
    "Discover the editorial story behind SHAWQ Fragrances. Handcrafted luxury Extrait de Parfums from Karachi, Pakistan.",
  openGraph: {
    title: "Our Story | SHAWQ Fragrances",
    description: "The artistry, heritage, and soul behind SHAWQ Fragrances.",
    type: "website",
    locale: "en_US",
  },
};

export default function AboutPage() {
  return (
    <SmoothScroll>
      {/* Global grain overlay for editorial texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[999] opacity-[0.028] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px",
        }}
      />

      <main className="bg-[#0d0c0a] text-[#F5F0E8]">
        <AboutHero />
        <HouseIntro />
        <StoryChapters />
        <HouseNumbers />
        <BukhoorRitual />
        <CollectionSegments />
        <TheAtelier />
      </main>
    </SmoothScroll>
  );
}