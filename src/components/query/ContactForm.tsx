"use client";

// =============================================================================
// 📝 NIRVANA TECH — Contact Form
// =============================================================================

import { useState, type ComponentType, type FormEvent } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Send,
  Check,
  User,
  Mail,
  Phone,
  Briefcase,
  DollarSign,
  Calendar,
  MessageSquare,
  Globe,
  Building2,
} from "lucide-react";
import { useCursorStore } from "@/store/cursorStore";

// =============================================================================
// 🎨 ICON TYPE
// =============================================================================
type IconType = ComponentType<{ size?: number; className?: string }>;

// =============================================================================
// 📋 TYPES
// =============================================================================
interface ContactFormData {
  name: string;
  email: string;
  phoneCode: string;
  phone: string;
  company: string;
  website: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}

const INITIAL_DATA: ContactFormData = {
  name: "",
  email: "",
  phoneCode: "+91",
  phone: "",
  company: "",
  website: "",
  service: "",
  budget: "",
  timeline: "",
  message: "",
};

// =============================================================================
// 📋 OPTIONS
// =============================================================================
const SERVICES: string[] = [
  "Website Builder",
  "Digital Marketing",
  "SEO Optimization",
  "E-Commerce",
  "Software Development",
  "Analytics & Insights",
  "Not sure yet",
];

const BUDGETS: string[] = [
  "Under ₹50,000",
  "₹50,000 — ₹1,50,000",
  "₹1,50,000 — ₹5,00,000",
  "₹5,00,000 — ₹15,00,000",
  "₹15,00,000+",
  "Let's discuss",
];

const TIMELINES: string[] = [
  "ASAP (under 1 month)",
  "1-3 months",
  "3-6 months",
  "6+ months",
  "Just exploring",
];

interface CountryCode {
  code: string;
  flag: string;
  name: string;
}

const COUNTRY_CODES: CountryCode[] = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+86", flag: "🇨🇳", name: "China" },
  { code: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "+52", flag: "🇲🇽", name: "Mexico" },
  { code: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "+64", flag: "🇳🇿", name: "New Zealand" },
];

