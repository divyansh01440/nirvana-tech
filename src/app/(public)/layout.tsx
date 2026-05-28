import type { ReactNode } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import PageTransition from "@/components/shared/PageTransition";

// =============================================================================
// 🌐 PUBLIC LAYOUT
// =============================================================================
// Wraps all public-facing pages (Home, Services, Query).
// Provides: Navbar at top, Footer at bottom, cinematic page transitions.
//
// The (public) folder is a "route group" — parentheses mean it doesn't
// affect URLs. /(public)/page.tsx is served at "/", not "/public".
//
// Admin pages will live in a separate route group like (admin) with
// their own layout (sidebar, no navbar, no footer).
// =============================================================================

export default function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </>
  );
}