"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";

const slides = [
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1400&auto=format&fit=crop",
];

// Fix: Cast ease array to a strict tuple type
const cubicBezier: [number, number, number, number] = [0.22, 1, 0.36, 1];

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: cubicBezier,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.7,
      ease: cubicBezier,
    },
  }),
};

export default function BukhoorRitual() {
  const [[index, direction], setIndex] = useState([0, 0]);

  const prev = () => setIndex(([i]) => [(i - 1 + slides.length) % slides.length, -1]);
  const next = () => setIndex(([i]) => [(i + 1) % slides.length, 1]);

  return (
    <section className="bg-[#F5F0E8] px-6 py-28 sm:px-12 lg:px-24">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
        {/* Text Column */}
        <div>
          <FadeIn>
            <h2 className="font-serif text-5xl text-[#161310] sm:text-6xl">
              bukhoor time
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-8 text-sm leading-[1.9] text-[#161310]/65">
              At SHAWQ, perfume is not only about form and fragrance — it&apos;s also
              about human connection. The bukhoor ritual is the quiet force behind
              our creative culture: a space where ideas are exchanged, perspectives
              are broadened, and relationships are nurtured.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-sm leading-[1.9] text-[#161310]/65">
              In a world that often moves too fast, bukhoor reminds us of the value
              of time, presence and shared purpose — qualities reflected in every
              bottle the house brings to life.
            </p>
          </FadeIn>
        </div>

        {/* Image Slider Column */}
        <FadeIn delay={0.15}>
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <Image
                  src={slides[index]}
                  alt={`The bukhoor ritual — frame ${index + 1}`}
                  fill
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-between">
            <span className="text-[10px] tracking-[0.4em] text-[#161310]/50">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
            <div className="flex gap-3">
              <button
                onClick={prev}
                aria-label="Previous image"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#161310]/20 text-[#161310] transition-colors hover:bg-[#161310] hover:text-[#F5F0E8]"
              >
                ←
              </button>
              <button
                onClick={next}
                aria-label="Next image"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#161310]/20 text-[#161310] transition-colors hover:bg-[#161310] hover:text-[#F5F0E8]"
              >
                →
              </button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
} 