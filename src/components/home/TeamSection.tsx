"use client";

// =============================================================================
// 👥 NIRVANA TECH — Team Section
// =============================================================================
// Section 06 — 5 core team members.
//
// 📝 TO EDIT: Just update the TEAM array below with your real team's data.
//    Look for "← EDIT" comments to find what to change.
// =============================================================================

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, UserPlus } from "lucide-react";
import { useCursorStore } from "@/store/cursorStore";

// =============================================================================
// 👤 TEAM MEMBERS — EDIT THIS ARRAY WITH YOUR REAL TEAM
// =============================================================================
// For each member, edit:
//   - name         : Full name
//   - role         : Job title (e.g. "Founder & CEO", "Lead Designer")
//   - bio          : 1-2 sentences about them
//   - image        : Profile photo URL (placeholders provided)
//   - socialLinks  : Their LinkedIn / Twitter / GitHub (set to "" if no profile)
//
// 📸 To use your own photos:
//   Option A: Upload to https://imgur.com → copy image URL → paste below
//   Option B: Save as /public/team/name.jpg → use "/team/name.jpg" as image
// =============================================================================

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    dribbble?: string;
  };
}

const TEAM: TeamMember[] = [
  // ============== MEMBER 1 ==============
  {
    name: "Hradyansh Kaurav",                                          // ← EDIT
    role: "Founder & CEO",                                          // ← EDIT
    bio: "Creative entrepreneur and tech strategist leading Nirvana Tech Solutions with a vision to craft bold, immersive, and high-performing digital experiences.", // ← EDIT
    image: "https://res.cloudinary.com/dwenbr9ny/image/upload/q_auto/f_auto/v1779535257/HK_usksxx.jpg", // ← EDIT (photo URL)
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/hradyansh-kourav-516a5a327",                // ← EDIT
      twitter: "https://twitter.com/profile-1",                     // ← EDIT (or remove line)
      github: " https://github.com/Hradyansh11",                       // ← EDIT (or remove line)
    },
  },

  // ============== MEMBER 2 ==============
  {
    name: "Abhiraj",                                          // ← EDIT
    role: "Head of Design",                                         // ← EDIT
    bio: "Head of Design at Nirvana Tech Solutions, creating visually immersive and modern digital experiences driven by creativity, innovation, and user-focused design", // ← EDIT
    image: "https://res.cloudinary.com/dwenbr9ny/image/upload/q_auto/f_auto/v1779549953/abhiraj_hsh5ax.jpg", // ← EDIT
    socialLinks: {
      linkedin: "https://linkedin.com/in/profile-2",                // ← EDIT
      dribbble: "https://dribbble.com/profile-2",                   // ← EDIT
    },
  },

  // ============== MEMBER 3 ==============
  {
    name: "Divyansh Gautam",                                          // ← EDIT
    role: "Lead Developer",                                         // ← EDIT
    bio: "Lead Developer at Nirvana Tech Solutions, passionate about building futuristic, high-performance digital experiences with clean and innovative code.", // ← EDIT
    image: "https://res.cloudinary.com/dwenbr9ny/image/upload/v1779535100/divyanshnirvana_o2br7i.jpg", // ← EDIT
    socialLinks: {
      linkedin: "www.linkedin.com/in/divyansh-gautam-286754320",                // ← EDIT
      github: "https://github.com/divyansh01440",                       // ← EDIT
    },
  },

  // ============== MEMBER 4 ==============
  {
    name: "Harsh",                                          // ← EDIT
    role: "Marketing Director",                                     // ← EDIT
    bio: "Marketing Director at Nirvana Tech Solutions, passionate about building impactful brand strategies and driving digital growth through creative marketing.", // ← EDIT
    image: "https://res.cloudinary.com/dwenbr9ny/image/upload/q_auto/f_auto/v1779550019/ht_nos0pw.jpg", // ← EDIT
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/harsh-thakre-44b21a3a6",                // ← EDIT
      twitter: "https://twitter.com/profile-4",                     // ← EDIT
    },
  },

  // ============== MEMBER 5 ==============
  {
    name: "Vimarsh Tiwari",                                          // ← EDIT
    role: "DevOps Engineer",                                        // ← EDIT
    bio: "DevOps Engineer at Nirvana Tech Solutions, focused on building secure, scalable, and high-performance infrastructure for modern digital systems.", // ← EDIT
    image: "https://res.cloudinary.com/dwenbr9ny/image/upload/q_auto/f_auto/v1779536077/vt_pgl433.jpg", // ← EDIT
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/vimarsh-tiwari-217455357",                // ← EDIT
      github: "https://github.com/vimarsht8",                       // ← EDIT
    },
  },
];

