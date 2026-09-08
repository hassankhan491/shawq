"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function FounderStory() {
  return (
    <section className="relative bg-[#0d0c0a] py-36 px-6 lg:px-12 text-[#F5F0E8] overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">
          
          {/* Asymmetric Image Layout */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] w-full overflow-hidden border border-white/10"
            >
              <Image
                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop"
                alt="Founder of SHAWQ"
                fill
                className="object-cover grayscale contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0a] via-transparent to-transparent opacity-60" />
            </motion.div>

            {/* Floating Editorial Quote Box */}
            <div className="absolute -bottom-8 -right-6 hidden sm:block bg-[#C5A880] text-[#0d0c0a] p-8 max-w-[260px] shadow-2xl">
              <p className="font-serif text-xl italic leading-snug">
                "True luxury whispers; it never has to shout."
              </p>
              <span className="mt-4 block text-[9px] uppercase tracking-[0.3em] font-medium">
                — Master Perfumer
              </span>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-7 lg:pl-12">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A880]">
              The Origin & Heritage
            </span>
            
            <h2 className="mt-4 font-serif text-4xl italic text-[#F5F0E8] sm:text-5xl lg:text-6xl leading-[1.1]">
              From Karachi's Soul <br />
              <span className="not-italic font-decorative text-3xl sm:text-4xl tracking-wider text-[#C5A880] uppercase">
                To Global Mastery
              </span>
            </h2>

            <div className="mt-8 space-y-6 text-base leading-relaxed text-[#E8DED0]/70 font-light">
              <p>
                SHAWQ was founded on a singular obsession: unlocking the hidden dimensions of ancient Eastern perfumery through modern French extraction techniques. Growing up surrounded by the rich sensory tapestry of Karachi—rich resins, rare spices, and midnight-blooming jasmine—our vision was clear.
              </p>
              <p>
                We bypassed mass production in favor of absolute exclusivity. Each batch undergoes a rigorous 72-hour maceration process, ensuring deep evolution on the skin that develops uniquely with your body's chemistry.
              </p>
            </div>

            <div className="mt-12 flex items-center gap-6 border-t border-white/10 pt-8">
              <div>
                <p className="font-serif text-xl italic text-[#F5F0E8]">Fatima Hassan</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] mt-1">Founder & Creative Director</p>
              </div>
              <div className="ml-auto">
                <span className="font-decorative text-4xl text-white/20">MMXXVI</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}