// =============================================================================
// 📝 MAIN COMPONENT
// =============================================================================
export default function ContactForm() {
  const { setVariant, reset } = useCursorStore();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ContactFormData>(INITIAL_DATA);

  const update = (field: keyof ContactFormData, value: string): void => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Required fields
    if (!data.name || !data.email || !data.phone || !data.message) {
      toast.error("Please fill in name, email, phone, and message.");
      return;
    }

    // Email format
    if (!data.email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Phone format
    const phoneDigits = data.phone.replace(/\s/g, "");
    if (phoneDigits.length < 6) {
      toast.error("Please enter a valid phone number (at least 6 digits).");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Submission failed");
      }

      setSubmitted(true);
      toast.success(result.message || "Inquiry received! ✨");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <SuccessState
        onReset={() => {
          setSubmitted(false);
          setData(INITIAL_DATA);
        }}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="relative glass border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-nirvana-gold/10 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-nirvana-blue/10 blur-[80px] pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-mono text-nirvana-gold/70 uppercase tracking-widest mb-3">
            ── Project Inquiry
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-nirvana-white mb-2">
            Start the conversation
          </h2>
          <p className="text-sm text-nirvana-gray-400">
            The more you share, the better we can help. All fields with{" "}
            <span className="text-nirvana-gold">*</span> are required.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ============== STEP 01: About You ============== */}
          <div>
            <SectionLabel number="01" title="About You" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Full Name"
                required
                icon={User}
                type="text"
                placeholder="Your name"
                value={data.name}
                onChange={(v) => update("name", v)}
              />
              <Field
                label="Email"
                required
                icon={Mail}
                type="email"
                placeholder="you@example.com"
                value={data.email}
                onChange={(v) => update("email", v)}
              />
              <PhoneField
                code={data.phoneCode}
                phone={data.phone}
                onCodeChange={(v) => update("phoneCode", v)}
                onPhoneChange={(v) => update("phone", v)}
              />
              <Field
                label="Company"
                icon={Building2}
                type="text"
                placeholder="Your company name"
                value={data.company}
                onChange={(v) => update("company", v)}
              />
            </div>
          </div>

          {/* ============== STEP 02: Project Details ============== */}
          <div className="pt-4">
            <SectionLabel number="02" title="Project Details" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Current Website"
                icon={Globe}
                type="url"
                placeholder="https:// (if any)"
                value={data.website}
                onChange={(v) => update("website", v)}
              />
              <SelectField
                label="Service Interested In"
                icon={Briefcase}
                value={data.service}
                onChange={(v) => update("service", v)}
                options={SERVICES}
                placeholder="Select a service"
              />
              <SelectField
                label="Budget Range"
                icon={DollarSign}
                value={data.budget}
                onChange={(v) => update("budget", v)}
                options={BUDGETS}
                placeholder="Select a range"
              />
              <SelectField
                label="Timeline"
                icon={Calendar}
                value={data.timeline}
                onChange={(v) => update("timeline", v)}
                options={TIMELINES}
                placeholder="When do you need this?"
              />
            </div>
          </div>

          {/* ============== STEP 03: Tell Us More ============== */}
          <div className="pt-4">
            <SectionLabel number="03" title="Tell Us More" />

            <TextareaField
              label="Project Description"
              required
              icon={MessageSquare}
              placeholder="Tell us about your project, goals, and any specific requirements. The more detail, the better — but don't worry, we can fill in the gaps on our discovery call."
              value={data.message}
              onChange={(v) => update("message", v)}
              rows={5}
            />
          </div>

          {/* ============== SUBMIT ============== */}
          <div className="pt-6 border-t border-white/5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-nirvana-gray-500">
                By submitting, you agree to our{" "}
                <span className="text-nirvana-gold">Privacy Policy</span>. We
                never share your data.
              </p>

              <button
                type="submit"
                disabled={loading}
                data-magnetic="true"
                onMouseEnter={() => setVariant("button")}
                onMouseLeave={reset}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full overflow-hidden bg-gradient-to-r from-nirvana-gold via-nirvana-gold-light to-nirvana-blue text-nirvana-black text-sm sm:text-base font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-[200%] transition-transform duration-700" />
                <span className="relative z-10">
                  {loading ? "Sending..." : "Send Inquiry"}
                </span>
                {!loading && <Send size={16} className="relative z-10" />}
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

// =============================================================================
// ✅ SUCCESS STATE
// =============================================================================
interface SuccessStateProps {
  onReset: () => void;
}

function SuccessState({ onReset }: SuccessStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative glass border border-nirvana-gold/30 rounded-3xl p-10 sm:p-14 text-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-nirvana-gold/10 to-nirvana-blue/10 pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="inline-flex w-20 h-20 rounded-full bg-gradient-to-br from-nirvana-gold to-nirvana-gold-light items-center justify-center"
        >
          <Check size={36} className="text-nirvana-black" strokeWidth={3} />
        </motion.div>

        <div>
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-nirvana-white mb-3">
            Message received ✨
          </h3>
          <p className="text-base text-nirvana-gray-300 max-w-md mx-auto">
            Thanks for reaching out. We&apos;ll review your inquiry and respond
            within 24 hours.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={onReset}
            className="text-sm text-nirvana-gold hover:underline"
          >
            Send another inquiry
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// =============================================================================
// 🏷️ SECTION LABEL
// =============================================================================
interface SectionLabelProps {
  number: string;
  title: string;
}

function SectionLabel({ number, title }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-xs font-mono font-bold text-nirvana-gold tracking-widest">
        {number}
      </span>
      <span className="text-xs font-mono text-nirvana-gold/60 uppercase tracking-widest">
        ── {title}
      </span>
    </div>
  );
}

// =============================================================================
// 📝 TEXT FIELD
// =============================================================================
interface FieldProps {
  label: string;
  required?: boolean;
  icon: IconType;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}

function Field(props: FieldProps) {
  const { label, required, icon: Icon, type, placeholder, value, onChange } = props;
  const { setVariant, reset } = useCursorStore();

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-nirvana-gray-300 flex items-center gap-1.5">
        <Icon size={12} className="text-nirvana-gold" />
        {label}
        {required && <span className="text-nirvana-gold">*</span>}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onMouseEnter={() => setVariant("text")}
        onMouseLeave={reset}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-nirvana-white placeholder:text-nirvana-gray-500 focus:outline-none focus:border-nirvana-gold/50 focus:bg-white/10 transition-all"
      />
    </div>
  );
}

