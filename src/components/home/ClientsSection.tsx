"use client";

// =============================================================================
// 🏢 NIRVANA TECH — Clients & Testimonials Section
// =============================================================================
// Section 07 — Trust signals (logos + testimonials + metrics).
//
// Honest version for a new agency:
//   - "Trusted by early partners" marquee (real names + "and yours next?")
//   - 1 real testimonial + 2 placeholder testimonials with future-facing copy
//   - Realistic trust metrics (response time, satisfaction, transparency)
// =============================================================================

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Star, Quote, ArrowLeft, ArrowRight, Clock, Heart, Eye } from "lucide-react";
import { useCursorStore } from "@/store/cursorStore";

// =============================================================================
// 🏢 LOGO MARQUEE DATA — EDIT WITH YOUR REAL CLIENT NAMES
// =============================================================================
const LOGOS_ROW_1 = [
  "Your Client",        // ← EDIT (your real client name)
  "Early Partner",
  "Beta Tester",
  "Trusted Friend",
  "Pilot Project",
  "First Believer",
];

const LOGOS_ROW_2 = [
  "Future Partner",
  "Open Slot",
  "Your Brand?",
  "Coming Soon",
  "Building With Us",
  "Next Case Study",
];

// =============================================================================
// 💬 TESTIMONIALS — EDIT WITH REAL CLIENT FEEDBACK
// =============================================================================
interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  isPlaceholder?: boolean;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Working with Nirvana was a turning point for us. The attention to craft, communication, and results was unlike any other agency we've tried.",
    name: "Dr. Prathmesh Rai",                                        // ← EDIT
    role: "Founder",                                                   // ← EDIT
    company: "Arunodaya Dental Clinic",                                          // ← EDIT
    image: "https://res.cloudinary.com/dwenbr9ny/image/upload/q_auto/f_auto/v1779537339/PT_nlwrvw.jpg",  // ← EDIT (or use real photo URL)
    rating: 5,
  },
  {
    quote:
      "Every project Nirvana ships feels intentional — from animations to architecture. It's rare to find a team this obsessed with details.",
    name: "Dr. Kalpana Sharma Rai",
    role: "Future Client",
    company: "Arunodaya-Dental Clinic",
    image: "https://res.cloudinary.com/dwenbr9ny/image/upload/q_auto/f_auto/v1779537498/ksr_e7gocf.jpg",
    rating: 5,
    isPlaceholder: true,
  },
  {
    quote:
      "Reserved for the next great collaboration. We're picky about who we work with — but when we click, we ship magic.",
    name: "Open Slot",
    role: "Your Story Here",
    company: "Get in Touch",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=client3",
    rating: 5,
    isPlaceholder: true,
  },
];

// =============================================================================
// 📊 TRUST METRICS — Honest, achievable claims
// =============================================================================
const METRICS = [
  {
    icon: Clock,
    value: 24,
    suffix: "h",
    label: "Avg Response Time",
    description: "We reply to every inquiry within 24 hours.",
  },
  {
    icon: Heart,
    value: 100,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Every project ends with the client we wanted.",
  },
  {
    icon: Eye,
    value: 100,
    suffix: "%",
    label: "Transparent Pricing",
    description: "No surprises. Ever.",
  },
];

// =============================================================================
// 🏢 MAIN COMPONENT
// =============================================================================
export default function ClientsSection() {
  return (
    <section
      id="clients"
      className="relative w-full overflow-hidden py-20 sm:py-28 lg:py-36"
    >
      {/* Top gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-nirvana-gold/40 to-transparent" />
      </div>

      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-96 h-96 rounded-full bg-nirvana-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-20 w-96 h-96 rounded-full bg-nirvana-blue/5 blur-[120px] pointer-events-none" />

      {/* ============== HEADER ============== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 mb-6"
        >
          <span className="w-8 h-px bg-nirvana-gold/40" />
          <span className="text-xs font-mono text-nirvana-gold/80 uppercase tracking-[0.3em]">
            06 — Trusted By
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
          Early partners.{" "}
          <span className="gradient-text">Building together</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg text-nirvana-gray-400 max-w-2xl mx-auto"
        >
          Quality over quantity. Every collaboration is hand-picked, every
          result is hard-earned.
        </motion.p>
      </div>

      {/* ============== PART 1: LOGO MARQUEE ============== */}
      <LogoMarquee />

      {/* ============== PART 2: TESTIMONIAL CAROUSEL ============== */}
      <TestimonialCarousel />

      {/* ============== PART 3: TRUST METRICS ============== */}
      <TrustMetrics />
    </section>
  );
}

