"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [done, setDone] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (done) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }

    const lenis = (window as any).__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";

    // 1. Preload image to avoid main-thread lock while decoding
    const img = new Image();
    img.src = window.innerWidth < 768 ? "/images/loader-mob.jpg" : "/images/loader-01.jpeg";

    const ctx = gsap.context(() => {
      const counter = { v: 0 };

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          lenis?.start();
          setDone(true);
        },
      });

      // Set initial optimized states
      gsap.set(".ld-title span", {
        yPercent: 115,
        opacity: 0,
        force3D: true,
      });

      gsap.set(".ld-subtitle span, .ld-eyebrow, .ld-meta, .ld-corner", {
        opacity: 0,
        force3D: true,
      });

      gsap.set(".ld-line, .ld-line-glow", {
        scaleX: 0,
        transformOrigin: "left center",
        force3D: true,
      });

      // Grouped sequence to minimize compositor pipeline steps
      tl.to(".ld-image img", {
        scale: 1.04,
        duration: 1.3,
        ease: "power2.out",
      })
        .to(
          ".ld-eyebrow",
          { opacity: 1, duration: 0.6, ease: "power2.out" },
          0.2
        )
        .to(
          ".ld-title span",
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
            stagger: 0.05,
          },
          0.3
        )
        .to(
          ".ld-subtitle span",
          { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          0.4
        )
        .to(
          ".ld-corner, .ld-meta",
          { opacity: 1, duration: 0.6, stagger: 0.05 },
          0.6
        )
        .to(
          [".ld-line", ".ld-line-glow"],
          { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
          0.5
        )
        .to(
          counter,
          {
            v: 100,
            duration: 0.8,
            ease: "power2.inOut",
            onUpdate: () => {
              if (countRef.current) {
                countRef.current.textContent = String(
                  Math.round(counter.v)
                ).padStart(3, "0");
              }
            },
          },
          0.5
        )
        /* Pause at 100% */
        .to({}, { duration: 0.8 })

        /* Fast Exit Sequence */
        .to(".ld-title span, .ld-subtitle span, .ld-eyebrow, .ld-meta, .ld-corner", {
          opacity: 0,
          y: -10,
          duration: 0.2,
          ease: "power2.in",
        })
        .to(".ld-image", {
          yPercent: -100,
          duration: 0.4,
          ease: "power4.inOut",
        }, "-=0.1")
        .to(".ld-gold", {
          yPercent: -100,
          duration: 0.35,
          ease: "power4.inOut",
        }, "-=0.3");

    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [done]);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] overflow-hidden bg-[#0d0c0a]"
      aria-hidden="true"
    >
      <div
        className="ld-gold absolute inset-0 will-change-transform"
        style={{
          background: "linear-gradient(135deg,#0d0c0a,#171410 45%,#0c0b09)",
        }}
      />

      <div className="ld-image absolute inset-0 overflow-hidden will-change-transform">
        <picture className="absolute inset-0 h-full w-full">
          <source
            media="(max-width: 767px)"
            srcSet="/images/loader-mob.jpg"
          />
          <img
            src="/images/loader-01.jpeg"
            alt=""
            className="h-full w-full object-cover object-center will-change-transform"
            draggable={false}
          />
        </picture>

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom,rgba(0,0,0,.48),rgba(0,0,0,.12) 40%,rgba(0,0,0,.25) 65%,rgba(0,0,0,.82))",
          }}
        />

        <div className="relative flex h-full w-full items-center justify-center px-6">
          <div className="ld-eyebrow absolute top-[15%] flex items-center gap-4">
            <span className="h-px w-8 bg-[#C5A880]/60" />
            <span
              className="text-[9px] uppercase tracking-[.5em] text-[#E8DED0]/80 sm:text-[10px]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              SHAWQ FRAGRANCES
            </span>
            <span className="h-px w-8 bg-[#C5A880]/60" />
          </div>

          <div className="ld-title overflow-visible py-8">
            <div className="overflow-hidden py-5">
              <span
                className="block px-5 py-5 text-[19vw] font-light uppercase leading-[.9] tracking-[.08em] text-[#F5F0E8] sm:text-[14vw] lg:text-[9.5vw]"
                style={{
                  fontFamily: "var(--font-decorative)",
                  textShadow: "0 15px 50px rgba(0,0,0,.55)",
                }}
              >
                SHAWQ
              </span>
            </div>

            <div className="ld-subtitle mt-2 overflow-hidden text-center">
              <span
                className="block text-sm font-light italic tracking-[.32em] text-[#C5A880] sm:text-lg lg:text-xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                the soul of scent
              </span>
            </div>
          </div>
        </div>

        <div className="ld-corner absolute left-7 top-7 h-8 w-8 border-l border-t border-white/25 sm:left-10 sm:top-10" />
        <div className="ld-corner absolute right-7 top-7 h-8 w-8 border-r border-t border-white/25 sm:right-10 sm:top-10" />
        <div className="ld-corner absolute bottom-7 left-7 h-8 w-8 border-b border-l border-white/25 sm:bottom-10 sm:left-10" />
        <div className="ld-corner absolute bottom-7 right-7 h-8 w-8 border-b border-r border-white/25 sm:right-10 sm:bottom-10" />

        <div className="ld-meta absolute inset-x-0 bottom-8 px-7 sm:bottom-10 sm:px-12">
          <div className="mb-4 flex items-end justify-between">
            <div className="flex items-baseline gap-2">
              <span
                ref={countRef}
                className="text-[11px] font-medium tracking-[.35em] text-[#D8C09A] sm:text-xs"
                style={{ fontFamily: "var(--font-body)" }}
              >
                000
              </span>
              <span className="text-[8px] text-white/30">%</span>
            </div>

            <span
              className="text-[8px] uppercase tracking-[.42em] text-white/55 sm:text-[10px]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Extrait de Parfum
            </span>
          </div>

          <div className="relative h-px w-full overflow-hidden bg-white/15">
            <div
              className="ld-line absolute inset-y-0 left-0 w-full"
              style={{
                background:
                  "linear-gradient(90deg,#9F8057,#E4C995,#9F8057)",
              }}
            />
            <div
              className="ld-line-glow absolute -top-[2px] left-0 h-[5px] w-full blur-[5px]"
              style={{
                background: "#D8B77A",
                opacity: 0.55,
              }}
            />
          </div>

          <div className="mt-3 flex justify-between">
            <span className="text-[7px] uppercase tracking-[.35em] text-white/30">
              Karachi · Pakistan
            </span>
            <span className="text-[7px] uppercase tracking-[.35em] text-white/30">
              Est. MMXXVI
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}