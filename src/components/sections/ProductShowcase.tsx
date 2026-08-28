'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: 'Oud Royale',
    price: '$189.00',
    description: 'A regal blend of aged oud wood, saffron, and amber. This luxurious fragrance embodies sophistication and timeless elegance.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=800&fit=crop',
    colors: ['#1a1a1a', '#8B4513', '#DAA520'],
    sizes: ['30ml', '50ml', '100ml'],
  },
  {
    id: 2,
    name: 'Amber Essence',
    price: '$165.00',
    description: 'Warm amber notes intertwined with vanilla and sandalwood. A captivating scent that leaves a lasting impression.',
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&h=800&fit=crop',
    colors: ['#F5E6D3', '#D4A574', '#8B7355'],
    sizes: ['30ml', '50ml', '100ml'],
  },
  {
    id: 3,
    name: 'Golden Musk',
    price: '$199.00',
    description: 'Pure gold-infused musk with hints of rose and patchouli. An opulent fragrance for the distinguished few.',
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&h=800&fit=crop',
    colors: ['#FFD700', '#C9A962', '#2F2F2F'],
    sizes: ['30ml', '50ml', '100ml'],
  },
];

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      productRefs.current.forEach((product) => {
        if (!product) return;

        const coloredImage = product.querySelector('.colored-image') as HTMLElement;
        const title = product.querySelector('.product-title');
        const price = product.querySelector('.product-price');
        const description = product.querySelector('.product-description');
        const options = product.querySelector('.product-options');
        const button = product.querySelector('.product-button');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: product,
            start: 'top top',
            end: '+=2000',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.to(
          coloredImage,
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.6,
            ease: 'none',
          },
          0
        );

        tl.fromTo(
          title,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' },
          0.2
        );

        tl.fromTo(
          price,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' },
          0.3
        );

        tl.fromTo(
          description,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' },
          0.4
        );

        tl.fromTo(
          options,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' },
          0.5
        );

        tl.fromTo(
          button,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' },
          0.6
        );
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white">
      {products.map((product, index) => (
        <div
          key={product.id}
          ref={(el) => {
            productRefs.current[index] = el;
          }}
          className="relative h-screen w-full overflow-hidden"
        >
          <div className="flex h-full w-full">
            {/* LEFT: Image with B&W to Color reveal */}
            <div className="relative w-full lg:w-1/2 h-full flex items-center justify-center p-8 lg:p-16">
              {/* ✅ Reduced max-width and added top margin to clear the header */}
              <div className="relative w-full max-w-[320px] lg:max-w-[400px] aspect-[3/4] overflow-hidden rounded-lg shadow-2xl mt-16 lg:mt-0">
                {/* B&W Image (bottom layer) */}
                <img
                  src={product.image}
                  alt={`${product.name} B&W`}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: 'grayscale(100%)' }}
                />
                
                {/* Colored Image (top layer, revealed via clip-path) */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="colored-image absolute inset-0 w-full h-full object-cover"
                  style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
                />
              </div>
            </div>

            {/* RIGHT: Product Details */}
            <div className="hidden lg:flex w-1/2 items-center justify-center px-16 xl:px-24">
              <div className="max-w-md">
                <h2
                  className="product-title text-5xl xl:text-6xl font-medium text-[#0f0a08] mb-4 leading-tight"
                  style={{ fontFamily: "'Fraunces', Georgia, serif", opacity: 0 }}
                >
                  {product.name}
                </h2>

                <p
                  className="product-price text-2xl text-[#c9a962] mb-8"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", opacity: 0 }}
                >
                  {product.price}
                </p>

                <p
                  className="product-description text-[#6b6b6b] text-base leading-relaxed mb-10"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", opacity: 0 }}
                >
                  {product.description}
                </p>

                <div className="product-options mb-10" style={{ opacity: 0 }}>
                  <div className="mb-6">
                    <span
                      className="text-xs uppercase tracking-[0.2em] text-[#8b8378] block mb-3"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Concentration
                    </span>
                    <div className="flex gap-3">
                      {product.colors.map((color, i) => (
                        <button
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-[#c9a962] hover:scale-110 transition-all duration-300"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <span
                      className="text-xs uppercase tracking-[0.2em] text-[#8b8378] block mb-3"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Volume
                    </span>
                    <div className="flex gap-3">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          className="px-5 py-2 border-2 border-[#c9a962]/30 text-[#c9a962] text-sm hover:bg-[#c9a962] hover:text-white transition-all duration-300"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  className="product-button w-full px-12 py-4 bg-[#0f0a08] text-white text-sm uppercase tracking-[0.2em] font-medium hover:bg-[#c9a962] transition-all duration-300"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", opacity: 0 }}
                >
                  Quick View
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}