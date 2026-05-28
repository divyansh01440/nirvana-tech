"use client";

// =============================================================================
// 🏠 NIRVANA TECH — Home Page Content
// =============================================================================
// Composes all 8 sections of the home page in order.
// Each section is a separate component for clarity and reusability.
//
// TODO: Replace SectionPlaceholder with real components as we build them.
// =============================================================================

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCursorStore } from "@/store/cursorStore";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import ProjectShowcase from "@/components/home/ProjectShowcase";
import ProcessSection from "@/components/home/ProcessSection";
import TeamSection from "@/components/home/TeamSection";
import ClientsSection from "@/components/home/ClientsSection";
import CtaSection from "@/components/home/CtaSection";



export default function HomeContent() {
  return (
    <>
      {/* ============== 1. HERO SECTION ============== */}
      <HeroSection />

      {/* ============== 2. ABOUT SECTION ============== */}
      <AboutSection />

      {/* ============== 3. SERVICES PREVIEW ============== */}
      <ServicesPreview />

      {/* ============== 4. PROJECT SHOWCASE ============== */}
      <ProjectShowcase />

      {/* ============== 5. PROCESS SECTION ============== */}
      <ProcessSection />

      {/* ============== 6. TEAM SECTION ============== */}
      <TeamSection />

      {/* ============== 7. CLIENTS SECTION ============== */}
      <ClientsSection />

      {/* ============== 8. CTA SECTION ============== */}
     <CtaSection />
    </>
  );
}

// =============================================================================
// 🚧 TEMPORARY SECTION PLACEHOLDER
// =============================================================================
// Used until real sections are built. Each gets replaced one by one.
// =============================================================================
interface SectionPlaceholderProps {
  number: string;
  title: string;
  subtitle: string;
  status?: "building-next" | "ready";
  isLast?: boolean;
}

function SectionPlaceholder({
  number,
  title,
  subtitle,
  status,
  isLast,
}: SectionPlaceholderProps) {
  const { setVariant, reset } = useCursorStore();
  const isBuildingNext = status === "building-next";

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 ${
        isLast ? "" : "border-b border-white/5"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl text-center space-y-6"
      >
        {/* Section number */}
        <div className="text-[10px] font-mono text-nirvana-gold/70 uppercase tracking-[0.4em] flex items-center justify-center gap-3">
          <span className="w-8 h-px bg-nirvana-gold/40" />
          Section {number}
          <span className="w-8 h-px bg-nirvana-gold/40" />
        </div>

        {/* Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold">
          <span className="gradient-text">{title}</span>
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-nirvana-gray-400 max-w-lg mx-auto">
          {subtitle}
        </p>

        {/* Status badge */}
        <div className="flex flex-wrap gap-3 items-center justify-center pt-4">
          {isBuildingNext ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nirvana-gold/10 border border-nirvana-gold/30">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-nirvana-gold animate-ping opacity-75" />
                <span className="relative rounded-full w-2 h-2 bg-nirvana-gold" />
              </span>
              <span className="text-xs text-nirvana-gold font-medium">
                Building next
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10">
              <span className="w-2 h-2 rounded-full bg-nirvana-gray-600" />
              <span className="text-xs text-nirvana-gray-400 font-medium">
                Scheduled
              </span>
            </div>
          )}

          <Link
            href="/query"
            onMouseEnter={() => setVariant("hover")}
            onMouseLeave={reset}
            className="group inline-flex items-center gap-2 text-xs text-nirvana-gray-500 hover:text-nirvana-gold transition-colors"
          >
            Get notified
            <ArrowRight
              size={12}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </motion.div>

      {/* Decorative corner brackets */}
      <div className="absolute top-8 left-8 w-6 h-6 border-l-2 border-t-2 border-nirvana-gold/20 hidden md:block" />
      <div className="absolute top-8 right-8 w-6 h-6 border-r-2 border-t-2 border-nirvana-gold/20 hidden md:block" />
      <div className="absolute bottom-8 left-8 w-6 h-6 border-l-2 border-b-2 border-nirvana-gold/20 hidden md:block" />
      <div className="absolute bottom-8 right-8 w-6 h-6 border-r-2 border-b-2 border-nirvana-gold/20 hidden md:block" />
    </section>
  );
}