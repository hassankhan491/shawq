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
    image: '/images/Bergamot-Saffron.JPEG',
    alt: 'Bright citrus light on glass flacon',
  },
  {
    index: '02',
    title: 'THE HEART',
    notes: ['Rose', 'Iris'],
    description:
      'The body of the scent unfolds slowly — floral, powdery, intimate. This is where memory begins.',
    image: '/images/Rose-and-iris.JPEG',
    alt: 'Rose and iris petals in soft shadow',
  },
  {
    index: '03',
    title: 'THE TRACE',
    notes: ['Oud', 'Amber', 'Musk'],
    description:
      'What remains hours later — resinous, warm, unmistakable. The signature you leave behind.',
    image: '/images/Oud-Amber-Musk.JPEG',
    alt: 'Dark amber resin and smoke',
  },
];