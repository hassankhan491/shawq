// components/sections/BrandManifesto.tsx
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

  const firstRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const noteTopRef = useRef<HTMLDivElement>(null);
  const noteHeartRef = useRef<HTMLDivElement>(null);
  const noteBaseRef = useRef<HTMLDivElement>(null);
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

      /* ---------- initial states ---------- */
      gsap.set(rig, {
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: desktop ? "34vh" : "28vh",
      });
      gsap.set(bottle, { scale: 0.72, rotationZ: 0 });
      gsap.set(shadow, { opacity: 0, scaleX: 0.5 });
      gsap.set(firstRef.current, {
        opacity: 0,
        y: "8vh",
        clipPath: "inset(0 0 100% 0)",
      });
      gsap.set(statementRef.current, { opacity: 0, y: "12vh", scale: 1.15 });
      gsap.set([noteTopRef.current, noteHeartRef.current, noteBaseRef.current], {
        opacity: 0,
        x: desktop ? "6vw" : 0,
        y: desktop ? 0 : "6vh",
      });
      gsap.set(finalTitleRef.current, { clipPath: "inset(0 0 100% 0)" });
      gsap.set([finalTagRef.current, finalMetaRef.current], {
        y: "3vh",
        opacity: 0,
      });
      gsap.set(ctaRef.current, { y: "4vh", opacity: 0 });

      /* ---------- master timeline ---------- */
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${desktop ? 5200 : 3200}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.min(4, Math.floor(self.progress * 4) + 1);
            if (counterRef.current)
              counterRef.current.textContent = `0${i} / 04`;
          },
        },
      });

      /* ============================================================
         01 — REVEAL: bottle rises as the line speaks
         ============================================================ */
      tl.to(rig, { y: 0, duration: 1.2, ease: "power2.out" }, 0)
        .to(bottle, { scale: 1, duration: 1.2 }, 0)
        .to(shadow, { opacity: 0.55, scaleX: 1, duration: 0.9 }, 0.2)
        .to(bgRef.current, { backgroundColor: C.burgundy, duration: 1.4, ease: "none" }, 0)
        .to(rig, { y: desktop ? "-18vh" : "-16vh", duration: 0.6 }, 1.0)
        .to(
          firstRef.current,
          { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 1.0, ease: "power3.out" },
          1.2
        )
        .to(firstRef.current, { opacity: 0, y: "-8vh", duration: 0.5 }, 2.0)
        .to(rig, { y: 0, duration: 0.5 }, 2.2)
        .to(bgRef.current, { backgroundColor: C.cream, duration: 1, ease: "none" }, 2.2)

      /* ============================================================
         02 — STATEMENT above the bottle + subtle tilt
         ============================================================ */
        .to(bottle, { scale: 1.06, rotationZ: -5, duration: 0.6 }, 2.6)
        .to(rig, { y: "-2vh", duration: 0.8 }, 2.6)
        .to(
          statementRef.current,
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" },
          2.6
        )
        .to(bottle, { rotationZ: 0, duration: 0.8 }, 3.4)
        .to(statementRef.current, { opacity: 0, y: "-10vh", duration: 0.6 }, 4.0)

      /* ============================================================
         03 — NOTES: bottle left, numbered rows right
         ============================================================ */
        .to(rig, { x: desktop ? "-20vw" : 0, y: desktop ? "2vh" : "-18vh", duration: 0.8 }, 4.2)
        .to(bottle, { scale: desktop ? 0.9 : 0.75, duration: 0.8 }, 4.2)
        .to(bgRef.current, { backgroundColor: C.deepRed, duration: 1.2, ease: "none" }, 4.2)
        .to(
          noteTopRef.current,
          { opacity: 1, x: 0, y: 0, duration: 0.9, ease: "power3.out" },
          4.4
        )
        .to(
          noteHeartRef.current,
          { opacity: 1, x: 0, y: 0, duration: 0.9, ease: "power3.out" },
          4.8
        )
        .to(
          noteBaseRef.current,
          { opacity: 1, x: 0, y: 0, duration: 0.9, ease: "power3.out" },
          5.2
        )
        .to([noteTopRef.current, noteHeartRef.current, noteBaseRef.current], {
          opacity: 0,
          x: desktop ? "-4vw" : 0,
          duration: 0.5,
        }, 5.6)

      /* ============================================================
         04 — FINAL: bottle high, full stack below
         ============================================================ */
        .to(rig, { x: 0, y: desktop ? "-18vh" : "-22vh", duration: 0.8 }, 5.8)
        .to(bottle, { scale: desktop ? 0.85 : 0.75, duration: 0.8 }, 5.8)
        .to(shadow, { scaleX: 1.05, opacity: 0.5, duration: 0.8 }, 5.8)
        .to(bgRef.current, { backgroundColor: C.black, duration: 1.2, ease: "none" }, 5.8)
        .to(
          finalTitleRef.current,
          { clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "power3.out" },
          6.2
        )
        .to(finalTagRef.current, { y: 0, opacity: 1, duration: 1.0, ease: "power3.out" }, 6.5)
        .to(finalMetaRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 6.8)
        .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 7.0)
        .set({}, {}, 7.6);

      /* parallax decor */
      tl.to(decorARef.current, { y: "-6vh", duration: 7.6, ease: "none" }, 0)
        .to(decorBRef.current, { y: "8vh", duration: 7.6, ease: "none" }, 0)
        .to(decorCRef.current, { y: "-12vh", duration: 7.6, ease: "none" }, 0);

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
      <div ref={bgRef} className="absolute inset-0" style={{ backgroundColor: C.cream }} />

      {/* editorial decor */}
      <div ref={decorARef} className="absolute left-6 top-24 z-40 mix-blend-difference md:left-10 md:top-28">
        <span ref={counterRef} className="block text-xs tracking-[0.35em] text-white/60">01 / 04</span>
        <span className="mt-2 block text-[10px] tracking-[0.35em] text-white/40">SHAWQ FRAGRANCES</span>
      </div>
      <div ref={decorBRef} className="absolute right-6 top-1/2 z-40 hidden -translate-y-1/2 rotate-90 md:block mix-blend-difference">
        <span className="text-[10px] tracking-[0.5em] text-white/40">EXTRAIT DE PARFUM</span>
      </div>
      <div ref={decorCRef} aria-hidden="true" className="absolute inset-0 z-[5] mix-blend-difference">
        <div className="absolute right-16 top-16 h-24 w-px bg-white/20" />
        <div className="absolute bottom-16 left-16 h-px w-24 bg-white/20" />
        <div className="absolute right-24 bottom-24 h-3 w-3 rounded-full border border-white/30" />
      </div>

      {/* 02 — STATEMENT above the bottle */}
      <div ref={statementRef} className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-4">
        <p
          className="text-center text-[11vw] leading-[0.95] md:text-[8vw]"
          style={{
            fontFamily: "var(--font-serif)",
            color: C.black,
            textShadow: "0 2px 30px rgba(244,239,231,0.55)",
          }}
        >
          NOT JUST A FRAGRANCE.
        </p>
        <p
          className="mt-2 text-center text-[11vw] leading-[0.95] md:text-[8vw]"
          style={{
            fontFamily: "var(--font-serif)",
            color: C.red,
            textShadow: "0 2px 30px rgba(244,239,231,0.55)",
          }}
        >
          AN IDENTITY.
        </p>
      </div>

      {/* 01 — REVEAL line */}
      <div ref={firstRef} className="pointer-events-none absolute inset-0 z-20 flex items-end justify-center px-4 pb-[8vh]">
        <p
          className="text-center text-4xl md:text-6xl"
          style={{
            fontFamily: "var(--font-serif)",
            color: C.cream,
            textShadow: "0 2px 20px rgba(0,0,0,0.4)",
          }}
        >
          THE FIRST IMPRESSION
        </p>
      </div>

      {/* 03 — NOTES numbered rows */}
      <div className="pointer-events-none absolute inset-x-6 bottom-[10vh] z-20 space-y-6 md:inset-x-auto md:bottom-auto md:right-[7vw] md:top-1/2 md:-translate-y-1/2 md:space-y-10">
        <div ref={noteTopRef} className="flex items-end gap-4 md:justify-end">
          <span
            className="text-4xl font-black leading-none md:text-6xl"
            style={{ fontFamily: "var(--font-body)", color: "transparent", WebkitTextStroke: `1.5px ${C.red}` }}
          >
            01
          </span>
          <div>
            <p className="mb-1 text-[10px] tracking-[0.4em] text-white/50">TOP NOTES</p>
            <p className="text-xl md:text-2xl" style={{ fontFamily: "var(--font-serif)", color: C.cream }}>
              BERGAMOT · SAFFRON
            </p>
          </div>
        </div>
        <div ref={noteHeartRef} className="flex items-end gap-4 md:mr-12 md:justify-end">
          <span
            className="text-4xl font-black leading-none md:text-6xl"
            style={{ fontFamily: "var(--font-body)", color: "transparent", WebkitTextStroke: `1.5px ${C.red}` }}
          >
            02
          </span>
          <div>
            <p className="mb-1 text-[10px] tracking-[0.4em] text-white/50">HEART</p>
            <p className="text-xl md:text-2xl" style={{ fontFamily: "var(--font-serif)", color: C.cream }}>
              ROSE · IRIS
            </p>
          </div>
        </div>
        <div ref={noteBaseRef} className="flex items-end gap-4 md:mr-4 md:justify-end">
          <span
            className="text-4xl font-black leading-none md:text-6xl"
            style={{ fontFamily: "var(--font-body)", color: "transparent", WebkitTextStroke: `1.5px ${C.red}` }}
          >
            03
          </span>
          <div>
            <p className="mb-1 text-[10px] tracking-[0.4em] text-white/50">BASE</p>
            <p className="text-xl md:text-2xl" style={{ fontFamily: "var(--font-serif)", color: C.cream }}>
              OUD · AMBER · MUSK
            </p>
          </div>
        </div>
      </div>

      {/* 04 — FINAL stack below the raised bottle */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[5vh] z-30 flex flex-col items-center px-4 text-center">
        <h2
          ref={finalTitleRef}
          className="text-[13vw] leading-[0.9] md:text-[6.5vw]"
          style={{ fontFamily: "var(--font-serif)", color: C.red }}
        >
          SHAWQ
        </h2>
        <p
          ref={finalTagRef}
          className="mt-3 text-2xl md:text-3xl"
          style={{
            fontFamily: "var(--font-serif)",
            color: C.cream,
            textShadow: "0 2px 18px rgba(17,17,17,0.55)",
          }}
        >
          THE SCENT THAT STAYS.
        </p>
        <p
          ref={finalMetaRef}
          className="mt-3 text-[11px] tracking-[0.45em] text-white/70"
          style={{ textShadow: "0 1px 12px rgba(17,17,17,0.6)" }}
        >
          EXTRAIT DE PARFUM 50 ML
        </p>
        <button
          ref={ctaRef}
          className="group pointer-events-auto mt-6 border border-white/40 bg-black/40 px-10 py-4 text-[11px] tracking-[0.35em] text-white backdrop-blur-sm transition-colors duration-300 hover:border-[#C73234] hover:bg-[#C73234]"
        >
          DISCOVER THE FRAGRANCE
        </button>
      </div>

      {/* BOTTLE RIG */}
      <div
        ref={rigRef}
        className="absolute left-1/2 top-1/2 z-20 will-change-transform"
        style={{ transform: "translate(-50%, -50%)" }}
      >
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
        <div ref={bottleRef} className="will-change-transform" style={{ perspective: "1200px", transformStyle: "preserve-3d" }}>
          <img
            src="/images/shawq-bottle2.png"
            alt="SHAWQ extrait de parfum bottle"
            className="block h-auto w-[52vw] max-w-[340px] select-none md:w-[30vw] md:max-w-[480px]"
            draggable={false}
          />
        </div>
      </div>

      <p className="absolute bottom-5 left-1/2 z-40 -translate-x-1/2 text-[10px] tracking-[0.5em] text-white/40 mix-blend-difference">
        SCROLL
      </p>

      {/* film grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-50 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ♿ reduced-motion */}
      <style>{`
        [data-reduced="true"] { height: auto !important; overflow: visible !important; }
        [data-reduced="true"] > * { position: relative !important; inset: auto !important; transform: none !important; opacity: 1 !important; clip-path: none !important; }
        [data-reduced="true"] .pointer-events-none { pointer-events: auto !important; }
      `}</style>
    </section>
  );
}