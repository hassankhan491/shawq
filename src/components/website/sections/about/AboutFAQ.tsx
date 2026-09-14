'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { shawqFaqItems } from '@/data/about/faqs';
import { revealWords } from '@/lib/animations/textReveal';
import { fadeUp } from '@/lib/animations/scrollReveal';

gsap.registerPlugin(ScrollTrigger);

export function AboutFAQ() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.shq-faq__inner').forEach((inner) => {
        revealWords(inner, { trigger: inner, start: 'top 90%' });
      });
      fadeUp('.shq-faq__list', { y: 40, duration: 1 });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="shq-faq">
      <h2 className="shq-faq__title">
        <span className="shq-faq__line"><span className="shq-faq__inner">FREQUENTLY</span></span>
        <span className="shq-faq__line"><span className="shq-faq__inner">ASKED</span></span>
        <span className="shq-faq__line"><span className="shq-faq__inner">QUESTIONS</span></span>
      </h2>

      <div className="shq-faq__list">
        {shawqFaqItems.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.number} className={`shq-faq__item ${isOpen ? 'is-open' : ''}`}>
              <button
                type="button"
                className="shq-faq__q"
                aria-expanded={isOpen}
                aria-controls={`shq-faq-panel-${i}`}
                id={`shq-faq-btn-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="shq-faq__qnum">{item.number}</span>
                <span className="shq-faq__qtext">{item.question}</span>
                <span className="shq-faq__plus" aria-hidden="true" />
              </button>
              <div
                className="shq-faq__a"
                id={`shq-faq-panel-${i}`}
                role="region"
                aria-labelledby={`shq-faq-btn-${i}`}
              >
                <div className="shq-faq__a-inner">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}