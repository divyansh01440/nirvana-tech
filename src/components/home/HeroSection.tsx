"use client";

// =============================================================================
// 🌟 NIRVANA TECH — Hero Section (Clean Version)
// =============================================================================
// Centerpiece hero with subtle gradient orbs background.
// No 3D — lighter, faster, text-first design.
// =============================================================================

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Mouse } from "lucide-react";
import { useCursorStore } from "@/store/cursorStore";
import { STATS } from "@/lib/constants";
import GradientOrbs from "./GradientOrbs";

// Particle field still in (very subtle, behind everything)
const ParticleField = dynamic(
  () => import("@/components/three/ParticleField"),
  { ssr: false, loading: () => null }
);

// =============================================================================
// 🌟 MAIN HERO SECTION
// =============================================================================
export default function HeroSection() {
  const { setVariant, reset } = useCursorStore();

  const headlineWords = ["We", "Build", "Digital", "Experiences", "That", "Feel"];

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* ============== LAYER 1: GRADIENT ORBS (background) ============== */}
      <div className="absolute inset-0 z-0">
        <GradientOrbs />
      </div>

      {/* ============== LAYER 2: PARTICLE FIELD (subtle) ============== */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <ParticleField />
      </div>

      {/* ============== LAYER 3: GRADIENT OVERLAYS ============== */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-nirvana-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-nirvana-black via-nirvana-black/60 to-transparent z-10 pointer-events-none" />

      {/* ============== LAYER 4: MAIN CONTENT ============== */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40 text-center">
        {/* ========= EYEBROW BADGE ========= */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <span className="w-8 sm:w-12 h-px bg-nirvana-gold/40" />
          <span className="text-[10px] sm:text-xs font-mono text-nirvana-gold/80 uppercase tracking-[0.3em] sm:tracking-[0.4em]">
            ✦ Nirvana Tech Solutions ✦
          </span>
          <span className="w-8 sm:w-12 h-px bg-nirvana-gold/40" />
        </motion.div>

        {/* ========= MAIN HEADLINE ========= */}
        <h1 className="font-heading font-bold text-[40px] leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-nirvana-white mb-8 max-w-5xl mx-auto">
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, rotateX: -45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block mx-1 sm:mx-2 hover:text-nirvana-gold transition-colors duration-300 cursor-default"
              style={{ transformOrigin: "center bottom" }}
            >
              {word}
            </motion.span>
          ))}{" "}
          <motion.span
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.4 + headlineWords.length * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block relative"
          >
            <span
              className="gradient-text"
              style={{
                filter: "drop-shadow(0 0 30px rgba(212, 175, 55, 0.4))",
              }}
            >
              Alive
            </span>
            <span className="text-nirvana-gold">.</span>
          </motion.span>
        </h1>

        {/* ========= SUB-HEADLINE ========= */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-base sm:text-lg md:text-xl text-nirvana-gray-300 max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-12"
        >
          Nirvana Tech Solutions creates futuristic websites, digital systems,
          and growth experiences for modern businesses.
        </motion.p>

        {/* ========= CTA BUTTONS ========= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 sm:mb-20"
        >
          <Link
            href="/query"
            data-magnetic="true"
            onMouseEnter={() => setVariant("button")}
            onMouseLeave={reset}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-4 rounded-full overflow-hidden bg-gradient-to-r from-nirvana-gold via-nirvana-gold-light to-nirvana-blue text-nirvana-black text-sm sm:text-base font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]"
          >
            <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-[200%] transition-transform duration-700" />
            <span className="relative z-10">Start Project</span>
            <ArrowUpRight
              size={18}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>

          <Link
            href="/services"
            data-magnetic="true"
            onMouseEnter={() => setVariant("hover")}
            onMouseLeave={reset}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-4 rounded-full overflow-hidden glass border border-white/15 text-nirvana-white text-sm sm:text-base font-medium transition-all duration-300 hover:border-nirvana-gold/50 hover:bg-nirvana-gold/5"
          >
            <span className="relative z-10">Explore Services</span>
            <ArrowUpRight
              size={18}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </motion.div>

        {/* ========= STATS ROW ========= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-3 gap-3 sm:gap-6 max-w-3xl mx-auto"
        >
          {STATS.slice(0, 3).map((stat, i) => (
            <StatCard key={stat.label} stat={stat} delay={2.0 + i * 0.15} />
          ))}
        </motion.div>
      </div>

      {/* ============== LAYER 5: DECORATIVE ELEMENTS ============== */}

      {/* Top-right: "Available for projects" badge */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 2.4 }}
        className="hidden md:flex absolute top-28 right-8 z-30 items-center gap-2 px-3 py-2 rounded-full glass border border-emerald-500/20 bg-emerald-500/5"
      >
        <span className="relative flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
          <span className="relative rounded-full w-2 h-2 bg-emerald-400" />
        </span>
        <span className="text-xs text-emerald-300 font-medium">
          Available for Q1 2026 projects
        </span>
      </motion.div>

      {/* Left rail: "SCROLL TO EXPLORE" */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 items-center gap-3"
        style={{ writingMode: "vertical-rl" }}
      >
        <span className="text-[10px] font-mono text-nirvana-gold/60 uppercase tracking-[0.4em] rotate-180">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ height: [12, 24, 12] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px bg-nirvana-gold/60"
        />
      </motion.div>

      {/* Right rail: location */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 items-center gap-3"
        style={{ writingMode: "vertical-rl" }}
      >
        <span className="text-[10px] font-mono text-nirvana-gold/60 uppercase tracking-[0.4em]">
          Est. 2026— Jabalpur, India
        </span>
      </motion.div>

      {/* Bottom center: scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.6 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
      >
        <Mouse size={20} className="text-nirvana-gold/60" />
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-6 bg-nirvana-gold"
        />
      </motion.div>
    </section>
  );
}

// =============================================================================
// 📊 ANIMATED STAT CARD (with counter)
// =============================================================================
interface StatCardProps {
  stat: { label: string; value: number; suffix: string };
  delay: number;
}

function StatCard({ stat, delay }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(stat.value * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative glass border border-white/10 rounded-2xl p-4 sm:p-5 hover:border-nirvana-gold/30 transition-all duration-300"
    >
      <div className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold tabular-nums">
        <span className="gradient-text">{count}</span>
        <span className="text-nirvana-gold">{stat.suffix}</span>
      </div>

      <div className="text-[10px] sm:text-xs text-nirvana-gray-400 uppercase tracking-wider mt-1">
        {stat.label}
      </div>

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-nirvana-gold/0 via-nirvana-gold/0 to-nirvana-gold/0 group-hover:from-nirvana-gold/5 group-hover:to-nirvana-blue/5 transition-all duration-500 pointer-events-none" />
    </motion.div>
  );
}