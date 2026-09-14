'use client';

import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { initLenis } from '@/lib/animations/lenis';
import { AboutHero } from './AboutHero';
import { AboutPhilosophy } from './AboutPhilosophy';
import { AboutCircularStory } from './AboutCircularStory';
import { AboutWorld } from './AboutWorld';
import { AboutGallery } from './AboutGallery';
import { AboutFragranceJourney } from './AboutFragranceJourney';
import { AboutStatement } from './AboutStatement';
import { AboutFAQ } from './AboutFAQ';
import { AboutCTA } from './AboutCTA';

import './about.css';

gsap.registerPlugin(ScrollTrigger);

interface ShawqAboutPageProps {
  /** Font CSS-variable class injected from next/font in page.tsx */
  className?: string;
}

export default function ShawqAboutPage({ className = '' }: ShawqAboutPageProps) {
  useLayoutEffect(() => {
    ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });
    const killLenis = initLenis();

    let raf = 0;
    const refresh = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    window.addEventListener('load', refresh);
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) refresh();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('load', refresh);
      killLenis();
    };
  }, []);

  return (
    <div className={`shq-about ${className}`.trim()}>
      <AboutHero />
      <AboutPhilosophy />
      <AboutCircularStory />
      <AboutWorld />
      <AboutGallery />
      <AboutFragranceJourney />
      <AboutStatement />
      <AboutFAQ />
      <AboutCTA />
    </div>
  );
}