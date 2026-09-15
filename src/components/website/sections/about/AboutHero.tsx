'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { drawPath } from '@/lib/animations/svgPath';
import { prefersReducedMotion } from '@/lib/animations/scrollReveal';
import { SafeImage } from './SafeImage';

gsap.registerPlugin(ScrollTrigger);

/* Replace later with /images/shawq/about/hero.webp */
const HERO_IMG =
  '/images/n baner.jpeg';

export function AboutHero() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = ref.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const reduced = prefersReducedMotion();

      if (!reduced) {
        gsap.set('.shq-hero__line > span', { yPercent: 118 });
        gsap.set(['.shq-hero__top', '.shq-hero__meta > *', '.shq-hero__cue'], { autoAlpha: 0, y: 14 });

        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
        tl.fromTo('.shq-hero__frame-img', { scale: 1.28 }, { scale: 1, duration: 2.4, ease: 'power3.inOut' }, 0)
          .to('.shq-hero__line > span', { yPercent: 0, duration: 1.4, stagger: 0.12 }, 0.45)
          .to('.shq-hero__top', { autoAlpha: 1, y: 0, duration: 0.9 }, '-=0.9')
          .to('.shq-hero__meta > *', { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 }, '-=0.6')
          .to('.shq-hero__cue', { autoAlpha: 1, y: 0, duration: 0.8 }, '-=0.4');

        /* PERF: transform-only (no borderRadius / no scale on the clipped frame) */
        gsap.to('.shq-hero__frame', {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 1 },
        });

        gsap.to('.shq-hero__type', {
          yPercent: 18,
          autoAlpha: 0.2,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: 'bottom 30%', scrub: 1 },
        });

        gsap.to('.shq-hero__cue', {
          autoAlpha: 0,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: '+=30%', scrub: 1 },
        });

        gsap.to('.shq-hero__cue-arrow', {
          y: 7,
          duration: 0.9,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        });
      }

      // drawPath('.shq-hero__trail--1', { trigger: section, start: 'top 85%', end: 'bottom 45%' });
      // drawPath('.shq-hero__trail--2', { trigger: section, start: 'top 70%', end: 'bottom 30%' });
      // floatPath('.shq-hero__trail--2', 12, 6);
      /* PERF: no per-image ScrollTrigger.refresh() here anymore */

      // ✅ trails now draw once, timed (replace the two drawPath calls):
      drawPath('.shq-hero__trail--1', { trigger: section, start: 'top 75%', duration: 2 });
      drawPath('.shq-hero__trail--2', { trigger: section, start: 'top 65%', duration: 2.4 });

    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="shq-hero" aria-label="SHAWQ — scent becomes memory">
      <div className="shq-hero__frame" aria-hidden="true">
        <SafeImage className="shq-hero__frame-img" src={HERO_IMG} alt="" loading="eager" fetchPriority="high" />
        <div className="shq-hero__veil" />
      </div>

      <svg
        className="shq-hero__trails"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path className="shq-hero__trail--1" d="M-60,640 C240,560 430,780 730,650 C1010,530 1210,430 1500,540" />
        <path className="shq-hero__trail--2" d="M-60,290 C300,380 540,170 840,255 C1120,335 1290,380 1500,235" />
      </svg>

      <div className="shq-hero__type">
        <p className="shq-overline shq-hero__top">SHAWQ FRAGRANCES — EST. 2026</p>
        <h1 className="shq-display shq-hero__title">
          <span className="shq-hero__line"><span>SCENT</span></span>
          <span className="shq-hero__line shq-hero__line--italic"><span>becomes</span></span>
          <span className="shq-hero__line"><span>MEMORY</span></span>
        </h1>
      </div>

      <div className="shq-hero__meta" aria-hidden="true">
        <span>EST. 2026</span>
        <span>SCENT / MEMORY / DESIRE</span>
        <span>KARACHI ATELIER</span>
        <span>01 / 06</span>
      </div>

      <div className="shq-hero__cue" aria-hidden="true">
        <span>SCROLL TO DISCOVER</span>
        <span className="shq-hero__cue-arrow">↓</span>
      </div>
    </section>
  );
}