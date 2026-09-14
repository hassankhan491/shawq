'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './scrollReveal';

gsap.registerPlugin(ScrollTrigger);

/**
 * Split an element's text into masked words:
 * <span class="shq-word-mask"><span class="shq-word">WORD</span></span>
 */
export function splitWords(el: HTMLElement): HTMLSpanElement[] {
  const text = el.textContent?.trim() ?? '';
  const words = text.split(/\s+/).filter(Boolean);
  el.textContent = '';

  return words.map((w) => {
    const mask = document.createElement('span');
    mask.className = 'shq-word-mask';
    const inner = document.createElement('span');
    inner.className = 'shq-word';
    inner.textContent = w;
    mask.appendChild(inner);
    el.appendChild(mask);
    el.appendChild(document.createTextNode(' '));
    return inner;
  });
}

interface RevealWordsOptions {
  trigger?: Element | string | null;
  start?: string;
  stagger?: number;
  y?: number;
  duration?: number;
}

/** Masked word reveal (line/word level — never per-letter). */
export function revealWords(el: HTMLElement, opts: RevealWordsOptions = {}): void {
  const { trigger, start = 'top 86%', stagger = 0.06, y = 115, duration = 1.15 } = opts;
  const words = el.querySelectorAll('.shq-word').length
    ? gsap.utils.toArray<HTMLSpanElement>('.shq-word', el)
    : splitWords(el);

  if (prefersReducedMotion()) {
    gsap.set(words, { yPercent: 0 });
    return;
  }

  gsap.fromTo(
    words,
    { yPercent: y },
    {
      yPercent: 0,
      duration,
      stagger,
      ease: 'power4.out',
      scrollTrigger: { trigger: trigger ?? el, start, once: true },
    }
  );
}

interface DriftOptions {
  /** xPercent offset the line starts at, settling to 0 as it reaches center. */
  from?: number;
  /** optional continued drift after center (editorial sway). */
  to?: number;
  start?: string;
  mid?: string;
  end?: string;
}

/** Scroll-scrubbed horizontal drift for editorial lines. */
export function driftLine(line: Element, opts: DriftOptions = {}): void {
  if (prefersReducedMotion()) return;

  const { from = -8, to, start = 'top bottom', mid = 'center center', end = 'bottom top' } = opts;

  gsap.fromTo(
    line,
    { xPercent: from },
    { xPercent: 0, ease: 'none', scrollTrigger: { trigger: line, start, end: mid, scrub: true } }
  );

  if (to !== undefined) {
    gsap.to(line, {
      xPercent: to,
      ease: 'none',
      scrollTrigger: { trigger: line, start: mid, end, scrub: true },
    });
  }
}