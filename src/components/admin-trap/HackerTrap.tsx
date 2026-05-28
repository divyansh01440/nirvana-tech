"use client";

// =============================================================================
// 🪤 NIRVANA TECH — Hacker Trap (Fake Admin Honeypot)
// =============================================================================
// Theatrical "hack defense" page for /admin route.
// Pure entertainment — no real tracking, no real logging.
// =============================================================================

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Volume2,
  VolumeX,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Lock,
} from "lucide-react";
import MatrixRain from "./MatrixRain";
import EncryptedLogs from "./EncryptedLogs";
import WorldMap from "./WorldMap";

// =============================================================================
// 🎬 BOOT SEQUENCE LINES
// =============================================================================
const BOOT_LINES = [
  { text: "> Initializing security protocol...", delay: 400 },
  { text: "> Scanning incoming connection...", delay: 600 },
  { text: "> IP: 192.168.███.███", delay: 500 },
  { text: "> Location: Resolving GPS coordinates...", delay: 700 },
  { text: "> Device fingerprint: 0xA8F2C9D4E1B0", delay: 500 },
  { text: "> Threat level: ELEVATED ⚠️", delay: 600, type: "warning" },
  { text: "> Cross-referencing with INTERPOL database...", delay: 800 },
  { text: "[LOADING]", delay: 1500, type: "loader" },
  { text: "> Match found: 0 results", delay: 500, type: "success" },
  { text: "> Pulling browser history...", delay: 600 },
  { text: "> Activating Nirvana Firewall v9.2...", delay: 700 },
  { text: "> Initiating countermeasures...", delay: 600 },
  { text: "> 🔒 SYSTEM LOCKED 🔒", delay: 800, type: "alert" },
] as const;

