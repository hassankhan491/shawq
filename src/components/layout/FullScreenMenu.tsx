// src/components/layout/FullScreenMenu.tsx
'use client';

import React from 'react';
import Link from 'next/link';

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// Menu Sections Data
const menuSections = [
  {
    title: 'Shop',
    links: [
      { name: 'All Perfumes', href: '/products' },
      { name: 'New Arrivals', href: '/products?filter=new' },
      { name: 'Best Sellers', href: '/products?filter=bestsellers' },
      { name: 'Limited Edition', href: '/products?filter=limited' },
    ]
  },
  {
    title: 'Categories',
    links: [
      { name: 'Oud & Woody', href: '/categories/oud-woody' },
      { name: 'Fresh & Aquatic', href: '/categories/fresh-aquatic' },
      { name: 'Floral & Romantic', href: '/categories/floral-romantic' },
      { name: 'Citrus & Zesty', href: '/categories/citrus-zesty' },
    ]
  },
  {
    title: 'Collections',
    links: [
      { name: 'Signature Scents', href: '/collections/signature' },
      { name: 'Evening Elegance', href: '/collections/evening' },
      { name: 'Daily Fresh', href: '/collections/daily' },
      { name: 'Gift Sets', href: '/collections/gifts' },
    ]
  },
  {
    title: 'About',
    links: [
      { name: 'Our Story', href: '/about' },
      { name: 'Craftsmanship', href: '/about/craftsmanship' },
      { name: 'Ingredients', href: '/about/ingredients' },
      { name: 'Contact', href: '/contact' },
    ]
  }
];

export default function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Menu Content */}
      <div className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full flex flex-col bg-white">
          
          {/* Close Button */}
          <div className="flex justify-end p-6 lg:p-12">
            <button 
              onClick={onClose}
              className="text-4xl text-black hover:opacity-70 transition-opacity"
            >
              ×
            </button>
          </div>

          {/* Menu Sections */}
          <div className="flex-1 overflow-y-auto px-6 lg:px-12 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-7xl mx-auto">
              {menuSections.map((section, index) => (
                <div 
                  key={section.title}
                  className="space-y-4"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <h3 className="font-serif text-xl font-medium text-black border-b border-gray-200 pb-2">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link 
                          href={link.href}
                          onClick={onClose}
                          className="text-gray-600 hover:text-black transition-colors text-sm tracking-wide block py-1"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Info */}
          <div className="border-t border-gray-100 p-6 lg:p-12 bg-gray-50">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="font-serif text-2xl text-gray-800">Shawq.</p>
              <div className="flex gap-6 text-sm text-gray-600">
                <Link href="/policies/privacy" className="hover:text-black transition-colors">Privacy</Link>
                <Link href="/policies/terms" className="hover:text-black transition-colors">Terms</Link>
                <Link href="/contact" className="hover:text-black transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}