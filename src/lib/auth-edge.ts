// src/lib/auth-edge.ts
// Lightweight auth config for middleware ONLY.
// Does NOT import Prisma or bcrypt — safe for Edge Runtime.

import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";

const edgeConfig: NextAuthConfig = {
  providers: [],
  callbacks: {
    jwt({ token }) {
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) ?? "";
        session.user.role = (token.role as string) ?? "CLIENT";
      }
      return session;
    },
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
};

export const { auth } = NextAuth(edgeConfig);