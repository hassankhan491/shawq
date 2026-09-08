"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeIn from "@/components/ui/FadeIn";

gsap.registerPlugin(ScrollTrigger);

const segments = [
  {
    title: "extrait de parfum",
    text: "By merging timeless elegance with forward-thinking composition, SHAWQ creates scents that welcome, inspire and connect. Each new bottle carries both heritage and vision towards the horizon.",
    big: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1400&auto=format&fit=crop",
    small: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "attar & oud",
    text: "Our experience with Eastern oils led us to rethink purity itself — questioning how the depth of aged oud could coexist with the intimacy of a skin scent. The attar collection is our answer.",
    big: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1400&auto=format&fit=crop",
    small: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "bukhoor blends",
    text: "Our history with resin and smoke has shaped a clear understanding: bukhoor is not about intensity, but about connection. Behind the scenes, our blenders ensure every chip burns slow, clean and true.",
    big: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1400&auto=format&fit=crop",
    small: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "the layering ritual",
    text: "Layering is about access, and access depends on composition. With years of experience in complex accords, SHAWQ creates fragrances that layer seamlessly, without compromising character.",
    big: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1400&auto=format&fit=crop",
    small: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=900&auto=format&fit=crop",
  },
];

export default function CollectionSegments() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="bg-[#F5F0E8] px-6 pb-32 sm:px-12 lg:px-24">
      <div className="space-y-28">
        {segments.map((s, i) => (
          <FadeIn key={s.title}>
            <div className="grid items-center gap-10 lg:grid-cols-12">
              {/* Text */}
              <div className={`lg:col-span-4 ${i % 2 === 0 ? "" : "lg:order-3 lg:col-start-9"}`}>
                <h3 className="font-serif text-4xl text-[#161310] sm:text-5xl">{s.title}</h3>
                <p className="mt-6 text-sm leading-[1.9] text-[#161310]/65">{s.text}</p>
                <Link
                  href="/shop"
                  className="group mt-8 inline-block text-xs uppercase tracking-[0.35em] text-[#9F8057]"
                >
                  discover
                  <span className="mt-2 block h-px w-full bg-[#9F8057]/40 transition-all duration-500 group-hover:bg-[#9F8057]" />
                </Link>
              </div>

              {/* Big image */}
              <div className={`relative aspect-[4/3] overflow-hidden lg:col-span-5 ${i % 2 === 0 ? "lg:col-start-6" : "lg:col-start-2 lg:row-start-1"}`}>
                <div data-parallax className="absolute inset-x-0 -inset-y-[10%]">
                  <Image src={s.big} alt={s.title} fill sizes="(max-width: 1024px) 92vw, 42vw" className="object-cover" />
                </div>
              </div>

              {/* Small offset image */}
              <div className={`relative aspect-square w-2/3 overflow-hidden justify-self-end lg:col-span-2 lg:w-full ${i % 2 === 0 ? "lg:col-start-11 lg:row-start-1 lg:mt-24" : "lg:col-start-8 lg:row-start-1 lg:mt-24"}`}>
                <div data-parallax className="absolute inset-x-0 -inset-y-[10%]">
                  <Image src={s.small} alt={`${s.title} detail`} fill sizes="(max-width: 1024px) 60vw, 16vw" className="object-cover" />
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}