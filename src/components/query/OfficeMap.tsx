"use client";

// =============================================================================
// 🗺️ NIRVANA TECH — Office Map
// =============================================================================
// Stylized map section showing Jabalpur location.
// Uses OpenStreetMap embed (free, no API key required).
// =============================================================================

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import Link from "next/link";
import { useCursorStore } from "@/store/cursorStore";
import { CONTACT_INFO } from "@/lib/constants";

export default function OfficeMap() {
  const { setVariant, reset } = useCursorStore();
  const { lat, lng } = CONTACT_INFO.coordinates;

  // OpenStreetMap embed URL (free, no key needed)
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    lng - 0.05
  }%2C${lat - 0.03}%2C${lng + 0.05}%2C${lat + 0.03}&layer=mapnik&marker=${lat}%2C${lng}`;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <section className="relative w-full overflow-hidden py-20 sm:py-28 lg:py-36 border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-nirvana-gold/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ============== HEADER ============== */}
        <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-nirvana-gold/40" />
            <span className="text-xs font-mono text-nirvana-gold/80 uppercase tracking-[0.3em]">
              Find Us
            </span>
            <span className="w-8 h-px bg-nirvana-gold/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-nirvana-white leading-[1.1] mb-6"
          >
            Based in <span className="gradient-text">{CONTACT_INFO.address.city}</span>.{" "}
            <br className="hidden sm:block" />
            Serving the world.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-nirvana-gray-400"
          >
            Remote-first studio with the soul of {CONTACT_INFO.address.city}.
            Every project crafted with global standards.
          </motion.p>
        </div>

        {/* ============== MAP CARD ============== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative glass border border-white/10 rounded-3xl overflow-hidden">
            {/* Map */}
            <div className="relative aspect-[16/10] sm:aspect-[16/8] w-full">
              <iframe
                src={mapUrl}
                className="w-full h-full"
                style={{
                  filter: "invert(0.9) hue-rotate(180deg) saturate(0.5) brightness(0.9)",
                }}
                title={`Map of ${CONTACT_INFO.address.city}`}
                loading="lazy"
              />

              {/* Overlay gradient for premium feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-nirvana-black/40 via-transparent to-nirvana-black/20 pointer-events-none" />

              {/* Floating location card */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-xs">
                <div className="relative glass-strong border border-nirvana-gold/30 rounded-2xl p-5 backdrop-blur-2xl">
                  {/* Pulsing pin */}
                  <div className="absolute -top-2 -left-2">
                    <div className="relative">
                      <div className="absolute inset-0 bg-nirvana-gold/40 blur-md rounded-full animate-pulse" />
                      <div className="relative w-6 h-6 rounded-full bg-nirvana-gold flex items-center justify-center">
                        <MapPin size={12} className="text-nirvana-black" strokeWidth={3} />
                      </div>
                    </div>
                  </div>

                  <div className="text-xs font-mono text-nirvana-gold/70 uppercase tracking-widest mb-2">
                    Nirvana Tech HQ
                  </div>

                  <h3 className="text-lg font-heading font-bold text-nirvana-white mb-1">
                    {CONTACT_INFO.address.city}, {CONTACT_INFO.address.state}
                  </h3>

                  <p className="text-xs text-nirvana-gray-400 mb-4">
                    {CONTACT_INFO.address.country}
                  </p>

                  <Link
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setVariant("button")}
                    onMouseLeave={reset}
                    className="group inline-flex items-center gap-2 text-xs font-medium text-nirvana-gold hover:text-nirvana-gold-light transition-colors"
                  >
                    <Navigation size={12} />
                    Get directions
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Floating corner accents */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-nirvana-gold/40 rounded-tl-lg pointer-events-none" />
          <div className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-nirvana-gold/40 rounded-tr-lg pointer-events-none" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-nirvana-gold/40 rounded-bl-lg pointer-events-none" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-nirvana-gold/40 rounded-br-lg pointer-events-none" />
        </motion.div>

        {/* ============== GLOBAL REACH ============== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 sm:mt-16 text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-nirvana-gray-400">
            <span>🇮🇳 India</span>
            <span className="text-nirvana-gold/30">•</span>
            <span>🌐 Remote-first</span>
            <span className="text-nirvana-gold/30">•</span>
            <span>⏰ All timezones</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}