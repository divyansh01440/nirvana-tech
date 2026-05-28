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
  title: {
    default: "Nirvana Tech Solutions — We Build Digital Experiences That Feel Alive",
    template: "%s | Nirvana Tech Solutions",
  },
  description:
    "Nirvana Tech Solutions creates futuristic websites, digital systems, and growth experiences for modern businesses.",
  keywords: [
    "web design agency",
    "digital agency India",
    "Next.js development",
    "premium website design",
    "SEO services",
    "e-commerce development",
  ],
  openGraph: {
    title: "Nirvana Tech Solutions",
    description: "We build digital experiences that feel alive.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nirvana Tech Solutions",
    description: "We build digital experiences that feel alive.",
  },
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