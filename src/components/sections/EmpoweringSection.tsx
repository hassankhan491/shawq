'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ✅ Perfume bottles ki images
const users = [
  { id: 1, src: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop', alt: 'Oud Royale' },
  { id: 2, src: 'https://images.unsplash.com/photo-1592945403244-b3fbafd77539?w=300&h=300&fit=crop', alt: 'Amber Essence' },
  { id: 3, src: 'https://images.unsplash.com/photo-1588405748880-12d1d2a55d75?w=300&h=300&fit=crop', alt: 'Golden Musk' },
  { id: 4, src: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=300&h=300&fit=crop', alt: 'White Blossom' },
  { id: 5, src: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=300&h=300&fit=crop', alt: 'Dark Oud' },
  { id: 6, src: 'https://images.unsplash.com/photo-1547887538-047f814bfb64?w=300&h=300&fit=crop', alt: 'Saffron Bloom' },
  { id: 7, src: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=300&h=300&fit=crop', alt: 'Rose Elixir' },
  { id: 8, src: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=300&h=300&fit=crop', alt: 'Pink Aura' },
];

const CARD_RADIUS_DESKTOP = 270;
const CARD_RADIUS_MOBILE = 180;

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

    const radius = window.innerWidth < 640 ? CARD_RADIUS_MOBILE : CARD_RADIUS_DESKTOP;
    const total = users.length;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=1500',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        snap: {
          snapTo: 1 / 5,
          duration: { min: 0.2, max: 0.4 },
          delay: 0.05,
          ease: 'power1.inOut',
        },
      },
    });

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      if (i !== 0) {
        tl.to(card, { scale: 1, opacity: 1, duration: 0.5, ease: 'power1.out' }, 0);
      }

      tl.to(card, { x, y, duration: 3, ease: 'none' }, 0);
    });

    if (arcRef.current) {
      tl.to(
        arcRef.current,
        { strokeDashoffset: ARC_CIRCUMFERENCE * 0.3, duration: 1.5, ease: 'none' },
        0.5
      );
    }

    if (textRef.current) {
      tl.to(textRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power1.out' }, 1);
    }

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('load', onLoad);
      tl.scrollTrigger?.kill();
      tl.kill();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-white">
      <div className="relative flex h-full w-full items-center justify-center pt-20">
        
        {/* Pink gradient ring */}
        <div className="absolute">
          <svg width="600" height="600" className="overflow-visible">
            <defs>
              <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="50%" stopColor="#d946ef" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            <circle cx="300" cy="300" r="280" fill="none" stroke="url(#pinkGradient)" strokeWidth="2" opacity="0.6" />
            <circle
              ref={arcRef}
              cx="300"
              cy="300"
              r="280"
              fill="none"
              stroke="url(#pinkGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={ARC_CIRCUMFERENCE}
              strokeDashoffset={ARC_CIRCUMFERENCE}
              transform="rotate(-90 300 300)"
            />
          </svg>
        </div>

        {/* Outer light blue ring */}
        <div className="absolute">
          <svg width="750" height="750" className="overflow-visible">
            <circle cx="375" cy="375" r="350" fill="none" stroke="#bfdbfe" strokeWidth="1" opacity="0.5" />
          </svg>
        </div>

        {/* Perfume bottle cards */}
        {users.map((user, index) => (
          <div
            key={user.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-2xl border-4 border-white will-change-transform"
            style={index === 0 ? undefined : { opacity: 0, transform: 'scale(0)' }}
          >
            <img src={user.src} alt={user.alt} className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}

        {/* ✅ Center text - circle ke ANDAR, koi overflow nahi */}
        <div
          ref={textRef}
          className="relative z-10 text-center px-4 max-w-[260px] sm:max-w-[340px]"
          style={{ opacity: 0, transform: 'translateY(30px)' }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
            A Scent for
            <br />
            Every Soul
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4 leading-relaxed">
            From royal oud to soft amber, Shawq crafts fragrances that speak your language.
          </p>
        </div>
      </div>
    </section>
  );
}