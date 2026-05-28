"use client";

// =============================================================================
// 🖼️ NIRVANA TECH — Project Showcase Section
// =============================================================================
// Section 04 — horizontal scrolling project gallery.
//
// Features:
//   - Filter pills (All / Web / Mobile / Branding / E-Commerce)
//   - Auto-scroll horizontal slider (pauses on hover/drag)
//   - Drag-to-scroll on mouse + touch
//   - Arrow nav buttons + progress bar
//   - Each card: image, category, title, tech tags, hover zoom
// =============================================================================

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { useCursorStore } from "@/store/cursorStore";

// =============================================================================
// 🖼️ PLACEHOLDER PROJECTS
// =============================================================================
// First entry is a real-ish client placeholder; rest are "showcase coming soon"
// preview cards that look intentional, not empty.
// =============================================================================
interface Project {
  id: string;
  title: string;
  category: "Web" | "Mobile" | "Branding" | "E-Commerce";
  client: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  status: "live" | "coming-soon";
}

const PROJECTS: Project[] = [
  {
    id: "project-01",
    title: "Client Project 01",
    category: "Web",
    client: "Confidential Client",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Prisma"],
    liveUrl: "https://arunodaya-dental-clinic-convex.vercel.app/",
    status: "live",
  },
  {
    id: "project-02",
    title: "E-Commerce Platform",
    category: "E-Commerce",
    client: "Coming Soon",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80",
    technologies: ["Next.js", "Stripe", "Cloudinary"],
    status: "coming-soon",
  },
  {
    id: "project-03",
    title: "SaaS Dashboard",
    category: "Web",
    client: "In Production",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    technologies: ["Next.js", "Recharts", "PostgreSQL"],
    status: "coming-soon",
  },
  {
    id: "project-04",
    title: "Brand Identity System",
    category: "Branding",
    client: "Studio Project",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80",
    technologies: ["Figma", "Illustrator", "After Effects"],
    status: "coming-soon",
  },
  {
    id: "project-05",
    title: "Mobile Wellness App",
    category: "Mobile",
    client: "Concept",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80",
    technologies: ["React Native", "Expo", "Firebase"],
    status: "coming-soon",
  },
  {
    id: "project-06",
    title: "Luxury Marketplace",
    category: "E-Commerce",
    client: "Concept",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
    technologies: ["Next.js", "Shopify", "GSAP"],
    status: "coming-soon",
  },
];

// =============================================================================
// 🏷️ FILTER CATEGORIES
// =============================================================================
const FILTERS = ["All", "Web", "Mobile", "Branding", "E-Commerce"] as const;
type Filter = (typeof FILTERS)[number];

