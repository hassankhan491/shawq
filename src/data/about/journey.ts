export interface ShawqJourneyStage {
  index: string;
  title: string;
  notes: string[];
  description: string;
  image: string;
  alt: string;
}

/* Replace `image` URLs with real SHAWQ assets later. */
export const shawqJourneyStages: ShawqJourneyStage[] = [
  {
    index: '01',
    title: 'THE OPENING',
    notes: ['Bergamot', 'Saffron'],
    description:
      'The first breath — bright, spiced, immediate. A flash of light before the room settles.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1800&auto=format&fit=crop',
    alt: 'Bright citrus light on glass flacon',
  },
  {
    index: '02',
    title: 'THE HEART',
    notes: ['Rose', 'Iris'],
    description:
      'The body of the scent unfolds slowly — floral, powdery, intimate. This is where memory begins.',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1800&auto=format&fit=crop',
    alt: 'Rose and iris petals in soft shadow',
  },
  {
    index: '03',
    title: 'THE TRACE',
    notes: ['Oud', 'Amber', 'Musk'],
    description:
      'What remains hours later — resinous, warm, unmistakable. The signature you leave behind.',
    image: 'https://images.unsplash.com/photo-1595425970377-c97339096c4b?q=80&w=1800&auto=format&fit=crop',
    alt: 'Dark amber resin and smoke',
  },
];