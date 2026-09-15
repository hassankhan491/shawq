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
      const counter = section.querySelector<HTMLElement>('.shq-gallery__count-now');
      const total = shawqGalleryItems.length;

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
          onUpdate: (self) => {
            if (!counter) return;
            const idx = Math.min(total, Math.floor(self.progress * total) + 1);
            const txt = String(idx).padStart(2, '0');
            if (counter.textContent !== txt) counter.textContent = txt;
          },
        },
      });
      const st = tween.scrollTrigger;

      /* Entrance: figures rise once */
      gsap.from('.shq-gallery__figure', {
        y: 70,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      });

      /* Title line-mask reveal */
      gsap.from('.shq-gallery__title-line > span', {
        yPercent: 110,
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: { trigger: section, start: 'top 80%', once: true },
      });

      /* Inner-image parallax (depth while the track moves) */
      gsap.fromTo(
        '.shq-gallery__imgwrap img',
        { xPercent: 6, scale: 1.18 },
        {
          xPercent: -6,
          scale: 1.18,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: () => '+=' + getDistance(), scrub: 1, invalidateOnRefresh: true },
        }
      );

      /* Ghost words drift slower than the track */
      gsap.fromTo(
        '.shq-gallery__ghost',
        { xPercent: 4 },
        {
          xPercent: -20,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: () => '+=' + getDistance(), scrub: 1, invalidateOnRefresh: true },
        }
      );

      /* Pointer drag (respects global Lenis) */
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

      /* Hover: inner zoom + label (frame is pure CSS) */
      const figureCleanups = gsap.utils
        .toArray<HTMLElement>('.shq-gallery__figure', section)
        .map((fig) => {
          const img = fig.querySelector('img');
          const hover = fig.querySelector<HTMLElement>('.shq-gallery__hover');
          if (!img || !hover) return () => {};

          const enter = () => {
            gsap.to(img, { scale: 1.26, filter: 'brightness(1.06)', duration: 0.8, ease: 'power2.out' });
            gsap.to(hover, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' });
          };
          const leave = () => {
            gsap.to(img, { scale: 1.18, filter: 'brightness(1)', duration: 0.8, ease: 'power2.out' });
            gsap.to(hover, { autoAlpha: 0, y: 8, duration: 0.3, ease: 'power2.in' });
          };
          fig.addEventListener('mouseenter', enter);
          fig.addEventListener('mouseleave', leave);
          return () => {
            fig.removeEventListener('mouseenter', enter);
            fig.removeEventListener('mouseleave', leave);
          };
        });

      /* Progress line fill */
      const fill = section.querySelector('.shq-gallery__line-fill');
      if (fill) {
        gsap.fromTo(
          fill,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top top', end: () => '+=' + getDistance(), scrub: true, invalidateOnRefresh: true },
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

    /* ── Mobile: native swipe (CSS snap) ── */
        /* ── Mobile: native swipe (CSS snap) + live counter ── */
    mm.add('(max-width: 767px)', () => {
      gsap.set(track, { clearProps: 'transform' });

      const viewport = section.querySelector<HTMLElement>('.shq-gallery__viewport');
      const counter = section.querySelector<HTMLElement>('.shq-gallery__count-now');
      if (!viewport || !counter) return () => {};

      const figures = gsap.utils.toArray<HTMLElement>('.shq-gallery__figure', track);
      let raf = 0;

      const update = () => {
        raf = 0;
        const center = viewport.scrollLeft + viewport.clientWidth / 2;
        let idx = 0;
        let best = Infinity;
        figures.forEach((fig, i) => {
          const figCenter = fig.offsetLeft + fig.offsetWidth / 2;
          const dist = Math.abs(figCenter - center);
          if (dist < best) {
            best = dist;
            idx = i;
          }
        });
        const txt = String(idx + 1).padStart(2, '0');
        if (counter.textContent !== txt) counter.textContent = txt;
      };

      const onScroll = () => {
        if (!raf) raf = requestAnimationFrame(update);
      };

      viewport.addEventListener('scroll', onScroll, { passive: true });
      update();

      return () => {
        viewport.removeEventListener('scroll', onScroll);
        if (raf) cancelAnimationFrame(raf);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="shq-gallery" data-cursor="drag" aria-label="SHAWQ scent gallery">
      <div className="shq-gallery__sticky">
        {/* Ghost editorial layer */}
        <div className="shq-gallery__ghost" aria-hidden="true">
          {shawqGalleryItems.map((item) => (
            <span key={item.index}>{item.title}</span>
          ))}
        </div>

        <header className="shq-gallery__head">
          <p className="shq-overline">05 — HORIZONTAL SCENT GALLERY</p>
          <h2 className="shq-gallery__title-lg">
            <span className="shq-gallery__title-line">
              <span>
                FIVE <em>moments</em> OF SCENT
              </span>
            </span>
          </h2>
          <p className="shq-gallery__count" aria-hidden="true">
            <span className="shq-gallery__count-now">01</span> / {String(shawqGalleryItems.length).padStart(2, '0')}
          </p>
        </header>

        {/* NOTE: no data-lenis-prevent here — it was killing wheel scroll on desktop */}
        <div className="shq-gallery__viewport">
          <div ref={trackRef} className="shq-gallery__track">
            {shawqGalleryItems.map((item, i) => (
              <figure
                key={item.index}
                className={`shq-gallery__figure ${i % 2 ? 'shq-gallery__figure--low' : ''}`}
                data-cursor="view"
              >
                <span className="shq-gallery__num" aria-hidden="true">
                  {item.index}
                </span>
                <div className="shq-gallery__imgwrap">
                  <img src={item.image} alt={item.alt} loading="lazy" />
                  <span className="shq-gallery__frame" aria-hidden="true" />
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

        <footer className="shq-gallery__foot">
          <div className="shq-gallery__line" aria-hidden="true">
            <span className="shq-gallery__line-fill" />
            {shawqGalleryItems.map((item, i) => (
              <span key={item.index} className="shq-gallery__line-tick" style={{ left: `${(i / (shawqGalleryItems.length - 1)) * 100}%` }} />
            ))}
            <span className="shq-gallery__line-label shq-gallery__line-label--drag">DRAG</span>
            <span className="shq-gallery__line-label shq-gallery__line-label--swipe">SWIPE</span>
          </div>
        </footer>
      </div>
    </section>
  );
}