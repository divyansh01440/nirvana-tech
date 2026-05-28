// src/lib/auth-middleware.ts  ← CREATE THIS
import NextAuth from "next-auth";

export const { auth } = NextAuth({
  providers: [],  // no providers needed in middleware
  callbacks: {
    jwt({ token }) { return token; },
    session({ session, token }) { return session; },
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
});