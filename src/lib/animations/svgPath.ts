'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './scrollReveal';

gsap.registerPlugin(ScrollTrigger);

interface DrawPathOptions {
  trigger?: Element | string | null;
  start?: string;
  end?: string;
  /** seconds for the self-draw (used when scrub = false) */
  duration?: number;
  /** true = tie to scroll progress (repaints each scroll frame — avoid on huge SVGs) */
  scrub?: boolean | number;
  opacity?: number;
}

/**
 * Scent-trail drawing system.
 * Default: draws ONCE over `duration` when it enters view (zero per-frame repaints).
 * Optional scrub mode for small paths only.
 */
export function drawPath(path: SVGPathElement | string, opts: DrawPathOptions = {}): void {
  const el =
    typeof path === 'string'
      ? (document.querySelector<SVGPathElement>(path) as SVGPathElement | null)
      : path;
  if (!el) return;

  const { trigger, start = 'top 80%', end = 'bottom top', duration = 1.8, scrub = false, opacity = 0.9 } = opts;
  const len = el.getTotalLength();

  gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity });

  if (prefersReducedMotion()) {
    gsap.set(el, { strokeDashoffset: 0 });
    return;
  }

  gsap.to(el, {
    strokeDashoffset: 0,
    duration,
    ease: scrub ? 'none' : 'power2.inOut',
    scrollTrigger: scrub
      ? { trigger: trigger ?? el, start, end, scrub }
      : { trigger: trigger ?? el, start, once: true },
  });
}

/** @deprecated causes constant SVG repaints — avoid on large paths */
export function floatPath(path: SVGPathElement | string, y = 10, duration = 5): void {
  const el =
    typeof path === 'string'
      ? (document.querySelector<SVGPathElement>(path) as SVGPathElement | null)
      : path;
  if (!el || prefersReducedMotion()) return;
  gsap.to(el, { y, duration, yoyo: true, repeat: -1, ease: 'sine.inOut' });
}