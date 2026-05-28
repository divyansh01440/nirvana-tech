"use client";

// =============================================================================
// 🛠️ NIRVANA TECH — Service Detail Section
// =============================================================================
// Reusable section for each of the 6 services. Alternates left/right layout.
//
// Icon is stored as a STRING in data (not a React component) so it can cross
// the Server→Client boundary. We resolve it via ICON_MAP inside this client
// component.
// =============================================================================

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Check,
  ArrowUpRight,
  Globe,
  TrendingUp,
  Search,
  ShoppingBag,
  Code2,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { useCursorStore } from "@/store/cursorStore";

// =============================================================================
// 🎨 ICON MAP — maps string names to actual Lucide components
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
// 📋 TYPES
// =============================================================================
export interface ServiceData {
  number: string;
  slug: string;
  icon: string; // ← STRING (e.g. "Globe"), resolved via ICON_MAP
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  benefits: string[];
  microSteps: { title: string; description: string }[];
  technologies: string[];
  caseStudyLink?: string;
  visualType: "website" | "marketing" | "seo" | "ecommerce" | "code" | "analytics";
}

interface Props {
  service: ServiceData;
  index: number;
}

// =============================================================================
// 🛠️ MAIN COMPONENT
// =============================================================================
export default function ServiceDetailSection({ service, index }: Props) {
  const { setVariant, reset } = useCursorStore();
  const sectionRef = useRef<HTMLElement>(null);

  // Resolve icon string to component
  const Icon = ICON_MAP[service.icon] || Globe;

  // Alternate layout: even = image right, odd = image left
  const isReversed = index % 2 === 1;

  return (
    <section
      ref={sectionRef}
      id={`service-${index + 1}`}
      className="relative w-full overflow-hidden py-20 sm:py-28 lg:py-36 border-t border-white/5"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Huge faded service number — alternates sides */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 pointer-events-none select-none ${
          isReversed ? "right-0" : "left-0"
        }`}
      >
        <span
          className="text-[180px] sm:text-[240px] lg:text-[320px] font-heading font-bold leading-none tracking-tighter opacity-[0.04]"
          style={{ color: service.accentColor }}
        >
          {service.number}
        </span>
      </div>

      {/* Accent color glow orb */}
      <div
        className="absolute w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-30"
        style={{
          backgroundColor: service.accentColor,
          top: isReversed ? "20%" : "30%",
          [isReversed ? "right" : "left"]: "-100px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
            isReversed ? "lg:grid-flow-col-dense" : ""
          }`}
        >
          {/* =================================================================== */}
          {/* TEXT COLUMN                                                         */}
          {/* =================================================================== */}
          <div
            className={`space-y-6 sm:space-y-8 ${isReversed ? "lg:col-start-2" : ""}`}
          >
            {/* Number + Icon header */}
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl glass border flex items-center justify-center flex-shrink-0"
                style={{ borderColor: `${service.accentColor}40` }}
              >
                <Icon size={24} style={{ color: service.accentColor }} />
              </div>

              <div className="flex items-baseline gap-3">
                <span
                  className="text-2xl font-heading font-bold"
                  style={{ color: service.accentColor }}
                >
                  {service.number}
                </span>
                <span className="text-xs font-mono text-nirvana-gold/60 uppercase tracking-[0.3em]">
                  / 06 — {service.title}
                </span>
              </div>
            </div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-nirvana-white leading-[1.1]"
            >
              {service.title}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-lg sm:text-xl font-heading font-medium"
              style={{ color: service.accentColor }}
            >
              {service.subtitle}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.8, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm sm:text-base text-nirvana-gray-300 leading-relaxed"
            >
              {service.description}
            </motion.p>

            {/* Benefits checklist */}
            <div className="space-y-3 pt-2">
              <div className="text-xs uppercase tracking-widest text-nirvana-gold/70 font-mono">
                What you get
              </div>
              <ul className="space-y-3">
                {service.benefits.map((benefit, i) => (
                  <BenefitItem
                    key={i}
                    text={benefit}
                    delay={i * 0.1}
                    accentColor={service.accentColor}
                  />
                ))}
              </ul>
            </div>

            {/* Tech stack */}
            <div className="space-y-3 pt-2">
              <div className="text-xs uppercase tracking-widest text-nirvana-gold/70 font-mono">
                Built with
              </div>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full glass border border-white/10 text-xs text-nirvana-gray-300 hover:border-white/20 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-4"
            >
              <Link
                href="/query"
                data-magnetic="true"
                onMouseEnter={() => setVariant("button")}
                onMouseLeave={reset}
                className="group inline-flex items-center gap-3 text-sm sm:text-base font-medium text-nirvana-white hover:text-nirvana-gold transition-colors"
              >
                <span className="relative">
                  Start with this service
                  <span
                    className="absolute -bottom-0.5 left-0 w-full h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    style={{ backgroundColor: service.accentColor }}
                  />
                </span>
                <span
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full glass border transition-all"
                  style={{
                    borderColor: `${service.accentColor}30`,
                  }}
                >
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:rotate-45"
                    style={{ color: service.accentColor }}
                  />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* =================================================================== */}
          {/* VISUAL COLUMN                                                       */}
          {/* =================================================================== */}
          <div
            className={`relative ${
              isReversed ? "lg:col-start-1 lg:row-start-1" : ""
            }`}
          >
            <ServiceVisual icon={Icon} accentColor={service.accentColor} number={service.number} />
          </div>
        </div>

        {/* =================================================================== */}
        {/* MICRO-STEPS BELOW (4-5 mini cards)                                  */}
        {/* =================================================================== */}
        <div className="mt-16 sm:mt-20">
          <div className="text-xs font-mono text-nirvana-gold/70 uppercase tracking-[0.3em] mb-6 text-center">
            ── Our Process for {service.title} ──
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {service.microSteps.map((step, i) => (
              <MicroStepCard
                key={i}
                step={step}
                index={i}
                accentColor={service.accentColor}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// ✅ BENEFIT ITEM (animated checkmark)
// =============================================================================
function BenefitItem({
  text,
  delay,
  accentColor,
}: {
  text: string;
  delay: number;
  accentColor: string;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-3"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: delay + 0.2, type: "spring", stiffness: 300 }}
        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ backgroundColor: `${accentColor}30`, border: `1px solid ${accentColor}60` }}
      >
        <Check size={12} style={{ color: accentColor }} strokeWidth={3} />
      </motion.div>
      <span className="text-sm sm:text-base text-nirvana-gray-300 leading-relaxed">
        {text}
      </span>
    </motion.li>
  );
}

// =============================================================================
// 🔢 MICRO STEP CARD
// =============================================================================
function MicroStepCard({
  step,
  index,
  accentColor,
}: {
  step: { title: string; description: string };
  index: number;
  accentColor: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative glass border border-white/10 rounded-2xl p-4 sm:p-5 hover:border-white/20 transition-all"
    >
      <div
        className="text-xs font-mono mb-2 uppercase tracking-widest"
        style={{ color: accentColor }}
      >
        Step {String(index + 1).padStart(2, "0")}
      </div>
      <h4 className="text-sm sm:text-base font-heading font-semibold text-nirvana-white mb-2">
        {step.title}
      </h4>
      <p className="text-xs text-nirvana-gray-400 leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  );
}

// =============================================================================
// 🎨 SERVICE VISUAL — varies by service type
// =============================================================================
function ServiceVisual({
  icon: Icon,
  accentColor,
  number,
}: {
  icon: LucideIcon;
  accentColor: string;
  number: string;
}) {
  return (
    <div className="relative aspect-square max-w-md mx-auto">
      {/* Outer rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border opacity-20"
        style={{ borderColor: accentColor }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-6 rounded-full border opacity-15"
        style={{ borderColor: accentColor }}
      />

      {/* Central glass card with icon */}
      <div className="absolute inset-12 rounded-3xl glass border border-white/10 backdrop-blur-xl flex items-center justify-center overflow-hidden">
        {/* Inner glow */}
        <div
          className="absolute inset-0 rounded-3xl opacity-30 blur-2xl"
          style={{ backgroundColor: accentColor }}
        />

        {/* Big icon */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          <Icon size={80} style={{ color: accentColor }} strokeWidth={1.5} />
        </motion.div>
      </div>

      {/* Floating orbiting dots */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i * 90) * (Math.PI / 180);
        return (
          <motion.div
            key={i}
            animate={{ rotate: 360 }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transformOrigin: "center",
            }}
          >
            <div
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: accentColor,
                top: `${50 + Math.sin(angle) * 48}%`,
                left: `${50 + Math.cos(angle) * 48}%`,
                boxShadow: `0 0 20px ${accentColor}`,
              }}
            />
          </motion.div>
        );
      })}

      {/* Service number watermark */}
      <div
        className="absolute -top-4 -right-4 text-6xl font-heading font-bold opacity-20"
        style={{ color: accentColor }}
      >
        {number}
      </div>
    </div>
  );
}