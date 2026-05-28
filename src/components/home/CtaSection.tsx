"use client";

// =============================================================================
// 🚀 NIRVANA TECH — Final CTA Section
// =============================================================================
// Section 08 — the climax of the home page.
// Cinematic "Let's build something extraordinary" closer.
// =============================================================================

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowUpRight, Calendar, Mail } from "lucide-react";
import { useCursorStore } from "@/store/cursorStore";
import { CONTACT_INFO } from "@/lib/constants";

// =============================================================================
// 🚀 MAIN COMPONENT
// =============================================================================
export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { setVariant, reset } = useCursorStore();

  // Spotlight effect that follows cursor
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const spotlightX = useTransform(mouseX, (val) => `${val}%`);
  const spotlightY = useTransform(mouseY, (val) => `${val}%`);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden py-20 sm:py-32 lg:py-40 min-h-[80vh] flex items-center justify-center"
    >
      {/* ============== TOP GRADIENT DIVIDER ============== */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-nirvana-gold/40 to-transparent" />
      </div>

      {/* ============== ANIMATED AURORA BACKGROUND ============== */}
      <div className="absolute inset-0 bg-aurora opacity-50" />

      {/* ============== MOUSE-FOLLOWING SPOTLIGHT ============== */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) =>
              `radial-gradient(600px circle at ${x} ${y}, rgba(212, 175, 55, 0.15), transparent 60%)`
          ),
        }}
      />

      {/* ============== HUGE FADED "NIRVANA" WATERMARK ============== */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="select-none font-heading font-bold tracking-tighter leading-none whitespace-nowrap text-center"
          style={{
            fontSize: "clamp(120px, 28vw, 400px)",
            background:
              "linear-gradient(180deg, rgba(212,175,55,0.05) 0%, rgba(212,175,55,0) 80%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          NIRVANA
        </motion.h2>
      </div>

      {/* ============== FLOATING ORBS ============== */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-1/4 w-[400px] h-[400px] rounded-full bg-nirvana-gold/15 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -80, 40, 0],
          y: [0, 60, -40, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-1/4 w-[400px] h-[400px] rounded-full bg-nirvana-blue/15 blur-[120px] pointer-events-none"
      />

      {/* ============== GRID OVERLAY ============== */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* ============== CONTENT ============== */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <span className="w-8 sm:w-12 h-px bg-nirvana-gold/40" />
          <span className="text-xs font-mono text-nirvana-gold/80 uppercase tracking-[0.3em] sm:tracking-[0.4em]">
            ✦ Ready to Build? ✦
          </span>
          <span className="w-8 sm:w-12 h-px bg-nirvana-gold/40" />
        </motion.div>

        {/* Main headline — multi-line with clip-path reveal */}
        <div className="space-y-3 mb-8 sm:mb-10">
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-nirvana-white leading-[1.05] tracking-tight">
              Let&apos;s build something
            </h2>
          </motion.div>
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-[1.05] tracking-tight">
              <span
                className="gradient-text"
                style={{ filter: "drop-shadow(0 0 40px rgba(212, 175, 55, 0.5))" }}
              >
                extraordinary
              </span>
              <span className="text-nirvana-gold">.</span>
            </h2>
          </motion.div>
        </div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.85, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-base sm:text-lg md:text-xl text-nirvana-gray-300 max-w-2xl mx-auto leading-relaxed mb-12 sm:mb-14"
        >
          Tell us about your project. We respond within 24 hours.
          <br className="hidden sm:block" />
          Limited slots available for Q1 2026.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 sm:mb-16"
        >
          {/* Primary: Start a Project */}
          <Link
            href="/query"
            data-magnetic="true"
            onMouseEnter={() => setVariant("button")}
            onMouseLeave={reset}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 sm:py-5 rounded-full overflow-hidden bg-gradient-to-r from-nirvana-gold via-nirvana-gold-light to-nirvana-blue text-nirvana-black text-base sm:text-lg font-semibold transition-all duration-300 hover:shadow-[0_0_50px_rgba(212,175,55,0.7)]"
          >
            <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-[200%] transition-transform duration-700" />
            <span className="relative z-10">Start a Project</span>
            <ArrowUpRight
              size={20}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>

          {/* Secondary: Schedule a Call */}
          <Link
            href={`mailto:${CONTACT_INFO.email}?subject=Let's%20talk%20about%20a%20project`}
            data-magnetic="true"
            onMouseEnter={() => setVariant("hover")}
            onMouseLeave={reset}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 sm:py-5 rounded-full overflow-hidden glass border border-white/15 text-nirvana-white text-base sm:text-lg font-medium transition-all duration-300 hover:border-nirvana-gold/50 hover:bg-nirvana-gold/5"
          >
            <Calendar size={20} className="relative z-10" />
            <span className="relative z-10">Schedule a Call</span>
          </Link>
        </motion.div>

        {/* Quick contact info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-8 border-t border-white/5"
        >
          <Link
            href={`mailto:${CONTACT_INFO.email}`}
            onMouseEnter={() => setVariant("hover")}
            onMouseLeave={reset}
            className="group inline-flex items-center gap-2 text-sm text-nirvana-gray-400 hover:text-nirvana-gold transition-colors"
          >
            <Mail size={14} className="text-nirvana-gold" />
            <span>{CONTACT_INFO.email}</span>
          </Link>

          <div className="hidden sm:block w-px h-4 bg-white/10" />

          <div className="inline-flex items-center gap-2 text-sm text-nirvana-gray-400">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
              <span className="relative rounded-full w-2 h-2 bg-emerald-400" />
            </span>
            <span>Available now — based in {CONTACT_INFO.address.city}, India</span>
          </div>
        </motion.div>
      </div>

      {/* ============== DECORATIVE CORNER BRACKETS ============== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute top-12 left-8 w-8 h-8 border-l-2 border-t-2 border-nirvana-gold/30 hidden md:block"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute top-12 right-8 w-8 h-8 border-r-2 border-t-2 border-nirvana-gold/30 hidden md:block"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute bottom-12 left-8 w-8 h-8 border-l-2 border-b-2 border-nirvana-gold/30 hidden md:block"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute bottom-12 right-8 w-8 h-8 border-r-2 border-b-2 border-nirvana-gold/30 hidden md:block"
      />
    </section>
  );
}