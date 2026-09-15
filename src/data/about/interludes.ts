export interface ShawqInterlude {
  word: string;
  image: string;
  alt: string;
}

/* Fully independent from gallery.ts & journey.ts.
   Drop your own files into /public/images/about/ or paste any URLs here. */
export const shawqInterludes: ShawqInterlude[] = [
  {
    word: 'DESIRE',
    image: '/images/interlude-memory.jpeg',
    alt: 'Desire — SHAWQ campaign',
  },
  {
    word: 'MEMORY',
    image: '/images/interlude-desire.jpeg',
    alt: 'Memory — SHAWQ campaign',
  },
  {
    word: 'PRESENCE',
    image: '/images/neww banner.jpeg',
    alt: 'Presence — SHAWQ campaign',
  },
];