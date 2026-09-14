'use client';

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let scoped: Lenis | null = null;

/** Duck-type check: only trust objects that really behave like Lenis. */
function isLenisLike(v: unknown): v is Lenis {
  return (
    typeof v === 'object' &&
    v !== null &&
    typeof (v as { scrollTo?: unknown }).scrollTo === 'function' &&
    typeof (v as { raf?: unknown }).raf === 'function'
  );
}

/** Unwrap common storage shapes: instance | { current } | { instance } | { lenis } */
function unwrapLenis(v: unknown): Lenis | null {
  if (isLenisLike(v)) return v;
  if (typeof v === 'object' && v !== null) {
    const c = v as Record<string, unknown>;
    for (const key of ['current', 'instance', 'lenis', '__lenis']) {
      if (isLenisLike(c[key])) return c[key] as Lenis;
    }
  }
  return null;
}

/** Probe for the global Lenis created by LenisProvider (any storage shape). */
export function getGlobalLenis(): Lenis | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as Record<string, unknown>;
  for (const key of ['lenis', '__lenis', '__LENIS__']) {
    const found = unwrapLenis(w[key]);
    if (found) return found;
  }
  return null;
}

export function globalLenisActive(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    !!getGlobalLenis() ||
    document.documentElement.classList.contains('lenis') ||
    document.body.classList.contains('lenis')
  );
}

/**
 * Page-safe Lenis init.
 * Global provider exists → do nothing (never a second instance).
 * Otherwise create a scoped instance with full cleanup.
 */
export function initLenis(): () => void {
  if (typeof window === 'undefined') return () => {};
  if (globalLenisActive()) return () => {};

  scoped = new Lenis({ duration: 1.15, smoothWheel: true });
  scoped.on('scroll', ScrollTrigger.update);

  const tick = (t: number) => scoped?.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    scoped?.destroy();
    scoped = null;
  };
}

/** Crash-proof scroll helper: validated Lenis → otherwise native scroll. */
export function scrollToY(y: number, immediate = true): void {
  const l = getGlobalLenis();
  if (l) {
    try {
      l.scrollTo(y, { immediate });
      return;
    } catch {
      /* fall through to native */
    }
  }
  window.scrollTo({ top: y, behavior: immediate ? 'auto' : 'smooth' });
}