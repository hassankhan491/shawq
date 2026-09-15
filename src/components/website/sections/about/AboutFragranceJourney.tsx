"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { shawqJourneyStages } from "@/data/about/journey";
import { shawqGalleryItems } from "@/data/about/gallery";
import { imageReveal } from "@/lib/animations/imageReveal";
import { fadeUp } from "@/lib/animations/scrollReveal";

gsap.registerPlugin(ScrollTrigger);

/* Scene 08 interludes — reuse gallery imagery (swap later) */
const INTERLUDES = [
  shawqGalleryItems[1], // DESIRE
  shawqGalleryItems[2], // MEMORY
  shawqGalleryItems[4], // PRESENCE
];

export function AboutFragranceJourney() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    /* ── Desktop + motion allowed: pinned 3-stage journey ── */
    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        const section = pinRef.current;
        if (!section) return;

        const items = gsap.utils.toArray<HTMLElement>(
          ".shq-journey__item",
          section,
        );
        const imgs = gsap.utils.toArray<HTMLElement>(
          ".shq-journey__img",
          section,
        );
        const fill = section.querySelector<HTMLElement>(
          ".shq-journey__progress-fill",
        );
        let current = 0;

        const setStage = (i: number) => {
          if (i === current) return;
          current = i;
          items.forEach((el, k) => el.classList.toggle("is-active", k === i));
          imgs.forEach((el, k) =>
            gsap.to(el, {
              autoAlpha: k === i ? 1 : 0,
              scale: k === i ? 1 : 1.07,
              duration: 1,
              ease: "power2.inOut",
            }),
          );
        };

        const st = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=220%",
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (fill) gsap.set(fill, { scaleX: self.progress });
            setStage(
              Math.min(
                items.length - 1,
                Math.floor(self.progress * items.length),
              ),
            );
          },
        });

        return () => st.kill();
      },
    );

    /* ── Mobile OR reduced motion: normal scroll, sticky visual ── */
    mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
      const section = pinRef.current;
      if (!section) return;

      section.classList.add("is-static");
      const items = gsap.utils.toArray<HTMLElement>(
        ".shq-journey__item",
        section,
      );
      const imgs = gsap.utils.toArray<HTMLElement>(
        ".shq-journey__img",
        section,
      );
      let current = 0;

      const setStage = (i: number) => {
        if (i === current) return;
        current = i;
        items.forEach((el, k) => el.classList.toggle("is-active", k === i));
        imgs.forEach((el, k) => el.classList.toggle("is-active", k === i));
      };

      const triggers = items.map((item, i) =>
        ScrollTrigger.create({
          trigger: item,
          start: "top 60%",
          end: "bottom 60%",
          onEnter: () => setStage(i),
          onEnterBack: () => setStage(i),
        }),
      );

      return () => {
        section.classList.remove("is-static");
        triggers.forEach((t) => t.kill());
      };
    });

    /* ── Interlude reveals (all modes) ── */
    const revCtx = gsap.context(() => {
      fadeUp(".shq-journey__label", { y: 20 });
      gsap.utils.toArray<HTMLElement>(".shq-interlude__img").forEach((img) => {
        imageReveal(img, { trigger: img, start: "top 82%" });
      });
      gsap.utils
        .toArray<HTMLElement>(".shq-interlude__word")
        .forEach((word, i) => {
          gsap.fromTo(
            word,
            { xPercent: i % 2 ? 14 : -14 },
            {
              xPercent: 0,
              ease: "none",
              scrollTrigger: {
                trigger: word,
                start: "top 92%",
                end: "top 40%",
                scrub: true,
              },
            },
          );
        });
    }, wrapRef);

    return () => {
      mm.revert();
      revCtx.revert();
    };
  }, []);

  return (
    <div ref={wrapRef}>
      <section ref={pinRef} className="shq-journey">
        <div className="shq-journey__stage">
          <div className="shq-journey__visual">
            {shawqJourneyStages.map((s, i) => (
              <div key={s.index} className={`shq-journey__img ${i === 0 ? 'is-active' : ''}`}>
                <img src={s.image} alt={s.alt} loading="lazy" />
              </div>
            ))}
            <span className="shq-journey__progress" aria-hidden="true">
              <span className="shq-journey__progress-fill" />
            </span>
          </div>

          <div className="shq-journey__list">
            <p className="shq-overline shq-journey__label">
              06 — THE FRAGRANCE JOURNEY
            </p>
            {shawqJourneyStages.map((s, i) => (
              <article
                key={s.index}
                className={`shq-journey__item ${i === 0 ? "is-active" : ""}`}
              >
                <span className="shq-journey__num">{s.index}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p className="shq-journey__notes">{s.notes.join(" · ")}</p>
                  <p className="shq-journey__desc">{s.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Scene 08 — alternating image / huge word compositions */}
      <div className="shq-interludes">
        {INTERLUDES.map((it, i) => (
          <div
            key={it.title}
            className={`shq-interlude ${i % 2 ? "shq-interlude--rev" : ""}`}
          >
            <div className="shq-interlude__img">
              <img src={it.image} alt={it.alt} loading="lazy" />
            </div>
            <h3 className="shq-interlude__word">{it.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
