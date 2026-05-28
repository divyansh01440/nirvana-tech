// =============================================================================
// 🛡️ NIRVANA TECH — Middleware (Edge Runtime safe)
// =============================================================================
// Uses lightweight edge auth — NO Prisma, NO bcrypt.
// Auth checking in server pages uses full auth.ts instead.
// =============================================================================

import { auth } from "./src/lib/auth-edge";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Always allow the login page
  if (pathname === "/nirvana-tech-admin/login") {
    // If already logged in, redirect to dashboard
    if (req.auth?.user) {
      return NextResponse.redirect(
        new URL("/nirvana-tech-admin", req.url)
      );
    }
    return NextResponse.next();
  }

  // Protect all admin routes
  if (pathname.startsWith("/nirvana-tech-admin")) {
    // Not logged in → redirect to login
    if (!req.auth?.user) {
      const loginUrl = new URL("/nirvana-tech-admin/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Wrong role → redirect to home
    const role = (req.auth.user as { role?: string }).role ?? "";
    if (!["ADMIN", "MANAGER", "TEAM"].includes(role)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/nirvana-tech-admin/:path*"],
};