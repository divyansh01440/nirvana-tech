"use client";

// =============================================================================
// 🛠️ NIRVANA TECH — Services Preview Section
// =============================================================================
// Section 03 of the home page.
// 6 service cards in a responsive grid (3×2 desktop, 1 col mobile).
//
// Each card has:
//   - Lucide icon (animates on hover)
//   - Title + 2-line description
//   - Learn more link
//   - 3D tilt on mouse move
//   - Glow border + lift on hover
// =============================================================================

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Globe,
  TrendingUp,
  Search,
  ShoppingBag,
  Code2,
  BarChart3,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { useCursorStore } from "@/store/cursorStore";
import { SERVICES_DATA } from "@/lib/constants";

// =============================================================================
// 🎨 ICON MAP — maps icon strings from constants → real Lucide components
// =============================================================================
const ICON_MAP: Record<string, LucideIcon> = {
  Globe,
  TrendingUp,
  Search,
  ShoppingBag,
  Code2,
  BarChart3,
};

// =============================================================================
// 🛠️ MAIN COMPONENT
// =============================================================================
export default function ServicesPreview() {
  return (
    <section
      id="services"
      className="relative w-full overflow-hidden py-20 sm:py-28 lg:py-36"
    >
      {/* ============== BACKGROUND ============== */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Top gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-nirvana-gold/40 to-transparent" />
      </div>

      {/* Floating background orbs */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-nirvana-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-nirvana-blue/5 blur-[120px] pointer-events-none" />

      {/* ============== CONTENT ============== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========= HEADER ========= */}
        <div className="text-center mb-14 sm:mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-nirvana-gold/40" />
            <span className="text-xs font-mono text-nirvana-gold/80 uppercase tracking-[0.3em]">
              02 — What We Offer
            </span>
            <span className="w-8 h-px bg-nirvana-gold/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-nirvana-white leading-[1.1] mb-6"
          >
            Services that transform{" "}
            <span className="gradient-text">vision into reality</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-nirvana-gray-400 max-w-2xl mx-auto"
          >
            Six disciplines, one obsession — your growth. Each service designed
            to compound the next.
          </motion.p>
        </div>

        {/* ========= SERVICES GRID ========= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {SERVICES_DATA.map((service, i) => (
            <ServiceCard
              key={service.slug}
              service={service}
              index={i}
            />
          ))}
        </div>

        {/* ========= VIEW ALL CTA ========= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 sm:mt-20 text-center"
        >
          <Link
            href="/services"
            data-magnetic="true"
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-white/10 text-nirvana-white text-sm sm:text-base font-medium hover:border-nirvana-gold/50 hover:bg-nirvana-gold/5 transition-all"
          >
            View all services
            <ArrowUpRight
              size={16}
              className="text-nirvana-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// 🎴 SERVICE CARD (with 3D tilt + hover effects)
// =============================================================================
interface ServiceCardProps {
  service: typeof SERVICES_DATA[number];
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { setVariant, reset } = useCursorStore();

  // Mouse tracking for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 25,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    reset();
  };

  // Resolve icon from string name
  const Icon = ICON_MAP[service.icon] || Globe;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVariant("hover")}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative h-full"
    >
      <Link
        href={`/services#${service.slug}`}
        className="relative block h-full glass border border-white/10 rounded-2xl p-6 sm:p-7 lg:p-8 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-nirvana-gold/40"
      >
        {/* ===== GRADIENT BORDER ON HOVER ===== */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${service.accentColor}40, transparent 40%, transparent 60%, ${service.accentColor}40)`,
            padding: "1px",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
        />

        {/* ===== HOVER GLOW ===== */}
        <div
          className="absolute -inset-px rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${service.accentColor}20, transparent)`,
          }}
        />

        {/* ===== REVEALED PATTERN ON HOVER ===== */}
        <div className="absolute inset-0 rounded-2xl bg-grid-pattern opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none" />

        {/* ===== CONTENT ===== */}
        <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(40px)" }}>
          {/* Top: Service number + Icon */}
          <div className="flex items-start justify-between mb-6 sm:mb-8">
            <span className="text-xs font-mono text-nirvana-gold/60 uppercase tracking-widest">
              0{index + 1}
            </span>

            {/* Animated icon */}
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative"
            >
              <div
                className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                style={{ backgroundColor: service.accentColor }}
              />
              <div className="relative w-14 h-14 rounded-2xl glass border border-white/10 flex items-center justify-center group-hover:border-nirvana-gold/40 transition-all">
                <Icon
                  size={26}
                  className="transition-all duration-500"
                  style={{ color: service.accentColor }}
                />
              </div>
            </motion.div>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-nirvana-white mb-3 group-hover:text-nirvana-gold transition-colors duration-300">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-sm sm:text-base text-nirvana-gray-400 leading-relaxed mb-8 flex-grow">
            {service.shortDesc}
          </p>

          {/* Learn more link */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5 group-hover:border-nirvana-gold/20 transition-colors">
            <span className="text-xs font-medium text-nirvana-gray-400 group-hover:text-nirvana-gold transition-colors flex items-center gap-2">
              Learn more
              <ArrowUpRight
                size={12}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>

            {/* Animated dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-nirvana-gold/30 group-hover:bg-nirvana-gold group-hover:shadow-[0_0_10px_rgba(212,175,55,0.8)] transition-all" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}