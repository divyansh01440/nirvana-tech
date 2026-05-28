// =============================================================================
// 🧭 NIRVANA TECH — Site Constants
// =============================================================================
// Centralized config — change values here and they update everywhere.
// Import: import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";
// =============================================================================

import type { Variants } from "framer-motion";

// =============================================================================
// 🌐 SITE CONFIG — Meta info, used in <head> and OG tags
// =============================================================================
export const SITE_CONFIG = {
  name: "Nirvana Tech Solutions",
  shortName: "Nirvana Tech",
  tagline: "We Build Digital Experiences That Feel Alive.",
  description:
    "Nirvana Tech Solutions creates futuristic websites, digital systems, and growth experiences for modern businesses. Based in Bhopal, serving the world.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://nirvanatech.com",
  ogImage: "/og-image.png",
  keywords: [
    "web design agency",
    "digital agency Bhopal",
    "Next.js development",
    "premium website design",
    "SEO services India",
    "e-commerce development",
    "software development",
    "digital marketing",
  ],
  authors: [
    {
      name: "Nirvana Tech Team",
      url: "https://nirvanatech.com",
    },
  ],
  creator: "Nirvana Tech Solutions",
} as const;

// =============================================================================
// 🧭 NAV LINKS — Main navigation menu
// =============================================================================
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Query", href: "/query" },
] as const;

// =============================================================================
// 🔗 SOCIAL LINKS — Footer + contact icons
// =============================================================================
export const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/nirvanatech",
    icon: "Linkedin",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/nirvanatech",
    icon: "Twitter",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/nirvana_tech_solution?igsh=dXRpZHJ6bm5qbGcz",
    icon: "Instagram",
  },
  {
    name: "GitHub",
    href: "https://github.com/divyansh01440",
    icon: "Github",
  },
  {
    name: "Dribbble",
    href: "https://dribbble.com/nirvanatech07",
    icon: "Dribbble",
  },
] as const;

// =============================================================================
// 🛠️ SERVICES DATA — 6 core services (used on home page preview)
// =============================================================================
export const SERVICES_DATA = [
  {
    slug: "website-development",
    title: "Website Development",
    shortDesc:
      "Premium custom websites that load fast and convert better.",
    icon: "Globe",
    color: "from-yellow-500 to-amber-600",
    accentColor: "#D4AF37",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortDesc:
      "Data-driven campaigns that turn browsers into buyers.",
    icon: "TrendingUp",
    color: "from-blue-500 to-indigo-600",
    accentColor: "#3B82F6",
  },
  {
    slug: "seo-optimization",
    title: "SEO Optimization",
    shortDesc: "Climb to page one — and stay there.",
    icon: "Search",
    color: "from-emerald-500 to-teal-600",
    accentColor: "#10B981",
  },
  {
    slug: "ecommerce-solutions",
    title: "E-Commerce Solutions",
    shortDesc: "Online stores built to sell, scale, and delight.",
    icon: "ShoppingBag",
    color: "from-purple-500 to-pink-600",
    accentColor: "#A855F7",
  },
  {
    slug: "software-development",
    title: "Software Development",
    shortDesc:
      "Custom software that solves real business problems.",
    icon: "Code2",
    color: "from-orange-500 to-red-600",
    accentColor: "#F97316",
  },
  {
    slug: "analytics-growth",
    title: "Analytics & Growth",
    shortDesc:
      "Turn data into your unfair competitive advantage.",
    icon: "BarChart3",
    color: "from-cyan-500 to-blue-600",
    accentColor: "#06B6D4",
  },
] as const;

// =============================================================================
// 🔄 PROCESS STEPS — Workflow shown on home + services pages
// =============================================================================
export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery",
    description: "We dive deep into your vision, goals, and audience.",
    icon: "Compass",
  },
  {
    number: "02",
    title: "Strategy",
    description: "Plan with purpose — every decision backed by data.",
    icon: "Target",
  },
  {
    number: "03",
    title: "Design",
    description: "Craft experiences that captivate and convert.",
    icon: "Palette",
  },
  {
    number: "04",
    title: "Development",
    description: "Build with cutting-edge tech and obsessive quality.",
    icon: "Code",
  },
  {
    number: "05",
    title: "Launch",
    description: "Deploy with confidence — fast, secure, polished.",
    icon: "Rocket",
  },
  {
    number: "06",
    title: "Growth",
    description: "Iterate, optimize, and scale beyond expectations.",
    icon: "TrendingUp",
  },
] as const;

