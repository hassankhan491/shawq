"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";

const segments = [
  {
    id: "extrait",
    title: "extrait de parfum",
    text: "By merging timeless elegance with forward-thinking composition, SHAWQ creates scents that welcome, inspire and connect. Each new bottle carries both heritage and vision towards the horizon.",
    image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "attar",
    title: "attar & oud",
    text: "Our experience with Eastern oils led us to rethink purity itself — questioning how the depth of aged oud could coexist with the intimacy of a skin scent. The attar collection is our answer.",
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "bukhoor",
    title: "bukhoor blends",
    text: "Our history with resin and smoke has shaped a clear understanding: bukhoor is not about intensity, but about connection. Behind the scenes, our blenders ensure every chip burns slow, clean and true.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "layering",
    title: "the layering ritual",
    text: "Layering is about access, and access depends on composition. With years of experience in complex accords, SHAWQ creates fragrances that layer seamlessly, without compromising character.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function CollectionSegments() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-[#F5F0E8] px-6 py-28 sm:px-12 lg:px-24 lg:py-40">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <FadeIn>
          <div className="mb-20 flex items-end justify-between border-b border-[#161310]/10 pb-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#9F8057]">
                the collections
              </p>
              <h2 className="mt-4 font-serif text-4xl text-[#161310] sm:text-5xl lg:text-6xl">
                four pillars of <span className="italic text-[#9F8057]">craft</span>
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden text-[11px] uppercase tracking-[0.35em] text-[#161310]/60 transition-colors hover:text-[#9F8057] sm:block"
            >
              view all →
            </Link>
          </div>
        </FadeIn>

        {/* Split Layout */}
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          
          {/* Left: Interactive List */}
          <div className="lg:col-span-5">
            <div className="flex flex-col">
              {segments.map((segment, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={segment.id}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)} // For mobile tap
                    className="group relative cursor-pointer border-t border-[#161310]/10 py-8 transition-all duration-500 last:border-b lg:py-10"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-6">
                        <span className={`text-[10px] tracking-[0.3em] transition-colors duration-500 ${isActive ? "text-[#9F8057]" : "text-[#161310]/30"}`}>
                          0{index + 1}
                        </span>
                        <h3 className={`font-serif text-3xl transition-colors duration-500 sm:text-4xl ${isActive ? "text-[#161310]" : "text-[#161310]/40"}`}>
                          {segment.title}
                        </h3>
                      </div>
                      
                      {/* Animated Arrow */}
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 ${isActive ? "border-[#9F8057] bg-[#9F8057] text-[#F5F0E8]" : "border-[#161310]/10 text-[#161310]/30"}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </div>
                    </div>

                    {/* Expanding Description */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-md text-sm leading-[1.9] text-[#161310]/65">
                            {segment.text}
                          </p>
                          <Link
                            href="/shop"
                            className="mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-[#9F8057]"
                          >
                            discover collection
                            <span className="h-px w-6 bg-[#9F8057]" />
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Image Stage */}
          <div className="relative lg:col-span-7">
            <div className="sticky top-32 aspect-[4/3] w-full overflow-hidden bg-[#E8DED0]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={segments[activeIndex].image}
                    alt={segments[activeIndex].title}
                    fill
                    sizes="(max-width: 1024px) 92vw, 58vw"
                    className="object-cover"
                    priority={activeIndex === 0}
                  />
                  
                  {/* Subtle Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161310]/10 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Floating Label on Image */}
              <div className="absolute bottom-8 left-8 flex items-center gap-4">
                <div className="h-px w-12 bg-[#F5F0E8]/60" />
                <span className="text-[10px] uppercase tracking-[0.4em] text-[#F5F0E8]/80">
                  {String(activeIndex + 1).padStart(2, "0")} / 04
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}