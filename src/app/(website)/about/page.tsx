import type { Metadata } from 'next';
import { Bodoni_Moda } from 'next/font/google';
import ShawqAboutPage from '@/components/website/sections/about/ShawqAboutPage';

const editorial = Bodoni_Moda({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600'],
  variable: '--font-editorial',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'About',
  description:
    'SHAWQ is an independent, artist-founded fragrance house. Discover the philosophy, craft and world behind our extraits — scent as memory, identity and desire.',
};

export default function AboutPage() {
  return <ShawqAboutPage className={editorial.variable} />;
}