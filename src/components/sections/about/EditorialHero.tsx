"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function EditorialHero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0d0c0a] pt-32 pb-20">
      {/* Massive Background Split Typography */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none opacity-10">
        <span className="font-decorative text-[22vw] font-light uppercase tracking-tighter text-[#F5F0E8] leading-none">
          SHAWQ
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        {/* Top Centered Editorial Block matching reference composition */}
        <div className="relative flex flex-col items-center">
          
          {/* Giant Background Outline/Solid Text Layer */}
          <div className="absolute top-10 text-center w-full">
            <h2 className="font-decorative text-[11vw] font-light uppercase tracking-[0.1em] text-[#C5A880]/20 leading-none">
              LUXURY ESSENCE
            </h2>
          </div>

          {/* Central Layered Portrait Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 mt-16 h-[55vh] w-[70vw] max-w-[420px] overflow-hidden border border-[#C5A880]/30 shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
              alt="SHAWQ Fragrance Icon"
              fill
              className="object-cover grayscale contrast-125"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0a] via-transparent to-transparent opacity-80" />
            
            {/* Corner Decorative Frame Markers */}
            <div className="absolute top-3 left-3 h-4 w-4 border-l border-t border-[#C5A880]" />
            <div className="absolute top-3 right-3 h-4 w-4 border-r border-t border-[#C5A880]" />
            <div className="absolute bottom-3 left-3 h-4 w-4 border-l border-b border-[#C5A880]" />
            <div className="absolute bottom-3 right-3 h-4 w-4 border-r border-b border-[#C5A880]" />
          </motion.div>
        </div>

        {/* Editorial Manifesto Statement Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 mx-auto -mt-16 max-w-3xl bg-[#F5F0E8] p-10 md:p-16 text-center shadow-2xl"
        >
          <span className="text-[9px] uppercase tracking-[0.5em] text-[#0d0c0a]/50">
            LET'S GET REAL FOR A MINUTE...
          </span>
          
          <h1 className="mt-6 font-serif text-3xl italic leading-tight text-[#0d0c0a] sm:text-4xl lg:text-5xl">
            We craft rare compositions <br />
            <span className="not-italic font-decorative text-2xl sm:text-3xl uppercase tracking-widest text-[#9F8057] block mt-2">
              to leave an unforgettable mark
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[#0d0c0a]/70">
            At SHAWQ, fragrance is not merely worn—it is experienced. Every Extrait de Parfum 
            is a disciplined study in rare naturals, designed to speak before you enter the room.
          </p>

          <div className="mt-8 flex justify-center">
            <span className="h-px w-16 bg-[#C5A880]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}   