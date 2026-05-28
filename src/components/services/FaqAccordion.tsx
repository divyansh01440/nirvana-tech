"use client";

// =============================================================================
// ❓ NIRVANA TECH — FAQ Accordion
// =============================================================================
// Smooth animated accordion. Only one item open at a time.
// =============================================================================

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageCircle, ArrowUpRight } from "lucide-react";
import { useCursorStore } from "@/store/cursorStore";

// =============================================================================
// ❓ FAQ DATA
// =============================================================================
interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How long does a typical project take?",
    answer:
      "Most projects ship within 4–8 weeks. A simple 5-page website takes about 3–4 weeks, while a custom web app or e-commerce build typically runs 6–12 weeks. We share a detailed timeline during discovery so you know exactly when to expect each milestone.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes — we work with clients across the US, UK, Canada, Australia, Singapore, UAE, and more. We're based in Jabalpur, India, and operate on flexible hours to overlap with your timezone. All communication happens through Slack, Loom videos, and weekly video calls.",
  },
  {
    question: "What's included in the discovery phase?",
    answer:
      "Discovery is where we deeply understand your business, audience, and goals before writing a single line of code. It includes: stakeholder interviews, competitor analysis, technical requirements, user journey mapping, content audit, and a full project roadmap with timeline and deliverables. It usually takes 1–2 weeks.",
  },
  {
    question: "How does pricing work?",
    answer:
      "We offer three tiers (Starter, Growth, Enterprise) with transparent fixed pricing for typical scopes. Custom projects are quoted based on scope after discovery. We bill 50% upfront and 50% on launch, or in 3 equal milestones for larger projects. No hidden fees, no surprise invoices — ever.",
  },
  {
    question: "Do you offer ongoing maintenance?",
    answer:
      "Yes. After launch, we offer monthly maintenance retainers covering hosting, security updates, content edits, bug fixes, and performance monitoring. Plans start at ₹15,000/month. We also handle one-off improvements as needed — just send us a Slack message.",
  },
  {
    question: "Can you redesign an existing site?",
    answer:
      "Absolutely. We've redesigned everything from WordPress sites to outdated React apps. We start with an audit of what works (keep it) and what doesn't (rebuild it), then craft a phased migration plan so your site never goes down during the transition.",
  },
  {
    question: "What tech stack do you use?",
    answer:
      "Our default stack: Next.js + TypeScript + Tailwind CSS + Framer Motion for frontend; Node.js + Prisma + PostgreSQL/Neon for backend; Vercel for hosting; Stripe/Razorpay for payments; Sanity/Contentful for CMS; Resend for email. We pick the right tool for each project — we're not religious about any one framework.",
  },
  {
    question: "How do I get started?",
    answer:
      "Three simple steps: (1) Fill out the inquiry form on our Contact page describing your project, (2) We respond within 24 hours and schedule a free 30-minute discovery call, (3) After the call, you receive a detailed proposal with scope, timeline, and quote. No pressure, no obligation.",
  },
];

// =============================================================================
// ❓ MAIN COMPONENT
// =============================================================================
export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default
  const { setVariant, reset } = useCursorStore();

  return (
    <section className="relative w-full overflow-hidden py-20 sm:py-28 lg:py-36 border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-nirvana-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-nirvana-blue/5 blur-[120px] pointer-events-none" />

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
              FAQ
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
            Questions, <span className="gradient-text">answered</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-nirvana-gray-400"
          >
            Everything you need to know before we start building together.
          </motion.p>
        </div>

        {/* ============== ACCORDION ============== */}
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* ============== "STILL HAVE QUESTIONS" CTA ============== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 sm:mt-20 max-w-3xl mx-auto"
        >
          <div className="relative glass border border-nirvana-gold/20 rounded-3xl p-6 sm:p-8 lg:p-10 overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-nirvana-gold/10 blur-[80px] pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-2xl glass border border-nirvana-gold/30 flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={20} className="text-nirvana-gold" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-heading font-bold text-nirvana-white mb-1">
                    Still have questions?
                  </h3>
                  <p className="text-sm text-nirvana-gray-400">
                    We&apos;re happy to chat. Reach out and we&apos;ll respond within 24h.
                  </p>
                </div>
              </div>

              <Link
                href="/query"
                data-magnetic="true"
                onMouseEnter={() => setVariant("button")}
                onMouseLeave={reset}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full overflow-hidden bg-gradient-to-r from-nirvana-gold via-nirvana-gold-light to-nirvana-blue text-nirvana-black text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] flex-shrink-0"
              >
                <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-[200%] transition-transform duration-700" />
                <span className="relative z-10">Get in touch</span>
                <ArrowUpRight
                  size={14}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// 📂 ACCORDION ITEM
// =============================================================================
interface AccordionItemProps {
  faq: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ faq, index, isOpen, onToggle }: AccordionItemProps) {
  const { setVariant, reset } = useCursorStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* Gold left border (appears when open) */}
      <motion.div
        animate={{
          width: isOpen ? "3px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-0 bottom-0 bg-gradient-to-b from-nirvana-gold via-nirvana-gold-light to-nirvana-blue rounded-l-2xl"
      />

      {/* Card */}
      <div
        className={`relative glass border rounded-2xl overflow-hidden transition-all duration-500 ${
          isOpen
            ? "border-nirvana-gold/40 bg-white/[0.04]"
            : "border-white/10 hover:border-white/20"
        }`}
      >
        {/* Question button */}
        <button
          onClick={onToggle}
          onMouseEnter={() => setVariant("button")}
          onMouseLeave={reset}
          className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left group"
          aria-expanded={isOpen}
        >
          <div className="flex items-baseline gap-3 sm:gap-4 flex-1 min-w-0">
            <span
              className={`text-xs font-mono uppercase tracking-widest flex-shrink-0 transition-colors duration-300 ${
                isOpen ? "text-nirvana-gold" : "text-nirvana-gold/50"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className={`text-base sm:text-lg font-heading font-semibold leading-tight transition-colors duration-300 ${
                isOpen
                  ? "text-nirvana-white"
                  : "text-nirvana-gray-200 group-hover:text-nirvana-white"
              }`}
            >
              {faq.question}
            </span>
          </div>

          {/* Plus → X icon */}
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
              isOpen
                ? "bg-nirvana-gold text-nirvana-black"
                : "glass border border-white/10 text-nirvana-gold group-hover:border-nirvana-gold/40"
            }`}
          >
            <Plus size={16} strokeWidth={2.5} />
          </motion.div>
        </button>

        {/* Answer (expandable) */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.25, delay: isOpen ? 0.15 : 0 },
              }}
              className="overflow-hidden"
            >
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-12 sm:pl-16">
                {/* Subtle divider */}
                <div className="h-px bg-gradient-to-r from-nirvana-gold/20 to-transparent mb-4" />

                <p className="text-sm sm:text-base text-nirvana-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}