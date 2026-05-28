// =============================================================================
// 🧰 NIRVANA TECH — Utility Functions
// =============================================================================
// Reusable helpers used across the entire app.
// Import like: import { cn, formatDate } from "@/lib/utils";
// =============================================================================

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// =============================================================================
// 1. cn() — Merge Tailwind classes intelligently
// =============================================================================
// Used by every component. Combines clsx + tailwind-merge so conflicting
// classes get resolved properly (e.g., "p-2 p-4" → "p-4")
//
// Usage:
//   <div className={cn("p-4 text-white", isActive && "bg-gold")} />
// =============================================================================
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// =============================================================================
// 2. formatDate() — Human-readable date
// =============================================================================
// Usage:
//   formatDate(new Date())        → "Jan 15, 2026"
//   formatDate("2025-12-25")      → "Dec 25, 2025"
//   formatDate(date, "long")      → "January 15, 2026"
//   formatDate(date, "relative")  → "2 hours ago"
// =============================================================================
export function formatDate(
  date: Date | string | number,
  variant: "short" | "long" | "relative" = "short"
): string {
  const d = new Date(date);

  if (isNaN(d.getTime())) return "Invalid date";

  if (variant === "relative") {
    const now = new Date();
    const diff = (now.getTime() - d.getTime()) / 1000; // seconds

    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    if (diff < 2592000) return `${Math.floor(diff / 604800)}w ago`;
    if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`;
    return `${Math.floor(diff / 31536000)}y ago`;
  }

  const options: Intl.DateTimeFormatOptions =
    variant === "long"
      ? { year: "numeric", month: "long", day: "numeric" }
      : { year: "numeric", month: "short", day: "numeric" };

  return d.toLocaleDateString("en-US", options);
}

// =============================================================================
// 3. formatCurrency() — Currency formatter with Indian/global support
// =============================================================================
// Usage:
//   formatCurrency(100000)         → "₹1,00,000"
//   formatCurrency(1500, "USD")    → "$1,500"
//   formatCurrency(2999, "EUR")    → "€2,999"
// =============================================================================
export function formatCurrency(
  amount: number,
  currency: "INR" | "USD" | "EUR" | "GBP" = "INR"
): string {
  const localeMap: Record<string, string> = {
    INR: "en-IN",
    USD: "en-US",
    EUR: "en-DE",
    GBP: "en-GB",
  };

  try {
    return new Intl.NumberFormat(localeMap[currency], {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
}

// =============================================================================
// 4. truncate() — Cut long text with ellipsis
// =============================================================================
// Usage:
//   truncate("Hello world", 5)    → "Hello…"
//   truncate("Short", 10)         → "Short"
// =============================================================================
export function truncate(text: string, length: number): string {
  if (!text) return "";
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + "…";
}

// =============================================================================
// 5. slugify() — URL-friendly slug
// =============================================================================
// Usage:
//   slugify("Hello World!")        → "hello-world"
//   slugify("Web Dev & SEO")       → "web-dev-and-seo"
// =============================================================================
export function slugify(text: string): string {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "-and-")          // & → "and"
    .replace(/[^\w\s-]/g, "")        // remove special chars
    .replace(/[\s_-]+/g, "-")        // spaces/underscores → hyphens
    .replace(/^-+|-+$/g, "");        // trim leading/trailing hyphens
}

// =============================================================================
// 6. getInitials() — Avatar initials from a name
// =============================================================================
// Usage:
//   getInitials("Aarav Sharma")         → "AS"
//   getInitials("Priya Mehta Singh")    → "PS"  (first + last)
//   getInitials("Madonna")              → "MA"
// =============================================================================
export function getInitials(name: string): string {
  if (!name) return "??";

  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// =============================================================================
// 7. generateOTP() — Random 6-digit OTP
// =============================================================================
// Used for 2FA email verification on admin login.
//
// Usage:
//   generateOTP()     → "483921"
//   generateOTP(4)    → "1837"
// =============================================================================
export function generateOTP(length: number = 6): string {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
}

// =============================================================================
// 8. sleep() — Promise-based delay
// =============================================================================
// Usage:
//   await sleep(1000);  // wait 1 second
// =============================================================================
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// =============================================================================
// 9. getDeviceInfo() — Parse user agent for security/analytics
// =============================================================================
// Returns: { device, browser, os }
// Used to log admin login attempts and analytics.
//
// Usage:
//   const info = getDeviceInfo(navigator.userAgent);
//   // { device: "Desktop", browser: "Chrome", os: "Windows" }
// =============================================================================
export interface DeviceInfo {
  device: "Mobile" | "Tablet" | "Desktop";
  browser: string;
  os: string;
}

export function getDeviceInfo(userAgent?: string): DeviceInfo {
  const ua = userAgent || (isClient() ? navigator.userAgent : "");

  // Device type
  let device: DeviceInfo["device"] = "Desktop";
  if (/Mobi|Android|iPhone/i.test(ua)) device = "Mobile";
  else if (/Tablet|iPad/i.test(ua)) device = "Tablet";

  // Browser
  let browser = "Unknown";
  if (/Edg\//.test(ua)) browser = "Edge";
  else if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) browser = "Chrome";
  else if (/Firefox\//.test(ua)) browser = "Firefox";
  else if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) browser = "Safari";
  else if (/OPR\//.test(ua) || /Opera/.test(ua)) browser = "Opera";

  // OS
  let os = "Unknown";
  if (/Windows/i.test(ua)) os = "Windows";
  else if (/Mac OS X/i.test(ua) && !/iPhone|iPad/i.test(ua)) os = "macOS";
  else if (/Linux/i.test(ua) && !/Android/i.test(ua)) os = "Linux";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";

  return { device, browser, os };
}

// =============================================================================
// 10. isClient() — Check if running in browser
// =============================================================================
// Useful for SSR-safe code that uses window/document.
//
// Usage:
//   if (isClient()) { localStorage.getItem(...) }
// =============================================================================
export function isClient(): boolean {
  return typeof window !== "undefined";
}

// =============================================================================
// 🎁 BONUS UTILITIES (handy extras you'll thank me for later)
// =============================================================================

// Capitalize first letter
export function capitalize(text: string): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Convert bytes to human-readable size
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i];
}

// Random ID generator (when cuid isn't needed)
export function randomId(prefix: string = "id"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 11)}`;
}

// Safe JSON parse (won't throw)
export function safeJsonParse<T = unknown>(
  json: string,
  fallback: T
): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

// Debounce — delay a function until it stops being called
// Usage: const search = debounce(handleSearch, 500);
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Throttle — call a function at most once per interval
// Usage: const onScroll = throttle(handleScroll, 100);
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
}
