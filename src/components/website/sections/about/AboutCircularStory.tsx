'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { imageReveal } from '@/lib/animations/imageReveal';
import { fadeUp, prefersReducedMotion } from '@/lib/animations/scrollReveal';

gsap.registerPlugin(ScrollTrigger);

/* Replace later with /images/shawq/about/story.webp */
const STORY_IMG =
  '/images/kl.jpeg';

const RING_TEXT =
  'CRAFTED FOR THE SENSES · MEMORY · DESIRE · PRESENCE · IDENTITY · ' +
  'CRAFTED FOR THE SENSES · MEMORY · DESIRE · PRESENCE · IDENTITY · ';

export function AboutCircularStory() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = prefersReducedMotion();

      imageReveal('.shq-circ__image', { trigger: '.shq-circ__stage', start: 'top 78%' });
      fadeUp('.shq-circ__label', { y: 20 });
      fadeUp('.shq-circ__copy', { y: 34, duration: 1.1 });

      if (!reduced) {
        /* Circular typography rotates with scroll */
        gsap.fromTo(
          '.shq-circ__text',
          { rotation: -10 },
          {
            rotation: 26,
            ease: 'none',
            scrollTrigger: { trigger: ref.current ?? undefined, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );

        /* Red accent travels along the ring */
        gsap.fromTo(
          '.shq-circ__orbit',
          { rotation: 0 },
          {
            rotation: 150,
            ease: 'none',
            scrollTrigger: { trigger: ref.current ?? undefined, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );

        /* Center image breathes very slightly */
        gsap.fromTo(
          '.shq-circ__image img',
          { scale: 1.14 },
          {
            scale: 1.02,
            ease: 'none',
            scrollTrigger: { trigger: ref.current ?? undefined, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );

        /* Thin rings settle in */
        gsap.fromTo(
          '.shq-circ__ring--outer',
          { scale: 0.92, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger: '.shq-circ__stage', start: 'top 80%', once: true } }
        );

        /* Oversized side words drift */
        gsap.fromTo('.shq-circ__side--left', { x: -90 }, {
          x: 50, ease: 'none',
          scrollTrigger: { trigger: ref.current ?? undefined, start: 'top bottom', end: 'bottom top', scrub: true },
        });
        gsap.fromTo('.shq-circ__side--right', { x: 90 }, {
          x: -50, ease: 'none',
          scrollTrigger: { trigger: ref.current ?? undefined, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="shq-circ">
      <p className="shq-overline shq-circ__label">03 — THE HOUSE OF SHAWQ</p>

      <div className="shq-circ__stage">
        <div className="shq-circ__rings" aria-hidden="true">
          <span className="shq-circ__ring shq-circ__ring--outer" />
          <span className="shq-circ__ring shq-circ__ring--inner" />
        </div>

        <span className="shq-circ__orbit" aria-hidden="true">
          <span className="shq-circ__dot" />
        </span>

        <svg className="shq-circ__text" viewBox="0 0 600 600" aria-hidden="true">
          <defs>
            <path
              id="shq-circle-path"
              d="M300,300 m-252,0 a252,252 0 1,1 504,0 a252,252 0 1,1 -504,0"
            />
          </defs>
          <text className="shq-circ__textpath">
            <textPath href="#shq-circle-path">{RING_TEXT}</textPath>
          </text>
        </svg>

        <div className="shq-circ__image">
          <img src={STORY_IMG} alt="SHAWQ extrait resting in warm atelier light" loading="lazy" />
        </div>
      </div>

      <div className="shq-circ__copy">
        <p>
          SHAWQ explores fragrance as a language of memory, identity and desire. We create
          scents designed to stay with you long after the moment has passed — composed in
          small batches, aged in silence, and released only when they speak.
        </p>
      </div>

      <div className="shq-circ__side shq-circ__side--left" aria-hidden="true">SHAWQ</div>
      <div className="shq-circ__side shq-circ__side--right" aria-hidden="true">FRAGRANCE</div>
    </section>
  );
}