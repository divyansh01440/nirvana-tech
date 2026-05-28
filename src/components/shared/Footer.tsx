"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin, Check } from "lucide-react";
import { useCursorStore } from "@/store/cursorStore";
import {
  SITE_CONFIG,
  NAV_LINKS,
  SOCIAL_LINKS,
  SERVICES_DATA,
  CONTACT_INFO,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-nirvana-black border-t border-white/5 mt-20">
      {/* ============== ANIMATED BACKGROUND ELEMENTS ============== */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Floating gradient orbs */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-nirvana-gold/5 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-40 -right-32 w-96 h-96 rounded-full bg-nirvana-blue/5 blur-[120px] pointer-events-none"
      />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ============== TOP: NEWSLETTER CTA ============== */}
        <NewsletterSection />

        {/* ============== MIDDLE: 4-COLUMN GRID ============== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 py-16 lg:py-20 border-b border-white/10">
          {/* ----- Column 1: Brand ----- */}
          <BrandColumn />

          {/* ----- Column 2: Services ----- */}
          <FooterLinkColumn
            title="Services"
            links={SERVICES_DATA.map((s) => ({
              label: s.title,
              href: `/services#${s.slug}`,
            }))}
          />

          {/* ----- Column 3: Company ----- */}
          <FooterLinkColumn
            title="Company"
            links={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: "Process", href: "/#process" },
              { label: "Contact", href: "/query" },
            ]}
          />

          {/* ----- Column 4: Contact ----- */}
          <ContactColumn />
        </div>

        {/* ============== BOTTOM: COPYRIGHT BAR ============== */}
        <BottomBar />
      </div>

      {/* ============== HUGE FADED "NIRVANA" WATERMARK ============== */}
      <div className="relative overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="select-none text-center font-heading font-bold tracking-tighter leading-none whitespace-nowrap"
          style={{
            fontSize: "clamp(80px, 22vw, 320px)",
            background:
              "linear-gradient(180deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0) 70%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          NIRVANA
        </motion.h2>
      </div>
    </footer>
  );
}

// =============================================================================
// 📧 NEWSLETTER SECTION
// =============================================================================
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const { setVariant, reset } = useCursorStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("success");
    setTimeout(() => {
      setStatus("idle");
      setEmail("");
    }, 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative -mt-10 lg:-mt-16 mb-16"
    >
      <div className="relative glass-strong rounded-3xl p-8 sm:p-10 lg:p-14 overflow-hidden">
        {/* Glowing border */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(212,175,55,0.4), transparent 30%, transparent 70%, rgba(59,130,246,0.4))",
            padding: "1px",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
        />

        {/* Decorative corner glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-nirvana-gold/10 blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-nirvana-blue/10 blur-[80px] pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Heading */}
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-nirvana-gold/80 uppercase tracking-[0.3em]">
              <span className="w-8 h-px bg-nirvana-gold/50" />
              Newsletter
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-nirvana-white">
              Stay in the loop
            </h3>
            <p className="text-sm sm:text-base text-nirvana-gray-400 max-w-md mx-auto lg:mx-0">
              Get insights, project drops & early access to what we&apos;re
              building next.
            </p>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="w-full">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 p-5 rounded-2xl bg-nirvana-gold/10 border border-nirvana-gold/30"
              >
                <div className="w-10 h-10 rounded-full bg-nirvana-gold flex items-center justify-center">
                  <Check
                    size={20}
                    className="text-nirvana-black"
                    strokeWidth={3}
                  />
                </div>
                <div>
                  <div className="text-nirvana-gold font-semibold">
                    You&apos;re in! ✨
                  </div>
                  <div className="text-xs text-nirvana-gray-400">
                    Check your inbox soon.
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                {/* ✅ suppressHydrationWarning added — browser extensions
                    (e.g. Temp Mail) inject attributes into email inputs
                    causing server/client HTML mismatch */}
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onMouseEnter={() => setVariant("text")}
                  onMouseLeave={reset}
                  placeholder="your@email.com"
                  suppressHydrationWarning
                  className="flex-1 px-5 py-4 rounded-full bg-white/5 border border-white/10 text-nirvana-white placeholder:text-nirvana-gray-500 focus:outline-none focus:border-nirvana-gold/50 focus:bg-white/10 transition-all"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  data-magnetic="true"
                  onMouseEnter={() => setVariant("button")}
                  onMouseLeave={reset}
                  className="group relative inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full overflow-hidden bg-gradient-to-r from-nirvana-gold via-nirvana-gold-light to-nirvana-blue text-nirvana-black font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-[200%] transition-transform duration-700" />
                  <span className="relative z-10">
                    {status === "loading" ? "Subscribing..." : "Subscribe"}
                  </span>
                  {status !== "loading" && (
                    <ArrowRight
                      size={16}
                      className="relative z-10 transition-transform group-hover:translate-x-1"
                    />
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
}

// =============================================================================
// 🏷️ BRAND COLUMN
// =============================================================================
function BrandColumn() {
  const { setVariant, reset } = useCursorStore();

  return (
    <div className="space-y-6 sm:col-span-2 lg:col-span-1">
      <Link
        href="/"
        onMouseEnter={() => setVariant("hover")}
        onMouseLeave={reset}
        className="inline-flex items-center gap-1.5 group"
      >
        <span className="text-2xl font-heading font-bold text-nirvana-white tracking-tight group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all">
          NIRVANA
        </span>
        <span className="text-xs font-heading font-semibold text-nirvana-gold tracking-[0.2em] uppercase mt-1">
          Tech
        </span>
      </Link>

      <p className="text-sm text-nirvana-gray-400 leading-relaxed max-w-xs">
        {SITE_CONFIG.tagline}
      </p>

      <div className="space-y-3">
        <div className="text-xs uppercase tracking-widest text-nirvana-gray-500">
          Follow us
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {SOCIAL_LINKS.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              data-magnetic="true"
              onMouseEnter={() => setVariant("hover")}
              onMouseLeave={reset}
              className="w-11 h-11 rounded-full glass border border-white/10 flex items-center justify-center text-nirvana-gold text-xs font-bold hover:scale-110 hover:bg-nirvana-gold/10 hover:border-nirvana-gold/40 transition-all"
            >
              {social.name.charAt(0)}
            </Link>
          ))}
        </div>
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
        <span className="relative flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
          <span className="relative rounded-full w-2 h-2 bg-emerald-400" />
        </span>
        <span className="text-xs text-emerald-400 font-medium">
          Available for projects
        </span>
      </div>
    </div>
  );
}

