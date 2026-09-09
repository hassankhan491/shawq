// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/SmoothScroll"; // Import the new component

export const metadata: Metadata = {
  title: "SHAWQ Fragrance House",
  description: "Find the scent that becomes you",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {/* suppressHydrationWarning prevents errors if Lenis adds attributes before React hydrates */}
      <body className="antialiased bg-black text-white" suppressHydrationWarning>
        <SmoothScroll>
          <Header />
          <main key="main-content" className="min-h-screen">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}