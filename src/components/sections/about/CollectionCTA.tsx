"use client";

import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

export default function CollectionCTA() {
  return (
    <section className="relative bg-[#F5F0E8] py-32 px-6 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -left-20 top-20 font-decorative text-[15rem] font-light uppercase leading-none text-[#0d0c0a]">
          Shop
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <FadeIn>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#C5A880]">
            Begin Your Journey
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="mt-6 font-serif text-4xl italic text-[#0d0c0a] sm:text-5xl lg:text-6xl">
            Experience the soul
            <br />
            <span className="not-italic font-decorative uppercase tracking-wide">
              of scent
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-[#0d0c0a]/70 sm:text-base">
            Explore our curated collection of Extrait de Parfums, each crafted 
            to leave an unforgettable impression.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
            <Link
              href="/shop"
              className="group relative inline-flex items-center justify-center overflow-hidden bg-[#0d0c0a] px-10 py-4 text-xs uppercase tracking-[0.35em] text-[#F5F0E8] transition-all duration-300 hover:bg-[#C5A880]"
            >
              <span className="relative z-10">Explore Collection</span>
            </Link>

            <Link
              href="/products"
              className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#0d0c0a]/60 transition-colors duration-300 hover:text-[#C5A880]"
            >
              <span>View All Products</span>
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-16 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-[#C5A880]" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#0d0c0a]/50">
              SHAWQ FRAGRANCES
            </span>
            <div className="h-px w-12 bg-[#C5A880]" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}