// =============================================================================
// 👥 MAIN COMPONENT (you don't need to edit anything below this line)
// =============================================================================
export default function TeamSection() {
  const { setVariant, reset } = useCursorStore();

  return (
    <section
      id="team"
      className="relative w-full overflow-hidden py-20 sm:py-28 lg:py-36"
    >
      {/* Top gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-nirvana-gold/40 to-transparent" />
      </div>

      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Floating orbs */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-nirvana-gold/8 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-nirvana-blue/8 blur-[120px] pointer-events-none"
      />

      {/* ============== HEADER ============== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 mb-6"
        >
          <span className="w-8 h-px bg-nirvana-gold/40" />
          <span className="text-xs font-mono text-nirvana-gold/80 uppercase tracking-[0.3em]">
            05 — The Minds Behind It
          </span>
          <span className="w-8 h-px bg-nirvana-gold/40" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-nirvana-white leading-[1.1] mb-6 max-w-3xl mx-auto"
        >
          Meet the team{" "}
          <span className="gradient-text">obsessed with craft</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg text-nirvana-gray-400 max-w-2xl mx-auto"
        >
          Five people. One obsession. Every detail you experience here was
          touched by someone who cared deeply.
        </motion.p>
      </div>

      {/* ============== TEAM GRID ============== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {TEAM.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>

        {/* ============== "JOIN US" CTA ============== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 sm:mt-20 text-center"
        >
          <div className="inline-flex flex-col items-center gap-6">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass border border-nirvana-gold/30">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-nirvana-gold animate-ping opacity-75" />
                <span className="relative rounded-full w-2 h-2 bg-nirvana-gold" />
              </span>
              <span className="text-xs sm:text-sm text-nirvana-white font-medium">
                Always open to talented humans
              </span>
            </div>

            <Link
              href="/query"
              data-magnetic="true"
              onMouseEnter={() => setVariant("button")}
              onMouseLeave={reset}
              className="group relative inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-4 rounded-full overflow-hidden bg-gradient-to-r from-nirvana-gold via-nirvana-gold-light to-nirvana-blue text-nirvana-black text-sm sm:text-base font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]"
            >
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-[200%] transition-transform duration-700" />
              <UserPlus size={18} className="relative z-10" />
              <span className="relative z-10">Join our team</span>
              <ArrowUpRight
                size={18}
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            <p className="text-xs text-nirvana-gray-500 max-w-md">
              Send us your portfolio and a note about what you&apos;re obsessed with.
              We read every application.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// 🎴 TEAM CARD
// =============================================================================
interface TeamCardProps {
  member: TeamMember;
  index: number;
}

function TeamCard({ member, index }: TeamCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { setVariant, reset } = useCursorStore();

  // 3D tilt on mouse move
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 25,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    setVariant("image", "View");
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    reset();
  };

  // Filter out empty social links
  const activeSocials = Object.entries(member.socialLinks).filter(
    ([, url]) => url && url.length > 0
  );

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative aspect-[3/4] rounded-2xl overflow-hidden glass border border-white/10 hover:border-nirvana-gold/40 transition-all duration-500 hover:-translate-y-1"
    >
      {/* ===== BACKGROUND IMAGE ===== */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
          className="object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
        />
      </div>

      {/* ===== DARK GRADIENT OVERLAY ===== */}
      <div className="absolute inset-0 bg-gradient-to-t from-nirvana-black via-nirvana-black/70 to-transparent" />

      {/* ===== TOP BADGES ===== */}
      <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-nirvana-gold/90 text-nirvana-black text-[10px] font-semibold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-nirvana-black" />
          Team
        </span>

        <span className="text-[10px] font-mono text-nirvana-white/40 uppercase tracking-widest">
          0{index + 1}
        </span>
      </div>

      {/* ===== BOTTOM CONTENT ===== */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        {/* Name (always visible) */}
        <h3 className="text-lg sm:text-xl font-heading font-bold text-nirvana-white leading-tight mb-1">
          {member.name}
        </h3>

        {/* Role (always visible) */}
        <p className="text-xs sm:text-sm font-medium text-nirvana-gold">
          {member.role}
        </p>

        {/* Bio + social — slides up on hover */}
        <div className="overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-500 ease-out">
          <div className="pt-3 space-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <p className="text-xs text-nirvana-gray-300 leading-relaxed line-clamp-3">
              {member.bio}
            </p>

            {/* Social icons */}
            {activeSocials.length > 0 && (
              <div className="flex items-center gap-1.5 pt-1">
                {activeSocials.map(([key, url]) => (
                  <Link
                    key={key}
                    href={url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={key}
                    className="w-7 h-7 rounded-full glass border border-white/10 flex items-center justify-center text-nirvana-gold text-[10px] font-bold hover:scale-110 hover:bg-nirvana-gold/10 transition-all"
                  >
                    {key.charAt(0).toUpperCase()}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== HOVER GLOW BORDER ===== */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_50px_rgba(212,175,55,0.15)]" />
    </motion.div>
  );
}