// components/sections/ShowcaseSection.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import gsap from "gsap";
import { useReducedMotion } from "framer-motion";

interface ShowcaseProduct {
  name: string;
  family: string;
  notes: string;
  image: string;
}

/* Same 4 products as the Blade file — put images in /public/assets/images/NB_1/ */
const PRODUCTS: ShowcaseProduct[] = [
  { name: "Noir",  family: "A dark smoky amber",     notes: "Star Anise, Coffee, Cassis",     image: "/images/NB-06.png" },
  { name: "Rouge", family: "A blaze of saffron and rose", notes: "Saffron, Damask Rose, Oud", image: "/images/NB-07.png" },
  { name: "Élan",  family: "A bright aromatic wood", notes: "Bergamot, Iris, White Musk",     image: "/images/NB-08.png" },
  { name: "Ambre", family: "A sweet sultry amber",   notes: "Golden Amber, Vanilla, Sandalwood", image: "/images/NB-09.png" },
];

const RED = "#c41e3a";
const LUX_EASE = "cubic-bezier(0.22, 1, 0.36, 1)"; /* ≈ --ease-lux */

export default function ShowcaseSection() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [info, setInfo] = useState<ShowcaseProduct>(PRODUCTS[0]);

  const nameRef = useRef<HTMLHeadingElement>(null);
  const familyRef = useRef<HTMLParagraphElement>(null);
  const notesRef = useRef<HTMLParagraphElement>(null);
  const shopRef = useRef<HTMLAnchorElement>(null);
  const shownName = useRef(PRODUCTS[0].name);

  useEffect(
    () => () => {
      gsap.killTweensOf([nameRef.current, familyRef.current, notesRef.current, shopRef.current]);
    },
    []
  );

  /* GSAP crossfade — identical to showcase.js setInfo() */
  const changeInfo = (p: ShowcaseProduct) => {
    if (p.name === shownName.current) return;
    shownName.current = p.name;
    if (reduced) { setInfo(p); return; }
    const targets = [nameRef.current, familyRef.current, notesRef.current, shopRef.current].filter(Boolean) as Element[];
    gsap.to(targets, {
      autoAlpha: 0, y: -12, duration: 0.28, ease: "power2.in", stagger: 0.03,
      onComplete() {
        setInfo(p);
        gsap.to(targets, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.05 });
      },
    });
  };

  const onSlideChange = (s: SwiperClass) => {
    const idx = s.realIndex % PRODUCTS.length;
    setActive(idx);
    changeInfo(PRODUCTS[idx]);
  };

  return (
    <section
      aria-label="Featured fragrances"
      className="relative overflow-hidden bg-[#edeae3] pt-[70px] pb-10 sm:pt-20 sm:pb-12 md:pt-[clamp(60px,10vh,110px)] md:pb-[50px] lg:pt-[clamp(70px,11vh,130px)] lg:pb-[60px] xl:pt-[clamp(80px,12vh,150px)] xl:pb-[70px] 2xl:pt-[clamp(90px,14vh,180px)] 2xl:pb-20"
    >
      {/* ===== TOP: label + product name ===== */}
      <div className="mb-6 px-6 text-center sm:mb-[34px] md:mb-[clamp(24px,5vh,60px)] xl:mb-[clamp(28px,6vh,70px)] 2xl:mb-[clamp(36px,7vh,90px)]">
        <span
          className="text-[9px] uppercase tracking-[0.22em] sm:text-[10px] sm:tracking-[0.26em] xl:text-[11px] xl:tracking-[0.3em]"
          style={{ fontFamily: "var(--font-body)", color: RED }}
        >
          Extrait de Parfum — 50 ml
        </span>
        <h2
          ref={nameRef}
          className="mt-[10px] text-[1.2rem] uppercase tracking-[0.22em] text-black sm:mt-[18px] sm:text-[1.35rem] sm:tracking-[0.28em] md:text-[clamp(1.4rem,2.6vw,2rem)] md:tracking-[0.3em] lg:text-[clamp(1.5rem,2.8vw,2.4rem)] xl:text-[clamp(1.6rem,3vw,2.6rem)] xl:tracking-[0.35em] 2xl:text-[clamp(1.8rem,2.8vw,3rem)]"
          style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
        >
          {info.name}
        </h2>
      </div>

      {/* ===== STAGE: centered carousel, blurred ghosts ===== */}
      <div className="relative">
        <Swiper
          modules={[Autoplay, Keyboard]}
          slidesPerView={1.35}
          centeredSlides
          loop
          grabCursor
          speed={900}
          spaceBetween={20}
          keyboard={{ enabled: true, onlyInViewport: true }}
          autoplay={reduced ? false : { delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          breakpoints={{
            576:  { slidesPerView: 1.8, spaceBetween: 28 },
            992:  { slidesPerView: 2.4, spaceBetween: 36 },
            1280: { slidesPerView: 3,   spaceBetween: 48 },
            1600: { slidesPerView: 3.4, spaceBetween: 60 },
          }}
          onSlideChange={onSlideChange}
          style={{ overflow: "visible" }} /* = .swiper { overflow: visible !important } */
        >
          {/* Doubled slides → real ghosts on both sides in loop mode (same as showcase.js) */}
          {[...PRODUCTS, ...PRODUCTS].map((p, i) => (
            <SwiperSlide key={`${p.name}-${i}`} className="flex justify-center">
              <img
                src={p.image}
                alt={`${p.name} — Extrait de Parfum`}
                loading="lazy"
                className={`
                  w-[78vw] h-[58vw] object-contain
                  sm:w-[min(100%,340px)] sm:h-[40vh]
                  md:w-[min(100%,380px)] md:h-[42vh]
                  lg:w-[min(100%,420px)] lg:h-[clamp(260px,44vh,440px)]
                  xl:w-[min(100%,480px)] xl:h-[clamp(260px,46vh,480px)]
                  2xl:w-[min(100%,520px)] 2xl:h-[clamp(300px,50vh,520px)]
                  blur-[10px] sm:blur-[16px] opacity-45 sm:opacity-40 scale-90
                  transition-[filter,opacity,transform] duration-[800ms]
                  will-change-[filter,opacity,transform]
                  [.swiper-slide-active_&]:blur-none [.swiper-slide-active_&]:opacity-100 [.swiper-slide-active_&]:scale-100
                `}
                style={{ transitionTimingFunction: LUX_EASE }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ===== BOTTOM: family + notes + CTA + progress ===== */}
      <div className="mt-6 px-6 text-center sm:mt-[34px] md:mt-[clamp(24px,5vh,60px)] xl:mt-[clamp(28px,6vh,70px)] 2xl:mt-[clamp(36px,7vh,90px)]">
        <p
          ref={familyRef}
          className="text-[9px] uppercase tracking-[0.22em] text-black sm:text-[10px] sm:tracking-[0.26em] xl:text-[11px] xl:tracking-[0.3em] 2xl:text-[12px]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {info.family}
        </p>
        <p
          ref={notesRef}
          className="mt-1.5 text-[12px] text-black/50 sm:text-[13px] xl:text-[14px] 2xl:text-[15px]"
          style={{ fontFamily: "var(--font-body)", letterSpacing: "0.03em", lineHeight: 1.6 }}
        >
          {info.notes}
        </p>

        <Link
          ref={shopRef}
          href="/shop"
          className="mt-5 inline-block border border-black bg-black px-7 py-3 text-[10px] uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:border-[#c41e3a] hover:bg-[#c41e3a] sm:mt-[26px] sm:px-11 sm:py-4 sm:text-[11px] sm:tracking-[0.3em] 2xl:px-[52px] 2xl:py-[18px] 2xl:text-[12px]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Shop {info.name}
        </Link>

        {/* Segmented progress */}
        <div className="mt-7 flex justify-center gap-1 sm:mt-[34px] sm:gap-1.5 xl:mt-11 2xl:mt-[52px]" aria-hidden="true">
          {PRODUCTS.map((p, i) => (
            <span
              key={p.name}
              className="relative block h-0.5 w-8 overflow-hidden bg-[rgba(17,17,17,0.15)] sm:w-10 md:w-11 lg:w-[50px] xl:w-14 2xl:w-16"
            >
              <span
                className={`absolute inset-0 origin-left bg-[#c41e3a] transition-transform duration-500 ${i === active ? "scale-x-100" : "scale-x-0"}`}
                style={{ transitionTimingFunction: LUX_EASE }}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}