"use client";

import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

const makers = [
  { name: "fatima hassan", role: "founder & master perfumer" },
  { name: "ayaan qureshi", role: "head of oud sourcing" },
  { name: "maha sheikh", role: "creative director" },
];

export default function MeetTheMakers() {
  return (
    <section className="bg-[#0d0c0a] px-6 py-32 text-center sm:px-12">
      <FadeIn>
        <h2 className="font-serif text-5xl sm:text-7xl">
          <span className="text-[#F5F0E8]">meet the </span>
          <span className="text-[#F5F0E8]/25">makers</span>
        </h2>
      </FadeIn>

      <FadeIn delay={0.15}>
        <p className="mx-auto mt-8 max-w-xl text-sm leading-[1.9] text-[#E8DED0]/60">
          Behind every detail is a team. Discover the people shaping SHAWQ
          creations, where vision, skill and dedication come together.
        </p>
      </FadeIn>

      <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-10 sm:grid-cols-3">
        {makers.map((m, i) => (
          <FadeIn key={m.name} delay={0.2 + i * 0.1}>
            <p className="text-base font-extralight lowercase text-[#F5F0E8]">{m.name}</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-[#C5A880]/70">{m.role}</p>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.5}>
        <Link
          href="/shop"
          className="mt-16 inline-block border-b border-[#C5A880]/50 pb-2 text-xs uppercase tracking-[0.4em] text-[#C5A880] transition-colors hover:border-[#C5A880]"
        >
          discover
        </Link>
      </FadeIn>
    </section>
  );
}