// src/components/website/sections/collection/EditorialTile.tsx

import Link from 'next/link';
import Image from 'next/image';

export default function EditorialTile() {
  return (
    <Link 
      href="/about" 
      className="group relative block w-full aspect-[4/5] overflow-hidden bg-[#EFEAE0]"
      aria-label="Read about The Art of Scent"
    >
      <Image
        src="/images/manifesto-desktop.jpeg"
        alt="The Art of Scent"
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#2A2520]/60 via-[#2A2520]/10 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-[#FAF7F2]">
        <span className="block text-[10px] uppercase tracking-[0.25em] opacity-80 mb-2">
          The House
        </span>
        <h3 className="font-serif text-xl md:text-2xl leading-tight mb-2">
          The Art of Scent
        </h3>
        <p className="text-xs md:text-sm opacity-90 leading-relaxed max-w-[200px]">
          Discover the world behind the fragrance.
        </p>
      </div>
    </Link>
  );
}