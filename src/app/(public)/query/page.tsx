import type { Metadata } from "next";
import ContactHero from "@/components/query/ContactHero";
import ContactForm from "@/components/query/ContactForm";
import ContactInfo from "@/components/query/ContactInfo";
import OfficeMap from "@/components/query/OfficeMap";

// =============================================================================
// 📋 METADATA
// =============================================================================
export const metadata: Metadata = {
  title: "Get in Touch — Nirvana Tech Solutions",
  description:
    "Tell us about your project. We respond within 24 hours. Free discovery call, transparent pricing, no pressure.",
  openGraph: {
    title: "Get in Touch — Nirvana Tech Solutions",
    description: "Start the conversation. We're listening.",
    type: "website",
  },
};

// =============================================================================
// 📧 QUERY PAGE
// =============================================================================
export default function QueryPage() {
  return (
    <main className="relative w-full overflow-x-hidden">
      {/* Hero */}
      <ContactHero />

      {/* Form + Info two-column section */}
      <section className="relative w-full py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Form takes 2/3 on desktop */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Info sidebar takes 1/3 */}
            <div className="lg:col-span-1">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <OfficeMap />
    </main>
  );
}