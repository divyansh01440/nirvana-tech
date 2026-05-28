"use client";

// =============================================================================
// 📞 NIRVANA TECH — Contact Info Sidebar
// =============================================================================

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { useCursorStore } from "@/store/cursorStore";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/lib/constants";

export default function ContactInfo() {
  const { setVariant, reset } = useCursorStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="space-y-5"
    >
      {/* ============== QUICK CONTACT CARD ============== */}
      <div className="glass border border-white/10 rounded-3xl p-6 sm:p-8">
        <div className="text-xs font-mono text-nirvana-gold/70 uppercase tracking-widest mb-4">
          ── Quick Contact
        </div>

        <h3 className="text-xl sm:text-2xl font-heading font-bold text-nirvana-white mb-6">
          Prefer to skip the form?
        </h3>

        <div className="space-y-4">
          {/* Email */}
          <Link
            href={`mailto:${CONTACT_INFO.email}`}
            onMouseEnter={() => setVariant("hover")}
            onMouseLeave={reset}
            className="group flex items-start gap-3 p-4 rounded-xl glass border border-white/5 hover:border-nirvana-gold/30 transition-all"
          >
            <div className="w-10 h-10 rounded-xl glass border border-nirvana-gold/20 flex items-center justify-center flex-shrink-0">
              <Mail size={16} className="text-nirvana-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-widest text-nirvana-gray-500 mb-0.5">
                Email
              </div>
              <div className="text-sm text-nirvana-white font-medium group-hover:text-nirvana-gold transition-colors break-all">
                {CONTACT_INFO.email}
              </div>
            </div>
          </Link>

          {/* Phone */}
          <Link
            href={`tel:${CONTACT_INFO.phoneRaw}`}
            onMouseEnter={() => setVariant("hover")}
            onMouseLeave={reset}
            className="group flex items-start gap-3 p-4 rounded-xl glass border border-white/5 hover:border-nirvana-gold/30 transition-all"
          >
            <div className="w-10 h-10 rounded-xl glass border border-nirvana-gold/20 flex items-center justify-center flex-shrink-0">
              <Phone size={16} className="text-nirvana-gold" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-widest text-nirvana-gray-500 mb-0.5">
                Phone
              </div>
              <div className="text-sm text-nirvana-white font-medium group-hover:text-nirvana-gold transition-colors">
                {CONTACT_INFO.phone}
              </div>
            </div>
          </Link>

          {/* WhatsApp */}
          <Link
            href={`https://wa.me/${CONTACT_INFO.phoneRaw.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setVariant("hover")}
            onMouseLeave={reset}
            className="group flex items-start gap-3 p-4 rounded-xl glass border border-white/5 hover:border-emerald-500/30 transition-all"
          >
            <div className="w-10 h-10 rounded-xl glass border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <MessageCircle size={16} className="text-emerald-400" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-widest text-nirvana-gray-500 mb-0.5">
                WhatsApp
              </div>
              <div className="text-sm text-nirvana-white font-medium group-hover:text-emerald-300 transition-colors">
                Chat with us instantly
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* ============== LOCATION CARD ============== */}
      <div className="glass border border-white/10 rounded-3xl p-6 sm:p-8">
        <div className="text-xs font-mono text-nirvana-gold/70 uppercase tracking-widest mb-4">
          ── Our Location
        </div>

        <div className="flex items-start gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl glass border border-nirvana-gold/20 flex items-center justify-center flex-shrink-0">
            <MapPin size={16} className="text-nirvana-gold" />
          </div>
          <div>
            <h4 className="text-base font-heading font-bold text-nirvana-white mb-1">
              {CONTACT_INFO.address.city}, {CONTACT_INFO.address.state}
            </h4>
            <p className="text-sm text-nirvana-gray-400">
              {CONTACT_INFO.address.country}
              <br />
              Remote-first, globally connected
            </p>
          </div>
        </div>

        {/* Hours */}
        <div className="flex items-start gap-3 pt-4 border-t border-white/5">
          <div className="w-10 h-10 rounded-xl glass border border-nirvana-gold/20 flex items-center justify-center flex-shrink-0">
            <Clock size={16} className="text-nirvana-gold" />
          </div>
          <div>
            <h4 className="text-base font-heading font-bold text-nirvana-white mb-1">
              Working Hours
            </h4>
            <p className="text-sm text-nirvana-gray-400">
              {CONTACT_INFO.hours.weekdays}
              <br />
              <span className="text-xs">{CONTACT_INFO.hours.weekend}</span>
            </p>
          </div>
        </div>
      </div>

      {/* ============== SOCIAL CARD ============== */}
      <div className="glass border border-white/10 rounded-3xl p-6 sm:p-8">
        <div className="text-xs font-mono text-nirvana-gold/70 uppercase tracking-widest mb-4">
          ── Connect Online
        </div>

        <p className="text-sm text-nirvana-gray-300 mb-5">
          Follow our journey, see new work, and get inspiration.
        </p>

        <div className="flex flex-wrap gap-2">
          {SOCIAL_LINKS.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              onMouseEnter={() => setVariant("hover")}
              onMouseLeave={reset}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-xs text-nirvana-gray-300 hover:border-nirvana-gold/40 hover:text-nirvana-gold transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-nirvana-gold/40 group-hover:bg-nirvana-gold transition-colors" />
              {social.name}
            </Link>
          ))}
        </div>
      </div>

      {/* ============== RESPONSE TIME PROMISE ============== */}
      <div className="relative glass border border-nirvana-gold/20 rounded-3xl p-6 sm:p-8 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-nirvana-gold/10 blur-[80px] pointer-events-none" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nirvana-gold/10 border border-nirvana-gold/30 mb-3">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-nirvana-gold animate-ping opacity-75" />
              <span className="relative rounded-full w-2 h-2 bg-nirvana-gold" />
            </span>
            <span className="text-[10px] text-nirvana-gold font-semibold uppercase tracking-widest">
              Promise
            </span>
          </div>

          <h4 className="text-lg font-heading font-bold text-nirvana-white mb-2">
            We respond within 24h
          </h4>

          <p className="text-sm text-nirvana-gray-400 leading-relaxed">
            Every inquiry gets a personal response. No bots, no template
            replies — just a real human reading what you wrote.
          </p>
        </div>
      </div>
    </motion.div>
  );
}