"use client";

// =============================================================================
// 🖱️ NIRVANA TECH — Custom Cursor
// =============================================================================
// Premium animated cursor that morphs based on hovered elements.
// Inspired by: cuberto.com, lusion.co, awwwards winners.
//
// Features:
//   - Outer ring (rotates slowly, follows mouse with spring)
//   - Inner dot (lags behind for elegant trail effect)
//   - 6 variants: default, hover, button, text, image, hidden
//   - Click ripple effect (expanding gold ring)
//   - Particle trail (5 small dots fading behind cursor)
//   - Magnetic snap to [data-magnetic="true"] elements
//   - Auto-disabled on touch devices
// =============================================================================

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useCursorStore } from "@/store/cursorStore";

// =============================================================================
// 🔧 CONFIG
// =============================================================================
const SPRING_CONFIG = { damping: 25, stiffness: 350, mass: 0.5 };
const SPRING_CONFIG_SLOW = { damping: 35, stiffness: 200, mass: 0.8 };
const TRAIL_LENGTH = 5;

// =============================================================================
// 🎨 VARIANT STYLES — Tailwind classes per cursor state
// =============================================================================
const variantStyles = {
  default: {
    ring: "w-10 h-10 border-2 border-nirvana-gold",
    dot: "w-2 h-2 bg-nirvana-gold",
    scale: 1,
    mixBlend: "normal" as const,
  },
  hover: {
    ring: "w-16 h-16 border-2 border-nirvana-blue shadow-glow-blue",
    dot: "w-2 h-2 bg-nirvana-blue",
    scale: 1.2,
    mixBlend: "normal" as const,
  },
  button: {
    ring: "w-20 h-20 border-0 bg-nirvana-gold",
    dot: "w-0 h-0 bg-transparent",
    scale: 1.4,
    mixBlend: "difference" as const,
  },
  text: {
    ring: "w-1 h-10 border-0 bg-nirvana-gold rounded-sm",
    dot: "w-0 h-0 bg-transparent",
    scale: 1,
    mixBlend: "normal" as const,
  },
  image: {
    ring: "w-24 h-24 border-2 border-nirvana-gold bg-nirvana-black/40 backdrop-blur-sm",
    dot: "w-0 h-0 bg-transparent",
    scale: 1,
    mixBlend: "normal" as const,
  },
  hidden: {
    ring: "w-10 h-10 border-2 border-nirvana-gold opacity-0",
    dot: "w-2 h-2 bg-nirvana-gold opacity-0",
    scale: 0.5,
    mixBlend: "normal" as const,
  },
};

// =============================================================================
// 🪄 MAIN COMPONENT
// =============================================================================
export default function CustomCursor() {
  const { variant, text } = useCursorStore();

  // Motion values for cursor position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Springs — outer ring (snappy), inner dot (slower, creates lag)
  const ringX = useSpring(cursorX, SPRING_CONFIG);
  const ringY = useSpring(cursorY, SPRING_CONFIG);
  const dotX = useSpring(cursorX, SPRING_CONFIG_SLOW);
  const dotY = useSpring(cursorY, SPRING_CONFIG_SLOW);

  // Local UI state
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // assume touch initially (safer for SSR)
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [trail, setTrail] = useState<{ id: number; x: number; y: number }[]>([]);

  const trailIndex = useRef(0);
  const lastTrailTime = useRef(0);

  // ---------------------------------------------------------------------------
  // 📱 TOUCH DEVICE DETECTION — disable cursor on phones/tablets
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const checkTouch = () => {
      const isTouch =
        window.matchMedia("(hover: none)").matches ||
        window.matchMedia("(pointer: coarse)").matches;
      setIsTouchDevice(isTouch);
    };

    checkTouch();
    const mql = window.matchMedia("(hover: none)");
    mql.addEventListener("change", checkTouch);
    return () => mql.removeEventListener("change", checkTouch);
  }, []);

  // ---------------------------------------------------------------------------
  // 🖱️ MOUSE MOVE HANDLER — updates cursor position + magnetic snap + trail
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      let x = e.clientX;
      let y = e.clientY;

      // ---- MAGNETIC SNAP ----
      const target = e.target as HTMLElement;
      const magnetic = target?.closest('[data-magnetic="true"]') as HTMLElement | null;

      if (magnetic) {
        const rect = magnetic.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        // Pull cursor 40% toward the center of the magnetic element
        x = x + (centerX - x) * 0.4;
        y = y + (centerY - y) * 0.4;
      }

      cursorX.set(x);
      cursorY.set(y);

      // First time mouse moves — reveal cursor
      if (!isVisible) setIsVisible(true);

      // ---- PARTICLE TRAIL ----
      const now = Date.now();
      if (now - lastTrailTime.current > 40) {
        lastTrailTime.current = now;
        setTrail((prev) => {
          const next = [...prev, { id: trailIndex.current++, x: e.clientX, y: e.clientY }];
          return next.slice(-TRAIL_LENGTH);
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY, isVisible, isTouchDevice]);

  // ---------------------------------------------------------------------------
  // 💥 CLICK RIPPLE EFFECT
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseDown = (e: MouseEvent) => {
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      // Auto-remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    };

    window.addEventListener("mousedown", handleMouseDown);
    return () => window.removeEventListener("mousedown", handleMouseDown);
  }, [isTouchDevice]);

  // ---------------------------------------------------------------------------
  // 👻 EARLY EXIT FOR TOUCH DEVICES
  // ---------------------------------------------------------------------------
  if (isTouchDevice) return null;

  const currentVariant = variantStyles[variant];

  // ---------------------------------------------------------------------------
  // 🎨 RENDER
  // ---------------------------------------------------------------------------
  return (
    <>
      {/* ============== PARTICLE TRAIL ============== */}
      {trail.map((particle, index) => (
        <motion.div
          key={particle.id}
          className="fixed top-0 left-0 pointer-events-none z-[9997]"
          initial={{ opacity: (index + 1) / TRAIL_LENGTH * 0.4, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            x: particle.x - 2,
            y: particle.y - 2,
          }}
        >
          <div className="w-1 h-1 rounded-full bg-nirvana-gold" />
        </motion.div>
      ))}

      {/* ============== CLICK RIPPLES ============== */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="fixed top-0 left-0 pointer-events-none z-[9998]"
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: 0, scale: 3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              x: ripple.x - 20,
              y: ripple.y - 20,
            }}
          >
            <div className="w-10 h-10 rounded-full border-2 border-nirvana-gold" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* ============== INNER DOT (lags behind) ============== */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.3 } }}
      >
        <motion.div
          className={`rounded-full transition-all duration-300 ${currentVariant.dot}`}
          style={{ mixBlendMode: currentVariant.mixBlend }}
        />
      </motion.div>

      {/* ============== OUTER RING (rotates) ============== */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: currentVariant.scale,
        }}
        transition={{
          opacity: { duration: 0.3 },
          scale: { type: "spring", damping: 20, stiffness: 300 },
        }}
      >
        {/* Rotating outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className={`rounded-full flex items-center justify-center transition-all duration-300 ${currentVariant.ring}`}
          style={{ mixBlendMode: currentVariant.mixBlend }}
        >
          {/* Optional text inside cursor (for 'image' variant) */}
          <AnimatePresence>
            {variant === "image" && text && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="text-xs font-heading font-medium text-nirvana-gold uppercase tracking-widest"
              >
                {text}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}