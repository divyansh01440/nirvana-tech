import type { Metadata } from "next";
import HomeContent from "./HomeContent";

// =============================================================================
// 📋 METADATA
// =============================================================================


export const metadata: Metadata = {
  title: "Nirvana Tech Solutions — Web Agency in Jabalpur, India",
  description:
    "We build stunning websites, digital marketing campaigns, and growth systems for businesses in Jabalpur, Bhopal, and across India. Get a free consultation today.",
  alternates: {
    canonical: "https://nirvanatechsolution.xyz",
  },
  openGraph: {
    title: "Nirvana Tech Solutions — We Build Digital Experiences That Feel Alive",
    description:
      "Premium web agency in Jabalpur. Websites, SEO, digital marketing, and e-commerce that transform your business.",
    url: "https://nirvanatechsolution.xyz",
    images: [{ url: "https://res.cloudinary.com/dwenbr9ny/image/upload/q_auto/f_auto/v1780300861/Copilot_20260601_133035_xw6d4h.png", width: 1200, height: 630 }],
  },
};

// ... rest of your page component

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