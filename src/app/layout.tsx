// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Shawq. - Luxury Perfumes",
  description: "Discover exquisite fragrances for every moment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Yahan suppressHydrationWarning add kiya hai */}
      <body className="antialiased" suppressHydrationWarning>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}