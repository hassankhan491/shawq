'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { shawqGalleryItems } from '@/data/about/gallery';
import { scrollToY } from '@/lib/animations/lenis';
import { prefersReducedMotion } from '@/lib/animations/scrollReveal';

gsap.registerPlugin(ScrollTrigger);

export function AboutGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    /* ── Desktop: pinned horizontal scroll + pointer drag ── */
    mm.add('(min-width: 768px)', () => {
      if (prefersReducedMotion()) {
        track.style.overflowX = 'auto';
        track.style.scrollSnapType = 'x mandatory';
        return () => {
          track.style.overflowX = '';
          track.style.scrollSnapType = '';
        };
      }

      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => '+=' + getDistance(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      const st = tween.scrollTrigger;

      /* Drag follows pointer (respects global Lenis) */
      let dragging = false;
      let startX = 0;
      let startScroll = 0;

      const onDown = (e: PointerEvent) => {
        if (e.pointerType === 'touch' || !st) return;
        dragging = true;
        startX = e.clientX;
        startScroll = st.scroll();
        section.classList.add('is-dragging');
      };
      const onMove = (e: PointerEvent) => {
        if (!dragging || !st) return;
        const delta = (e.clientX - startX) * 1.7;
        scrollToY(gsap.utils.clamp(st.start, st.end, startScroll - delta), true);
      };
      const onUp = () => {
        dragging = false;
        section.classList.remove('is-dragging');
      };

      section.addEventListener('pointerdown', onDown);
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onUp);

      /* Hover: scale, brighten, tiny label */
      const figureCleanups = gsap.utils
        .toArray<HTMLElement>('.shq-gallery__figure', section)
        .map((fig) => {
          const img = fig.querySelector('img');
          const hover = fig.querySelector<HTMLElement>('.shq-gallery__hover');
          if (!img || !hover) return () => {};

          const enter = () => {
            gsap.to(img, { scale: 1.05, filter: 'brightness(1.08)', duration: 0.7, ease: 'power2.out' });
            gsap.to(hover, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' });
          };
          const leave = () => {
            gsap.to(img, { scale: 1, filter: 'brightness(1)', duration: 0.7, ease: 'power2.out' });
            gsap.to(hover, { autoAlpha: 0, y: 8, duration: 0.3, ease: 'power2.in' });
          };
          fig.addEventListener('mouseenter', enter);
          fig.addEventListener('mouseleave', leave);
          return () => {
            fig.removeEventListener('mouseenter', enter);
            fig.removeEventListener('mouseleave', leave);
          };
        });

      /* Progress line reacts to scroll */
      const fill = section.querySelector('.shq-gallery__line-fill');
      if (fill) {
        gsap.fromTo(
          fill,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => '+=' + getDistance(),
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      return () => {
        section.removeEventListener('pointerdown', onDown);
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('pointercancel', onUp);
        figureCleanups.forEach((c) => c());
      };
    });

    /* ── Mobile: native swipe (CSS handles snap) ── */
    mm.add('(max-width: 767px)', () => {
      gsap.set(track, { clearProps: 'transform' });
      return () => {};
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="shq-gallery" data-cursor="drag" aria-label="SHAWQ scent gallery">
      <div className="shq-gallery__sticky">
        <header className="shq-gallery__head">
          <p className="shq-overline">05 — HORIZONTAL SCENT GALLERY</p>
          <h2 className="shq-gallery__title-lg">
            FIVE <em>moments</em> OF SCENT
          </h2>
        </header>

        <div className="shq-gallery__viewport" data-lenis-prevent>
          <div ref={trackRef} className="shq-gallery__track">
            {shawqGalleryItems.map((item) => (
              <figure key={item.index} className="shq-gallery__figure" data-cursor="view">
                <div className="shq-gallery__imgwrap">
                  <img src={item.image} alt={item.alt} loading="lazy" />
                  <span className="shq-gallery__hover">EXPLORE SCENT {item.index}</span>
                </div>
                <figcaption className="shq-gallery__cap">
                  <span className="shq-gallery__idx">{item.index}</span>
                  <span className="shq-gallery__title">{item.title}</span>
                  <span className="shq-gallery__note">{item.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="shq-gallery__line" aria-hidden="true">
          <span className="shq-gallery__line-fill" />
          <span className="shq-gallery__line-label shq-gallery__line-label--drag">DRAG</span>
          <span className="shq-gallery__line-label shq-gallery__line-label--swipe">SWIPE</span>
        </div>
      </div>
    </section>
  );
}