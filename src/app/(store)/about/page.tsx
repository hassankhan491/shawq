import { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";

// About Page Sections
import EditorialHero from "@/components/sections/about/EditorialHero";
import PressRecognition from "@/components/sections/about/PressRecognition";
import ImpactStats from "@/components/sections/about/ImpactStats";
import FounderStory from "@/components/sections/about/FounderStory";
import CraftsmanshipGrid from "@/components/sections/about/CraftsmanshipGrid";
import CollectionCTA from "@/components/sections/about/CollectionCTA";

export const metadata: Metadata = {
  title: "Our Story | SHAWQ Fragrances - The Art of Scent",
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
      <main className="bg-[#0d0c0a]">
        {/* Editorial Magazine-Style Layout */}
        <EditorialHero />
      <PressRecognition />
      <FounderStory />
      <CraftsmanshipGrid />
      <ImpactStats />
      <CollectionCTA />
    </main>
    </SmoothScroll>
  );
}