// =============================================================================
// 🪤 MAIN COMPONENT
// =============================================================================
export default function HackerTrap() {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<typeof BOOT_LINES[number][]>([]);
  const [showFinale, setShowFinale] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [incidentId, setIncidentId] = useState("");

  // ---------------------------------------------------------------------------
  // 🕐 Mark as mounted + update clock + generate stable incident ID
  // ---------------------------------------------------------------------------
  useEffect(() => {
    setMounted(true);

    // Generate incident ID once on client (avoid SSR mismatch)
    setIncidentId(Math.random().toString(36).substring(2, 10).toUpperCase());

    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // ---------------------------------------------------------------------------
  // 🎬 Auto-type the boot sequence
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (currentLine >= BOOT_LINES.length) {
      setTimeout(() => setShowFinale(true), 400);
      return;
    }

    const line = BOOT_LINES[currentLine];
    const timer = setTimeout(() => {
      setDisplayedLines((prev) => [...prev, line]);
      setCurrentLine((c) => c + 1);
    }, line.delay);

    return () => clearTimeout(timer);
  }, [currentLine]);

  // ---------------------------------------------------------------------------
  // ⚡ Random glitch effect (every 4-8 seconds)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const triggerGlitch = () => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.5) triggerGlitch();
    }, 4000 + Math.random() * 4000);

    return () => clearInterval(interval);
  }, []);

  // ---------------------------------------------------------------------------
  // 🔊 Audio control (subtle typing/static loop)
  // ---------------------------------------------------------------------------
  const toggleSound = () => {
    if (!audioRef.current) return;
    if (soundOn) {
      audioRef.current.pause();
    } else {
      audioRef.current.volume = 0.15;
      audioRef.current.play().catch(() => {
        // Browsers block autoplay — silently fail
      });
    }
    setSoundOn(!soundOn);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black text-green-400 font-mono overflow-hidden">
      {/* ============== MATRIX RAIN BACKGROUND ============== */}
      <MatrixRain />

      {/* ============== SCANLINES OVERLAY ============== */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-20"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(0, 255, 0, 0.03) 0px, rgba(0, 255, 0, 0.03) 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* ============== VIGNETTE ============== */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-radial-vignette opacity-80" />

      {/* ============== TOP STATUS BAR ============== */}
      <div className="absolute top-0 left-0 right-0 z-30 px-4 py-3 flex items-center justify-between text-xs border-b border-green-500/20 bg-black/40 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
              <span className="relative rounded-full w-2 h-2 bg-red-500" />
            </span>
            <span className="text-red-400 font-bold tracking-widest">● REC</span>
          </div>

          <span className="hidden sm:inline text-green-500/70">
            NIRVANA-FIREWALL v9.2.1
          </span>
          <span className="hidden md:inline text-green-500/40">
            UPTIME: 99.99%
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            className="p-1 hover:bg-green-500/10 rounded transition-colors"
            aria-label="Toggle sound"
          >
            {soundOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>
          <span
            className="text-green-500/50 hidden sm:inline tabular-nums"
            suppressHydrationWarning
          >
            {mounted ? currentTime : "00:00:00"}
          </span>
        </div>
      </div>

      {/* ============== LEFT SIDEBAR: ENCRYPTED LOGS ============== */}
      <div className="hidden lg:block absolute left-0 top-12 bottom-0 w-72 z-20 border-r border-green-500/10 bg-black/30 backdrop-blur-sm p-4 overflow-hidden">
        <EncryptedLogs />
      </div>

      {/* ============== RIGHT SIDEBAR: WORLD MAP ============== */}
      <div className="hidden xl:block absolute right-0 top-12 bottom-0 w-80 z-20 border-l border-green-500/10 bg-black/30 backdrop-blur-sm p-4">
        <WorldMap />
      </div>

      {/* ============== MAIN TERMINAL CARD ============== */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-4 py-16 lg:px-80 xl:px-96">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: glitch ? [0, -3, 3, -2, 2, 0] : 0,
          }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          {/* ===== TERMINAL WINDOW ===== */}
          <div
            className={`relative bg-black/80 border border-green-500/40 rounded-lg overflow-hidden backdrop-blur-md shadow-[0_0_60px_rgba(0,255,0,0.15)] ${
              glitch ? "animate-pulse" : ""
            }`}
            style={{
              filter: glitch ? "hue-rotate(15deg) saturate(2)" : "none",
            }}
          >
            {/* Terminal header */}
            <div className="flex items-center justify-between gap-2 px-4 py-2 bg-green-500/10 border-b border-green-500/30">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-green-400" />
                <span className="text-xs text-green-300 font-bold tracking-wider">
                  root@nirvana-firewall:~$
                </span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
            </div>

            {/* Terminal body */}
            <div className="p-4 sm:p-6 min-h-[400px] max-h-[60vh] overflow-y-auto">
              {/* Boot sequence */}
              {displayedLines.map((line, i) => (
                <BootLine key={i} line={line} />
              ))}

              {/* Cursor blink (while typing) */}
              {!showFinale && currentLine < BOOT_LINES.length && (
                <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1 align-middle" />
              )}

              {/* Finale message */}
              <AnimatePresence>
                {showFinale && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mt-6 pt-6 border-t border-green-500/30 space-y-4"
                  >
                    {/* Lock icon */}
                    <div className="flex justify-center">
                      <motion.div
                        animate={{
                          rotate: [0, -5, 5, -5, 0],
                          scale: [1, 1.1, 1, 1.1, 1],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                        className="w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center bg-red-500/10"
                      >
                        <Lock size={28} className="text-red-400" />
                      </motion.div>
                    </div>

                    {/* Headline */}
                    <h1
                      className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-green-300 tracking-wider"
                      style={{ textShadow: "0 0 20px rgba(0, 255, 0, 0.5)" }}
                    >
                      Nice Try, Hacker 😎
                    </h1>

                    <p className="text-center text-green-400/80 text-sm sm:text-base">
                      This isn&apos;t the admin page you&apos;re looking for.
                    </p>

                    <p className="text-center text-green-500/60 text-xs sm:text-sm italic">
                      But hey, we appreciate the curiosity.
                      <br />
                      Maybe send us your resume instead? 📄
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <Link
                        href="/"
                        className="group flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded border border-green-500/40 bg-green-500/10 hover:bg-green-500/20 hover:border-green-500/70 transition-all text-green-300 text-sm font-medium"
                      >
                        <ArrowLeft
                          size={14}
                          className="transition-transform group-hover:-translate-x-1"
                        />
                        Back to safety
                      </Link>

                      <Link
                        href="/nirvana-tech-admin"
                        className="group flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded border border-yellow-500/40 bg-yellow-500/10 hover:bg-yellow-500/20 hover:border-yellow-500/70 transition-all text-yellow-300 text-sm font-medium"
                      >
                        I&apos;m not a hacker, I work here
                        <ArrowRight
                          size={14}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    </div>

                    {/* Easter egg footer */}
                    <p
                      className="text-center text-green-600/40 text-[10px] font-mono pt-4"
                      suppressHydrationWarning
                    >
                      This incident has been logged: #
                      {incidentId || "XXXXXXXX"}
                      <br />
                      Just kidding 😘 — we don&apos;t log anything.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Below-terminal warning */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-yellow-500/70 px-2">
            <AlertTriangle size={12} />
            <span>
              All access attempts are theatrical. Real security elsewhere.
            </span>
          </div>
        </motion.div>
      </div>

      {/* ============== AUDIO ELEMENT ============== */}
      <audio ref={audioRef} loop preload="none">
        <source
          src="data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA="
          type="audio/wav"
        />
      </audio>
    </div>
  );
}

// =============================================================================
// 🖊️ BOOT LINE — animated typing for each line
// =============================================================================
interface BootLineProps {
  line: typeof BOOT_LINES[number];
}

function BootLine({ line }: BootLineProps) {
  const isLoader = "type" in line && line.type === "loader";
  const isWarning = "type" in line && line.type === "warning";
  const isAlert = "type" in line && line.type === "alert";
  const isSuccess = "type" in line && line.type === "success";

  if (isLoader) {
    return (
      <div className="my-2 flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-green-500/20 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.3, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-green-400 to-emerald-400"
          />
        </div>
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="text-xs text-green-300"
        >
          100%
        </motion.span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`text-sm sm:text-base leading-relaxed ${
        isAlert
          ? "text-red-400 font-bold animate-pulse"
          : isWarning
          ? "text-yellow-400 font-semibold"
          : isSuccess
          ? "text-emerald-400"
          : "text-green-400"
      }`}
    >
      {line.text}
    </motion.div>
  );
}