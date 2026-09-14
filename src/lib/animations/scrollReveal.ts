'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface FadeUpOptions {
  trigger?: Element | string | null;
  start?: string;
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
}

/** Generic fade-up reveal (once). Reduced-motion → content shown instantly. */
export function fadeUp(target: gsap.DOMTarget, opts: FadeUpOptions = {}): void {
  const { trigger, start = 'top 88%', y = 42, duration = 1, delay = 0, stagger = 0 } = opts;

  if (prefersReducedMotion()) {
    gsap.set(target, { autoAlpha: 1, y: 0 });
    return;
  }

  gsap.fromTo(
    target,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: { trigger: trigger ?? target, start, once: true },
    }
  );
}

interface ParallaxOptions {
  trigger?: Element | string | null;
  speed?: number;
  start?: string;
  end?: string;
  scale?: number;
}

/** Scrubbed vertical parallax (transform only). */
export function parallax(target: gsap.DOMTarget, opts: ParallaxOptions = {}): void {
  if (prefersReducedMotion()) return;

  const { trigger, speed = 0.18, start = 'top bottom', end = 'bottom top', scale } = opts;
  const dist = speed * 100;

  gsap.fromTo(
    target,
    { yPercent: dist, scale: scale ?? 1 },
    {
      yPercent: -dist,
      scale: scale ?? 1,
      ease: 'none',
      scrollTrigger: { trigger: trigger ?? target, start, end, scrub: true },
    }
  );
}