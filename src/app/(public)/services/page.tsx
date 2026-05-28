import type { Metadata } from "next";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceDetailSection from "@/components/services/ServiceDetailSection";
import { SERVICES_FULL } from "@/lib/services-data";
import PricingCards from "@/components/services/PricingCards";
import FaqAccordion from "@/components/services/FaqAccordion";

// =============================================================================
// 📋 METADATA
// =============================================================================
export const metadata: Metadata = {
  title: "Services — Nirvana Tech Solutions",
  description:
    "Six disciplines, one obsession. Premium websites, marketing, SEO, e-commerce, software, and analytics — built with craft and intention.",
  openGraph: {
    title: "Services — Nirvana Tech Solutions",
    description: "Six disciplines that transform vision into reality.",
    type: "website",
  },
};

// =============================================================================
// 🛠️ SERVICES PAGE
// =============================================================================
export default function ServicesPage() {
  return (
    <main className="relative w-full overflow-x-hidden">
      {/* Hero */}
      <ServiceHero />

      {/* 6 Service Detail Sections */}
      {SERVICES_FULL.map((service, i) => (
        <ServiceDetailSection
          key={service.slug}
          service={service}
          index={i}
        />
      ))}

      {/* Pricing */}
<PricingCards />

{/* FAQ */}
<FaqAccordion />

{/* TODO: CtaSection */}
    </main>
  );
}