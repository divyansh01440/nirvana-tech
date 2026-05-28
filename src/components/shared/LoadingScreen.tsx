"use client";

// =============================================================================
// 🎬 NIRVANA TECH — Cinematic Loading Screen
// =============================================================================
// First-load intro animation. Sets the premium tone before the site appears.
// Inspired by: luxury brand sites, awwwards winners, Apple product reveals.
//
// Features:
//   - Full-screen black with animated gold grid background
//   - Letter-by-letter reveal of "NIRVANA"
//   - Animated gold gradient progress bar (0–100%)
//   - "Loading premium experience…" with rotating dots
//   - Curtain reveal exit (clip-path slides up)
//   - Shows only ONCE per session (sessionStorage flag)
//   - Behind custom cursor (z-9998)
// =============================================================================

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// =============================================================================
// 🔧 CONFIG
// =============================================================================
const TITLE = "NIRVANA";
const TOTAL_DURATION = 3000;   // Total time visible (ms)
const PROGRESS_DURATION = 2500; // Progress bar fill duration (ms)
const SESSION_KEY = "nirvana_loaded";

// =============================================================================
// ✨ ANIMATION VARIANTS
// =============================================================================
const containerVariants = {
  hidden: { opacity: 1 },
  exit: {
    clipPath: "inset(0% 0% 100% 0%)", // Curtain reveal (slides up)
    transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] as const },
  },
};

const letterVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.4 + i * 0.08,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

// =============================================================================
// 🎬 MAIN COMPONENT
// =============================================================================
export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [shouldRender, setShouldRender] = useState(false);

  // ---------------------------------------------------------------------------
  // 🚦 MOUNT — check session and decide whether to show
  // ---------------------------------------------------------------------------
  useEffect(() => {
    // Check if loading screen has already been shown this session
    const alreadyLoaded = sessionStorage.getItem(SESSION_KEY);

    if (alreadyLoaded) {
      // Skip — visitor already saw it
      setShouldRender(false);
      return;
    }

    // Mark as shown so it doesn't appear again until tab closes
    sessionStorage.setItem(SESSION_KEY, "true");
    setShouldRender(true);
    setIsVisible(true);

    // ---- ANIMATE PROGRESS BAR ----
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / PROGRESS_DURATION) * 100, 100);
      setProgress(pct);

      if (pct >= 100) clearInterval(progressInterval);
    }, 16); // ~60fps

    // ---- HIDE AFTER TOTAL_DURATION ----
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, TOTAL_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(hideTimer);
    };
  }, []);

  // Don't render anything if already shown this session
  if (!shouldRender) return null;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          exit="exit"
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-nirvana-black overflow-hidden"
        >
          {/* ============== ANIMATED GRID BACKGROUND ============== */}
          <div className="absolute inset-0 bg-grid-pattern-animated opacity-30" />

          {/* ============== AURORA GLOW BLOBS ============== */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-nirvana-gold/10 blur-[120px]"
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -50, 100, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-nirvana-blue/10 blur-[120px]"
            animate={{
              x: [0, -80, 50, 0],
              y: [0, 80, -50, 0],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* ============== CENTER — NIRVANA TEXT ============== */}
          <div className="relative z-10 flex flex-col items-center gap-12">
            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-nirvana-gold/70 font-heading"
            >
              ✦ Welcome to ✦
            </motion.span>

            {/* Letter-by-letter NIRVANA */}
            <div
              className="flex overflow-hidden"
              style={{ perspective: "1000px" }}
            >
              {TITLE.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                 className="text-5xl sm:text-7xl md:text-9xl font-heading font-bold text-nirvana-white inline-block"
                  style={{
                    background:
                      "linear-gradient(135deg, #E8C766 0%, #D4AF37 50%, #A88A2C 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Sub-tagline */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="text-sm md:text-base text-nirvana-gray-400 font-body tracking-widest uppercase"
            >
              Tech Solutions
            </motion.span>
          </div>

          {/* ============== PROGRESS BAR ============== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[280px] md:w-[400px] flex flex-col gap-3"
          >
            <div className="flex justify-between items-center text-xs font-mono text-nirvana-gray-500">
              <span>LOADING</span>
              <span className="tabular-nums text-nirvana-gold">
                {Math.floor(progress).toString().padStart(3, "0")}%
              </span>
            </div>
            <div className="relative h-[2px] bg-nirvana-gray-800 overflow-hidden rounded-full">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-nirvana-gold-dark via-nirvana-gold to-nirvana-gold-light"
                style={{ width: `${progress}%` }}
              />
              {/* Shimmer effect on the progress bar */}
              <motion.div
                className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "500%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>

          {/* ============== BOTTOM RIGHT — STATUS TEXT ============== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="absolute bottom-6 right-6 flex items-center gap-2 text-xs font-mono text-nirvana-gray-500"
          >
            <span>Loading premium experience</span>
            <span className="flex gap-0.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  .
                </motion.span>
              ))}
            </span>
          </motion.div>

          {/* ============== BOTTOM LEFT — VERSION/CREDIT ============== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="absolute bottom-6 left-6 text-xs font-mono text-nirvana-gray-600"
          >
            <span className="text-nirvana-gold">●</span> v1.0
          </motion.div>

          {/* ============== TOP CORNERS — DECORATIVE BRACKETS ============== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute top-6 left-6 w-6 h-6 border-l-2 border-t-2 border-nirvana-gold/40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute top-6 right-6 w-6 h-6 border-r-2 border-t-2 border-nirvana-gold/40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute bottom-6 left-6 w-6 h-6 border-l-2 border-b-2 border-nirvana-gold/40 -mb-px"
            style={{ marginBottom: "-1px" }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute bottom-6 right-6 w-6 h-6 border-r-2 border-b-2 border-nirvana-gold/40"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}