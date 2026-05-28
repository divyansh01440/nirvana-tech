import type { Metadata } from "next";
import HackerTrap from "@/components/admin-trap/HackerTrap";

// =============================================================================
// 🪤 NIRVANA TECH — Fake Admin Honeypot
// =============================================================================
// Anyone trying /admin lands here. Looks like a hacker-defense system.
// Real admin lives at /nirvana-tech-admin behind auth.
// =============================================================================

export const metadata: Metadata = {
  title: "🔒 Access Denied — Nirvana Tech Security",
  description: "Unauthorized access attempt logged.",
  robots: { index: false, follow: false },
};

export default function FakeAdminPage() {
  return <HackerTrap />;
}