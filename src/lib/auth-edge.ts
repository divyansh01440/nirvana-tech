// =============================================================================
// 🔐 NIRVANA TECH — Edge-Safe Auth (for middleware only)
// =============================================================================
// This is a MINIMAL NextAuth config that ONLY verifies JWT tokens.
// NO Prisma, NO bcrypt — safe for Edge Runtime.
// The full auth (with Prisma + bcrypt) lives in auth.ts
// Both use the same AUTH_SECRET so JWTs are cross-compatible.
// =============================================================================

import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";

const edgeConfig = {
  providers: [], // No providers needed — middleware only READS tokens, never creates them
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id ?? "") as string;
        session.user.role = (token.role ?? "CLIENT") as string;
      }
      return session;
    },
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

export const { auth } = NextAuth(edgeConfig);