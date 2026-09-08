"use client";


import React, { useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function Preloader() {
    const pathname = usePathname();
  const shouldShow = useRef(pathname === "/");

  const [done, setDone] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

 useLayoutEffect(() => {
  if (done || !shouldShow.current) {
    setDone(true);
    return;
  }
    // 1. Respect user's reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }

    const lenis = (window as any).__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";

    let isTimelineStarted = false;
    let ctx: gsap.Context;
    let rafId: number;
    let safetyTimeout: NodeJS.Timeout;

    const startPreloader = () => {
      if (isTimelineStarted) return;
      isTimelineStarted = true;
      clearTimeout(safetyTimeout);

      // Defer GSAP setup to prevent mount-phase layout jank
      rafId = requestAnimationFrame(() => {
        ctx = gsap.context(() => {
          const counter = { v: 0 };

          const tl = gsap.timeline({
            onComplete: () => {
              document.body.style.overflow = "";
              lenis?.start();
              setDone(true);
            },
          });

          // 2. Let GSAP handle will-change automatically via force3D
          gsap.set(".ld-title span", { yPercent: 115, opacity: 0, force3D: true });
          gsap.set(".ld-subtitle span, .ld-eyebrow, .ld-meta, .ld-corner", { opacity: 0, force3D: true });
          gsap.set(".ld-line", { scaleX: 0, transformOrigin: "left center", force3D: true });

          tl.to(".ld-image img", { scale: 1.04, duration: 1.2, ease: "power2.out" })
            .to(".ld-eyebrow", { opacity: 1, duration: 0.5, ease: "power2.out" }, 0.1)
            .to(".ld-title span", { yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.04 }, 0.2)
            .to(".ld-subtitle span", { yPercent: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, 0.3)
            .to(".ld-corner, .ld-meta", { opacity: 1, duration: 0.5, stagger: 0.04 }, 0.4)
            .to(".ld-line", { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, 0.4)
            .to(counter, {
              v: 100,
              duration: 0.7,
              ease: "power2.inOut",
              onUpdate: () => {
                if (countRef.current) {
                  countRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
                }
              },
            }, 0.4)
            .to({}, { duration: 0.4 })
            .to(".ld-title span, .ld-subtitle span, .ld-eyebrow, .ld-meta, .ld-corner", {
              opacity: 0,
              y: -8,
              duration: 0.2,
              ease: "power2.in",
            })
            .to(".ld-image", { yPercent: -100, duration: 0.4, ease: "power4.inOut" }, "-=0.1")
            .to(".ld-gold", { yPercent: -100, duration: 0.35, ease: "power4.inOut" }, "-=0.3");
        }, containerRef);
      });
    };

    // 3. Robust Image Preloading with Async Decoding
    const imgSrc = window.innerWidth < 768 ? "/images/loader-mob.jpg" : "/images/loader.webp";
    const img = new Image();
    img.src = imgSrc;
    img.decoding = "async"; // Decode off the main thread
    img.fetchPriority = "high"; // Tell browser this is critical

    const initPreloader = async () => {
      try {
        // Wait for the image to be fully decoded to prevent painting jank
        await img.decode();
      } catch (e) {
        // Fallback if decode fails (e.g., corrupted image)
        console.warn("Image decode failed, starting anyway", e);
      }
      
      // 4. Optional but recommended: Wait for critical fonts to load to prevent FOUT jank
      // If your fonts are loaded via next/font, they are usually ready, but this is a safe guard.
      if (document.fonts.status === "loading") {
        await document.fonts.ready;
      }

      startPreloader();
    };

    if (img.complete) {
      initPreloader();
    } else {
      img.onload = initPreloader;
      img.onerror = initPreloader; // Don't block the site if the image fails
    }

    // Extended safety timeout to 1500ms to ensure decode has time to finish
    safetyTimeout = setTimeout(initPreloader, 1500);

    return () => {
      clearTimeout(safetyTimeout);
      cancelAnimationFrame(rafId);
      ctx?.revert();
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [done]);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] overflow-hidden bg-[#0d0c0a] pointer-events-auto"
      aria-hidden="true"
    >
      {/* 5. Removed will-change-transform from here. GSAP handles it better. */}
      <div
        className="ld-gold absolute inset-0"
        style={{ background: "linear-gradient(135deg,#0d0c0a,#171410 45%,#0c0b09)" }}
      />

      <div className="ld-image absolute inset-0 overflow-hidden">
        <picture className="absolute inset-0 h-full w-full">
          <source media="(max-width: 767px)" srcSet="/images/loader-mob.jpg" />
          <img
            src="/images/loader.webp"
            alt=""
            // 6. Critical performance attributes for the img tag
            decoding="async"
            fetchPriority="high"
            className="h-full w-full object-cover object-center"
            draggable={false}
          />
        </picture>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom,rgba(0,0,0,.48),rgba(0,0,0,.12) 40%,rgba(0,0,0,.25) 65%,rgba(0,0,0,.82))",
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
                style={{ fontFamily: "var(--font-decorative)" }}
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
              className="ld-line absolute inset-y-0 left-0 w-full h-full shadow-[0_0_10px_#E4C995]"
              style={{ background: "linear-gradient(90deg,#9F8057,#E4C995,#9F8057)" }}
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