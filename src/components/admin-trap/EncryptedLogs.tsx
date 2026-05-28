"use client";

// =============================================================================
// 📜 ENCRYPTED LOGS — Fake scrolling log entries (left sidebar)
// =============================================================================

import { useEffect, useState } from "react";

const FAKE_LOGS = [
  "INTRUSION DETECTED: 0x4F9A2C",
  "Honeypot triggered (admin)",
  "Browser: Chrome/127.0.0",
  "Sandbox: ENABLED",
  "Encryption: AES-256-GCM",
  "Reversing fingerprint...",
  "Cross-ref: Tor exit node",
  "[REDACTED] activity logged",
  "Spawning audit thread #4421",
  "DDoS protection: ACTIVE",
  "Auth attempts: 1/3",
  "PORT 22: Blocked",
  "PORT 80: Monitored",
  "PORT 443: Monitored",
  "PORT 3306: Blocked",
  "Tracing route hops...",
  "Hop 1: 192.168.1.1",
  "Hop 2: ███████████",
  "Hop 3: [CLASSIFIED]",
  "Geo-fence: bypassed",
  "WAF: 247 rules active",
  "Zero-day patches: UP",
  "SOC alerted: Tier-2",
  "VPN detection: TRUE",
  "Captcha bypass: BLOCKED",
  "Credential spray: 0",
  "Brute force: 0",
  "SQL injection: BLOCKED",
  "XSS attempt: BLOCKED",
  "CSRF token: VALID",
  "Rate limit: ACTIVE",
  "Bot signature: HUMAN",
  "Risk score: 84/100",
];

interface LogEntry {
  id: number;
  text: string;
  level: "info" | "warn" | "danger";
  timestamp: string;
}

let entryId = 0;

export default function EncryptedLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const generateLog = (): LogEntry => {
      const text = FAKE_LOGS[Math.floor(Math.random() * FAKE_LOGS.length)];
      const levels: LogEntry["level"][] = ["info", "info", "info", "warn", "danger"];
      const level = levels[Math.floor(Math.random() * levels.length)];
      const now = new Date();
      const timestamp = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
      return { id: entryId++, text, level, timestamp };
    };

    // Seed initial logs
    setLogs(Array.from({ length: 10 }, () => generateLog()));

    // Add new log every 800-1500ms
    const interval = setInterval(() => {
      setLogs((prev) => {
        const newLog = generateLog();
        const updated = [newLog, ...prev];
        return updated.slice(0, 25); // Keep max 25 visible
      });
    }, 800 + Math.random() * 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-green-500/20 pb-2 mb-3">
        <div className="text-[10px] uppercase tracking-[0.3em] text-green-500/60">
          ── Encrypted Logs
        </div>
        <div className="text-xs text-green-400/80 mt-1 font-bold">
          /var/log/firewall
        </div>
      </div>

      {/* Logs */}
      <div className="flex-1 overflow-hidden space-y-1.5">
        {logs.map((log) => (
          <div
            key={log.id}
            className="text-[10px] leading-tight flex gap-2 animate-in fade-in slide-in-from-top-1 duration-300"
          >
            <span className="text-green-700 flex-shrink-0">{log.timestamp}</span>
            <span
              className={`flex-1 ${
                log.level === "danger"
                  ? "text-red-400"
                  : log.level === "warn"
                  ? "text-yellow-400"
                  : "text-green-400/80"
              }`}
            >
              {log.text}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-green-500/20 pt-2 mt-2 text-[10px] text-green-500/40 font-mono">
        <div className="flex items-center justify-between">
          <span>STREAMING</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            LIVE
          </span>
        </div>
      </div>
    </div>
  );
}