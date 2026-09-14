'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitWords } from '@/lib/animations/textReveal';
import { fadeUp, prefersReducedMotion } from '@/lib/animations/scrollReveal';

gsap.registerPlugin(ScrollTrigger);

export function AboutPhilosophy() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = ref.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const reduced = prefersReducedMotion();

      fadeUp('.shq-phil__label', { y: 20 });

      /* Split each line into masked words (once) */
      const inners = gsap.utils.toArray<HTMLElement>('.shq-phil__inner');
      const lineWords = inners.map((inner) =>
        inner.querySelectorAll('.shq-word').length
          ? gsap.utils.toArray<HTMLSpanElement>('.shq-word', inner)
          : splitWords(inner)
      );

      if (reduced) {
        lineWords.forEach((words) => gsap.set(words, { opacity: 1 }));
      } else {
        const [g1, g2, g3, g4, g5] = lineWords;

        /* Rest state: un-inked type */
        lineWords.forEach((words) => gsap.set(words, { opacity: 0.14 }));

        /* Scroll writes the statement in ink */
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'bottom 45%',
            scrub: 0.6,
          },
        });

        tl.to(g1, { opacity: 1, stagger: 0.04, duration: 0.3 }, 0)
          .to(g2, { opacity: 1, stagger: 0.05, duration: 0.3 }, 0.15)
          .to(g3, { opacity: 1, stagger: 0.04, duration: 0.3 }, 0.3)
          /* Focus transfer: second statement inks, first recedes */
          .to(g4, { opacity: 1, stagger: 0.04, duration: 0.3 }, 0.55)
          .to(g5, { opacity: 1, stagger: 0.05, duration: 0.3 }, 0.7)
          .to([g1, g2, g3], { opacity: 0.35, stagger: 0.02, duration: 0.5 }, 0.85);

        /* Red rule draws within the same breath */
        const rule = section.querySelector<SVGPathElement>('.shq-phil__rule path');
        if (rule) {
          const len = rule.getTotalLength();
          gsap.set(rule, { strokeDasharray: len, strokeDashoffset: len });
          tl.to(rule, { strokeDashoffset: 0, duration: 0.4 }, 0.5);
        }

        /* Subtle vertical depth — transform only, never clips */
        gsap.utils.toArray<HTMLElement>('.shq-phil__line').forEach((line, i) => {
          gsap.fromTo(
            line,
            { y: 30 - i * 5 },
            {
              y: -20 + i * 5,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        });
      }

      fadeUp('.shq-phil__note', { y: 30, duration: 1.1 });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="shq-phil">
      <p className="shq-overline shq-phil__label">02 — PHILOSOPHY</p>

      <h2 className="shq-phil__group" aria-label="We do not create fragrance.">
        <span className="shq-phil__line">
          <span className="shq-phil__inner">WE DO NOT</span>
        </span>
        <span className="shq-phil__line">
          <span className="shq-phil__inner shq-phil__inner--italic">create</span>
        </span>
        <span className="shq-phil__line">
          <span className="shq-phil__inner">FRAGRANCE.</span>
        </span>
      </h2>

      <h2 className="shq-phil__group shq-phil__group--second" aria-label="We create memory.">
        <span className="shq-phil__line">
          <span className="shq-phil__inner">WE CREATE</span>
        </span>
        <span className="shq-phil__line">
          <span className="shq-phil__inner">MEMORY.</span>
        </span>
      </h2>

      <svg className="shq-phil__rule" viewBox="0 0 600 2" fill="none" aria-hidden="true">
        <path d="M0,1 H600" />
      </svg>

      <p className="shq-phil__note">
        Every composition begins as a memory — a room, a season, a skin. We macerate slowly,
        blend by hand, and release only when the scent remembers on its own.
      </p>
    </section>
  );
}