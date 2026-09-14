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
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1600&auto=format&fit=crop',
    alt: 'Amber perfume bottle in low light',
  },
  {
    index: '02',
    title: 'DESIRE',
    note: 'Saffron heat over damask petals',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1600&auto=format&fit=crop',
    alt: 'Dark rose petals in shadow',
  },
  {
    index: '03',
    title: 'MEMORY',
    note: 'Amber resin, warm skin, quiet rooms',
    image: 'https://images.unsplash.com/photo-1615634260777-4c0e6a956717?q=80&w=1600&auto=format&fit=crop',
    alt: 'Golden fragrance liquid close-up',
  },
  {
    index: '04',
    title: 'AFTERGLOW',
    note: 'Vanilla smoke lingering at dusk',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1600&auto=format&fit=crop',
    alt: 'Minimal perfume flacon on pale stone',
  },
  {
    index: '05',
    title: 'PRESENCE',
    note: 'The trace left when you leave',
    image: 'https://images.unsplash.com/photo-1595425970377-c97339096c4b?q=80&w=1600&auto=format&fit=crop',
    alt: 'Sculptural dark glass fragrance bottle',
  },
];