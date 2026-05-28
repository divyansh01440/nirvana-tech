"use client";

// =============================================================================
// 🌍 WORLD MAP — Fake "tracing connection" map with pulses
// =============================================================================

import { useEffect, useState } from "react";

// Pre-defined cities so pulses look intentional
const CITIES = [
  { name: "Moscow", x: 60, y: 25 },
  { name: "Beijing", x: 78, y: 38 },
  { name: "Mumbai", x: 67, y: 50 },
  { name: "Lagos", x: 47, y: 58 },
  { name: "Sydney", x: 85, y: 78 },
  { name: "Sao Paulo", x: 32, y: 70 },
  { name: "London", x: 47, y: 28 },
  { name: "Tokyo", x: 84, y: 38 },
  { name: "New York", x: 25, y: 35 },
  { name: "Cairo", x: 56, y: 45 },
];

interface Pulse {
  id: number;
  x: number;
  y: number;
  city: string;
}

let pulseId = 0;

export default function WorldMap() {
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const [trace, setTrace] = useState<string>("Initializing...");

  useEffect(() => {
    const interval = setInterval(() => {
      const city = CITIES[Math.floor(Math.random() * CITIES.length)];
      const newPulse: Pulse = {
        id: pulseId++,
        x: city.x,
        y: city.y,
        city: city.name,
      };
      setPulses((prev) => [...prev.slice(-4), newPulse]);
      setTrace(`Tracing: ${city.name}`);

      // Remove pulse after animation
      setTimeout(() => {
        setPulses((prev) => prev.filter((p) => p.id !== newPulse.id));
      }, 3000);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-green-500/20 pb-2 mb-3">
        <div className="text-[10px] uppercase tracking-[0.3em] text-green-500/60">
          ── Trace Network
        </div>
        <div className="text-xs text-green-400/80 mt-1 font-bold truncate">
          {trace}
        </div>
      </div>

      {/* Map */}
      <div className="relative aspect-[4/3] bg-black/40 rounded border border-green-500/20 overflow-hidden mb-3">
        {/* World map outline using dots (faux-map) */}
        <svg
          viewBox="0 0 100 70"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Continents as dot patterns */}
          {Array.from({ length: 200 }).map((_, i) => {
            const x = Math.random() * 100;
            const y = Math.random() * 70;
            // Simulate continent shapes by clustering
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={0.3}
                fill="rgba(0, 255, 0, 0.2)"
              />
            );
          })}

          {/* Grid lines */}
          {[20, 40, 60, 80].map((y) => (
            <line
              key={`h-${y}`}
              x1="0"
              y1={y * 0.7}
              x2="100"
              y2={y * 0.7}
              stroke="rgba(0, 255, 0, 0.05)"
              strokeWidth="0.1"
            />
          ))}
          {[20, 40, 60, 80].map((x) => (
            <line
              key={`v-${x}`}
              x1={x}
              y1="0"
              x2={x}
              y2="70"
              stroke="rgba(0, 255, 0, 0.05)"
              strokeWidth="0.1"
            />
          ))}

          {/* Active pulses */}
          {pulses.map((pulse) => (
            <g key={pulse.id}>
              <circle
                cx={pulse.x}
                cy={pulse.y * 0.7}
                r="2"
                fill="#ef4444"
                opacity="0.8"
              >
                <animate
                  attributeName="r"
                  from="0"
                  to="5"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="1"
                  to="0"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                cx={pulse.x}
                cy={pulse.y * 0.7}
                r="0.8"
                fill="#fca5a5"
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Stats */}
      <div className="space-y-2 text-[10px]">
        <div className="flex justify-between">
          <span className="text-green-500/60">Nodes scanned:</span>
          <span className="text-green-300 font-bold">42,891</span>
        </div>
        <div className="flex justify-between">
          <span className="text-green-500/60">Active threats:</span>
          <span className="text-red-400 font-bold animate-pulse">1</span>
        </div>
        <div className="flex justify-between">
          <span className="text-green-500/60">Countries pinged:</span>
          <span className="text-green-300 font-bold">{pulses.length}/247</span>
        </div>
        <div className="flex justify-between">
          <span className="text-green-500/60">Origin:</span>
          <span className="text-yellow-400 font-bold">UNKNOWN</span>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-green-500/20 pt-2 mt-auto text-[10px] text-green-500/40 font-mono">
        <div className="flex items-center justify-between">
          <span>LIVE FEED</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            TRACING
          </span>
        </div>
      </div>
    </div>
  );
}