// =============================================================================
// 🎬 ANIMATION VARIANTS — Reusable Framer Motion configs
// =============================================================================
// Use like: <motion.div variants={fadeUp} initial="hidden" animate="visible">
// =============================================================================

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
    },
  },
};

// Bundle for easy import
export const ANIMATION_VARIANTS = {
  fadeUp,
  fadeIn,
  scaleIn,
  slideLeft,
  slideRight,
  stagger,
  staggerFast,
} as const;

// =============================================================================
// 🎨 COLORS — Nirvana brand palette (JS access)
// =============================================================================
// Use when you need colors in JS (e.g., for Three.js, charts, dynamic styles).
// For CSS, prefer Tailwind classes: bg-nirvana-gold, text-nirvana-blue, etc.
// =============================================================================
export const COLORS = {
  black: "#050505",
  midnight: "#0B1020",
  gold: "#D4AF37",
  goldLight: "#E8C766",
  goldDark: "#A88A2C",
  blue: "#3B82F6",
  blueLight: "#60A5FA",
  blueDark: "#2563EB",
  white: "#F5F5F5",
  gray: {
    50: "#FAFAFA",
    100: "#F4F4F5",
    200: "#E4E4E7",
    300: "#D4D4D8",
    400: "#A1A1AA",
    500: "#71717A",
    600: "#52525B",
    700: "#3F3F46",
    800: "#27272A",
    900: "#18181B",
    950: "#09090B",
  },
  // Status colors
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
} as const;

// =============================================================================
// 📞 CONTACT INFO — Used in footer, contact page, schema.org
// =============================================================================
export const CONTACT_INFO = {
  email: "nirvanatech07@gmail.com",
  emailPersonal: "nirvanatech07@gmail.com",
  phone: "+91 9039201975",
  phoneRaw: "9039201975",
  whatsapp: "9039201975",
  address: {
    street: "Remote Studio",
    city: "Jabalpur",
    state: "Madhya Pradesh",
    postalCode: "482003",
    country: "India",
    countryCode: "IN",
  },
  coordinates: {
    lat: 23.1815,
    lng: 79.9864,
  },
  hours: {
    weekdays: "Mon – Fri, 10:00 AM – 7:00 PM IST",
    weekend: "Sat: By appointment • ",
  },
  fullAddress:
    "remote location,jabalpur,madhya pradesh,india,482003"
} as const;

// =============================================================================
// 📊 STATS — Numbers shown in hero, about, footer
// =============================================================================
export const STATS = [
  { label: "Projects Delivered", value: 1, suffix: "+" },
  { label: "Happy Clients", value: 1, suffix: "+" },
  { label: "Founded", value: 2026, suffix: "" },
  { label: "Team Members", value: 5, suffix: "" },
] as const;

// =============================================================================
// ⚙️ DEFAULT VALUES — UI defaults used in multiple places
// =============================================================================
export const DEFAULTS = {
  // Image fallbacks
  avatarFallback: "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
  projectImageFallback: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",

  // Pagination
  itemsPerPage: 12,

  // Toast/Notification durations (ms)
  toastDuration: 4000,

  // Animation durations (seconds, for Framer Motion)
  animDurationFast: 0.3,
  animDurationNormal: 0.6,
  animDurationSlow: 1.0,

  // Easing curves (cubic-bezier values for Framer Motion)
  easeOutExpo: [0.22, 1, 0.36, 1] as [number, number, number, number],
  easeInOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
} as const;

// =============================================================================
// 📦 EXPORT BUNDLE — Sometimes you want everything at once
// =============================================================================
export const CONSTANTS = {
  SITE_CONFIG,
  NAV_LINKS,
  SOCIAL_LINKS,
  SERVICES_DATA,
  PROCESS_STEPS,
  ANIMATION_VARIANTS,
  COLORS,
  CONTACT_INFO,
  STATS,
  DEFAULTS,
} as const;