// =============================================================================
// 📞 PHONE FIELD
// =============================================================================
interface PhoneFieldProps {
  code: string;
  phone: string;
  onCodeChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
}

function PhoneField(props: PhoneFieldProps) {
  const { code, phone, onCodeChange, onPhoneChange } = props;
  const { setVariant, reset } = useCursorStore();
  const selected = COUNTRY_CODES.find((c) => c.code === code) || COUNTRY_CODES[0];

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-nirvana-gray-300 flex items-center gap-1.5">
        <Phone size={12} className="text-nirvana-gold" />
        Phone
        <span className="text-nirvana-gold">*</span>
      </label>

      <div className="flex gap-2">
        {/* Country code dropdown */}
        <select
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          onMouseEnter={() => setVariant("button")}
          onMouseLeave={reset}
          className="pl-3 pr-8 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-nirvana-white focus:outline-none focus:border-nirvana-gold/50 focus:bg-white/10 transition-all appearance-none cursor-pointer font-mono flex-shrink-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23D4AF37' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.5rem center",
            backgroundSize: "12px",
          }}
          aria-label="Country code"
        >
          {COUNTRY_CODES.map((c) => (
            <option key={`${c.code}-${c.name}`} value={c.code} className="bg-nirvana-black">
              {c.flag} {c.code} {c.name}
            </option>
          ))}
        </select>

        {/* Phone number input */}
        <input
          type="tel"
          required
          minLength={6}
          placeholder="XXXXX XXXXX"
          value={phone}
          onChange={(e) => {
            const cleaned = e.target.value.replace(/[^\d\s]/g, "");
            onPhoneChange(cleaned);
          }}
          onMouseEnter={() => setVariant("text")}
          onMouseLeave={reset}
          className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-nirvana-white placeholder:text-nirvana-gray-500 focus:outline-none focus:border-nirvana-gold/50 focus:bg-white/10 transition-all"
        />
      </div>

      {phone && (
        <p className="text-[10px] font-mono text-nirvana-gold/60 px-1">
          Full: {selected.code} {phone}
        </p>
      )}
    </div>
  );
}

// =============================================================================
// 📋 SELECT FIELD
// =============================================================================
interface SelectFieldProps {
  label: string;
  icon: IconType;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}

function SelectField(props: SelectFieldProps) {
  const { label, icon: Icon, value, onChange, options, placeholder } = props;
  const { setVariant, reset } = useCursorStore();

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-nirvana-gray-300 flex items-center gap-1.5">
        <Icon size={12} className="text-nirvana-gold" />
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onMouseEnter={() => setVariant("button")}
        onMouseLeave={reset}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-nirvana-white focus:outline-none focus:border-nirvana-gold/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23D4AF37' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 1rem center",
          backgroundSize: "16px",
          paddingRight: "2.5rem",
        }}
      >
        <option value="" disabled className="bg-nirvana-black">
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-nirvana-black">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

// =============================================================================
// 📝 TEXTAREA FIELD
// =============================================================================
interface TextareaFieldProps {
  label: string;
  required?: boolean;
  icon: IconType;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  rows: number;
}

function TextareaField(props: TextareaFieldProps) {
  const { label, required, icon: Icon, placeholder, value, onChange, rows } = props;
  const { setVariant, reset } = useCursorStore();

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-nirvana-gray-300 flex items-center gap-1.5">
        <Icon size={12} className="text-nirvana-gold" />
        {label}
        {required && <span className="text-nirvana-gold">*</span>}
      </label>
      <textarea
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        onMouseEnter={() => setVariant("text")}
        onMouseLeave={reset}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-nirvana-white placeholder:text-nirvana-gray-500 focus:outline-none focus:border-nirvana-gold/50 focus:bg-white/10 transition-all resize-none"
      />
    </div>
  );
}