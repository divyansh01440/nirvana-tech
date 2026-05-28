"use client";

// =============================================================================
// 🛠️ NIRVANA TECH — Services Hero
// =============================================================================
// Top of the Services page. Subtle, lighter than home hero.
// =============================================================================

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { useCursorStore } from "@/store/cursorStore";
import GradientOrbs from "@/components/home/GradientOrbs";

export default function ServiceHero() {
  const { setVariant, reset } = useCursorStore();

  return (
    <section className="relative w-full overflow-hidden min-h-[70vh] flex items-center justify-center pt-32 pb-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <GradientOrbs />
      </div>

      {/* Top fade for navbar legibility */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-nirvana-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-nirvana-black to-transparent z-10 pointer-events-none" />

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <span className="w-8 sm:w-12 h-px bg-nirvana-gold/40" />
          <span className="text-[10px] sm:text-xs font-mono text-nirvana-gold/80 uppercase tracking-[0.3em] sm:tracking-[0.4em]">
            Services
          </span>
          <span className="w-8 sm:w-12 h-px bg-nirvana-gold/40" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-nirvana-white leading-[1.05] tracking-tight mb-6"
        >
          Six disciplines.{" "}
          <span className="gradient-text">One obsession</span>.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-nirvana-gray-300 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          From the first wireframe to the final deploy — and every pixel,
          query, and conversion in between.
        </motion.p>

        {/* Quick service links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-14"
        >
          {[
            "Website Builder",
            "Digital Marketing",
            "SEO",
            "E-Commerce",
            "Software",
            "Analytics",
          ].map((service, i) => (
            <Link
              key={service}
              href={`#service-${i + 1}`}
              onMouseEnter={() => setVariant("hover")}
              onMouseLeave={reset}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-white/10 text-xs sm:text-sm text-nirvana-gray-300 hover:border-nirvana-gold/40 hover:text-nirvana-gold transition-all"
            >
              {service}
            </Link>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="inline-flex items-center gap-2 text-xs font-mono text-nirvana-gold/60 uppercase tracking-widest"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={14} />
          </motion.div>
          Explore each service
        </motion.div>
      </div>
    </section>
  );
}