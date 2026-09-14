'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './scrollReveal';

gsap.registerPlugin(ScrollTrigger);

interface ImageRevealOptions {
  trigger?: Element | string | null;
  start?: string;
  duration?: number;
  scaleFrom?: number;
  direction?: 'up' | 'left' | 'right';
}

const HIDDEN: Record<NonNullable<ImageRevealOptions['direction']>, string> = {
  up: 'inset(100% 0% 0% 0%)',
  left: 'inset(0% 100% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
};

/** Reusable campaign-image reveal: clip-path + scale + opacity. */
export function imageReveal(target: gsap.DOMTarget, opts: ImageRevealOptions = {}): void {
  const { trigger, start = 'top 80%', duration = 1.5, scaleFrom = 1.12, direction = 'up' } = opts;

  if (prefersReducedMotion()) {
    gsap.set(target, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, opacity: 1 });
    return;
  }

  gsap.fromTo(
    target,
    { clipPath: HIDDEN[direction], scale: scaleFrom, opacity: 0.82 },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      scale: 1,
      opacity: 1,
      duration,
      ease: 'power4.inOut',
      scrollTrigger: { trigger: trigger ?? target, start, once: true },
    }
  );
}