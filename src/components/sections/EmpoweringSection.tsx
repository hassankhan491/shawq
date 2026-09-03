"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Perfume bottles
const users = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop",
    alt: "Oud Royale",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=300&fit=crop",
    alt: "Amber Essence",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=300&h=300&fit=crop",
    alt: "Golden Musk",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=300&h=300&fit=crop",
    alt: "White Blossom",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=300&h=300&fit=crop",
    alt: "Dark Oud",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1547887538-047f814bfb64?w=300&h=300&fit=crop",
    alt: "Saffron Bloom",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=300&h=300&fit=crop",
    alt: "Rose Elixir",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=300&h=300&fit=crop",
    alt: "Pink Aura",
  },
];

interface ResponsiveValues {
  innerRingSize: number;
  outerRingSize: number;
  cardRadius: number;
  cardSize: string;
  ringStrokeWidth: number;
  arcStrokeWidth: number;
}

const getResponsiveValues = (vw: number): ResponsiveValues => {
  if (vw < 640) {
    // Mobile
    return {
      innerRingSize: 320,
      outerRingSize: 380,
      cardRadius: 120,
      cardSize: "w-12 h-12",
      ringStrokeWidth: 2,
      arcStrokeWidth: 3,
    };
  } else if (vw < 1024) {
    // Tablet
    return {
      innerRingSize: 450,
      outerRingSize: 520,
      cardRadius: 180,
      cardSize: "w-16 h-16",
      ringStrokeWidth: 2.5,
      arcStrokeWidth: 3.5,
    };
  } else {
    // Desktop
    return {
      innerRingSize: 520,
      outerRingSize: 600,
      cardRadius: 220,
      cardSize: "w-20 h-20",
      ringStrokeWidth: 3,
      arcStrokeWidth: 4,
    };
  }
};

export default function EmpoweringSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement | null>(null);
  const arcRef = useRef<SVGCircleElement | null>(null);
  const [values, setValues] = useState<ResponsiveValues>({
    innerRingSize: 520,
    outerRingSize: 600,
    cardRadius: 220,
    cardSize: "w-20 h-20",
    ringStrokeWidth: 3,
    arcStrokeWidth: 4,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const updateValues = () => {
      const vw = window.innerWidth;
      setValues(getResponsiveValues(vw));
    };

    // Initial calculation
    updateValues();

    // Listen for resize
    window.addEventListener("resize", updateValues);

    return () => {
      window.removeEventListener("resize", updateValues);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !isMounted) return;

    let tl: gsap.core.Timeline | null = null;
    const ARC_CIRCUMFERENCE = 2 * Math.PI * values.cardRadius;

    const ctx = gsap.context(() => {
      const total = users.length;

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1500",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Cards gradually expand
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * values.cardRadius;
        const y = Math.sin(angle) * values.cardRadius;

        if (i !== 0) {
          tl!.to(
            card,
            { scale: 1, opacity: 1, duration: 0.5, ease: "power1.out" },
            0,
          );
        }

        tl!.to(card, { x, y, duration: 3, ease: "none" }, 0);
      });

      // Pink arc draw
      if (arcRef.current) {
        tl.to(
          arcRef.current,
          {
            strokeDashoffset: ARC_CIRCUMFERENCE * 0.3,
            duration: 1.5,
            ease: "none",
          },
          0.5,
        );
      }

      // Text reveal
      if (textRef.current) {
        tl.to(
          textRef.current,
          { opacity: 1, y: 0, duration: 1, ease: "power1.out" },
          1,
        );
      }
    }, section);

    return () => {
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
  }, [isMounted, values]);

  const ARC_CIRCUMFERENCE = 2 * Math.PI * values.cardRadius;

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/woman2.jpeg')" }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 z-0 bg-[#0f0a08]/40" />

      {/* CONTENT - Properly centered */}
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        {/* INNER GOLD RING */}
        <div className="absolute">
          <svg
            width={values.innerRingSize}
            height={values.innerRingSize}
            className="overflow-visible"
          >
            <defs>
              <linearGradient
                id="goldGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#f0e4a8" />
                <stop offset="50%" stopColor="#d4b978" />
                <stop offset="100%" stopColor="#b8956a" />
              </linearGradient>

              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Outer subtle ring */}
            <circle
              cx={values.innerRingSize / 2}
              cy={values.innerRingSize / 2}
              r={values.cardRadius}
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth={values.ringStrokeWidth}
              opacity="0.6"
              filter="url(#glow)"
            />

            {/* Animated arc */}
            <circle
              ref={arcRef}
              cx={values.innerRingSize / 2}
              cy={values.innerRingSize / 2}
              r={values.cardRadius}
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth={values.arcStrokeWidth}
              strokeLinecap="round"
              strokeDasharray={ARC_CIRCUMFERENCE}
              strokeDashoffset={ARC_CIRCUMFERENCE}
              transform={`rotate(-90 ${values.innerRingSize / 2} ${values.innerRingSize / 2})`}
              filter="url(#glow)"
              style={{
                filter: "drop-shadow(0 0 8px rgba(212, 185, 120, 0.6))",
              }}
            />
          </svg>
        </div>

        {/* OUTER GOLD RING */}
        <div className="absolute">
          <svg
            width={values.outerRingSize}
            height={values.outerRingSize}
            className="overflow-visible"
          >
            <circle
              cx={values.outerRingSize / 2}
              cy={values.outerRingSize / 2}
              r={values.cardRadius + 50}
              fill="none"
              stroke="#d4b978"
              strokeWidth={values.ringStrokeWidth - 0.5}
              opacity="0.5"
              style={{
                filter: "drop-shadow(0 0 4px rgba(212, 185, 120, 0.4))",
              }}
            />
          </svg>
        </div>

        {/* PERFUME BOTTLE CARDS */}
        {users.map((user, index) => (
          <div
            key={user.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={`absolute ${values.cardSize} rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl will-change-transform`}
            style={
              index === 0 ? undefined : { opacity: 0, transform: "scale(0)" }
            }
          >
            <img
              src={user.src}
              alt={user.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}

        {/* CENTER TEXT */}
        <div
          ref={textRef}
          className="relative z-10 text-center px-4 max-w-[220px] sm:max-w-[300px] md:max-w-[360px]"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          <h2
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#f0e4a8] leading-[1.1] tracking-tight"
            style={{
              fontFamily: "var(--font-serif)",
              textShadow:
                "0 4px 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(212, 185, 120, 0.3)",
            }}
          >
            SCENT IS
            <br />
            <span className="italic text-[var(--color-header-font)]">
              MEMORY
            </span>
          </h2>

          <p
            className="font-body text-[#e8e0d5] mt-2 sm:mt-3 md:mt-4 leading-relaxed font-light tracking-wide"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              fontWeight: 400,
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.7)",
            }}
          >
            From royal oud to soft amber, Shawq crafts fragrances that speak
            your language.
          </p>
        </div>
      </div>
    </section>
  );
}
