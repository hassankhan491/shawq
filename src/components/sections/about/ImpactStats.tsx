"use client";

import FadeIn from "@/components/ui/FadeIn";
import Image from "next/image";

const stats = [
  {
    value: "98%",
    label: "Client Satisfaction",
    description: "Of our clients report increased confidence",
  },
  {
    value: "50K+",
    label: "Bottles Crafted",
    description: "Hand-blended with precision and care",
  },
  {
    value: "12",
    label: "Signature Scents",
    description: "Each telling a unique story",
  },
];

export default function ImpactStats() {
  return (
    <section className="relative bg-[#0d0c0a] py-32 px-6 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1920&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0c0a] via-[#0d0c0a]/90 to-[#0d0c0a]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <FadeIn className="text-center mb-20">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#C5A880]">
            Our clients have seen results like...
          </p>
          <h2 className="mt-6 font-decorative text-4xl uppercase tracking-wide text-[#F5F0E8] sm:text-5xl lg:text-6xl">
            The SHAWQ Effect
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {stats.map((stat, index) => (
            <FadeIn key={index} delay={index * 0.15} className="text-center">
              <div className="mb-4">
                <span className="font-decorative text-6xl font-light text-[#C5A880] sm:text-7xl">
                  {stat.value}
                </span>
              </div>
              <h3 className="mb-3 text-sm uppercase tracking-[0.3em] text-[#F5F0E8]">
                {stat.label}
              </h3>
              <p className="text-sm text-[#E8DED0]/60">{stat.description}</p>
            </FadeIn>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute left-10 top-10 h-16 w-16 border-l border-t border-[#C5A880]/30" />
        <div className="absolute bottom-10 right-10 h-16 w-16 border-r border-b border-[#C5A880]/30" />
      </div>
    </section>
  );
}