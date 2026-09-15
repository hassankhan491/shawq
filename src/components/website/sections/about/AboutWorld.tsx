'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { parallax, prefersReducedMotion } from '@/lib/animations/scrollReveal';
import { revealWords } from '@/lib/animations/textReveal';

gsap.registerPlugin(ScrollTrigger);

/* Replace later with /images/shawq/about/world.webp */
const WORLD_IMG =
  '/images/manifesto.jpeg';

export function AboutWorld() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Very slow atmospheric parallax */
      parallax('.shq-world__bg img', { trigger: ref.current ?? undefined, speed: 0.22, scale: 1.25 });

      gsap.utils.toArray<HTMLElement>('.shq-world__line > span').forEach((inner) => {
        revealWords(inner, { trigger: inner, start: 'top 88%', stagger: 0.08 });
      });

      if (!prefersReducedMotion()) {
        gsap.to('.shq-world__type', {
          yPercent: -14,
          ease: 'none',
          scrollTrigger: { trigger: ref.current ?? undefined, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="shq-world">
      <div className="shq-world__bg" aria-hidden="true">
        <img src={WORLD_IMG} alt="" loading="lazy" />
        <div className="shq-world__shade" />
      </div>

      <div className="shq-world__type">
        <span className="shq-world__line"><span>A WORLD</span></span>
        <span className="shq-world__line shq-world__line--italic"><span>built</span></span>
        <span className="shq-world__line"><span>AROUND SCENT</span></span>
      </div>

      <p className="shq-overline shq-world__tag">04 — THE WORLD OF SHAWQ</p>
    </section>
  );
}