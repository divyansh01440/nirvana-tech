"use client";

// =============================================================================
// 📧 NIRVANA TECH — Contact Hero
// =============================================================================
// Top of the Query/Contact page. Inviting tone.
// =============================================================================

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import GradientOrbs from "@/components/home/GradientOrbs";

export default function ContactHero() {
  return (
    <section className="relative w-full overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <GradientOrbs />
      </div>

      {/* Fade overlays */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-nirvana-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-nirvana-black to-transparent z-10 pointer-events-none" />

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-emerald-500/20 mb-8"
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
            <span className="relative rounded-full w-2 h-2 bg-emerald-400" />
          </span>
          <span className="text-xs sm:text-sm text-emerald-300 font-medium">
            Available for new projects • 24h response time
          </span>
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-3 mb-6"
        >
          <span className="w-8 sm:w-12 h-px bg-nirvana-gold/40" />
          <span className="text-[10px] sm:text-xs font-mono text-nirvana-gold/80 uppercase tracking-[0.3em] sm:tracking-[0.4em]">
            ✦ Let&apos;s Talk ✦
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
          Tell us about{" "}
          <span className="gradient-text">your project</span>.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-nirvana-gray-300 max-w-2xl mx-auto leading-relaxed mb-8"
        >
          Whether you have a clear brief or just a wild idea — we&apos;d love
          to hear it. Fill out the form below and we&apos;ll respond within
          24 hours.
        </motion.p>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm"
        >
          <div className="inline-flex items-center gap-2 text-nirvana-gray-400">
            <Sparkles size={14} className="text-nirvana-gold" />
            <span>Free 30-min discovery call</span>
          </div>
          <div className="inline-flex items-center gap-2 text-nirvana-gray-400">
            <Sparkles size={14} className="text-nirvana-gold" />
            <span>Detailed quote within 48h</span>
          </div>
          <div className="inline-flex items-center gap-2 text-nirvana-gray-400">
            <Sparkles size={14} className="text-nirvana-gold" />
            <span>No-pressure consultation</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}