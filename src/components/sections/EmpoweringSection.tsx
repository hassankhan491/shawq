'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Perfume bottles
const users = [
  { id: 1, src: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop', alt: 'Oud Royale' },
  { id: 2, src: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=300&fit=crop', alt: 'Amber Essence' },
  { id: 3, src: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=300&h=300&fit=crop', alt: 'Golden Musk' },
  { id: 4, src: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=300&h=300&fit=crop', alt: 'White Blossom' },
  { id: 5, src: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=300&h=300&fit=crop', alt: 'Dark Oud' },
  { id: 6, src: 'https://images.unsplash.com/photo-1547887538-047f814bfb64?w=300&h=300&fit=crop', alt: 'Saffron Bloom' },
  { id: 7, src: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=300&h=300&fit=crop', alt: 'Rose Elixir' },
  { id: 8, src: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=300&h=300&fit=crop', alt: 'Pink Aura' },
];

const CARD_RADIUS_DESKTOP = 270;
const CARD_RADIUS_MOBILE = 160;
const CARD_RADIUS_TABLET = 220;

const RING_RADIUS = 280;
const ARC_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export default function EmpoweringSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement | null>(null);
  const arcRef = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let tl: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      const vw = window.innerWidth;
      // ✅ Responsive radius for all devices
      let radius: number;
      if (vw < 480) radius = 130;           // small mobile
      else if (vw < 640) radius = CARD_RADIUS_MOBILE; // mobile
      else if (vw < 1024) radius = CARD_RADIUS_TABLET; // tablet
      else radius = CARD_RADIUS_DESKTOP;   // desktop

      const total = users.length;

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=1500',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Cards gradually expand
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        if (i !== 0) {
          tl!.to(card, { scale: 1, opacity: 1, duration: 0.5, ease: 'power1.out' }, 0);
        }

        tl!.to(card, { x, y, duration: 3, ease: 'none' }, 0);
      });

      // Pink arc draw
      if (arcRef.current) {
        tl.to(
          arcRef.current,
          { strokeDashoffset: ARC_CIRCUMFERENCE * 0.3, duration: 1.5, ease: 'none' },
          0.5
        );
      }

      // Text reveal
      if (textRef.current) {
        tl.to(textRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power1.out' }, 1);
      }
    }, section);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('load', onLoad);
      try {
        if (tl) {
          tl.scrollTrigger?.kill();
          tl.kill();
        }
        ctx.revert();
      } catch (err) {
        // ignore - HMR safe
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-[#0f0a08]">
      
      {/* ✅ MINIMAL LUXURY BACKGROUND (clean, elegant) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Center soft golden glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,98,0.08),transparent_65%)]" />
        
        {/* Corners mein halki warmth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,169,98,0.05),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(201,169,98,0.05),transparent_45%)]" />
      </div>

      {/* ✅ CONTENT - fully responsive */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-4">
        
        {/* Inner gold gradient ring */}
<div className="absolute">
  <svg 
    width="100%" 
    height="100%" 
    viewBox="0 0 600 600"
    className="w-[min(85vw,600px)] h-[min(85vw,600px)] overflow-visible"
  >
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e0c78a" />
        <stop offset="50%" stopColor="#c9a962" />
        <stop offset="100%" stopColor="#9a7b3f" />
      </linearGradient>
    </defs>
    <circle cx="300" cy="300" r="280" fill="none" stroke="url(#goldGradient)" strokeWidth="2" opacity="0.7" />
    <circle
      ref={arcRef}
      cx="300"
      cy="300"
      r="280"
      fill="none"
      stroke="url(#goldGradient)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeDasharray={ARC_CIRCUMFERENCE}
      strokeDashoffset={ARC_CIRCUMFERENCE}
      transform="rotate(-90 300 300)"
    />
  </svg>
</div>

{/* Outer gold ring */}
<div className="absolute">
  <svg 
    width="100%" 
    height="100%" 
    viewBox="0 0 750 750"
    className="w-[min(105vw,750px)] h-[min(105vw,750px)] overflow-visible"
  >
    <circle cx="375" cy="375" r="350" fill="none" stroke="#c9a962" strokeWidth="1" opacity="0.3" />
  </svg>
</div>

        {/* Perfume bottle cards - fully responsive sizes */}
        {users.map((user, index) => (
          <div
            key={user.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="absolute w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white will-change-transform"
            style={index === 0 ? undefined : { opacity: 0, transform: 'scale(0)' }}
          >
            <img src={user.src} alt={user.alt} className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}

        {/* Center text - responsive */}
        <div
          ref={textRef}
          className="relative z-10 text-center px-4 max-w-[220px] sm:max-w-[300px] md:max-w-[360px]"
          style={{ opacity: 0, transform: 'translateY(30px)' }}
        >
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#f5f0eb] leading-tight">
            A Scent for
            <br />
            Every Soul
          </h2>
          <p className="text-[#a89f95] text-[10px] sm:text-xs md:text-sm mt-2 sm:mt-3 md:mt-4 leading-relaxed">
            From royal oud to soft amber, Shawq crafts fragrances that speak your language.
          </p>
        </div>
      </div>
    </section>
  );
}