// =============================================================================
// 🎬 LOGO MARQUEE (two rows scrolling opposite directions)
// =============================================================================
function LogoMarquee() {
  return (
    <div className="relative z-10 py-12 sm:py-16">
      <div className="relative">
        {/* Edge fade gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-nirvana-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-nirvana-black to-transparent z-10 pointer-events-none" />

        {/* Row 1 — left to right */}
        <div className="overflow-hidden mb-6">
          <div className="flex gap-8 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
            {[...LOGOS_ROW_1, ...LOGOS_ROW_1].map((logo, i) => (
              <LogoChip key={`r1-${i}`} text={logo} />
            ))}
          </div>
        </div>

        {/* Row 2 — right to left */}
        <div className="overflow-hidden">
          <div className="flex gap-8 animate-marquee-reverse whitespace-nowrap hover:[animation-play-state:paused]">
            {[...LOGOS_ROW_2, ...LOGOS_ROW_2].map((logo, i) => (
              <LogoChip key={`r2-${i}`} text={logo} variant="muted" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LogoChip({ text, variant }: { text: string; variant?: "muted" }) {
  const isMuted = variant === "muted";
  return (
    <div
      className={`flex-shrink-0 px-8 py-5 rounded-2xl glass border ${
        isMuted ? "border-white/5" : "border-white/10"
      } group hover:border-nirvana-gold/30 transition-all duration-500`}
    >
      <span
        className={`text-lg sm:text-xl font-heading font-bold uppercase tracking-wider transition-colors duration-500 ${
          isMuted
            ? "text-nirvana-gray-600 group-hover:text-nirvana-gray-300"
            : "text-nirvana-gray-400 group-hover:text-nirvana-gold"
        }`}
      >
        {text}
      </span>
    </div>
  );
}

// =============================================================================
// 💬 TESTIMONIAL CAROUSEL
// =============================================================================
function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { setVariant, reset } = useCursorStore();

  // Auto-rotate every 6 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const current = TESTIMONIALS[index];

  return (
    <div
      className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative max-w-4xl mx-auto">
        {/* Large quote mark watermark */}
        <Quote
          size={140}
          className="absolute -top-10 -left-4 sm:-top-12 sm:-left-12 text-nirvana-gold/10"
          strokeWidth={1}
        />

        {/* Testimonial card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative glass border border-white/10 rounded-3xl p-8 sm:p-12 lg:p-16"
          >
            {/* Stars */}
            <div className="flex items-center gap-1 mb-6">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="text-nirvana-gold fill-nirvana-gold"
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-medium text-nirvana-white leading-[1.3] mb-8 sm:mb-10">
              <span className="text-nirvana-gold">&ldquo;</span>
              {current.quote}
              <span className="text-nirvana-gold">&rdquo;</span>
            </blockquote>

            {/* Client info */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-nirvana-gold/30 flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name + role */}
              <div className="flex-1 min-w-0">
                <div className="text-base sm:text-lg font-heading font-bold text-nirvana-white">
                  {current.name}
                </div>
                <div className="text-xs sm:text-sm text-nirvana-gray-400">
                  {current.role} · <span className="text-nirvana-gold">{current.company}</span>
                </div>
              </div>

              {/* Placeholder tag */}
              {current.isPlaceholder && (
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border border-nirvana-blue/20 text-[10px] text-nirvana-blue font-medium uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-nirvana-blue animate-pulse" />
                  Your Story Next
                </span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ============== NAVIGATION ============== */}
        <div className="flex items-center justify-between mt-8">
          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                onMouseEnter={() => setVariant("button")}
                onMouseLeave={reset}
                aria-label={`Go to testimonial ${i + 1}`}
                className="group p-2"
              >
                <span
                  className={`block h-1 rounded-full transition-all duration-500 ${
                    i === index
                      ? "w-8 bg-nirvana-gold"
                      : "w-4 bg-white/20 group-hover:bg-white/40"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setIndex(
                  (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
                )
              }
              onMouseEnter={() => setVariant("button")}
              onMouseLeave={reset}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full glass border border-white/10 flex items-center justify-center text-nirvana-white hover:border-nirvana-gold/40 hover:text-nirvana-gold transition-all"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() =>
                setIndex((prev) => (prev + 1) % TESTIMONIALS.length)
              }
              onMouseEnter={() => setVariant("button")}
              onMouseLeave={reset}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full glass border border-white/10 flex items-center justify-center text-nirvana-white hover:border-nirvana-gold/40 hover:text-nirvana-gold transition-all"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// 📊 TRUST METRICS
// =============================================================================
function TrustMetrics() {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {METRICS.map((metric, i) => (
          <MetricCard key={metric.label} metric={metric} index={i} />
        ))}
      </div>

      {/* Bottom callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 sm:mt-12 text-center"
      >
        <Link
          href="/query"
          className="group inline-flex items-center gap-2 text-sm text-nirvana-gray-400 hover:text-nirvana-gold transition-colors"
        >
          Want to be our next case study?
          <ArrowRight
            size={14}
            className="text-nirvana-gold transition-transform group-hover:translate-x-1"
          />
        </Link>
      </motion.div>
    </div>
  );
}

// =============================================================================
// 📈 METRIC CARD (with count-up)
// =============================================================================
interface MetricCardProps {
  metric: typeof METRICS[number];
  index: number;
}

function MetricCard({ metric, index }: MetricCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);
  const Icon = metric.icon;

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(metric.value * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, metric.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative glass border border-white/10 rounded-2xl p-6 sm:p-7 hover:border-nirvana-gold/30 transition-all duration-500"
    >
      {/* Icon */}
      <div className="mb-4 inline-flex w-11 h-11 rounded-xl glass border border-nirvana-gold/20 items-center justify-center">
        <Icon size={20} className="text-nirvana-gold" />
      </div>

      {/* Number */}
      <div className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tabular-nums mb-2">
        <span className="gradient-text">{count}</span>
        <span className="text-nirvana-gold">{metric.suffix}</span>
      </div>

      {/* Label */}
      <div className="text-sm font-medium text-nirvana-white mb-1">
        {metric.label}
      </div>

      {/* Description */}
      <p className="text-xs text-nirvana-gray-400 leading-relaxed">
        {metric.description}
      </p>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-nirvana-gold/0 to-nirvana-gold/0 group-hover:from-nirvana-gold/5 group-hover:to-nirvana-blue/5 transition-all duration-500 pointer-events-none" />
    </motion.div>
  );
}