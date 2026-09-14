'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { revealWords } from '@/lib/animations/textReveal';
import { fadeUp } from '@/lib/animations/scrollReveal';

gsap.registerPlugin(ScrollTrigger);

export function AboutStatement() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      fadeUp('.shq-statement .shq-overline', { y: 16 });
      gsap.utils.toArray<HTMLElement>('.shq-statement__inner').forEach((inner) => {
        revealWords(inner, { trigger: inner, start: 'top 88%', stagger: 0.14, duration: 1.6 });
      });
      fadeUp('.shq-statement__sig', { y: 18, delay: 0.4 });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="shq-statement">
      <p className="shq-overline">07 — STATEMENT</p>
      <h2 className="shq-display shq-statement__type" aria-label="A scent can be a signature.">
        <span className="shq-statement__line"><span className="shq-statement__inner">A SCENT</span></span>
        <span className="shq-statement__line"><span className="shq-statement__inner">CAN BE</span></span>
        <span className="shq-statement__line"><span className="shq-statement__inner shq-italic">a signature.</span></span>
      </h2>
      <p className="shq-statement__sig">SHAWQ FRAGRANCES</p>
    </section>
  );
}