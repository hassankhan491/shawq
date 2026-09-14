'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { magnetic } from '@/lib/animations/magnetic';
import { fadeUp } from '@/lib/animations/scrollReveal';

gsap.registerPlugin(ScrollTrigger);

export function AboutCTA() {
  const ref = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      fadeUp('.shq-cta .shq-overline', { y: 16 });
      fadeUp('.shq-cta__q', { y: 26, duration: 1 });
      fadeUp('.shq-cta__big', { y: 40, duration: 1.2 });
      fadeUp('.shq-cta__btn', { y: 20, delay: 0.2 });
    }, ref);

    const killMagnetic = btnRef.current ? magnetic(btnRef.current, 0.18) : () => {};

    return () => {
      ctx.revert();
      killMagnetic();
    };
  }, []);

  return (
    <section ref={ref} className="shq-cta">
      <p className="shq-overline">09 — CONTACT</p>
      <h2 className="shq-cta__q">DIDN'T FIND WHAT YOU WERE LOOKING FOR?</h2>
      <p className="shq-cta__big">
        LET'S TALK ABOUT <em>scent</em>.
      </p>
      <Link ref={btnRef} href="/contact" className="shq-cta__btn" data-cursor="explore">
        <span>CONTACT SHAWQ</span>
        <span className="shq-cta__arrow" aria-hidden="true">→</span>
      </Link>
    </section>
  );
}