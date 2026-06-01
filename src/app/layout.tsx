import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import CustomCursor from "@/components/shared/CustomCursor";
import SmoothScroll from "@/components/shared/SmoothScroll";
import LoadingScreen from "@/components/shared/LoadingScreen";

// =============================================================================
// 🔤 FONTS
// =============================================================================
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700"],
  display: "swap",
});

// =============================================================================
// 📋 METADATA
// =============================================================================
export const metadata: Metadata = {
  // ── Basic ──────────────────────────────────────────
  title: {
    default: "Nirvana Tech Solutions — Web Agency in Jabalpur, India",
    template: "%s | Nirvana Tech Solutions",
  },
  description:
    "Nirvana Tech Solutions is a premium web design & development agency in Jabalpur, Madhya Pradesh. We build stunning websites, digital marketing, SEO, and e-commerce solutions for businesses across India.",

  // ── Keywords ───────────────────────────────────────
  keywords: [
    "web agency Jabalpur",
    "web design Jabalpur",
    "digital agency Bhopal",
    "web development Madhya Pradesh",
    "website design India",
    "SEO agency Jabalpur",
    "digital marketing Jabalpur",
    "e-commerce development India",
    "Next.js agency India",
    "Nirvana Tech Solutions",
    "nirvanatechsolution.xyz",
  ],

  // ── Author ─────────────────────────────────────────
  authors: [{ name: "Nirvana Tech Solutions", url: "https://nirvanatechsolution.xyz" }],
  creator: "Nirvana Tech Solutions",
  publisher: "Nirvana Tech Solutions",

  // ── Canonical URL ──────────────────────────────────
  metadataBase: new URL("https://nirvanatechsolution.xyz"),
  alternates: {
    canonical: "/",
  },

  // ── Open Graph (Facebook, LinkedIn, WhatsApp) ──────
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://nirvanatechsolution.xyz",
    siteName: "Nirvana Tech Solutions",
    title: "Nirvana Tech Solutions — Web Agency in Jabalpur, India",
    description:
      "Premium web design, development & digital marketing agency. We build digital experiences that feel alive.",
    images: [
      {
        url: "https://res.cloudinary.com/dwenbr9ny/image/upload/q_auto/f_auto/v1780300861/Copilot_20260601_133035_xw6d4h.png",
        width: 1200,
        height: 630,
        alt: "Nirvana Tech Solutions — Web Agency",
      },
    ],
  },

  // ── Twitter/X Card ─────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Nirvana Tech Solutions — Web Agency",
    description: "Premium web design & development agency in Jabalpur, India.",
    images: ["https://res.cloudinary.com/dwenbr9ny/image/upload/q_auto/f_auto/v1780300861/Copilot_20260601_133035_xw6d4h.png"],
    creator: "@nirvanatech",
  },

  // ── Robots ─────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Verification (add after setting up Google Search Console) ──
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_CODE",
  // },

  // ── App links ──────────────────────────────────────
  category: "technology",
};

// =============================================================================
// 🏗️ ROOT LAYOUT
// =============================================================================
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-nirvana-black text-nirvana-white antialiased`}
      >
        {/* Cinematic intro (shows once per session) */}
        <LoadingScreen />

        {/* Premium custom cursor (auto-disabled on touch devices) */}
        <CustomCursor />

        {/* Smooth scroll wrapper */}
        <SmoothScroll>{children}</SmoothScroll>

        {/* Toast notifications */}
        <Toaster
          position="bottom-right"
          theme="dark"
          richColors
          closeButton
          toastOptions={{
            style: {
              background: "rgba(5, 5, 5, 0.9)",
              border: "1px solid rgba(212, 175, 55, 0.2)",
              backdropFilter: "blur(20px)",
              color: "#F5F5F5",
            },
            className: "font-body",
          }}
        />
      </body>
    </html>
  );
}