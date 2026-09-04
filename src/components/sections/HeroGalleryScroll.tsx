// components/sections/HeroGalleryScroll.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/* Detect mobile (< 640px) */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isMobile;
}

export default function HeroGalleryScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 400,
    restDelta: 0.001,
  });

  const progress = prefersReducedMotion ? scrollYProgress : smoothProgress;

  /* Uniform scales — no distortion */
  const topScale = useTransform(progress, [0, 0.85], [1, isMobile ? 1 : 0.8]);
  const leftScale = useTransform(progress, [0, 0.85], [1, isMobile ? 1 : 0.72]);
  const rightScale = useTransform(progress, [0, 0.85], [1, isMobile ? 1 : 0.72]);

  /* TEXT */
  const textOpacity = useTransform(progress, [0.2, 0.75], [0, 1]);
  const textScale = useTransform(progress, [0.2, 0.75], [0.8, 1]);
  const textY = useTransform(progress, [0.2, 0.75], [60, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] bg-black sm:h-[350vh]"
    >
      {/* Sticky stage — grid FILLS the viewport, so nothing hides or leaves dead space */}
      <div className="sticky top-0 flex h-screen h-svh w-full flex-col overflow-hidden px-0 pt-0 sm:px-4 sm:pt-4">
        {/* SECTION HEADING */}
        <h2
          className="shrink-0 py-[30px] text-center text-4xl text-white sm:text-5xl md:text-6xl"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Shop by Category
        </h2>

        {/* GRID — stretches to fill remaining height on ALL breakpoints:
            • mobile: UNISEX 100% + MEN/WOMEN 50/50, edge-to-edge, no bottom gap
            • desktop: full-bleed, bottom row taller, nothing clips below the fold */}
        <div className="grid min-h-0 w-full flex-1 grid-cols-2 grid-rows-2 gap-0 sm:grid-rows-[1fr_1.25fr] sm:gap-1">
          {/* TOP IMAGE — UNISEX */}
          <motion.div
            style={{ scale: topScale, willChange: "transform" }}
            className="relative col-span-2 origin-top overflow-hidden shadow-xl"
          >
            <img
              src="/images/unisex-01.jpeg"
              alt="Unisex fragrance collection"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl"
                style={{
                  fontFamily: "var(--font-serif)",
                  textShadow: "0 2px 24px rgba(0,0,0,0.4)",
                  letterSpacing: "0.05em",
                }}
              >
                UNISEX
              </span>
            </div>
          </motion.div>

          {/* BOTTOM LEFT — MEN */}
          <motion.div
            style={{ scale: leftScale, willChange: "transform" }}
            className="relative origin-bottom-left overflow-hidden shadow-xl"
          >
            <img
              src="/images/men-01.jpeg"
              alt="Men's fragrance collection"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-3xl text-white sm:text-4xl md:text-5xl"
                style={{
                  fontFamily: "var(--font-serif)",
                  textShadow: "0 2px 24px rgba(0,0,0,0.4)",
                  letterSpacing: "0.05em",
                }}
              >
                MEN
              </span>
            </div>
          </motion.div>

          {/* BOTTOM RIGHT — WOMEN */}
          <motion.div
            style={{ scale: rightScale, willChange: "transform" }}
            className="relative origin-bottom-right overflow-hidden shadow-xl"
          >
            <img
              src="/images/women-01.jpeg"
              alt="Women's fragrance collection"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-3xl text-white sm:text-4xl md:text-5xl"
                style={{
                  fontFamily: "var(--font-serif)",
                  textShadow: "0 2px 24px rgba(0,0,0,0.4)",
                  letterSpacing: "0.05em",
                }}
              >
                WOMEN
              </span>
            </div>
          </motion.div>
        </div>

        {/* Mobile-only dark veil */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute inset-0 z-10 bg-black/50 sm:hidden"
          aria-hidden="true"
        />

        {/* CENTER TEXT */}
        <motion.div
          style={{ opacity: textOpacity, scale: textScale, y: textY }}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center sm:inset-x-0 sm:bottom-0 sm:top-[28%]"
        >
          <h2
            className="text-4xl text-white sm:text-5xl md:text-6xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            The Art of Scent
          </h2>
          <p
            className="mt-4 max-w-xl text-white/70"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              letterSpacing: "0.03em",
              lineHeight: 1.6,
            }}
          >
            Experience the art of fine fragrances, crafted with passion and
            precision.
          </p>
          <div className="pointer-events-auto mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <button
              className="bg-white px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-black transition-colors duration-300 hover:bg-white/90"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Explore Collection
            </button>
            <button
              className="border border-white/30 px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-white/10"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Our Story
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}