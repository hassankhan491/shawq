"use client";

import FadeIn from "@/components/ui/FadeIn";

const pressLogos = [
  { name: "VOGUE", width: 120 },
  { name: "Forbes", width: 100 },
  { name: "ELLE", width: 80 },
  { name: "HARPER'S BAZAAR", width: 180 },
  { name: "VOGUE", width: 120 },
  { name: "GQ", width: 60 },
];

export default function PressRecognition() {
  return (
    <section className="bg-[#F5F0E8] py-16 px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="mb-10 text-center text-[10px] uppercase tracking-[0.4em] text-[#0d0c0a]/50">
            As featured in
          </p>
        </FadeIn>

        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
          {pressLogos.map((logo, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="flex items-center justify-center">
                <span
                  className="font-decorative text-2xl font-light uppercase tracking-wider text-[#0d0c0a]/60"
                  style={{ width: logo.width }}
                >
                  {logo.name}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}