// =============================================================================
// 🔐 NextAuth API Route — MUST run in Node runtime, not Edge
// =============================================================================

import { handlers } from "@/lib/auth";

export const runtime = "nodejs";
export const { GET, POST } = handlers;