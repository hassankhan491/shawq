'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HEADER_HEIGHT = 80;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const videoWrapRef = useRef<HTMLDivElement | null>(null);
  const line1Ref = useRef<HTMLDivElement | null>(null);
  const line2Ref = useRef<HTMLDivElement | null>(null);
  const fadeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let tl: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isMobile = vw < 640;

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: `top+=${HEADER_HEIGHT} top`,
          end: isMobile ? '+=1200' : '+=1800', // mobile par chota scroll
          scrub: 1,
          pin: true,
          anticipatePin: 1,

          // Custom events - Header ko banner ka state batayenge
          onEnter: () => {
            window.dispatchEvent(
              new CustomEvent('hero-state', { detail: { active: true } })
            );
          },
          onLeave: () => {
            window.dispatchEvent(
              new CustomEvent('hero-state', { detail: { active: false } })
            );
          },
          onEnterBack: () => {
            window.dispatchEvent(
              new CustomEvent('hero-state', { detail: { active: true } })
            );
          },
          onLeaveBack: () => {
            window.dispatchEvent(
              new CustomEvent('hero-state', { detail: { active: false } })
            );
          },
        },
      });

      // 1) Caption/CTA pehle fade out
      tl.to(fadeRef.current, { opacity: 0, y: -40, duration: 0.4, ease: 'power1.out' }, 0);

      // 2) Text lines sides par split - mobile par poori bahar
      tl.to(
        line1Ref.current,
        { x: isMobile ? '-110vw' : '-45vw', opacity: 0, duration: 1, ease: 'power2.inOut' },
        0
      );
      tl.to(
        line2Ref.current,
        { x: isMobile ? '110vw' : '45vw', opacity: 0, duration: 1, ease: 'power2.inOut' },
        0
      );

      // 3) PX-based video expansion - mobile par controlled
      tl.to(
        videoWrapRef.current,
        {
          width: Math.round(vw * (isMobile ? 0.92 : 0.9)),
          height: Math.round(vh * (isMobile ? 0.7 : 0.88)),
          borderRadius: 16,
          duration: 1.6,
          ease: 'power2.inOut',
        },
        0.1
      );

      // 4) Background dark taake video star lage
      tl.to(bgRef.current, { opacity: 0.25, scale: 1.08, duration: 1.6, ease: 'power2.inOut' }, 0.1);
    }, section);

    // ✅ SAFE CLEANUP - HMR/StrictMode par crash nahi hoga
    return () => {
      try {
        if (tl) {
          tl.scrollTrigger?.kill();
          tl.kill();
        }
        ctx.revert();
      } catch (err) {
        // cleanup error ignore - dev HMR safe
      }
    };
  }, []);

  // ✅ Mobile par background crop fix (bottle wali side dikhe)
  useEffect(() => {
    const setBg = () => {
      if (bgRef.current) {
        bgRef.current.style.backgroundPosition =
          window.innerWidth < 640 ? '75% center' : 'center 30%';
      }
    };
    setBg();
    window.addEventListener('resize', setBg);
    return () => window.removeEventListener('resize', setBg);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero-banner"
      className="relative overflow-hidden bg-[#0f0a08]"
      style={{
        marginTop: `-${HEADER_HEIGHT}px`,
        height: `calc(100vh + ${HEADER_HEIGHT}px)`,
      }}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-[url('/images/new.png')] bg-cover bg-center bg-no-repeat"
        style={{ backgroundPosition: 'center 30%' }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f0a08]/80 via-[#0f0a08]/30 to-[#0f0a08]/80" />

      {/* Content area - header ke neeche se start */}
      <div
        className="absolute left-0 right-0 bottom-0"
        style={{ top: `${HEADER_HEIGHT}px` }}
      >
        {/* Video Card - responsive sizes */}
        <div
          ref={videoWrapRef}
        //   className="absolute inset-0 m-auto z-10 w-[260px] h-[360px] sm:w-[300px] sm:h-[420px] md:w-[380px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl shadow-black/60 will-change-transform"
        className="absolute inset-0 m-auto z-10 w-[240px] h-[320px] sm:w-[280px] sm:h-[380px] md:w-[340px] md:h-[min(460px,56vh)] rounded-2xl overflow-hidden shadow-2xl shadow-black/60 will-change-transform"
        >
          <video
            src="/videos/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Heading - scroll par sides par split hogi */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
          <div
            ref={line1Ref}
            className="font-serif text-5xl md:text-7xl font-light text-[#f5f0eb] drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
          >
            Discover Your
          </div>
          <div
            ref={line2Ref}
            className="font-serif text-5xl md:text-7xl font-light italic text-[#c9a962] drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
          >
            Signature Scent
          </div>
        </div>

        {/* Bottom Caption + CTA */}
        <div className="absolute inset-x-0 bottom-[5vh] z-20 flex justify-center">
          <div ref={fadeRef} className="flex flex-col items-center gap-4 text-center px-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-[#c9a962]" />
              <span className="text-[#c9a962] text-xs tracking-[0.3em] uppercase font-medium">
                Shawq Fragrance
              </span>
              <div className="w-12 h-px bg-[#c9a962]" />
            </div>

            <p className="text-[#cfc6bc] text-sm md:text-base max-w-md leading-relaxed drop-shadow-md">
              Experience the essence of craftsmanship through our exclusive
              collection of oud, amber, and rare botanicals.
            </p>

            <Link
              href="/products"
              className="inline-block px-8 py-3 bg-[#c9a962] text-[#0f0a08] font-medium text-sm tracking-wider uppercase hover:bg-[#e0c78a] transition-all"
            >
              Explore Collection
            </Link>

            <span className="text-[#a89f95]/80 text-[10px] tracking-[0.3em] uppercase animate-pulse">
              Scroll to Explore
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}