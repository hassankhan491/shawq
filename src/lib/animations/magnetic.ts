'use client';

import { gsap } from 'gsap';

/** Subtle magnetic hover. Returns cleanup. Desktop pointers only. */
export function magnetic(el: HTMLElement, strength = 0.22): () => void {
  if (typeof window === 'undefined') return () => {};
  if (window.matchMedia('(pointer: coarse)').matches) return () => {};

  const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
  const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });

  const onMove = (e: MouseEvent) => {
    const r = el.getBoundingClientRect();
    xTo((e.clientX - (r.left + r.width / 2)) * strength);
    yTo((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    xTo(0);
    yTo(0);
  };

  el.addEventListener('mousemove', onMove);
  el.addEventListener('mouseleave', onLeave);

  return () => {
    el.removeEventListener('mousemove', onMove);
    el.removeEventListener('mouseleave', onLeave);
    gsap.set(el, { x: 0, y: 0 });
  };
}