// src/components/website/sections/product/FragranceNotes.tsx
'use client';

interface FragranceNotesProps {
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
}

export function FragranceNotes({ notes }: FragranceNotesProps) {
  return (
    <div className="mt-12 pt-12 border-t border-[#2A2520]/10">
      <h3 className="text-xs uppercase tracking-[0.3em] text-[#2A2520] mb-8">
        Fragrance Notes
      </h3>
      <div className="grid grid-cols-3 gap-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#2A2520]/60 mb-3">
            Top Notes
          </p>
          <ul className="space-y-1">
            {notes.top.map((note) => (
              <li key={note} className="text-sm text-[#2A2520]">
                {note}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#2A2520]/60 mb-3">
            Heart Notes
          </p>
          <ul className="space-y-1">
            {notes.heart.map((note) => (
              <li key={note} className="text-sm text-[#2A2520]">
                {note}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#2A2520]/60 mb-3">
            Base Notes
          </p>
          <ul className="space-y-1">
            {notes.base.map((note) => (
              <li key={note} className="text-sm text-[#2A2520]">
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}