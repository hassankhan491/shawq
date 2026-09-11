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
    image: "/images/about-3.jpg",
  },
  {
    n: "02",
    title: "through the blends",
    text: "From first accords to iconic extraits, SHAWQ has shaped how scent is worn across generations — composing with patience, always ahead of its time.",
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1400&auto=format&fit=crop",
  },
  {
    n: "03",
    title: "a new era of luxury",
    text: "Commissions for private collectors and luxury houses marked a turning point — blending five-star hospitality with bespoke perfumery, creating a new class of extrait.",
    image:
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1400&auto=format&fit=crop",
  },
  {
    n: "04",
    title: "lasting, yet evolving",
    text: "With a growing oil library and eyes on the future, SHAWQ continues to lead in sustainable, refined and visionary perfumery — where heritage meets what's next.",
    image: "/images/about-4.jpeg",
  },
];

export default function StoryChapters() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

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
          scrub: 1.2,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Progress bar
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + distance(),
            scrub: true,
          },
        }
      );

      // Parallax within each chapter image
      chapterRefs.current.forEach((el) => {
        if (!el) return;
        const img = el.querySelector("[data-chapter-img]");
        if (!img) return;
        gsap.fromTo(
          img,
          { scale: 1.12 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "left 80%",
              end: "right 20%",
              scrub: true,
              containerAnimation: tween,
            },
          }
        );
      });

      return () => tween.scrollTrigger?.kill();
    });

    // Mobile: vertical scroll-triggered reveals
    mm.add("(max-width: 1023px)", () => {
      chapterRefs.current.forEach((el) => {
        if (!el) return;
        const img = el.querySelector("[data-chapter-img]");
        const text = el.querySelector("[data-chapter-text]");

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.08, opacity: 0.6 },
            {
              scale: 1,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                end: "top 30%",
                scrub: true,
              },
            }
          );
        }

        if (text) {
          gsap.fromTo(
            text,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: text,
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#EDE7DB] lg:h-screen lg:overflow-hidden"
      aria-label="Our story in chapters"
    >
      <div
        ref={trackRef}
        className="flex flex-col gap-20 px-6 py-24 sm:px-12 lg:h-screen lg:flex-row lg:items-center lg:gap-0 lg:py-0 lg:pl-[6vw] will-change-transform"
      >
        {chapters.map((c, i) => (
          <article
            key={c.n}
            ref={(el) => { chapterRefs.current[i] = el; }}
            className="lg:flex lg:w-[72vw] lg:shrink-0 lg:items-center lg:gap-[3.5vw] xl:w-[58vw]"
          >
            {/* Image */}
            <div className="relative aspect-[4/5] w-full max-w-[460px] overflow-hidden lg:aspect-auto lg:h-[64vh] lg:w-[30vw] lg:max-w-none">
              <div
                data-chapter-img
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(max-width: 1024px) 92vw, 30vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Text */}
            <div
              data-chapter-text
              className="mt-8 lg:mt-0 lg:max-w-[20vw]"
            >
              <span className="text-[10px] uppercase tracking-[0.5em] text-[#9F8057]">
                {c.n} — chapter
              </span>
              <h3 className="mt-5 font-serif text-4xl leading-[1.1] text-[#161310] lg:text-[2.8rem]">
                {c.title}
              </h3>
              <p className="mt-6 text-[15px] leading-[1.95] text-[#161310]/55">
                {c.text}
              </p>
            </div>
          </article>
        ))}

        {/* End card */}
        <div className="lg:flex lg:w-[40vw] lg:shrink-0 lg:items-center lg:pr-[6vw]">
          <p className="font-serif text-3xl leading-[1.2] text-[#161310]/75 lg:text-[2.6rem]">
            where heritage
            <br />
            meets what&apos;s next.
          </p>
        </div>
      </div>

      {/* Progress line (desktop) */}
      <div className="pointer-events-none absolute bottom-8 left-[6vw] right-[6vw] hidden h-px bg-[#161310]/8 lg:block">
        <div
          ref={progressRef}
          className="h-full w-full origin-left bg-[#9F8057] will-change-transform"
        />
      </div>
    </section>
  );
}