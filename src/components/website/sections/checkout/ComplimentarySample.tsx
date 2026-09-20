'use client';

import { useState } from 'react';
import Image from 'next/image';

const SAMPLE_OPTIONS = [
  { id: 'sample-1', name: "Ain't That Sweet 2 mL Sample", price: 0, image: '/images/NB-01.jpg', description: 'Free' },
  { id: 'sample-2', name: 'Oud Royale Sample 2 mL',       price: 0, image: '/images/NB-02.jpg', description: 'Free' },
  { id: 'sample-3', name: 'Rose Afterglow Sample 2 mL',   price: 0, image: '/images/NB-03.jpg', description: 'Free' },
];

interface ComplimentarySampleProps {
  onAddSample: (sample: typeof SAMPLE_OPTIONS[0]) => void;
  addedSampleId: string | null; // derived from cart by the parent
}

export function ComplimentarySample({ onAddSample, addedSampleId }: ComplimentarySampleProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 🔒 LOCK STATE: a sample is in the cart => picker is disabled
  const isLocked = addedSampleId !== null;

  // When locked, force the view onto the sample that was actually added,
  // so the card always shows the user's chosen gift (not wherever the arrow stopped).
  const lockedIndex = isLocked ? SAMPLE_OPTIONS.findIndex((s) => s.id === addedSampleId) : -1;
  const effectiveIndex = lockedIndex >= 0 ? lockedIndex : selectedIndex;
  const currentSample = SAMPLE_OPTIONS[effectiveIndex];

  const isAdded = addedSampleId === currentSample.id;

  const handleAddSample = () => {
    if (isLocked) return;          // guard: never add a 2nd sample
    onAddSample(currentSample);
  };

  const handlePrevious = () => {
    if (isLocked) return;          // guard: no cycling while locked
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : SAMPLE_OPTIONS.length - 1));
  };

  const handleNext = () => {
    if (isLocked) return;          // guard: no cycling while locked
    setSelectedIndex((prev) => (prev < SAMPLE_OPTIONS.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="px-6 md:px-12 lg:px-24 py-8 border-b border-[#2A2520]/10">
      <div className="max-w-4xl mx-auto">
        <div
          className="flex items-start justify-between gap-8 p-6 bg-[#EFEAE0] border border-[#2A2520]/10"
          aria-disabled={isLocked}
        >
          <div className="flex-1">
            <h3 className="text-sm font-medium text-[#2A2520] mb-1">
              Complimentary Sample ({addedSampleId ? '1' : '0'}/1 selected)
            </h3>
            <p className="text-xs text-[#2A2520]/60 mb-4">(must add sample to order to apply)</p>

            <div className="flex items-center gap-4">
              <div className="w-20 h-24 bg-[#FAF7F2] relative flex-shrink-0">
                <Image src={currentSample.image} alt={currentSample.name} fill className="object-contain p-2" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#2A2520]">{currentSample.name}</p>
                <p className="text-xs text-[#2A2520]/60">{currentSample.description}</p>
              </div>
            </div>
          </div>

          {/* Add / Added button — disabled the instant a sample is locked in */}
          <button
            onClick={handleAddSample}
            disabled={isLocked}
            className={`px-6 py-3 text-xs uppercase tracking-wider transition-colors ${
              isLocked
                ? 'bg-green-600 text-white cursor-default'
                : 'bg-[#2A2520] text-[#FAF7F2] hover:bg-[#B8935A]'
            }`}
          >
            {isLocked ? '✓ Added' : '+ Add'}
          </button>
        </div>

        {/* Navigation arrows — muted + non-interactive while locked */}
        {SAMPLE_OPTIONS.length > 1 && (
          <div className={`flex justify-center gap-4 mt-4 transition-opacity ${isLocked ? 'opacity-40 pointer-events-none select-none' : ''}`}>
            <button
              onClick={handlePrevious}
              disabled={isLocked}
              className="p-2 hover:bg-[#2A2520]/5 rounded-full transition-colors text-[#2A2520]/60 hover:text-[#2A2520]"
              aria-label="Previous sample"
            >
              ←
            </button>

            <div className="flex items-center gap-2">
              {SAMPLE_OPTIONS.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    i === effectiveIndex ? 'bg-[#2A2520]' : 'bg-[#2A2520]/20'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={isLocked}
              className="p-2 hover:bg-[#2A2520]/5 rounded-full transition-colors text-[#2A2520]/60 hover:text-[#2A2520]"
              aria-label="Next sample"
            >
              →
            </button>
          </div>
        )}

        <p className="text-xs text-[#2A2520]/60 text-center mt-4">
          Sign in to your account to access your welcome gift at checkout
          <br />
          (new email subscribers only)
        </p>
      </div>
    </div>
  );
}