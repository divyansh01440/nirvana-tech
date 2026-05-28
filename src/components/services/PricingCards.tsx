"use client";

// =============================================================================
// 💎 NIRVANA TECH — Pricing Cards
// =============================================================================
// 3-tier pricing: Starter, Growth (popular), Enterprise.
// =============================================================================

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles, ArrowUpRight, X } from "lucide-react";
import { useCursorStore } from "@/store/cursorStore";

// =============================================================================
// 💰 PRICING DATA
// =============================================================================
interface PricingTier {
  name: string;
  tagline: string;
  bestFor: string;
  price: string;
  priceUnit?: string;
  features: { text: string; included: boolean }[];
  ctaLabel: string;
  ctaHref: string;
  isPopular?: boolean;
  accentColor: string;
}

const TIERS: PricingTier[] = [
  // ============== STARTER ==============
  {
    name: "Starter",
    tagline: "Launch fast, stay lean.",
    bestFor: "Solo founders & early-stage projects",
    price: "₹35,000",
    priceUnit: "starting",
    features: [
      { text: "5-page custom website", included: true },
      { text: "Mobile-responsive design", included: true },
      { text: "Basic SEO setup", included: true },
      { text: "Contact form integration", included: true },
      { text: "1 round of revisions", included: true },
      { text: "30 days post-launch support", included: true },
      { text: "Custom animations", included: false },
      { text: "E-commerce integration", included: false },
      { text: "Monthly analytics reports", included: false },
    ],
    ctaLabel: "Start with Starter",
    ctaHref: "/query?plan=starter",
    accentColor: "#94A3B8",
  },

  // ============== GROWTH (popular) ==============
  {
    name: "Growth",
    tagline: "Premium craft. Real momentum.",
    bestFor: "Growing brands ready to stand out",
    price: "₹1,20,000",
    priceUnit: "starting",
    features: [
      { text: "10-15 page custom website", included: true },
      { text: "Premium animations & interactions", included: true },
      { text: "Advanced SEO + content strategy", included: true },
      { text: "CMS integration (edit yourself)", included: true },
      { text: "Custom illustrations & visuals", included: true },
      { text: "Analytics + tracking setup", included: true },
      { text: "3 rounds of revisions", included: true },
      { text: "90 days post-launch support", included: true },
      { text: "Performance optimization", included: true },
    ],
    ctaLabel: "Choose Growth",
    ctaHref: "/query?plan=growth",
    isPopular: true,
    accentColor: "#D4AF37",
  },

  // ============== ENTERPRISE ==============
  {
    name: "Enterprise",
    tagline: "Bespoke. Scalable. Yours.",
    bestFor: "Companies needing full digital systems",
    price: "Custom",
    priceUnit: "quoted",
    features: [
      { text: "Unlimited pages & features", included: true },
      { text: "Custom web application development", included: true },
      { text: "E-commerce + payment integration", included: true },
      { text: "Admin dashboards & internal tools", included: true },
      { text: "API integrations & automations", included: true },
      { text: "Dedicated project manager", included: true },
      { text: "Unlimited revisions", included: true },
      { text: "12 months priority support", included: true },
      { text: "Quarterly growth reviews", included: true },
    ],
    ctaLabel: "Talk to us",
    ctaHref: "/query?plan=enterprise",
    accentColor: "#3B82F6",
  },
];

