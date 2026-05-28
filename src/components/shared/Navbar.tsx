"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { useCursorStore } from "@/store/cursorStore";
import { useMenuStore } from "@/store/menuStore";
import { NAV_LINKS, SOCIAL_LINKS, CONTACT_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const { setVariant, reset } = useCursorStore();
  const { isOpen, toggle, close } = useMenuStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    close();
  }, [pathname, close]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-black/60 backdrop-blur-2xl border-b border-white/10"
            : "bg-black/30 backdrop-blur-xl border-b border-white/5"
        )}
      >
        <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
          <motion.div
            className="h-full w-full bg-gradient-to-r from-transparent via-nirvana-gold/60 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <motion.div
          animate={{
            paddingTop: scrolled ? 12 : 20,
            paddingBottom: scrolled ? 12 : 20,
          }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center"
        >
          <Link
            href="/"
            onMouseEnter={() => setVariant("hover")}
            onMouseLeave={reset}
            className="flex items-center gap-1.5 group"
            aria-label="Nirvana Tech Solutions home"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="text-xl sm:text-2xl font-heading font-bold text-nirvana-white tracking-tight group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all"
            >
              NIRVANA
            </motion.span>
            <span className="text-[10px] sm:text-xs font-heading font-semibold text-nirvana-gold tracking-[0.2em] uppercase mt-1">
              Tech
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-2">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-magnetic="true"
                  onMouseEnter={() => setVariant("hover")}
                  onMouseLeave={reset}
                  className="relative px-5 py-2 group"
                >
                  <span
                    className={cn(
                      "relative z-10 text-sm font-medium font-body tracking-wide transition-colors duration-300",
                      isActive
                        ? "text-nirvana-gold"
                        : "text-nirvana-white/80 group-hover:text-nirvana-white"
                    )}
                  >
                    {link.label}
                  </span>
                  <span
                    className={cn(
                      "absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-nirvana-gold via-nirvana-gold-light to-nirvana-blue transition-all duration-500 ease-out",
                      isActive ? "w-3/4" : "w-0 group-hover:w-3/4"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/query"
              data-magnetic="true"
              onMouseEnter={() => setVariant("button")}
              onMouseLeave={reset}
              className="hidden sm:inline-flex group relative items-center gap-2 px-5 lg:px-6 py-2.5 lg:py-3 rounded-full overflow-hidden bg-gradient-to-r from-nirvana-gold via-nirvana-gold-light to-nirvana-blue text-nirvana-black text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
            >
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-[200%] transition-transform duration-700" />
              <span className="relative z-10">Book a Call</span>
              <ArrowUpRight
                size={16}
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            <button
              onClick={toggle}
              onMouseEnter={() => setVariant("button")}
              onMouseLeave={reset}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="lg:hidden relative w-11 h-11 flex items-center justify-center rounded-full glass border border-white/10"
            >
              <div className="relative w-5 h-4 flex flex-col justify-between">
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="block h-0.5 w-full bg-nirvana-gold rounded-full origin-center"
                />
                <motion.span
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                  className="block h-0.5 w-full bg-nirvana-gold rounded-full"
                />
                <motion.span
                  animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="block h-0.5 w-full bg-nirvana-gold rounded-full origin-center"
                />
              </div>
            </button>
          </div>
        </motion.div>
      </motion.header>

      <MobileMenu isOpen={isOpen} onClose={close} pathname={pathname} />
    </>
  );
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 lg:hidden"
        >
          <motion.div
            initial={{ clipPath: "circle(0% at 95% 5%)" }}
            animate={{ clipPath: "circle(150% at 95% 5%)" }}
            exit={{ clipPath: "circle(0% at 95% 5%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-aurora bg-nirvana-black"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            <motion.div
              animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-nirvana-gold/10 blur-[100px]"
            />
            <motion.div
              animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-1/4 -right-20 w-72 h-72 rounded-full bg-nirvana-blue/10 blur-[100px]"
            />
          </motion.div>

          <div className="relative h-full flex flex-col px-6 pt-24 pb-10 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xs font-mono text-nirvana-gold/70 uppercase tracking-[0.3em] mb-8"
            >
              ── Navigation
            </motion.div>

            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{
                      delay: 0.4 + i * 0.1,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={cn(
                        "group block py-4 border-b border-white/10 transition-colors duration-300",
                        isActive ? "text-nirvana-gold" : "text-nirvana-white"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-3xl sm:text-4xl font-heading font-bold">
                          {link.label}
                        </span>
                        <ArrowUpRight
                          size={28}
                          className={cn(
                            "transition-all duration-300 -rotate-45 group-hover:rotate-0",
                            isActive ? "text-nirvana-gold" : "text-nirvana-gray-500"
                          )}
                        />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-10"
            >
              <Link
                href="/query"
                onClick={onClose}
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-nirvana-gold via-nirvana-gold-light to-nirvana-blue text-nirvana-black text-base font-semibold overflow-hidden"
              >
                <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-[200%] transition-transform duration-700" />
                <span className="relative z-10">Book a Call</span>
                <ArrowUpRight size={18} className="relative z-10" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mt-auto pt-10 space-y-6"
            >
              <div className="space-y-3">
                <div className="text-xs uppercase tracking-widest text-nirvana-gray-500">
                  Get in touch
                </div>

                <Link
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-2 text-base text-nirvana-white/90 hover:text-nirvana-gold transition-colors"
                >
                  <Mail size={16} />
                  {CONTACT_INFO.email}
                </Link>

                <Link
                  href={`tel:${CONTACT_INFO.phoneRaw}`}
                  className="flex items-center gap-2 text-base text-nirvana-white/90 hover:text-nirvana-gold transition-colors"
                >
                  <Phone size={16} />
                  {CONTACT_INFO.phone}
                </Link>
              </div>

              <div className="flex items-center gap-3 pt-2">
                {SOCIAL_LINKS.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-nirvana-gold text-xs font-bold hover:scale-110 hover:bg-nirvana-gold/10 transition-all"
                  >
                    {social.name.charAt(0)}
                  </Link>
                ))}
              </div>

              <div className="pt-4 text-xs text-nirvana-gray-600 font-mono">
                © 2026 Nirvana Tech Solutions
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}