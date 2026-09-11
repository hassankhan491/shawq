"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });

      // Title floats up and fades
      tl.to(
        titleRef.current,
        { yPercent: -80, opacity: 0, ease: "none" },
        0
      );

      // Subtitle fades faster
      tl.to(
        subtitleRef.current,
        { yPercent: -40, opacity: 0, ease: "none" },
        0
      );

      // Image scales up dramatically
      tl.to(
        imgRef.current,
        {
          scale: 1.15,
          ease: "none",
        },
        0
      );

      // Image wrapper clip-path reveal (circle expands then fades)
      tl.fromTo(
        imgWrapRef.current,
        { clipPath: "inset(8% round 2px)" },
        { clipPath: "inset(0% round 0px)", ease: "none" },
        0
      );

      // Scroll hint fades out immediately
      tl.to(
        scrollHintRef.current,
        { opacity: 0, y: -20, ease: "none" },
        0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[250vh] bg-[#F5F0E8]"
      aria-label="About SHAWQ Fragrances"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-[10px] uppercase tracking-[0.5em] text-[#9F8057] will-change-transform sm:text-[11px]"
        >
          shawq fragrances · est. mmxxvi
        </p>

        {/* Main title */}
        <div ref={titleRef} className="mt-6 text-center will-change-transform">
          <h1 className="font-serif text-[15vw] leading-[0.88] text-[#161310] sm:text-[11vw] lg:text-[8vw]">
            beyond
            <br />
            the bottle
          </h1>
        </div>

        {/* Hero image with clip-path reveal */}
        <div
          ref={imgWrapRef}
          className="relative mt-10 h-[38vh] w-[82vw] max-w-[620px] overflow-hidden will-change-[clip-path] sm:mt-14 sm:h-[42vh]"
          style={{ clipPath: "inset(8% round 2px)" }}
        >
          <div ref={imgRef} className="absolute inset-0 will-change-transform">
            <Image
              src="/images/about-1.jpeg"
              alt="SHAWQ extrait de parfum — hero"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        >
          <span className="text-[9px] uppercase tracking-[0.5em] text-[#161310]/40">
            scroll
          </span>
          <div className="h-10 w-px bg-[#161310]/15">
            <div className="h-full w-full origin-top animate-[scaleY_2s_ease-in-out_infinite] bg-[#9F8057]/60" />
          </div>
        </div>
      </div>
    </section>
  );
}