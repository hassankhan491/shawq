// components/sections/ShawqScrollExperience.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* SHAWQ palette */
const C = {
  red: "#C73234",
  black: "#111111",
  cream: "#F4EFE7",
  white: "#FAF8F3",
  brown: "#3A2722",
  burgundy: "#5E1A22",
  deepRed: "#6B1E2A",
  dark: "#160F0D",
};

export default function ShawqScrollExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const tagWrapRef = useRef<HTMLDivElement>(null);
  const tagInnerRef = useRef<HTMLParagraphElement>(null);
  const firstRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const noteTopRef = useRef<HTMLDivElement>(null);
  const noteHeartRef = useRef<HTMLDivElement>(null);
  const noteBaseRef = useRef<HTMLDivElement>(null);
  const finalWrapRef = useRef<HTMLDivElement>(null);
  const finalTitleRef = useRef<HTMLHeadingElement>(null);
  const finalTagRef = useRef<HTMLParagraphElement>(null);
  const finalMetaRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const rigRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  const decorARef = useRef<HTMLDivElement>(null);
  const decorBRef = useRef<HTMLDivElement>(null);
  const decorCRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMq.matches) {
      section.dataset.reduced = "true";
      return;
    }

    const mm = gsap.matchMedia();

    const build = (desktop: boolean) => {
      const rig = rigRef.current!;
      const bottle = bottleRef.current!;
      const shadow = shadowRef.current!;

      /* ---------- initial states (set here, NOT in markup, so
         reduced-motion / no-JS users still see everything) ---------- */
      gsap.set(rig, {
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: desktop ? "34vh" : "28vh",
      });
      gsap.set(bottle, { scale: 0.72, rotationZ: 0 });
      gsap.set(shadow, { opacity: 0, scaleX: 0.5 });
      gsap.set(tagWrapRef.current, { clipPath: "inset(0 0 100% 0)" });
      gsap.set(tagInnerRef.current, { y: "40%" });
      gsap.set(firstRef.current, { opacity: 0, y: "8vh", clipPath: "inset(0 0 100% 0)" });
      gsap.set(statementRef.current, { opacity: 0, y: "10vh", scale: 1.12 });
      gsap.set([noteTopRef.current, noteHeartRef.current, noteBaseRef.current], {
        opacity: 0,
        x: desktop ? "6vw" : 0,
        y: desktop ? 0 : "6vh",
      });
      gsap.set(finalWrapRef.current, { opacity: 0 });
      gsap.set(finalTitleRef.current, { clipPath: "inset(0 0 100% 0)" });
      gsap.set([finalTagRef.current, finalMetaRef.current], { y: "3vh", opacity: 0 });
      gsap.set(ctaRef.current, { y: "4vh", opacity: 0 });

      /* ---------- master timeline ---------- */
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${desktop ? 6000 : 3800}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.min(6, Math.floor(self.progress * 6) + 1);
            if (counterRef.current)
              counterRef.current.textContent = `0${i} / 06`;
          },
        },
      });

      /* SCENE 01 — INTRO: tagline reveals, title drifts */
      tl.to(tagWrapRef.current, { clipPath: "inset(0 0 0% 0)", duration: 0.6 }, 0.05)
        .to(tagInnerRef.current, { y: "0%", duration: 0.6 }, 0.05)
        .to(titleRef.current, { y: "-6vh", duration: 1.2, ease: "none" }, 0)

      /* SCENE 02 — REVEAL: title exits, bottle rises to center */
        .to(titleRef.current, { y: "-14vh", opacity: 0, duration: 0.7 }, 1.0)
        .to(tagWrapRef.current, { y: "-8vh", opacity: 0, duration: 0.6 }, 1.1)
        .to(rig, { y: 0, duration: 1.3, ease: "power2.out" }, 0.5)
        .to(bottle, { scale: 1, duration: 1.3 }, 0.5)
        .to(shadow, { opacity: 0.55, scaleX: 1, duration: 1.1 }, 0.7)
        .to(bgRef.current, { backgroundColor: C.burgundy, duration: 1.4, ease: "none" }, 0.4)
        .to(firstRef.current, { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.7 }, 1.7)
        .to(firstRef.current, { opacity: 0, y: "-8vh", duration: 0.6 }, 2.7)
        .to(bgRef.current, { backgroundColor: C.dark, duration: 1, ease: "none" }, 2.5)

      /* SCENE 03 — BOTTLE MOTION: editorial choreography */
        .to(rig, { x: desktop ? "22vw" : 0, y: desktop ? "-16vh" : "-12vh", duration: 0.7 }, 3.1)
        .to(bottle, { rotationZ: desktop ? -8 : -4, scale: 1.05, duration: 0.7 }, 3.1)
        .to(rig, { x: desktop ? "-24vw" : 0, y: desktop ? "4vh" : "6vh", duration: 0.7 }, 3.9)
        .to(bottle, { rotationZ: desktop ? 12 : 4, scale: 1.02, duration: 0.7 }, 3.9)
        .to(rig, { x: 0, y: 0, duration: 0.6 }, 4.7)
        .to(bottle, { rotationZ: -5, duration: 0.6 }, 4.7)
        .to(bgRef.current, { backgroundColor: C.cream, duration: 1, ease: "none" }, 4.6)

      /* SCENE 04 — TYPOGRAPHIC INTERRUPTION (text BEHIND bottle) */
        .to(bottle, { rotationZ: 0, duration: 0.4 }, 5.3)
        .to(statementRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.8 }, 5.1)
        .to(statementRef.current, { opacity: 0, y: "-8vh", duration: 0.6 }, 6.2)

      /* SCENE 05 — FRAGRANCE NOTES */
        .to(rig, { x: desktop ? "-20vw" : 0, y: desktop ? "2vh" : "-14vh", scale: 1, duration: 0.8 }, 6.2)
        .to(bottle, { scale: desktop ? 0.92 : 0.8, duration: 0.8 }, 6.2)
        .to(bgRef.current, { backgroundColor: C.deepRed, duration: 1.2, ease: "none" }, 6.2)
        .to(noteTopRef.current, { opacity: 1, x: 0, y: 0, duration: 0.6 }, 6.4)
        .to(noteHeartRef.current, { opacity: 1, x: 0, y: 0, duration: 0.6 }, 6.8)
        .to(noteBaseRef.current, { opacity: 1, x: 0, y: 0, duration: 0.6 }, 7.2)
        .to([noteTopRef.current, noteHeartRef.current, noteBaseRef.current], {
          opacity: 0,
          x: desktop ? "-4vw" : 0,
          duration: 0.5,
        }, 7.9)

      /* SCENE 06 — FINAL REVEAL */
        .to(rig, { x: 0, y: "-2vh", duration: 0.8 }, 8.1)
        .to(bottle, { scale: 1.08, duration: 0.8 }, 8.1)
        .to(shadow, { scaleX: 1.05, opacity: 0.5, duration: 0.8 }, 8.1)
        .to(bgRef.current, { backgroundColor: C.black, duration: 1.2, ease: "none" }, 8.0)
        .to(finalWrapRef.current, { opacity: 1, duration: 0.4 }, 8.5)
        .to(finalTitleRef.current, { clipPath: "inset(0 0 0% 0)", duration: 0.8 }, 8.5)
        .to(finalTagRef.current, { y: 0, opacity: 1, duration: 0.7 }, 8.8)
        .to(finalMetaRef.current, { y: 0, opacity: 1, duration: 0.6 }, 9.1)
        .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.6 }, 9.3)
        .set(rig, { x: 0 }, 10); // pad timeline to 10 units

      /* parallax decor — different speeds per layer */
      tl.to(decorARef.current, { y: "-6vh", duration: 10, ease: "none" }, 0)
        .to(decorBRef.current, { y: "8vh", duration: 10, ease: "none" }, 0)
        .to(decorCRef.current, { y: "-12vh", duration: 10, ease: "none" }, 0);

      return () => {
        tl.kill();
      };
    };

    mm.add("(min-width: 768px)", () => build(true));
    mm.add("(max-width: 767px)", () => build(false));

    const onReduce = (e: MediaQueryListEvent) => {
      if (e.matches) {
        mm.revert();
        section.dataset.reduced = "true";
      }
    };
    reduceMq.addEventListener("change", onReduce);

    return () => {
      reduceMq.removeEventListener("change", onReduce);
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
      style={{ backgroundColor: C.cream }}
      aria-label="SHAWQ fragrance story"
    >
      {/* evolving background */}
      <div ref={bgRef} className="absolute inset-0" style={{ backgroundColor: C.cream }} />

      {/* film grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-40 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* editorial decor — layer 5 (micro typography) */}
      <div ref={decorARef} className="absolute left-6 top-6 z-40 mix-blend-difference md:left-10 md:top-10">
        <span ref={counterRef} className="block text-xs tracking-[0.35em] text-white/60">01 / 06</span>
        <span className="mt-2 block text-[10px] tracking-[0.35em] text-white/40">SHAWQ FRAGRANCES</span>
      </div>
      <div ref={decorBRef} className="absolute right-6 top-1/2 z-40 hidden -translate-y-1/2 rotate-90 md:block mix-blend-difference">
        <span className="text-[10px] tracking-[0.5em] text-white/40">EXTRAIT DE PARFUM</span>
      </div>
      <div ref={decorCRef} aria-hidden="true" className="absolute inset-0 z-10 mix-blend-difference">
        <div className="absolute right-16 top-16 h-24 w-px bg-white/20" />
        <div className="absolute bottom-16 left-16 h-px w-24 bg-white/20" />
        <div className="absolute right-24 bottom-24 h-3 w-3 rounded-full border border-white/30" />
      </div>

      {/* SCENE 01 — hero typography (layer 2) */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-4">
        <h1
          ref={titleRef}
          className="text-center text-[24vw] leading-[0.85] tracking-tight md:text-[19vw]"
          style={{ fontFamily: "var(--font-serif)", color: C.black }}
        >
          SHAWQ
        </h1>
        <div ref={tagWrapRef} className="mt-4 overflow-hidden md:mt-6">
          <p
            ref={tagInnerRef}
            className="text-center text-lg tracking-[0.2em] md:text-2xl"
            style={{ fontFamily: "var(--font-serif)", color: C.brown }}
          >
            A SCENT YOU REMEMBER.
          </p>
        </div>
      </div>

      {/* SCENE 02 */}
      <div ref={firstRef} className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-4">
        <p
          className="text-center text-4xl md:text-6xl"
          style={{ fontFamily: "var(--font-serif)", color: C.cream }}
        >
          THE FIRST IMPRESSION
        </p>
      </div>

      {/* SCENE 04 — statement BEHIND the bottle */}
      <div ref={statementRef} className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
        <p
          className="text-center text-[10vw] leading-[0.95] md:text-[7vw]"
          style={{ fontFamily: "var(--font-serif)", color: C.black }}
        >
          NOT JUST A FRAGRANCE.
        </p>
        <p
          className="text-center text-[10vw] leading-[0.95] md:text-[7vw]"
          style={{ fontFamily: "var(--font-serif)", color: C.red }}
        >
          AN IDENTITY.
        </p>
      </div>

      {/* SCENE 05 — notes (desktop: right / mobile: bottom) */}
      <div className="pointer-events-none absolute inset-x-6 bottom-[10vh] z-20 space-y-5 md:inset-x-auto md:bottom-auto md:right-[7vw] md:top-1/2 md:-translate-y-1/2 md:space-y-8 md:text-right">
        <div ref={noteTopRef}>
          <p className="mb-1 text-[10px] tracking-[0.4em] text-white/50">TOP NOTES</p>
          <p className="text-xl md:text-2xl" style={{ fontFamily: "var(--font-serif)", color: C.cream }}>
            BERGAMOT · SAFFRON
          </p>
        </div>
        <div ref={noteHeartRef}>
          <p className="mb-1 text-[10px] tracking-[0.4em] text-white/50">HEART</p>
          <p className="text-xl md:text-2xl" style={{ fontFamily: "var(--font-serif)", color: C.cream }}>
            ROSE · IRIS
          </p>
        </div>
        <div ref={noteBaseRef}>
          <p className="mb-1 text-[10px] tracking-[0.4em] text-white/50">BASE</p>
          <p className="text-xl md:text-2xl" style={{ fontFamily: "var(--font-serif)", color: C.cream }}>
            OUD · AMBER · MUSK
          </p>
        </div>
      </div>

      {/* SCENE 06 — final reveal */}
      <div ref={finalWrapRef} className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
        <h2
          ref={finalTitleRef}
          className="text-[16vw] leading-[0.85] md:text-[10vw]"
          style={{ fontFamily: "var(--font-serif)", color: C.red }}
        >
          SHAWQ
        </h2>
        <p
          ref={finalTagRef}
          className="mt-4 text-2xl md:text-3xl"
          style={{ fontFamily: "var(--font-serif)", color: C.cream }}
        >
          THE SCENT THAT STAYS.
        </p>
        <p ref={finalMetaRef} className="mt-3 text-[11px] tracking-[0.45em] text-white/60">
          EXTRAIT DE PARFUM 50 ML
        </p>
        <button
          ref={ctaRef}
          className="group pointer-events-auto mt-10 border border-white/40 px-10 py-4 text-[11px] tracking-[0.35em] text-white transition-colors duration-300 hover:border-[#C73234] hover:bg-[#C73234]"
        >
          DISCOVER THE FRAGRANCE
        </button>
      </div>

      {/* BOTTLE RIG — layer 4 (hero object) */}
      <div
        ref={rigRef}
        className="absolute left-1/2 top-1/2 z-30 will-change-transform"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        {/* soft realistic shadow travels with the bottle */}
        <div className="absolute left-1/2 top-full -translate-x-1/2">
          <div
            ref={shadowRef}
            className="h-10 w-[70vw] max-w-[420px] rounded-[100%] md:h-12"
            style={{
              background: "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, transparent 70%)",
              filter: "blur(18px)",
            }}
          />
        </div>
        <div
          ref={bottleRef}
          className="will-change-transform"
          style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
        >
          <img
            src="/images/shawq-bottle.png"
            alt="SHAWQ extrait de parfum bottle"
            className="block h-auto w-[52vw] max-w-[340px] select-none md:w-[30vw] md:max-w-[480px]"
            draggable={false}
          />
        </div>
      </div>

      {/* scroll hint */}
      <p className="absolute bottom-5 left-1/2 z-40 -translate-x-1/2 text-[10px] tracking-[0.5em] text-white/40 mix-blend-difference">
        SCROLL
      </p>

      {/* ♿ reduced-motion: static stacked layout */}
      <style>{`
        [data-reduced="true"] { height: auto !important; overflow: visible !important; }
        [data-reduced="true"] > * { position: relative !important; inset: auto !important; transform: none !important; opacity: 1 !important; clip-path: none !important; }
        [data-reduced="true"] .pointer-events-none { pointer-events: auto !important; }
      `}</style>
    </section>
  );
}