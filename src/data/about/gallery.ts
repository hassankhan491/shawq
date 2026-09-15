export interface ShawqGalleryItem {
  index: string;
  title: string;
  note: string;
  image: string;
  alt: string;
}

/* Replace `image` URLs with /images/shawq/about/gallery-0X.webp later. */
export const shawqGalleryItems: ShawqGalleryItem[] = [
  {
    index: '01',
    title: 'ORIGIN',
    note: 'Aged oud, Taif rose, first maceration',
    image: '/images/iris.jpg',
    alt: 'Amber perfume bottle in low light',
  },
  {
    index: '02',
    title: 'DESIRE',
    note: 'Saffron heat over damask petals',
    image: '/images/bergamot.jpg',
    alt: 'Dark rose petals in shadow',
  },
  {
    index: '03',
    title: 'MEMORY',
    note: 'Amber resin, warm skin, quiet rooms',
    image: '/images/musk.jpg',
    alt: 'Golden fragrance liquid close-up',
  },
  {
    index: '04',
    title: 'AFTERGLOW',
    note: 'Vanilla smoke lingering at dusk',
    image: '/images/rose.jpg',
    alt: 'Minimal perfume flacon on pale stone',
  },
  {
    index: '05',
    title: 'PRESENCE',
    note: 'The trace left when you leave',
    image: '/images/oud.jpg',
    alt: 'Sculptural dark glass fragrance bottle',
  },
];