"use client";

// =============================================================================
// 🌌 NIRVANA TECH — Gradient Orbs Background
// =============================================================================
// Animated gradient orbs that float in the background.
// Replaces the heavy 3D scene with a lighter, more elegant alternative.
// Inspired by Stripe, Framer, Linear hero backgrounds.
//
// Performance: pure CSS + Framer Motion (no GPU-heavy 3D).
// =============================================================================

import { motion } from "framer-motion";

export default function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* ============== ORB 1 — Top-left gold ============== */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-nirvana-gold/15 blur-[120px]"
      />

      {/* ============== ORB 2 — Right blue ============== */}
      <motion.div
        animate={{
          x: [0, -100, 60, 0],
          y: [0, 80, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[20%] right-[5%] w-[450px] h-[450px] rounded-full bg-nirvana-blue/15 blur-[120px]"
      />

      {/* ============== ORB 3 — Bottom center gold-blue mix ============== */}
      <motion.div
        animate={{
          x: [0, 60, -80, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.2, 0.85, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-nirvana-gold/10 via-nirvana-blue/10 to-transparent blur-[140px]"
      />

      {/* ============== ORB 4 — Small accent (top-right) ============== */}
      <motion.div
        animate={{
          opacity: [0.4, 0.8, 0.4],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[30%] right-[20%] w-[200px] h-[200px] rounded-full bg-nirvana-gold/20 blur-[80px]"
      />

      {/* ============== ORB 5 — Small accent (bottom-left) ============== */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-[20%] left-[15%] w-[250px] h-[250px] rounded-full bg-nirvana-blue/20 blur-[90px]"
      />

      {/* ============== SUBTLE ANIMATED GRID ============== */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* ============== AURORA SWEEP (subtle horizontal motion) ============== */}
      <motion.div
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/2 -translate-y-1/2 w-[150%] h-[200px] bg-gradient-to-r from-transparent via-nirvana-gold/5 to-transparent blur-[60px]"
      />
    </div>
  );
}