// =============================================================================
// 🔗 FOOTER LINK COLUMN
// =============================================================================
interface FooterLinkColumnProps {
  title: string;
  links: { label: string; href: string }[];
}

function FooterLinkColumn({ title, links }: FooterLinkColumnProps) {
  const { setVariant, reset } = useCursorStore();

  return (
    <div className="space-y-5">
      <h4 className="text-xs uppercase tracking-widest text-nirvana-gray-500">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onMouseEnter={() => setVariant("hover")}
              onMouseLeave={reset}
              className="group inline-flex items-center gap-2 text-sm text-nirvana-gray-300 hover:text-nirvana-gold transition-colors"
            >
              <span className="w-0 h-px bg-nirvana-gold transition-all duration-300 group-hover:w-4" />
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                {link.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// =============================================================================
// 📞 CONTACT COLUMN
// =============================================================================
function ContactColumn() {
  const { setVariant, reset } = useCursorStore();

  return (
    <div className="space-y-5">
      <h4 className="text-xs uppercase tracking-widest text-nirvana-gray-500">
        Get in touch
      </h4>

      <ul className="space-y-4">
        <li>
          <Link
            href={`mailto:${CONTACT_INFO.email}`}
            onMouseEnter={() => setVariant("hover")}
            onMouseLeave={reset}
            className="group flex items-start gap-3 text-sm text-nirvana-gray-300 hover:text-nirvana-gold transition-colors"
          >
            <Mail size={16} className="mt-0.5 text-nirvana-gold flex-shrink-0" />
            <span className="break-all">{CONTACT_INFO.email}</span>
          </Link>
        </li>

        <li>
          <Link
            href={`tel:${CONTACT_INFO.phoneRaw}`}
            onMouseEnter={() => setVariant("hover")}
            onMouseLeave={reset}
            className="group flex items-start gap-3 text-sm text-nirvana-gray-300 hover:text-nirvana-gold transition-colors"
          >
            <Phone
              size={16}
              className="mt-0.5 text-nirvana-gold flex-shrink-0"
            />
            <span>{CONTACT_INFO.phone}</span>
          </Link>
        </li>

        <li>
          <div className="flex items-start gap-3 text-sm text-nirvana-gray-300">
            <MapPin
              size={16}
              className="mt-0.5 text-nirvana-gold flex-shrink-0"
            />
            <span>
              {CONTACT_INFO.address.city}, {CONTACT_INFO.address.state}
              <br />
              {CONTACT_INFO.address.country}
            </span>
          </div>
        </li>
      </ul>

      <div className="pt-4 border-t border-white/5 space-y-1">
        <div className="text-xs uppercase tracking-widest text-nirvana-gray-500">
          Hours
        </div>
        <div className="text-xs text-nirvana-gray-400">
          {CONTACT_INFO.hours.weekdays}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// ⚖️ BOTTOM BAR
// =============================================================================
function BottomBar() {
  const { setVariant, reset } = useCursorStore();
  const year = new Date().getFullYear();

  return (
    <div className="py-6 lg:py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* ✅ suppressHydrationWarning added — new Date().getFullYear()
          can differ between server and client render time */}
      <p
        suppressHydrationWarning
        className="text-xs text-nirvana-gray-500 text-center sm:text-left"
      >
        © {year} Nirvana Tech Solutions. Crafted with{" "}
        <span className="text-nirvana-gold">precision</span> in{" "}
        {CONTACT_INFO.address.city}, {CONTACT_INFO.address.country}.
      </p>

      <div className="flex items-center gap-6 text-xs">
        <Link
          href="/privacy"
          onMouseEnter={() => setVariant("hover")}
          onMouseLeave={reset}
          className={cn(
            "text-nirvana-gray-500 hover:text-nirvana-gold transition-colors"
          )}
        >
          Privacy
        </Link>
        <Link
          href="/terms"
          onMouseEnter={() => setVariant("hover")}
          onMouseLeave={reset}
          className="text-nirvana-gray-500 hover:text-nirvana-gold transition-colors"
        >
          Terms
        </Link>
      </div>
    </div>
  );
}