// =============================================================================
// 💎 MAIN COMPONENT
// =============================================================================
export default function PricingCards() {
  return (
    <section className="relative w-full overflow-hidden py-20 sm:py-28 lg:py-36 border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-nirvana-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-nirvana-blue/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ============== HEADER ============== */}
        <div className="text-center mb-14 sm:mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-nirvana-gold/40" />
            <span className="text-xs font-mono text-nirvana-gold/80 uppercase tracking-[0.3em]">
              Pricing
            </span>
            <span className="w-8 h-px bg-nirvana-gold/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-nirvana-white leading-[1.1] mb-6"
          >
            Pricing built for{" "}
            <span className="gradient-text">your stage</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-nirvana-gray-400"
          >
            Transparent pricing. No surprises. Every plan includes a project
            manager and direct line to the team.
          </motion.p>
        </div>

        {/* ============== PRICING GRID ============== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto items-start">
          {TIERS.map((tier, i) => (
            <TierCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>

        {/* ============== FOOTER NOTE ============== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 sm:mt-16 text-center max-w-2xl mx-auto"
        >
          <p className="text-sm text-nirvana-gray-400">
            <span className="text-nirvana-gold">✦</span> All plans include free
            discovery call, transparent timelines, and no hidden fees.{" "}
            <Link
              href="/query"
              className="text-nirvana-gold hover:underline font-medium"
            >
              Need something custom?
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// 💎 TIER CARD
// =============================================================================
interface TierCardProps {
  tier: PricingTier;
  index: number;
}

function TierCard({ tier, index }: TierCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { setVariant, reset } = useCursorStore();
  const isPopular = tier.isPopular;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setVariant("hover")}
      onMouseLeave={reset}
      className={`group relative ${isPopular ? "lg:-mt-4 lg:mb-4" : ""}`}
    >
      {/* ===== "MOST POPULAR" BADGE ===== */}
      {isPopular && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="relative">
            {/* Pulse glow */}
            <div className="absolute inset-0 bg-nirvana-gold/40 blur-md rounded-full animate-pulse" />
            <div className="relative inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-nirvana-gold via-nirvana-gold-light to-nirvana-gold text-nirvana-black text-[10px] sm:text-xs font-bold uppercase tracking-widest shadow-lg">
              <Sparkles size={12} />
              Most Popular
            </div>
          </div>
        </motion.div>
      )}

      {/* ===== CARD ===== */}
      <div
        className={`relative h-full glass rounded-3xl p-7 sm:p-8 lg:p-10 overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
          isPopular
            ? "border-2 border-nirvana-gold/40 hover:border-nirvana-gold/70 shadow-[0_0_60px_rgba(212,175,55,0.15)]"
            : "border border-white/10 hover:border-white/20"
        }`}
      >
        {/* ===== GRADIENT BORDER OVERLAY ===== */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${tier.accentColor}40, transparent 40%, transparent 60%, ${tier.accentColor}40)`,
            padding: "1px",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
        />

        {/* ===== POPULAR TIER GLOW ===== */}
        {isPopular && (
          <div className="absolute -inset-px rounded-3xl pointer-events-none opacity-20 blur-2xl bg-nirvana-gold pointer-events-none" />
        )}

        {/* ===== TIER NAME ===== */}
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-xs font-mono uppercase tracking-widest"
            style={{ color: tier.accentColor }}
          >
            ── Tier 0{index + 1}
          </span>
          {isPopular && (
            <span className="text-[10px] font-mono text-nirvana-gold/60 uppercase tracking-widest">
              Recommended
            </span>
          )}
        </div>

        <h3 className="text-2xl sm:text-3xl font-heading font-bold text-nirvana-white mb-1">
          {tier.name}
        </h3>

        <p
          className="text-sm font-medium mb-1"
          style={{ color: tier.accentColor }}
        >
          {tier.tagline}
        </p>

        <p className="text-xs text-nirvana-gray-400 mb-6 sm:mb-8">
          Best for: {tier.bestFor}
        </p>

        {/* ===== PRICE ===== */}
        <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-white/10">
          {tier.price === "Custom" ? (
            <div className="flex items-baseline gap-2">
              <span
                className="text-4xl sm:text-5xl font-heading font-bold gradient-text"
                style={
                  isPopular
                    ? {
                        background:
                          "linear-gradient(135deg, #E8C766, #D4AF37, #3B82F6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }
                    : undefined
                }
              >
                Custom
              </span>
              <span className="text-sm text-nirvana-gray-400">/ quoted</span>
            </div>
          ) : (
            <div className="flex items-baseline gap-2">
              <span
                className={`text-4xl sm:text-5xl font-heading font-bold ${
                  isPopular ? "" : "text-nirvana-white"
                }`}
                style={
                  isPopular
                    ? {
                        background:
                          "linear-gradient(135deg, #E8C766, #D4AF37, #3B82F6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        filter: "drop-shadow(0 0 20px rgba(212, 175, 55, 0.3))",
                      }
                    : undefined
                }
              >
                {tier.price}
              </span>
              <span className="text-sm text-nirvana-gray-400">
                / {tier.priceUnit}
              </span>
            </div>
          )}
        </div>

        {/* ===== FEATURES LIST ===== */}
        <ul className="space-y-3 mb-8 sm:mb-10">
          {tier.features.map((feature, i) => (
            <FeatureItem
              key={i}
              feature={feature}
              accentColor={tier.accentColor}
              index={i}
            />
          ))}
        </ul>

        {/* ===== CTA BUTTON ===== */}
        <Link
          href={tier.ctaHref}
          data-magnetic="true"
          onMouseEnter={() => setVariant("button")}
          onMouseLeave={reset}
          className={`group/btn relative w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-full overflow-hidden text-sm sm:text-base font-semibold transition-all duration-300 ${
            isPopular
              ? "bg-gradient-to-r from-nirvana-gold via-nirvana-gold-light to-nirvana-blue text-nirvana-black hover:shadow-[0_0_40px_rgba(212,175,55,0.5)]"
              : "glass border border-white/15 text-nirvana-white hover:border-nirvana-gold/40 hover:bg-nirvana-gold/5"
          }`}
        >
          {isPopular && (
            <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:translate-x-[200%] transition-transform duration-700" />
          )}
          <span className="relative z-10">{tier.ctaLabel}</span>
          <ArrowUpRight
            size={16}
            className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
          />
        </Link>
      </div>
    </motion.div>
  );
}

// =============================================================================
// ✅ FEATURE ITEM
// =============================================================================
function FeatureItem({
  feature,
  accentColor,
  index,
}: {
  feature: { text: string; included: boolean };
  accentColor: string;
  index: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`flex items-start gap-3 text-sm ${
        feature.included ? "text-nirvana-gray-200" : "text-nirvana-gray-600"
      }`}
    >
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
        style={
          feature.included
            ? {
                backgroundColor: `${accentColor}20`,
                border: `1px solid ${accentColor}50`,
              }
            : {
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
              }
        }
      >
        {feature.included ? (
          <Check size={11} style={{ color: accentColor }} strokeWidth={3} />
        ) : (
          <X size={11} className="text-nirvana-gray-700" strokeWidth={2.5} />
        )}
      </div>
      <span className={feature.included ? "" : "line-through opacity-60"}>
        {feature.text}
      </span>
    </motion.li>
  );
}