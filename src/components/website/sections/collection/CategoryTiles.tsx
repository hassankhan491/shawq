// src/components/website/sections/collection/CategoryTiles.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CategoryTile {
  id: string;
  label: string;
  image: string;
  href: string;
}

const CATEGORY_TILES: CategoryTile[] = [
  {
    id: 'candles',
    label: 'Candles',
    image: '/images/categories/candles.jpg', // TODO: Replace with your actual image
    href: '/collections?category=candles',
  },
  {
    id: 'body',
    label: 'Body',
    image: '/images/categories/body.jpg', // TODO: Replace with your actual image
    href: '/collections?category=body',
  },
];

export default function CategoryTiles() {
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tiles = sectionRef.current!.querySelectorAll<HTMLElement>('[data-tile]');

      gsap.fromTo(
        tiles,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full px-6 md:px-12 lg:px-24 py-20 md:py-32 border-t border-[#2A2520]/10"
    >
      {/* Section Heading */}
      <div className="max-w-[1600px] mx-auto mb-12 md:mb-16">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#B8935A] mb-4">
          Explore More
        </p>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2A2520] leading-tight">
          Beyond Fragrance
        </h2>
      </div>

      {/* Tile Grid */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        {CATEGORY_TILES.map((tile) => (
          <Link
            key={tile.id}
            data-tile
            href={tile.href}
            className="group relative block aspect-[3/4] md:aspect-[4/5] w-full overflow-hidden bg-[#0A0A0A]"
            aria-label={`Explore ${tile.label}`}
          >
            {/* Background Image */}
            <Image
              src={tile.image}
              alt={tile.label}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
            />

            {/* Dark Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* Label Content */}
            <div className="absolute inset-x-0 top-0 p-8 md:p-12">
              <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-none tracking-tight">
                {tile.label}
              </h3>
            </div>

            {/* Bottom CTA Arrow */}
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 flex items-end justify-between">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">
                Discover
              </span>
              <div className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:border-white">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-white transition-colors duration-300 group-hover:text-[#2A2520]"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}