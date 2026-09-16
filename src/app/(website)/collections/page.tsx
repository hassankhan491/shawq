// src/app/(website)/collections/page.tsx
import type { Metadata } from 'next';
import CollectionClient from '../../../components/website/sections/collection/CollectionClient';

export const metadata: Metadata = {
  title: 'The Collection — SHAWQ',
  description: 'Explore the SHAWQ perfume collection. A curated selection of fragrances shaped by memory, identity, and presence.',
};

export default function CollectionsPage() {
  return (
    <main className="bg-[#FAF7F2] text-[#2A2520] antialiased min-h-screen">
      <CollectionClient />
    </main>
  );
}