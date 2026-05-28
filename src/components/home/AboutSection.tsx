"use client";

// =============================================================================
// 📖 NIRVANA TECH — About / Philosophy Section
// =============================================================================
// Section 02 of the home page.
//
// Layout:
//   - 2 columns on desktop (left: copy + CTA / right: timeline)
//   - Stacked on mobile
//   - Parallax-driven background (aurora + floating orbs)
//   - Scroll-triggered timeline reveal
// =============================================================================

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useCursorStore } from "@/store/cursorStore";

// =============================================================================
// 📅 TIMELINE EVENTS
// =============================================================================
const TIMELINE = [
    {
      year: "2026",
      title: "Founded in Jabalpur",
      description: "Started with a vision — to craft digital experiences that feel alive.",
    },
    {
      year: "Q1 2026",
      title: "First client onboarded",
      description: "Delivered our first project with obsessive attention to craft.",
    },
    {
      year: "Now",
      title: "Building the studio",
      description: "Sharpening systems, expanding the team, defining our voice.",
    },
    {
      year: "Q3 2026",
      title: "Team expansion (planned)",
      description: "Welcoming designers and developers who obsess like we do.",
    },
    {
      year: "Beyond",
      title: "Global reach",
      description: "Carrying Jabalpur's craft to clients across the world.",
    },
  ];

// =============================================================================
// 📖 MAIN COMPONENT
// =============================================================================
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { setVariant, reset } = useCursorStore();

  // Parallax effect on background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const orbOneY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const orbTwoY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen w-full overflow-hidden py-20 sm:py-28 lg:py-36"
    >
      {/* ============== TOP GRADIENT DIVIDER ============== */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-nirvana-gold/40 to-transparent" />
      </div>

      {/* ============== BACKGROUND LAYER ============== */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Subtle aurora gradient */}
        <div className="absolute inset-0 bg-aurora opacity-30" />

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      </motion.div>

      {/* Floating gradient orbs (parallax) */}
      <motion.div
        style={{ y: orbOneY }}
        className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-nirvana-gold/10 blur-[120px] pointer-events-none"
      />
      <motion.div
        style={{ y: orbTwoY }}
        className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-nirvana-blue/10 blur-[120px] pointer-events-none"
      />

      {/* ============== CONTENT CONTAINER ============== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* ================================================================== */}
          {/* LEFT COLUMN — COPY                                                 */}
          {/* ================================================================== */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3"
            >
              <span className="text-xs font-mono text-nirvana-gold/80 uppercase tracking-[0.3em]">
                01 — Who We Are
              </span>
              <span className="w-12 h-px bg-nirvana-gold/40" />
            </motion.div>

            {/* Main heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.1] text-nirvana-white"
            >
              An agency built for the{" "}
              <span className="gradient-text">next era</span> of the internet.
            </motion.h2>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 0.8, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-nirvana-gray-300 leading-relaxed max-w-xl"
            >
              At Nirvana, we craft digital experiences where technology becomes
              invisible and stories take center stage. Every pixel, motion, and
              interaction is engineered with intention — bridging design,
              engineering, and growth into one seamless whole. We don&apos;t
              ship websites. We ship moments of recognition.
            </motion.p>

            {/* Mission stat */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative max-w-xl"
            >
              <div className="relative glass border-l-2 border-nirvana-gold p-6 rounded-r-2xl">
                <div className="flex items-start gap-3">
                  <Sparkles
                    size={20}
                    className="text-nirvana-gold flex-shrink-0 mt-1"
                  />
                  <div>
                    <div className="text-xs uppercase tracking-widest text-nirvana-gold/70 mb-2">
                      Our Mission
                    </div>
                    <p className="text-lg sm:text-xl font-heading font-medium text-nirvana-white leading-snug">
                      Make every brand feel inevitable.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/services"
                data-magnetic="true"
                onMouseEnter={() => setVariant("hover")}
                onMouseLeave={reset}
                className="group inline-flex items-center gap-3 text-sm sm:text-base font-medium text-nirvana-white hover:text-nirvana-gold transition-colors"
              >
                <span className="relative">
                  Read our story
                  <span className="absolute -bottom-0.5 left-0 w-full h-px bg-gradient-to-r from-nirvana-gold via-nirvana-gold-light to-nirvana-blue origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </span>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full glass border border-white/10 group-hover:border-nirvana-gold/50 group-hover:bg-nirvana-gold/10 transition-all">
                  <ArrowUpRight
                    size={16}
                    className="text-nirvana-gold transition-transform duration-300 group-hover:rotate-45"
                  />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* ================================================================== */}
          {/* RIGHT COLUMN — TIMELINE                                            */}
          {/* ================================================================== */}
          <div className="relative lg:pl-8">
            {/* Timeline label */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-8 inline-flex items-center gap-3"
            >
              <span className="w-12 h-px bg-nirvana-gold/40" />
              <span className="text-xs font-mono text-nirvana-gold/80 uppercase tracking-[0.3em]">
                Our Journey
              </span>
            </motion.div>

            {/* Timeline list */}
            <Timeline />
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// 📅 ANIMATED TIMELINE
// =============================================================================
function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the timeline for the animated vertical line
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 60%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={timelineRef} className="relative">
      {/* Background vertical line (full height, faint) */}
      <div className="absolute left-3 top-3 bottom-3 w-px bg-white/10" />

      {/* Animated gold line that fills as user scrolls */}
      <motion.div
        style={{ height: lineHeight }}
        className="absolute left-3 top-3 w-px bg-gradient-to-b from-nirvana-gold via-nirvana-gold-light to-nirvana-blue"
      />

      {/* Timeline entries */}
      <div className="space-y-10 sm:space-y-12">
        {TIMELINE.map((event, i) => (
          <TimelineEvent key={event.year} event={event} index={i} />
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// 📍 SINGLE TIMELINE EVENT
// =============================================================================
interface TimelineEventProps {
  event: {
    year: string;
    title: string;
    description: string;
  };
  index: number;
}

function TimelineEvent({ event, index }: TimelineEventProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative pl-12 sm:pl-14"
    >
      {/* Glowing dot on the line */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{
          duration: 0.5,
          delay: index * 0.1 + 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute left-0 top-1.5 w-6 h-6 rounded-full flex items-center justify-center"
      >
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-full bg-nirvana-gold/30 blur-md animate-pulse" />
        {/* Solid dot */}
        <div className="relative w-3 h-3 rounded-full bg-nirvana-gold shadow-[0_0_20px_rgba(212,175,55,0.6)]" />
        {/* Inner pulse */}
        <div className="absolute inset-0 rounded-full bg-nirvana-gold/40 animate-ping" />
      </motion.div>

      {/* Content card */}
      <div className="group relative">
        {/* Year + title row */}
        <div className="flex items-baseline gap-4 mb-2">
          <span className="text-2xl sm:text-3xl font-heading font-bold gradient-text">
            {event.year}
          </span>
          <span className="text-base sm:text-lg font-heading font-medium text-nirvana-white">
            {event.title}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-nirvana-gray-400 leading-relaxed max-w-md">
          {event.description}
        </p>

        {/* Hover underline */}
        <div className="absolute -bottom-3 left-0 w-0 h-px bg-gradient-to-r from-nirvana-gold to-transparent group-hover:w-full transition-all duration-500" />
      </div>
    </motion.div>
  );
}