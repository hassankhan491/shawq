"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      })
        .to(titleRef.current, { yPercent: -60, opacity: 0, ease: "none" }, 0)
        .to(
          imgRef.current,
          {
            scale: () => {
              const el = imgRef.current;
              if (!el) return 1;
              return (
                Math.max(
                  window.innerWidth / el.offsetWidth,
                  window.innerHeight / el.offsetHeight
                ) * 1.05
              );
            },
            ease: "none",
          },
          0
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[220vh] bg-[#F5F0E8]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        <div ref={titleRef} className="text-center will-change-transform">
          <p className="text-[10px] uppercase tracking-[0.45em] text-[#9F8057]">
            shawq fragrances · est. mmxxvi
          </p>
          <h1 className="mt-6 font-serif text-[14vw] leading-[0.95] text-[#161310] sm:text-[10vw] lg:text-[7.5vw]">
            beyond
            <br />
            the bottle
          </h1>
        </div>

        <div
          ref={imgRef}
          className="relative mt-12 h-[42vh] w-[78vw] max-w-[560px] overflow-hidden will-change-transform"
        >
          <Image
            src="https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1800&auto=format&fit=crop"
            alt="SHAWQ extrait de parfum mist"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}