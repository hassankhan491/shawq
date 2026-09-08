import { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import AboutHero from "@/components/sections/about/AboutHero";
import HouseIntro from "@/components/sections/about/HouseIntro";
import StoryChapters from "@/components/sections/about/StoryChapters";
import HouseNumbers from "@/components/sections/about/HouseNumbers";
import BukhoorRitual from "@/components/sections/about/BukhoorRitual";
import CollectionSegments from "@/components/sections/about/CollectionSegments";
import MeetTheMakers from "@/components/sections/about/MeetTheMakers";
import CursorGlow from "@/components/sections/about/CursorGlow";

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
      <CursorGlow />

      <main className="bg-[#F5F0E8]">
        <AboutHero />
        <HouseIntro />
        <StoryChapters />
        <HouseNumbers />
        <BukhoorRitual />
        <CollectionSegments />
        <MeetTheMakers />
      </main>
    </SmoothScroll>
  );
}