"use client";

// =============================================================================
// 🔐 NIRVANA TECH — Admin Login (2-step: password → OTP)
// =============================================================================

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Shield, ArrowRight, RotateCcw, Eye, EyeOff } from "lucide-react";

type Step = "credentials" | "otp";

export default function AdminLoginPage() {
  const router = useRouter();
  const [step, setStep]         = useState<Step>("credentials");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp]           = useState("");
  const [loading, setLoading]   = useState(false);
  const [showPw, setShowPw]     = useState(false);
  const [countdown, setCountdown] = useState(0);

  // ---------------------------------------------------------------------------
  // ⏱️ Countdown timer for resend
  // ---------------------------------------------------------------------------
  const startCountdown = () => {
    setCountdown(60);
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(interval); return 0; }
        return c - 1;
      });
    }, 1000);
  };

  // ---------------------------------------------------------------------------
  // 🔑 Step 1: Try credentials — if 2FA enabled, request OTP; else login direct
  // ---------------------------------------------------------------------------
  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }
    setLoading(true);

    try {
      // First attempt a direct sign-in (works if twoFAEnabled = false)
      const directResult = await signIn("credentials", {
        email,
        password,
        otp: "",
        redirect: false,
      });

      console.log("🔍 Direct signIn result:", directResult);

      // SUCCESS — no 2FA needed
      if (directResult?.ok && !directResult?.error) {
        toast.success("Welcome back! ✨");
        router.push("/nirvana-tech-admin");
        router.refresh();
        return;
      }

      // If error is OTP-related → user has 2FA enabled → request OTP
      const errorMsg = directResult?.error ?? "";
      const needs2FA =
        errorMsg.toLowerCase().includes("otp") ||
        errorMsg.toLowerCase().includes("2fa") ||
        errorMsg.toLowerCase().includes("code required");

      console.log("🔍 Error message:", errorMsg, "| Needs 2FA:", needs2FA);

      if (needs2FA) {
        // Request OTP email
        const res = await fetch("/api/otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        console.log("🔍 OTP request result:", res.status, data);

        if (!res.ok) {
          toast.error(data.error || "Failed to send OTP");
          return;
        }

        setStep("otp");
        startCountdown();
        toast.success("OTP sent to your email! Check your inbox.");
        return;
      }

      // Other errors (wrong password, locked, etc.)
      toast.error(errorMsg || "Invalid email or password");
    } catch (err) {
      console.error("🔍 Login error:", err);
      toast.error("Something went wrong. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------------------------
  // 🔐 Step 2: Verify OTP + complete login
  // ---------------------------------------------------------------------------
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error("Please enter the 6-digit OTP");
      return;
    }
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        otp,
        redirect: false,
      });

      console.log("🔍 OTP signIn result:", result);

      if (result?.ok && !result?.error) {
        toast.success("Welcome back, Admin! ✨");
        router.push("/nirvana-tech-admin");
        router.refresh();
        return;
      }

      const errorMsg = result?.error ?? "Invalid OTP";
      toast.error(errorMsg);
      setOtp("");
    } catch (err) {
      console.error("🔍 OTP verify error:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------------------------
  // 🔄 Resend OTP
  // ---------------------------------------------------------------------------
  const handleResend = async () => {
    if (countdown > 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success("New OTP sent!");
      startCountdown();
      setOtp("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to resend");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------------------------
  // 🎨 RENDER
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(212,175,55,0.06)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(59,130,246,0.06)" }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-heading font-bold">
            <span className="text-nirvana-white">NIRVANA</span>
            <span className="text-nirvana-gold text-xs tracking-[0.3em] ml-2">TECH</span>
          </h1>
          <p className="text-xs text-nirvana-gray-500 mt-1 uppercase tracking-widest">
            Admin Studio
          </p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <StepDot label="01" active={step === "credentials"} done={step === "otp"} />
          <div className="w-12 h-px bg-white/10" />
          <StepDot label="02" active={step === "otp"} done={false} />
        </div>

        {/* Card */}
        <div className="relative glass border border-white/10 rounded-3xl p-8 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nirvana-gold/50 to-transparent" />

          <AnimatePresence mode="wait">

            {/* ======== STEP 1: Email + Password ======== */}
            {step === "credentials" && (
              <motion.div
                key="credentials"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Lock size={14} className="text-nirvana-gold" />
                    <span className="text-xs font-mono text-nirvana-gold/70 uppercase tracking-widest">
                      Step 01 — Credentials
                    </span>
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-nirvana-white">
                    Sign in
                  </h2>
                  <p className="text-sm text-nirvana-gray-400 mt-1">
                    Enter your admin credentials.
                  </p>
                </div>

                <form onSubmit={handleCredentials} className="space-y-4">
                  {/* Email */}
                  <div>
                    <label className="text-xs text-nirvana-gray-400 mb-1.5 block uppercase tracking-widest">
                      Email
                    </label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-nirvana-gray-500 pointer-events-none" />
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nirvanatech07@gmail.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-nirvana-white placeholder:text-nirvana-gray-600 focus:outline-none focus:border-nirvana-gold/50 transition-all text-sm"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="text-xs text-nirvana-gray-400 mb-1.5 block uppercase tracking-widest">
                      Password
                    </label>
                    <div className="relative">
                      <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-nirvana-gray-500 pointer-events-none" />
                      <input
                        type={showPw ? "text" : "password"}
                        required
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-nirvana-white placeholder:text-nirvana-gray-600 focus:outline-none focus:border-nirvana-gold/50 transition-all text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw(!showPw)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-nirvana-gray-500 hover:text-nirvana-white transition-colors"
                      >
                        {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 mt-2 rounded-full bg-gradient-to-r from-nirvana-gold via-nirvana-gold-light to-nirvana-blue text-nirvana-black font-semibold text-sm disabled:opacity-50 transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>Checking...</span>
                    ) : (
                      <>
                        <span>Continue</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {/* ======== STEP 2: OTP ======== */}
            {step === "otp" && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield size={14} className="text-nirvana-gold" />
                    <span className="text-xs font-mono text-nirvana-gold/70 uppercase tracking-widest">
                      Step 02 — Verification
                    </span>
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-nirvana-white">
                    Enter OTP
                  </h2>
                  <p className="text-sm text-nirvana-gray-400 mt-1">
                    Check{" "}
                    <span className="text-nirvana-gold font-medium">{email}</span>{" "}
                    for your 6-digit code.
                  </p>
                </div>

                <form onSubmit={handleOtpSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs text-nirvana-gray-400 mb-1.5 block uppercase tracking-widest">
                      6-digit Code
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={6}
                      autoFocus
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      placeholder="000000"
                      className="w-full px-4 py-4 rounded-xl bg-white/5 border border-nirvana-gold/30 text-nirvana-white text-center text-3xl font-mono tracking-[0.5em] placeholder:text-nirvana-gray-700 focus:outline-none focus:border-nirvana-gold/70 transition-all"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-nirvana-gray-500">
                      {countdown > 0 ? `Resend in ${countdown}s` : "Didn't receive the code?"}
                    </span>
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={countdown > 0 || loading}
                      className="flex items-center gap-1 text-nirvana-gold hover:text-nirvana-gold-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <RotateCcw size={11} />
                      Resend
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-nirvana-gold via-nirvana-gold-light to-nirvana-blue text-nirvana-black font-semibold text-sm disabled:opacity-50 transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2"
                  >
                    {loading ? <span>Verifying...</span> : (
                      <><Shield size={14} /><span>Verify & Sign in</span></>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => { setStep("credentials"); setOtp(""); }}
                    className="w-full py-2.5 rounded-full glass border border-white/10 text-nirvana-gray-400 hover:text-nirvana-white text-sm transition-all"
                  >
                    ← Back to password
                  </button>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        <p className="text-center text-xs text-nirvana-gray-600 mt-6">
          🔒 Protected admin area. Unauthorized access is logged.
        </p>
      </motion.div>
    </div>
  );
}

// Step dot component
function StepDot({ label, active, done }: { label: string; active: boolean; done: boolean }) {
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 ${
      done    ? "bg-nirvana-gold text-nirvana-black" :
      active  ? "bg-nirvana-gold/20 border border-nirvana-gold text-nirvana-gold" :
                "bg-white/5 border border-white/10 text-nirvana-gray-600"
    }`}>
      {done ? "✓" : label}
    </div>
  );
}