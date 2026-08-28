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

const CARD_RADIUS_DESKTOP = 250;
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
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      
      {/* ✅ BACKGROUND IMAGE */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/woman2.jpeg')" }}
      />

      {/* ✅ DARK OVERLAY - Ensures rings & text pop against the image */}
      <div className="absolute inset-0 z-0 bg-[#0f0a08]/40" />

      {/* ✅ CONTENT - fully responsive */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-4">
        
        {/* ✅ INNER GOLD RING - More prominent with glow */}
        <div className="absolute scale-90">
          <svg width="600" height="600" className="overflow-visible">
            <defs>
              {/* Enhanced gradient for more prominence */}
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f0e4a8" />
                <stop offset="50%" stopColor="#d4b978" />
                <stop offset="100%" stopColor="#b8956a" />
              </linearGradient>
              
              {/* Glow filter */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Outer subtle ring */}
            <circle 
              cx="300" 
              cy="300" 
              r="280" 
              fill="none" 
              stroke="url(#goldGradient)" 
              strokeWidth="2.5" 
              opacity="0.6"
              filter="url(#glow)"
            />
            
            {/* Animated arc - more prominent */}
            <circle
              ref={arcRef}
              cx="300"
              cy="300"
              r="280"
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={ARC_CIRCUMFERENCE}
              strokeDashoffset={ARC_CIRCUMFERENCE}
              transform="rotate(-90 300 300)"
              filter="url(#glow)"
              style={{ filter: 'drop-shadow(0 0 8px rgba(212, 185, 120, 0.6))' }}
            />
          </svg>
        </div>

        {/* ✅ OUTER GOLD RING - More visible */}
        <div className="absolute scale-90">
          <svg width="750" height="750" className="overflow-visible">
            <circle 
              cx="375" 
              cy="375" 
              r="350" 
              fill="none" 
              stroke="#d4b978" 
              strokeWidth="2" 
              opacity="0.5"
              style={{ filter: 'drop-shadow(0 0 4px rgba(212, 185, 120, 0.4))' }}
            />
          </svg>
        </div>

        {/* ✅ PERFUME BOTTLE CARDS */}
        {users.map((user, index) => (
          <div
            key={user.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="absolute w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white/90 will-change-transform"
            style={index === 0 ? undefined : { opacity: 0, transform: 'scale(0)' }}
          >
            <img src={user.src} alt={user.alt} className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}

        {/* ✅ CENTER TEXT - Fraunces font with enhanced visibility */}
        <div
          ref={textRef}
          className="relative z-10 text-center px-4 max-w-[220px] sm:max-w-[300px] md:max-w-[360px]"
          style={{ opacity: 0, transform: 'translateY(30px)' }}
        >
          <h2 
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-[#f0e4a8] leading-[1.1] tracking-tight"
            style={{ 
              fontFamily: "'Fraunces', Georgia, serif",
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(212, 185, 120, 0.3)"
            }}
          >
            SCENT IS
            <br />
            <span className="italic text-[#d4b978]">MEMORY</span>
          </h2>
          
          <p 
            className="font-body text-[#e8e0d5] text-xs sm:text-sm md:text-base mt-3 sm:mt-4 md:mt-5 leading-relaxed font-light tracking-wide"
            style={{ 
              fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.7)"
            }}
          >
            From royal oud to soft amber, Shawq crafts fragrances that speak your language.
          </p>
        </div>
      </div>
    </section>
  );
}