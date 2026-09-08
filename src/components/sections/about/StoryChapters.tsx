"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  {
    n: "01",
    title: "the first drop",
    text: "In MMXXVI, SHAWQ set sail with a single maceration: oud resting in rose attar. What began as one experiment became the foundation of our house style.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1400&auto=format&fit=crop",
  },
  {
    n: "02",
    title: "through the blends",
    text: "From first accords to iconic extraits, SHAWQ has shaped how scent is worn across generations — composing with patience, always ahead of its time.",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1400&auto=format&fit=crop",
  },
  {
    n: "03",
    title: "a new era of luxury",
    text: "Commissions for private collectors and luxury houses marked a turning point — blending five-star hospitality with bespoke perfumery, creating a new class of extrait.",
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1400&auto=format&fit=crop",
  },
  {
    n: "04",
    title: "lasting, yet evolving",
    text: "With a growing oil library and eyes on the future, SHAWQ continues to lead in sustainable, refined and visionary perfumery — where heritage meets what's next.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function StoryChapters() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop only: pin + horizontal scroll
    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const distance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      gsap.fromTo(progressRef.current, { scaleX: 0 }, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + distance(),
          scrub: true,
        },
      });

      return () => tween.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#EDE7DB] lg:h-screen lg:overflow-hidden">
      <div
        ref={trackRef}
        className="flex flex-col gap-24 px-6 py-24 sm:px-12 lg:h-screen lg:flex-row lg:items-center lg:gap-0 lg:py-0 lg:pl-[8vw] will-change-transform"
      >
        {chapters.map((c) => (
          <article
            key={c.n}
            className="lg:flex lg:w-[74vw] lg:shrink-0 lg:items-center lg:gap-[4vw] xl:w-[60vw]"
          >
            <div className="relative aspect-[4/5] w-full max-w-[440px] overflow-hidden lg:aspect-auto lg:h-[62vh] lg:w-[32vw] lg:max-w-none">
              <Image
                src={c.image}
                alt={c.title}
                fill
                sizes="(max-width: 1024px) 92vw, 34vw"
                className="object-cover"
              />
            </div>

            <div className="mt-8 lg:mt-0 lg:max-w-[22vw]">
              <span className="text-[10px] uppercase tracking-[0.45em] text-[#9F8057]">
                {c.n} — chapter
              </span>
              <h3 className="mt-4 font-serif text-4xl text-[#161310] lg:text-5xl">
                {c.title}
              </h3>
              <p className="mt-5 text-sm leading-[1.9] text-[#161310]/65">{c.text}</p>
            </div>
          </article>
        ))}

        <div className="lg:w-[36vw] lg:shrink-0 lg:pr-[8vw]">
          <p className="font-serif text-3xl leading-snug text-[#161310]/80 lg:text-4xl">
            where heritage meets what&apos;s next.
          </p>
        </div>
      </div>

      {/* Horizontal progress line (desktop) */}
      <div className="pointer-events-none absolute bottom-10 left-[8vw] right-[8vw] hidden h-px bg-[#161310]/10 lg:block">
        <div ref={progressRef} className="h-full w-full origin-left bg-[#9F8057]" />
      </div>
    </section>
  );
}