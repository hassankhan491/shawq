"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [done, setDone] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (done) return;

    // Accessibility: skip animation for reduced-motion users
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }

    const lenis = (window as any).__lenis;
    lenis?.stop(); // lock scroll while loading
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const counter = { v: 0 };

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          lenis?.start();
          setDone(true);
        },
      });

      // 1) SPLIT-WORD REVEAL — name + soul rise through masks
      tl.fromTo(
        ".ld-mask > span",
        { yPercent: 120 },
        { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.12 },
        0.15
      )
      // 2) Gold progress line + 000→100 counter
        .fromTo(
          ".ld-line",
          { scaleX: 0 },
          { scaleX: 1, duration: 2.1, ease: "power2.inOut", transformOrigin: "left center" },
          0.2
        )
        .to(counter, {
          v: 100,
          duration: 2.1,
          ease: "power2.inOut",
          onUpdate: () => {
            if (countRef.current)
              countRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        }, 0.2)
      // 3) Hold a beat, then words exit upward through their masks
        .to(
          ".ld-mask > span",
          { yPercent: -120, duration: 0.7, ease: "power4.in", stagger: 0.08 },
          "+=0.25"
        )
        .to(".ld-bottom", { autoAlpha: 0, y: -24, duration: 0.45, ease: "power2.in" }, "<")
      // 4) DOUBLE-CURTAIN EXIT: image lifts → gold flash → page revealed
        .to(".ld-image", { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "-=0.1")
        .to(".ld-gold", { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "-=0.65");
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [done]);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[100]" aria-hidden="true">
      {/* Gold curtain (behind) */}
      <div className="ld-gold absolute inset-0 bg-[#FCA311]" />

      {/* Image curtain (front, holds content) */}
      <div 
        className="ld-image absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/red.jpg')" }}
      >
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Center — split word reveal */}
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 px-6">
          <div className="ld-mask overflow-hidden">
            <span className="block font-serif text-[14vw] sm:text-[10vw] lg:text-[7vw] leading-none tracking-wide text-[#A48950] drop-shadow-2xl">
              SHAWQ
            </span>
          </div>
          <div className="ld-mask overflow-hidden">
            <span className="block font-serif italic text-lg sm:text-2xl lg:text-3xl tracking-[0.08em] text-white drop-shadow-xl">
              the soul of scent
            </span>
          </div>
        </div>

        {/* Bottom bar — counter + label + progress line */}
        <div className="ld-bottom absolute inset-x-0 bottom-0 px-6 pb-6 sm:px-10 sm:pb-8">
          <div className="mb-4 flex items-end justify-between">
            <span
              ref={countRef}
              className="font-sans text-xs tracking-[0.3em] text-[#A48950] sm:text-sm drop-shadow-lg"
            >
              000
            </span>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/80 sm:text-xs drop-shadow-lg">
              Eau de Parfum
            </span>
          </div>
          <div className="ld-line h-px w-full bg-[#A48950]/60" />
        </div>
      </div>
    </div>
  );
}