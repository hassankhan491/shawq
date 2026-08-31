
"use client";

import { useEffect, useRef } from "react";

export default function Footer() {
  const svgTextRef = useRef<SVGTextElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const svgElement = svgTextRef.current?.closest("svg");
      if (!svgElement) return;

      const svgRect = svgElement.getBoundingClientRect();

      const x = e.clientX - svgRect.left;
      const y = e.clientY - svgRect.top;

      // Convert to SVG coordinates
      const svgWidth = svgRect.width;
      const svgHeight = svgRect.height;

      const svgX = (x / svgWidth) * 800;
      const svgY = (y / svgHeight) * 320;

      // Update gradient position
      const gradient = svgElement.querySelector("#mouseGradient");

      if (gradient) {
        gradient.setAttribute("cx", String(svgX));
        gradient.setAttribute("cy", String(svgY));
      }
    };

    const svgElement = svgTextRef.current?.closest("svg");

    if (svgElement) {
      svgElement.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (svgElement) {
        svgElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const socialLinks = [
    {
      name: "Facebook",
      icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    },
    {
      name: "Instagram",
      icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    },
    {
      name: "Twitter",
      icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
    },
    {
      name: "TikTok",
      icon: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
    },
  ];

  const footerLinks = {
    about: [
      { name: "Our Story", href: "/about" },
      { name: "Craftsmanship", href: "/craftsmanship" },
      { name: "Ingredients", href: "/ingredients" },
      { name: "Sustainability", href: "/sustainability" },
    ],
    help: [
      { name: "FAQs", href: "/faq" },
      { name: "Shipping", href: "/shipping" },
      { name: "Returns", href: "/returns" },
      { name: "Track Order", href: "/track" },
    ],
    contact: [
      {
        name: "hello@shawq.com",
        href: "mailto:hello@shawq.com",
        icon: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
      },
      {
        name: "+971 50 123 4567",
        href: "tel:+971501234567",
        icon: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
      },
      {
        name: "Dubai, UAE",
        href: "/locations",
        icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
      },
    ],
  };

  return (
    <footer className="relative w-full bg-[#0a0a0a] overflow-hidden">
      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              

              <h3
                className="text-2xl font-display text-white"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                SHAWQ
              </h3>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Crafting luxurious fragrances that speak your language. From
              royal oud to soft amber, each scent tells a story.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="group relative w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-[#c9a962]/50 transition-all duration-300"
                  aria-label={social.name}
                >
                  <svg
                    className="w-4 h-4 text-gray-400 group-hover:text-[#c9a962] transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* About Us Column */}
          <div className="space-y-5">
            <h4 className="text-sm font-medium text-white uppercase tracking-widest">
              About Us
            </h4>

            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#c9a962] transition-colors duration-300 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Helpful Links Column */}
          <div className="space-y-5">
            <h4 className="text-sm font-medium text-white uppercase tracking-widest">
              Helpful Links
            </h4>

            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#c9a962] transition-colors duration-300 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us Column */}
          <div className="space-y-5">
            <h4 className="text-sm font-medium text-white uppercase tracking-widest">
              Contact Us
            </h4>

            <ul className="space-y-3">
              {footerLinks.contact.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#c9a962] transition-colors duration-300 group"
                  >
                    {link.icon && (
                      <svg
                        className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d={link.icon} />
                      </svg>
                    )}

                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ✅ SHAWQ Text - Responsive */}
<div className="relative w-full h-40 sm:h-64 lg:h-80 overflow-hidden">
  <svg
    viewBox="0 0 800 320"
    className="absolute inset-0 w-full h-full"
    preserveAspectRatio="xMidYMid meet"
  >
    <defs>
      {/* Mouse-following gradient */}
      <radialGradient id="mouseGradient" cx="400" cy="160" r="150" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f0e4a8" stopOpacity="1" />
        <stop offset="50%" stopColor="#c9a962" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#c9a962" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Horizontal dashed line */}
    <line
      x1="100"
      y1="160"
      x2="700"
      y2="160"
      stroke="rgba(201, 169, 98, 0.3)"
      strokeWidth="1"
      strokeDasharray="8,8"
    />

    {/* ✅ Base text - ab viewBox ke andar fit (620/800) */}
    <text
      ref={svgTextRef}
      x="400"
      y="220"
      textAnchor="middle"
      fontSize="150"
      fontFamily="'Fraunces', serif"
      fontWeight="bold"
      fill="none"
      stroke="rgba(201, 169, 98, 0.3)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ letterSpacing: "10px" }}
    >
      SHAWQ
    </text>

    {/* ✅ Glow overlay - same size taake align rahe */}
    <text
      x="400"
      y="220"
      textAnchor="middle"
      fontSize="150"
      fontFamily="'Fraunces', serif"
      fontWeight="bold"
      fill="none"
      stroke="url(#mouseGradient)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.8"
      style={{ letterSpacing: "10px" }}
    >
      SHAWQ
    </text>
  </svg>

  {/* Copyright overlay */}
  <div className="absolute bottom-4 right-6 lg:bottom-8 lg:right-12">
    <p className="text-xs text-gray-500">
      © 2026 Shawq. All rights reserved.
    </p>
  </div>
</div>

      {/* Copyright Bar */}
      <div className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <a
                href="/privacy"
                className="text-xs text-gray-500 hover:text-[#c9a962] transition-colors"
              >
                Privacy Policy
              </a>

              <a
                href="/terms"
                className="text-xs text-gray-500 hover:text-[#c9a962] transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
      
    </footer>
  );
}