// =============================================================================
// 🖼️ MAIN COMPONENT
// =============================================================================
export default function ProjectShowcase() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // ---------------------------------------------------------------------------
  // 🔍 FILTERED PROJECTS
  // ---------------------------------------------------------------------------
  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  // ---------------------------------------------------------------------------
  // 🎬 AUTO-SCROLL ANIMATION
  // ---------------------------------------------------------------------------
  useAnimationFrame((_, delta) => {
    if (isPaused || !scrollRef.current) return;

    const container = scrollRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (maxScroll <= 0) return;

    // Slow scroll: ~30px per second
    const newScroll = container.scrollLeft + (delta / 1000) * 30;

    if (newScroll >= maxScroll) {
      container.scrollLeft = 0; // Loop back
    } else {
      container.scrollLeft = newScroll;
    }
  });

  // ---------------------------------------------------------------------------
  // 📊 SCROLL PROGRESS TRACKING
  // ---------------------------------------------------------------------------
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 0) return;
      setScrollProgress((container.scrollLeft / maxScroll) * 100);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, [filteredProjects]);

  // ---------------------------------------------------------------------------
  // 🔘 ARROW BUTTONS — scroll by one card width
  // ---------------------------------------------------------------------------
  const scrollByCard = (direction: "prev" | "next") => {
    if (!scrollRef.current) return;
    const cardWidth = 460; // Approx card + gap
    scrollRef.current.scrollBy({
      left: direction === "next" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="work"
      className="relative w-full overflow-hidden py-20 sm:py-28 lg:py-36"
    >
      {/* ============== TOP GRADIENT DIVIDER ============== */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-nirvana-gold/40 to-transparent" />
      </div>

      {/* ============== BACKGROUND ============== */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-40 -left-20 w-96 h-96 rounded-full bg-nirvana-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 -right-20 w-96 h-96 rounded-full bg-nirvana-blue/5 blur-[120px] pointer-events-none" />

      {/* ============== HEADER ============== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          {/* Heading */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <span className="text-xs font-mono text-nirvana-gold/80 uppercase tracking-[0.3em]">
                03 — Selected Work
              </span>
              <span className="w-12 h-px bg-nirvana-gold/40" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-nirvana-white leading-[1.1] mb-4"
            >
              A glimpse into the{" "}
              <span className="gradient-text">experiences</span> we craft.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.8, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-nirvana-gray-400"
            >
              Hand-picked projects across web, mobile, and brand.
            </motion.p>
          </div>

          {/* Filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-2"
          >
            {FILTERS.map((filter) => (
              <FilterPill
                key={filter}
                label={filter}
                isActive={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* ============== HORIZONTAL SCROLLING SLIDER ============== */}
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-8 pb-6 cursor-grab active:cursor-grabbing"
          style={{ scrollBehavior: "auto" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragStart={() => setIsPaused(true)}
          onDragEnd={() => setIsPaused(false)}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>

          {/* Spacer at end for breathing room */}
          <div className="w-4 sm:w-8 flex-shrink-0" />
        </motion.div>

        {/* ============== CONTROLS ROW ============== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 flex items-center justify-between gap-6">
          {/* Progress bar */}
          <div className="flex-1 max-w-md">
            <div className="relative h-px bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-nirvana-gold to-nirvana-gold-light"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
            <div className="mt-2 text-[10px] font-mono text-nirvana-gray-500 uppercase tracking-widest">
              {Math.round(scrollProgress)}% — Scroll or drag to explore
            </div>
          </div>

          {/* Arrow buttons */}
          <div className="flex items-center gap-2">
            <ArrowButton direction="prev" onClick={() => scrollByCard("prev")} />
            <ArrowButton direction="next" onClick={() => scrollByCard("next")} />
          </div>
        </div>
      </div>

      {/* ============== "MORE WORK COMING" CALLOUT ============== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20 text-center"
      >
        <div className="inline-flex flex-wrap items-center justify-center gap-3 px-5 py-3 rounded-full glass border border-nirvana-gold/20">
          <Sparkles size={14} className="text-nirvana-gold" />
          <span className="text-xs sm:text-sm text-nirvana-white">
            More projects launching in 2026.
          </span>
          <Link
            href="/query"
            className="text-xs sm:text-sm font-medium text-nirvana-gold hover:underline"
          >
            Become our next case study →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

// =============================================================================
// 🏷️ FILTER PILL
// =============================================================================
interface FilterPillProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function FilterPill({ label, isActive, onClick }: FilterPillProps) {
  const { setVariant, reset } = useCursorStore();

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setVariant("button")}
      onMouseLeave={reset}
      className="relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300"
    >
      {/* Active background */}
      {isActive && (
        <motion.div
          layoutId="active-filter"
          className="absolute inset-0 rounded-full bg-gradient-to-r from-nirvana-gold to-nirvana-gold-light"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      {/* Inactive background */}
      {!isActive && (
        <div className="absolute inset-0 rounded-full glass border border-white/10 hover:border-white/20 transition-colors" />
      )}

      <span
        className={`relative z-10 ${
          isActive ? "text-nirvana-black font-semibold" : "text-nirvana-gray-300"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

// =============================================================================
// ⬅️➡️ ARROW BUTTON
// =============================================================================
interface ArrowButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
}

function ArrowButton({ direction, onClick }: ArrowButtonProps) {
  const { setVariant, reset } = useCursorStore();
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setVariant("button")}
      onMouseLeave={reset}
      aria-label={direction === "prev" ? "Previous projects" : "Next projects"}
      className="group relative w-11 h-11 rounded-full glass border border-white/10 flex items-center justify-center hover:border-nirvana-gold/40 hover:bg-nirvana-gold/10 transition-all"
    >
      <Icon
        size={16}
        className="text-nirvana-white group-hover:text-nirvana-gold transition-colors"
      />
    </button>
  );
}

// =============================================================================
// 🎴 PROJECT CARD
// =============================================================================
interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const { setVariant, reset } = useCursorStore();
  const isComingSoon = project.status === "coming-soon";

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setVariant("image", isComingSoon ? "Soon" : "View")}
      onMouseLeave={reset}
      className="group relative w-[300px] sm:w-[400px] lg:w-[440px] aspect-[3/2] flex-shrink-0 rounded-2xl overflow-hidden glass border border-white/10 hover:border-nirvana-gold/40 transition-all duration-500"
    >
      {/* ===== BACKGROUND IMAGE ===== */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 440px"
          className={`object-cover transition-all duration-700 group-hover:scale-110 ${
            isComingSoon ? "grayscale opacity-50" : ""
          }`}
        />
      </div>

      {/* ===== DARK GRADIENT OVERLAY ===== */}
      <div className="absolute inset-0 bg-gradient-to-t from-nirvana-black via-nirvana-black/60 to-nirvana-black/20" />

      {/* ===== GLOW BORDER ON HOVER ===== */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_60px_rgba(212,175,55,0.2)]" />

      {/* ===== TOP-LEFT: CATEGORY + STATUS ===== */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-nirvana-gold/90 text-nirvana-black text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
          {project.category}
        </span>

        {isComingSoon && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border border-white/20 text-nirvana-white text-[10px] sm:text-xs font-medium uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-nirvana-blue animate-pulse" />
            Coming Soon
          </span>
        )}
      </div>

      {/* ===== BOTTOM CONTENT ===== */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 space-y-3">
        {/* Client name */}
        <div className="text-[10px] sm:text-xs font-mono text-nirvana-gold/80 uppercase tracking-widest">
          {project.client}
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-nirvana-white leading-tight">
          {project.title}
        </h3>

        {/* Tech stack tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-nirvana-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* "View Live" button — appears on hover */}
        {!isComingSoon && project.liveUrl && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 pt-2"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-nirvana-gold">
              View Live
              <ArrowUpRight size={12} />
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  // Wrap in Link if live, otherwise just render
  if (!isComingSoon && project.liveUrl) {
    return (
      <Link
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0"
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}