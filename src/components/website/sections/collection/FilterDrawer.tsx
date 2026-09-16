// src/components/website/sections/collection/FilterDrawer.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

export interface FilterState {
  scentFamily?: string[];
  collection?: string[];
  size?: string[];
}

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeFilters: FilterState;
  onFilterChange: (category: keyof FilterState, value: string[]) => void;
  onClearFilters: () => void;
}

const FILTER_OPTIONS = {
  scentFamily: [
    { id: "oud-woody", label: "Oud & Woody" },
    { id: "fresh-aquatic", label: "Fresh & Aquatic" },
    { id: "floral-romantic", label: "Floral & Romantic" },
    { id: "citrus-zesty", label: "Citrus & Zesty" },
  ],
  collection: [
    { id: "signature", label: "Signature" },
    { id: "new-arrivals", label: "New Arrivals" },
    { id: "best-sellers", label: "Best Sellers" },
    { id: "limited-edition", label: "Limited Edition" },
  ],
  size: [
    { id: "10ml", label: "10 ML" },
    { id: "50ml", label: "50 ML" },
    { id: "100ml", label: "100 ML" },
  ],
};

export default function FilterDrawer({
  isOpen,
  onClose,
  activeFilters,
  onFilterChange,
  onClearFilters,
}: FilterDrawerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    closeBtnRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  // GSAP Animations
  useEffect(() => {
    if (!drawerRef.current || !backdropRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isOpen) {
      if (prefersReducedMotion) {
        backdropRef.current.style.opacity = "1";
        drawerRef.current.style.transform = "translateX(0%)";
      } else {
        gsap.to(backdropRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" });
        gsap.fromTo(drawerRef.current, { x: "100%" }, { x: "0%", duration: 0.5, ease: "power3.out" });
      }
    } else {
      if (prefersReducedMotion) {
        backdropRef.current.style.opacity = "0";
        drawerRef.current.style.transform = "translateX(100%)";
      } else {
        gsap.to(backdropRef.current, { opacity: 0, duration: 0.25, ease: "power2.in" });
        gsap.to(drawerRef.current, { x: "100%", duration: 0.4, ease: "power2.in" });
      }
    }
  }, [isOpen]);

  const toggleFilter = (category: keyof FilterState, value: string) => {
    const current = activeFilters[category] || [];
    const newValue = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange(category, newValue as any);
  };

  const hasActiveFilters =
    (activeFilters.scentFamily?.length || 0) +
      (activeFilters.collection?.length || 0) +
      (activeFilters.size?.length || 0) >
    0;

  if (!isMounted) return null;

  return createPortal(
    <>
      {/* 
        THE FIX IS HERE: 
        We use `pointer-events-none` when closed so it doesn't block clicks.
        We use inline styles for opacity so GSAP can animate it smoothly.
      */}
      <div
        ref={backdropRef}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-[#2A2520]/30 backdrop-blur-[2px]"
        style={{ 
          pointerEvents: isOpen ? 'auto' : 'none', 
          opacity: 0 
        }}
        aria-hidden="true"
      />

      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Filter perfumes"
        className="fixed inset-y-0 right-0 z-50 flex w-full md:w-auto md:max-w-[400px] flex-col bg-[#FAF7F2] shadow-[-10px_0_40px_-10px_rgba(42,37,32,0.1)]"
        style={{ transform: "translateX(100%)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2A2520]/10 px-6 py-5">
          <h2 className="text-[11px] uppercase tracking-[0.28em] text-[#2A2520]">Filter</h2>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close filters"
            className="text-[#2A2520]/70 transition-colors hover:text-[#2A2520] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B8935A] rounded-sm p-1"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <FilterGroup title="Scent Family">
            {FILTER_OPTIONS.scentFamily.map((option) => (
              <CheckboxRow
                key={option.id}
                label={option.label}
                checked={activeFilters.scentFamily?.includes(option.id) || false}
                onChange={() => toggleFilter("scentFamily", option.id)}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Collection">
            {FILTER_OPTIONS.collection.map((option) => (
              <CheckboxRow
                key={option.id}
                label={option.label}
                checked={activeFilters.collection?.includes(option.id) || false}
                onChange={() => toggleFilter("collection", option.id)}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Size">
            <div className="flex flex-wrap gap-2">
              {FILTER_OPTIONS.size.map((option) => {
                const isActive = activeFilters.size?.includes(option.id) || false;
                return (
                  <button
                    key={option.id}
                    onClick={() => toggleFilter("size", option.id)}
                    className={`border px-5 py-3.5 text-[11px] uppercase tracking-[0.22em] transition-colors min-w-[80px] text-center ${
                      isActive
                        ? "border-[#2A2520] bg-[#2A2520] text-[#FAF7F2]"
                        : "border-[#2A2520]/15 text-[#2A2520]/70 hover:border-[#2A2520]/40"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </FilterGroup>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 border-t border-[#2A2520]/10 px-6 py-5 bg-[#FAF7F2]">
          <button
            onClick={() => { onClearFilters(); onClose(); }}
            disabled={!hasActiveFilters}
            className="text-[11px] uppercase tracking-[0.22em] text-[#2A2520]/60 transition-colors hover:text-[#2A2520] disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B8935A] rounded-sm"
          >
            Clear all
          </button>
          <button
            onClick={onClose}
            className="bg-[#2A2520] px-6 py-3 text-[11px] uppercase tracking-[0.28em] text-[#FAF7F2] transition-colors hover:bg-[#B8935A] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B8935A] rounded-sm"
          >
            Apply
          </button>
        </div>
      </aside>
    </>,
    document.body
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-[#2A2520]/10 py-6 first:pt-0 last:border-b-0">
      <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#2A2520]">{title}</p>
      <div className="flex flex-col gap-3.5">{children}</div>
    </div>
  );
}

function CheckboxRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 text-[13px] text-[#2A2520]/80 transition-colors hover:text-[#2A2520] group">
      <span>{label}</span>
      <span
        role="checkbox"
        aria-checked={checked}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); onChange(); } }}
        onClick={onChange}
        className={`flex h-4 w-4 items-center justify-center border transition-colors ${
          checked ? "border-[#2A2520] bg-[#2A2520]" : "border-[#2A2520]/25 group-hover:border-[#2A2520]/50"
        }`}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" stroke="#FAF7F2" strokeWidth="1.5">
            <path d="M1 4l2.5 2.5L9 1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
    </label>
  );
}