"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./globals.css";
import Preloader from "@/components/layout/Preloader";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // ✅ Official Lenis ↔ GSAP ScrollTrigger sync
    lenis.on("scroll", () => ScrollTrigger.update());

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <html lang="en">
      <body className="antialiased bg-white text-black" suppressHydrationWarning>
        <Preloader />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}