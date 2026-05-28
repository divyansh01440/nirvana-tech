"use client";

// =============================================================================
// 🔄 NIRVANA TECH — Process Section
// =============================================================================
// Section 05 — 6-step workflow with animated timeline.
//
// Desktop: horizontal timeline with progress line that draws as you scroll
// Mobile: vertical timeline with same effect
// =============================================================================

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Compass,
  Target,
  Palette,
  Code,
  Rocket,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { useCursorStore } from "@/store/cursorStore";

// =============================================================================
// 📋 PROCESS STEPS
// =============================================================================
interface Step {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Discovery",
    description: "We dive deep into your vision.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Strategy",
    description: "Plan with purpose and precision.",
    icon: Target,
  },
  {
    number: "03",
    title: "Design",
    description: "Craft experiences that captivate.",
    icon: Palette,
  },
  {
    number: "04",
    title: "Development",
    description: "Build with cutting-edge tech.",
    icon: Code,
  },
  {
    number: "05",
    title: "Launch",
    description: "Deploy with confidence.",
    icon: Rocket,
  },
  {
    number: "06",
    title: "Growth",
    description: "Scale beyond expectations.",
    icon: TrendingUp,
  },
];

// =============================================================================
// 🔄 MAIN COMPONENT
// =============================================================================
export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the section for line animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 30%"],
  });

  // Horizontal line draws left to right (desktop)
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  // Vertical line draws top to bottom (mobile)
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="process"
      className="relative w-full overflow-hidden py-20 sm:py-28 lg:py-36"
    >
      {/* ============== TOP GRADIENT DIVIDER ============== */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-nirvana-gold/40 to-transparent" />
      </div>

      {/* ============== BACKGROUND ============== */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      {/* Floating background orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-nirvana-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-nirvana-blue/5 blur-[120px] pointer-events-none" />

      {/* ============== HEADER ============== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 sm:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 mb-6"
        >
          <span className="w-8 h-px bg-nirvana-gold/40" />
          <span className="text-xs font-mono text-nirvana-gold/80 uppercase tracking-[0.3em]">
            04 — Our Process
          </span>
          <span className="w-8 h-px bg-nirvana-gold/40" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-nirvana-white leading-[1.1] mb-6 max-w-4xl mx-auto"
        >
          From idea to impact, in{" "}
          <span className="gradient-text">six precise steps</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg text-nirvana-gray-400 max-w-2xl mx-auto"
        >
          A proven workflow that turns ambiguity into clarity and ideas into
          shipped experiences.
        </motion.p>
      </div>

      {/* ============== TIMELINE ============== */}
      <div
        ref={sectionRef}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* ===== DESKTOP: HORIZONTAL TIMELINE ===== */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Background line (faint) */}
            <div className="absolute top-9 left-0 right-0 h-px bg-white/10" />

            {/* Animated gold line that fills as user scrolls */}
            <motion.div
              style={{ width: lineWidth }}
              className="absolute top-9 left-0 h-px bg-gradient-to-r from-nirvana-gold via-nirvana-gold-light to-nirvana-blue origin-left shadow-[0_0_10px_rgba(212,175,55,0.5)]"
            />

            {/* Step nodes */}
            <div className="relative grid grid-cols-6 gap-4">
              {STEPS.map((step, i) => (
                <StepNode
                  key={step.number}
                  step={step}
                  index={i}
                  scrollProgress={scrollYProgress}
                  totalSteps={STEPS.length}
                  layout="horizontal"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ===== MOBILE: VERTICAL TIMELINE ===== */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Background line */}
            <div className="absolute left-9 top-0 bottom-0 w-px bg-white/10" />

            {/* Animated gold line */}
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-9 top-0 w-px bg-gradient-to-b from-nirvana-gold via-nirvana-gold-light to-nirvana-blue origin-top shadow-[0_0_10px_rgba(212,175,55,0.5)]"
            />

            <div className="space-y-10">
              {STEPS.map((step, i) => (
                <StepNode
                  key={step.number}
                  step={step}
                  index={i}
                  scrollProgress={scrollYProgress}
                  totalSteps={STEPS.length}
                  layout="vertical"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// 🎯 STEP NODE
// =============================================================================
interface StepNodeProps {
  step: Step;
  index: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  totalSteps: number;
  layout: "horizontal" | "vertical";
}

function StepNode({ step, index, scrollProgress, totalSteps, layout }: StepNodeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const { setVariant, reset } = useCursorStore();

  // Each step "lights up" when scroll progress passes its threshold
  const stepThreshold = (index + 0.5) / totalSteps;
  const isLit = useTransform(scrollProgress, (latest) => latest >= stepThreshold);

  const Icon = step.icon;
  const isVertical = layout === "vertical";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: isVertical ? 30 : 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setVariant("hover")}
      onMouseLeave={reset}
      className={`group relative ${isVertical ? "pl-24" : "flex flex-col items-center text-center"}`}
    >
      {/* ===== NODE CIRCLE ===== */}
      <motion.div
        whileHover={{ scale: 1.15 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className={`relative ${
          isVertical
            ? "absolute left-0 top-0 w-[72px] h-[72px]"
            : "w-[72px] h-[72px] mb-6"
        }`}
      >
        {/* Outer glow ring (when lit) */}
        <motion.div
          style={{ opacity: isLit }}
          className="absolute inset-0 rounded-full bg-nirvana-gold/30 blur-xl"
        />

        {/* Main circle */}
        <div className="relative w-full h-full rounded-full glass border-2 border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-nirvana-gold/60 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
          <Icon
            size={26}
            className="text-nirvana-gold/60 group-hover:text-nirvana-gold transition-colors duration-300"
          />
        </div>

        {/* Number badge — top right of circle */}
        <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-nirvana-black border border-nirvana-gold/40">
          <span className="text-[10px] font-mono font-bold text-nirvana-gold">
            {step.number}
          </span>
        </div>
      </motion.div>

      {/* ===== CONTENT ===== */}
      <div className={isVertical ? "" : "px-2"}>
        <h3 className="text-lg sm:text-xl font-heading font-bold text-nirvana-white mb-2 group-hover:text-nirvana-gold transition-colors duration-300">
          {step.title}
        </h3>

        <p className="text-xs sm:text-sm text-nirvana-gray-400 leading-relaxed group-hover:text-nirvana-gray-300 transition-colors duration-300">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}