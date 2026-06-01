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
  title: "Services — Web Design, SEO & Digital Marketing | Nirvana Tech",
  description:
    "Explore our services: website design, digital marketing, SEO optimization, e-commerce development, and software solutions. Serving businesses in Jabalpur and across India.",
  alternates: {
    canonical: "https://nirvanatechsolution.xyz/services",
  },
  openGraph: {
    title: "Services — Nirvana Tech Solutions",
    description:
      "Six expert services to grow your digital presence. Web design, SEO, marketing, e-commerce and more.",
    url: "https://nirvanatechsolution.xyz/services",
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