"use client";
import { motion, Variants } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";

// Fix: Explicitly type variants and cast ease as tuple
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      delay: 0.4 + i * 0.1,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function HouseIntro() {
  return (
    <section className="bg-[#F5F0E8] px-6 py-28 sm:px-12 lg:px-24">
      <div className="grid gap-12 lg:grid-cols-12">
        <FadeIn className="lg:col-span-5">
          <h2 className="font-serif text-5xl leading-[1.05] text-[#161310] sm:text-6xl">
            distilled
            <br />
            in karachi
          </h2>
          <div className="mt-8 h-px w-24 bg-[#9F8057]" />
        </FadeIn>

        <div className="space-y-6 text-sm leading-[1.9] text-[#161310]/65 lg:col-span-6 lg:col-start-7">
          <FadeIn delay={0.1}>
            <p>
              SHAWQ is a fragrance house dedicated to creating refined, emotional
              and enduring scents. With roots in the olfactory heritage of the
              East, each composition reflects the clarity, balance and
              craftsmanship that define our atelier — setting new standards for
              perfumery born in Pakistan.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p>
              SHAWQ maintains one of the region&apos;s most private oil libraries —
              aged ouds, rose attars and rare musks — and composes every
              fragrance from first maceration to final flacon. It is recognised
              for one clear vision: to lead the future of Eastern luxury
              perfumery.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}