// src/components/layout/Header.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import FullScreenMenu from "./FullScreenMenu";

// Premium Icons - Refined SVGs
const MenuIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="w-5 h-5"
  >
    <path
      d="M3 12h18M3 6h18M3 18h18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const CartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    className="w-5 h-5"
  >
    <path
      d="M16 11V7a4 4 0 10-8 0v4M5 9h14l1 12H4L5 9z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WishlistIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    className="w-5 h-5"
  >
    <path
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    className="w-5 h-5"
  >
    <circle
      cx="11"
      cy="11"
      r="8"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M21 21l-4.35-4.35"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const AccountIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    className="w-5 h-5"
  >
    <path
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount] = useState(2);

  // Header will shrink after approximately the hero section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 850);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out">
        {/* Container - full width at top, boxed when scrolled */}
        <div
          className={`transition-all duration-500 ease-out ${
            isScrolled
              ? "max-w-6xl mx-auto mt-4 px-6 rounded-2xl border border-[#c9a962]/30 bg-[#0f0a08]/90 backdrop-blur-md"
              : "px-6 lg:px-12 bg-transparent"
          }`}
        >
          {/* 3-COLUMN GRID - logo always perfectly centered */}
          <div
            className={`grid grid-cols-[1fr_auto_1fr] items-center ${
              isScrolled ? "py-3" : "py-5 lg:py-6"
            }`}
          >
            {/* Left - Menu Button */}
            <div className="justify-self-start">
              <button
                onClick={() => setIsMenuOpen(true)}
                className={`flex items-center gap-3 group transition-all duration-300 ${
                  isScrolled ? "text-[#c9a962]" : "text-white"
                } hover:opacity-80`}
                aria-label="Open menu"
              >
                <span className="font-medium text-xs tracking-[0.2em] uppercase hidden sm:block">
                  Menu
                </span>

                <span className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                  <MenuIcon />
                </span>
              </button>
            </div>

            {/* Center - Logo */}
            <Link
              href="/"
              className="justify-self-center"
              aria-label="Shawq Home"
            >
              <h1
                className={`font-serif font-medium tracking-wide leading-none transition-all duration-500 ${
                  isScrolled
                    ? "text-2xl text-[#c9a962]"
                    : "text-[50px] text-white"
                }`}
              >
                SHAWQ
              </h1>
            </Link>

            {/* Right - Icons */}
            <div className="justify-self-end flex items-center gap-2 sm:gap-3 lg:gap-4">
              {/* Search */}
              <button
                className={`hidden md:flex p-2 rounded-full transition-all duration-300 ${
                  isScrolled
                    ? "text-[#c9a962] hover:bg-[#c9a962]/10"
                    : "text-white hover:bg-white/10"
                }`}
                aria-label="Search"
              >
                <SearchIcon />
              </button>

              {/* Account */}
              <button
                className={`hidden sm:flex p-2 rounded-full transition-all duration-300 ${
                  isScrolled
                    ? "text-[#c9a962] hover:bg-[#c9a962]/10"
                    : "text-white hover:bg-white/10"
                }`}
                aria-label="Account"
              >
                <AccountIcon />
              </button>

              {/* Wishlist */}
              <button
                className={`p-2 rounded-full transition-all duration-300 ${
                  isScrolled
                    ? "text-[#c9a962] hover:bg-[#c9a962]/10"
                    : "text-white hover:bg-white/10"
                }`}
                aria-label="Wishlist"
              >
                <WishlistIcon />
              </button>

              {/* Cart */}
              <button
                className={`relative p-2 rounded-full transition-all duration-300 ${
                  isScrolled
                    ? "text-[#c9a962] hover:bg-[#c9a962]/10"
                    : "text-white hover:bg-white/10"
                }`}
                aria-label="Shopping cart"
              >
                <CartIcon />

                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#c9a962] text-[#0f0a08] text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <FullScreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}