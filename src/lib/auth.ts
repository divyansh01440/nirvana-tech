// =============================================================================
// 🔐 NIRVANA TECH — NextAuth v5
// =============================================================================

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import type { DefaultSession, NextAuthConfig } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: { id: string; role: string } & DefaultSession["user"];
  }
  interface User { role: string; }
}

const MAX_ATTEMPTS = 5;
const LOCK_MS = 15 * 60 * 1000;

const config: NextAuthConfig = {
  pages: {
    signIn: "/nirvana-tech-admin/login",
    error: "/nirvana-tech-admin/login",
  },

  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },

  providers: [
    Credentials({
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" },
        otp:      { label: "OTP",      type: "text"     },
      },

      async authorize(credentials) {
        // --- DEBUG ---
        console.log("🔐 [auth] authorize() called for:", credentials?.email);

        try {
          const email    = String(credentials?.email    ?? "").toLowerCase().trim();
          const password = String(credentials?.password ?? "");
          const otp      = String(credentials?.otp      ?? "").trim();

          if (!email || !password) {
            console.log("🔐 [auth] Missing email or password");
            throw new Error("Email and password required");
          }

          // 1. Find user
          console.log("🔐 [auth] Looking up user:", email);
          const user = await prisma.user.findUnique({ where: { email } });

          if (!user || !user.password) {
            console.log("🔐 [auth] User not found or no password");
            throw new Error("Invalid credentials");
          }

          console.log("🔐 [auth] User found:", user.email, "role:", user.role);

          // 2. Check lockout
          if (user.lockedUntil && user.lockedUntil > new Date()) {
            const mins = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 60000);
            console.log("🔐 [auth] Account locked for", mins, "minutes");
            throw new Error(`Account locked. Try again in ${mins} minute(s).`);
          }

          // 3. Verify password
          console.log("🔐 [auth] Comparing password...");
          const valid = await bcrypt.compare(password, user.password);
          console.log("🔐 [auth] Password valid:", valid);

          if (!valid) {
            const attempts   = user.failedAttempts + 1;
            const shouldLock = attempts >= MAX_ATTEMPTS;
            await prisma.user.update({
              where: { id: user.id },
              data: {
                failedAttempts: attempts,
                lockedUntil: shouldLock ? new Date(Date.now() + LOCK_MS) : null,
              },
            });
            if (shouldLock) throw new Error("Account locked for 15 minutes.");
            throw new Error(`Invalid credentials. ${MAX_ATTEMPTS - attempts} attempt(s) remaining.`);
          }

          // 4. OTP check
          if (user.twoFAEnabled) {
            console.log("🔐 [auth] 2FA enabled, checking OTP");
            if (!otp) throw new Error("OTP code required");
            if (!user.otpCode || !user.otpExpires) throw new Error("No OTP issued. Request a new code.");
            if (user.otpExpires < new Date()) throw new Error("OTP expired. Request a new code.");
            if (user.otpCode !== otp) throw new Error("Invalid OTP code.");
            await prisma.user.update({
              where: { id: user.id },
              data: { otpCode: null, otpExpires: null },
            });
          }

          // 5. Success
          await prisma.user.update({
            where: { id: user.id },
            data: { failedAttempts: 0, lockedUntil: null, lastLoginAt: new Date() },
          });

          console.log("🔐 [auth] Login SUCCESS for:", user.email);

          return {
            id:    user.id,
            email: user.email,
            name:  user.name,
            role:  user.role,
            image: user.image,
          };

        } catch (err) {
          console.error("🔐 [auth] authorize() error:", err);
          if (err instanceof Error) throw err;
          throw new Error("Authentication failed");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id   = user.id as string;
        token.role = user.role as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id   = (token.id   ?? "") as string;
        session.user.role = (token.role ?? "CLIENT") as string;
      }
      return session;
    },
  },

  events: {
    async signIn({ user }) {
      console.log("🔐 [auth] signIn event:", user?.email);
      if (user?.id) {
        prisma.analytics.create({
          data: { event: "sign_in", userId: user.id, metadata: { email: user.email ?? "" } },
        }).catch(() => {});
      }
    },
  },

  trustHost: true,
  secret: process.env.AUTH_SECRET,
  debug: true, // ← enable full debug logs
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);