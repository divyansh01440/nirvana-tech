import type { Metadata } from "next";
import HomeContent from "./HomeContent";

// =============================================================================
// 📋 METADATA
// =============================================================================
export const metadata: Metadata = {
  title: "Nirvana Tech Solutions — We Build Digital Experiences That Feel Alive",
  description:
    "Nirvana Tech Solutions creates futuristic websites, digital systems, and growth experiences for modern businesses. Based in India, serving the world.",
  openGraph: {
    title: "Nirvana Tech Solutions — We Build Digital Experiences That Feel Alive",
    description:
      "Premium creative agency crafting websites, software, and growth systems.",
    type: "website",
    locale: "en_US",
    siteName: "Nirvana Tech Solutions",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nirvana Tech Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nirvana Tech Solutions",
    description: "We build digital experiences that feel alive.",
  },
  alternates: {
    canonical: "/",
  },
};

// =============================================================================
// 🏠 HOME PAGE (server component for metadata)
// =============================================================================
export default function HomePage() {
  return (
    <main className="relative w-full overflow-x-hidden">
      <HomeContent />
    </main>
  );
}