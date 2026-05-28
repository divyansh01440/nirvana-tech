"use client";

// =============================================================================
// 🎬 NIRVANA TECH — Page Transition Wrapper
// =============================================================================
// Cinematic transitions between routes. Inspired by luxury film cuts.
//
// Flow (0.8s total):
//   0.0s → User clicks link
//   0.0s → Current page fades + slides up + blurs out (0.4s)
//   0.2s → Black overlay slides up from bottom covering screen (0.6s)
//   0.4s → "NIRVANA" logo flashes briefly in center
//   0.6s → Overlay slides up further, revealing new page
//   0.8s → Done
// =============================================================================

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState<"idle" | "exiting" | "entering">("idle");

  // ---------------------------------------------------------------------------
  // 🚦 ON ROUTE CHANGE — trigger exit, swap content, trigger enter
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (displayChildren !== children) {
      setTransitionStage("exiting");

      // After exit animation, swap children + start enter
      const swapTimer = setTimeout(() => {
        setDisplayChildren(children);
        setTransitionStage("entering");

        // After enter completes, return to idle
        const idleTimer = setTimeout(() => {
          setTransitionStage("idle");
        }, 600);

        return () => clearTimeout(idleTimer);
      }, 400);

      return () => clearTimeout(swapTimer);
    }
  }, [children, displayChildren]);

  return (
    <>
      {/* ============== PAGE CONTENT ============== */}
      <motion.div
        key={pathname}
        animate={{
          opacity: transitionStage === "exiting" ? 0 : 1,
          y: transitionStage === "exiting" ? -30 : 0,
          filter: transitionStage === "exiting" ? "blur(8px)" : "blur(0px)",
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {displayChildren}
      </motion.div>

      {/* ============== OVERLAY CURTAIN ============== */}
      <AnimatePresence mode="wait">
        {transitionStage !== "idle" && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: transitionStage === "exiting" ? "0%" : "-100%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9990] bg-nirvana-black pointer-events-none flex items-center justify-center overflow-hidden"
          >
            {/* Animated grid background in overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />

            {/* Aurora glow blobs */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute w-96 h-96 rounded-full bg-nirvana-gold/10 blur-[120px]"
            />

            {/* NIRVANA logo flash in center */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative z-10 flex flex-col items-center gap-3"
            >
              {/* Eyebrow */}
              <span className="text-[10px] uppercase tracking-[0.4em] text-nirvana-gold/70 font-mono">
                ✦ Loading ✦
              </span>

              {/* NIRVANA gradient text */}
              <span
                className="text-5xl sm:text-7xl md:text-8xl font-heading font-bold tracking-tighter"
                style={{
                  background:
                    "linear-gradient(135deg, #E8C766 0%, #D4AF37 50%, #A88A2C 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                NIRVANA
              </span>

              {/* Sub-tagline */}
              <span className="text-xs uppercase tracking-[0.3em] text-nirvana-gray-500 font-mono">
                Tech Solutions
              </span>

              {/* Animated underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-24 h-px bg-gradient-to-r from-transparent via-nirvana-gold to-transparent origin-center mt-2"
              />
            </motion.div>

            {/* Bottom decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nirvana-gold/60 to-transparent origin-center"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}