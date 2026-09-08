"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeIn from "@/components/ui/FadeIn";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 12, suffix: "", label: "signature extraits" },
  { value: 50, suffix: "k+", label: "bottles hand-filled" },
  { value: 3, suffix: "", label: "ateliers worldwide" },
];

export default function HouseNumbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      stats.forEach((s, i) => {
        const el = refs.current[i];
        if (!el) return;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: s.value,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v)).padStart(2, "0") + s.suffix;
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0d0c0a] px-6 py-28 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <p className="text-center text-sm leading-[1.9] text-[#E8DED0]/70">
            since mmxxvi, SHAWQ has shaped iconic experiences through timeless
            compositions and technical excellence — with a devoted atelier team
            and presence in karachi, dubai and london, combining global reach
            with deep olfactory expertise.
          </p>
        </FadeIn>

        <div className="mt-20 grid grid-cols-1 gap-14 text-center sm:grid-cols-3">
          {stats.map((s, i) => (
            <div key={s.label}>
              <span
                ref={(el) => { refs.current[i] = el; }}
                className="block text-5xl font-extralight text-[#C5A880] sm:text-6xl"
              >
                00{s.suffix}
              </span>
              <p className="mt-4 text-[10px] uppercase tracking-[0.4em] text-[#E8DED0]/50">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}