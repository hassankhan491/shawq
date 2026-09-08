"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const processSteps = [
  {
    num: "01",
    title: "Rare Sourcing",
    description: "Ethically hand-harvested agarwood, damask rose, and ambergris from exclusive global reserves.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1000&auto=format&fit=crop",
    colSpan: "lg:col-span-8",
  },
  {
    num: "02",
    title: "Artisan Blending",
    description: "Crafted in hyper-limited micro-batches by master noses.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop",
    colSpan: "lg:col-span-4",
  },
  {
    num: "03",
    title: "72-Hour Maceration",
    description: "Extended botanical resting phases to achieve absolute molecular harmony and depth.",
    image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1000&auto=format&fit=crop",
    colSpan: "lg:col-span-4",
  },
  {
    num: "04",
    title: "Hand-Finished Flacons",
    description: "Encased in weighted glass and laser-engraved gold plates, sealing liquid art.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1920&auto=format&fit=crop",
    colSpan: "lg:col-span-8",
  },
];

export default function CraftsmanshipGrid() {
  return (
    <section className="bg-[#14120F] py-36 px-6 lg:px-12 text-[#F5F0E8] border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A880]">
              The Discipline
            </span>
            <h2 className="mt-3 font-decorative text-4xl uppercase tracking-wide text-[#F5F0E8] sm:text-5xl lg:text-6xl">
              Craftsmanship <br />
              <span className="text-[#C5A880] italic font-serif lowercase">without compromise</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#E8DED0]/60 font-light">
            We reject industrial shortcuts. Every bottle of SHAWQ represents weeks of meticulous patience and uncompromising dedication.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {processSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`relative group overflow-hidden border border-white/10 bg-[#0d0c0a] min-h-[420px] flex flex-col justify-end p-8 sm:p-12 ${step.colSpan}`}
            >
              {/* Background Image with Hover Zoom */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover grayscale contrast-125 transition-transform duration-1000 group-hover:scale-105 opacity-40 group-hover:opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0a] via-[#0d0c0a]/60 to-transparent" />
              </div>

              {/* Step Number Badge */}
              <div className="absolute top-8 left-8 z-10">
                <span className="font-decorative text-3xl font-light text-[#C5A880]/60">
                  {step.num}
                </span>
              </div>

              {/* Content Description */}
              <div className="relative z-10 max-w-lg">
                <h3 className="font-serif text-2xl sm:text-3xl italic text-[#F5F0E8] mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-[#E8DED0]/70 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-4 right-4 h-6 w-6 border-r border-t border-[#C5A880]/30 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}