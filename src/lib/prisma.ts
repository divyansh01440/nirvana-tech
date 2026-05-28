// =============================================================================
// 🗄️ NIRVANA TECH — Prisma Client Singleton
// =============================================================================
// Prevents multiple PrismaClient instances during Next.js hot-reload in dev.
// Without this, you'd get "too many connections" errors after a few edits.
//
// Usage:
//   import { prisma } from "@/lib/prisma";
//   const users = await prisma.user.findMany();
// =============================================================================

import { PrismaClient } from "@prisma/client";

// Declare a global type so TypeScript knows about our cached instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Reuse existing instance in dev, or create a new one
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
  });

// In dev, attach to global to persist across hot-reloads
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Default export for flexibility
export default prisma;