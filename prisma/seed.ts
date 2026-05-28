// =============================================================================
// 🌱 NIRVANA TECH SOLUTIONS — Database Seed
// =============================================================================
// Populates the database with realistic starter data.
// Run with: npm run seed
// =============================================================================

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables
config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

// Validate DATABASE_URL exists
if (!process.env.DATABASE_URL) {
  console.error("\n❌  DATABASE_URL is not set in .env or .env.local\n");
  process.exit(1);
}

const prisma = new PrismaClient();

async function main() {
  console.log("🌱  Starting seed...\n");

  // ===========================================================================
  // 1. ADMIN USER
  // ===========================================================================
  console.log("👤  Creating admin user...");

  const adminEmail =
    process.env.ADMIN_DEFAULT_EMAIL || "admin@nirvanatech.com";
  const adminPassword =
    process.env.ADMIN_DEFAULT_PASSWORD || "ChangeMe@2025!";
  const adminName = process.env.ADMIN_DEFAULT_NAME || "Nirvana Admin";

  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  // Schema has: id, email, name, password, image, role, bio,
  // twoFAEnabled, twoFASecret, otpCode, otpExpires,
  // failedAttempts, lockedUntil, lastLoginAt, lastLoginIp, lastLoginDevice
  // NO "active" field — removed to match schema
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: adminName,
      password: hashedPassword,
      role: "ADMIN",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
      // ✅ No "active" field — does not exist in User model
    },
  });
  console.log(`   ✓ Admin created: ${admin.email}`);

  // ===========================================================================
  // 2. TEAM MEMBERS (5 core members)
  // ===========================================================================
  console.log("\n👥  Creating team members...");

  // Schema TeamMember fields:
  // id, name, role, bio, image, email, linkedin, twitter, github, dribbble,
  // isFounder, isActive, order, createdAt, updatedAt
  // NO "skills" field, NO "socialLinks" Json field — use flat columns instead
  const teamMembers = [
    {
      name: "Aarav Sharma",
      role: "Founder & CEO",
      bio: "Visionary leader with 10+ years building digital products. Passionate about creating experiences that merge technology and storytelling.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
      email: "aarav@nirvanatech.com",
      linkedin: "https://linkedin.com/in/aarav-sharma",
      twitter: "https://twitter.com/aarav",
      github: "https://github.com/aarav",
      dribbble: null,
      isFounder: true,
      isActive: true,
      order: 1,
    },
    {
      name: "Priya Mehta",
      role: "Head of Design",
      bio: "Award-winning designer specializing in motion design and brand systems. Believes great design is invisible — until it's not.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
      email: "priya@nirvanatech.com",
      linkedin: "https://linkedin.com/in/priya-mehta",
      twitter: null,
      github: null,
      dribbble: "https://dribbble.com/priya",
      isFounder: false,
      isActive: true,
      order: 2,
    },
    {
      name: "Rohan Verma",
      role: "Lead Developer",
      bio: "Full-stack architect obsessed with performance and clean code. Builds systems that scale gracefully under pressure.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800",
      email: "rohan@nirvanatech.com",
      linkedin: "https://linkedin.com/in/rohan-verma",
      twitter: null,
      github: "https://github.com/rohan",
      dribbble: null,
      isFounder: false,
      isActive: true,
      order: 3,
    },
    {
      name: "Ananya Iyer",
      role: "Marketing Director",
      bio: "Growth strategist who turns brands into movements. Specializes in content, SEO, and conversion-focused campaigns.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800",
      email: "ananya@nirvanatech.com",
      linkedin: "https://linkedin.com/in/ananya-iyer",
      twitter: "https://twitter.com/ananya",
      github: null,
      dribbble: null,
      isFounder: false,
      isActive: true,
      order: 4,
    },
    {
      name: "Karan Singh",
      role: "DevOps & Cloud Architect",
      bio: "Infrastructure wizard who keeps things running 24/7. Specializes in AWS, automation, and bulletproof deployments.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800",
      email: "karan@nirvanatech.com",
      linkedin: "https://linkedin.com/in/karan-singh",
      twitter: null,
      github: "https://github.com/karan",
      dribbble: null,
      isFounder: false,
      isActive: true,
      order: 5,
    },
  ];

  for (const member of teamMembers) {
    const existing = await prisma.teamMember.findFirst({
      where: { email: member.email },
    });
    if (!existing) {
      await prisma.teamMember.create({ data: member });
      console.log(`   ✓ Team member: ${member.name}`);
    } else {
      console.log(`   • Skipped (exists): ${member.name}`);
    }
  }

  // ===========================================================================
  // 3. SERVICES (6 core services)
  // ===========================================================================
  console.log("\n🛠️   Creating services...");

  // Schema Service fields:
  // id, title, slug, icon, shortDesc, longDesc, features (String[]),
  // accentColor, isActive, order, createdAt
  // NO "technologies" field, NO "pricing" field — removed to match schema
  const services = [
    {
      title: "Website Development",
      slug: "website-development",
      icon: "Globe",
      shortDesc: "Premium custom websites that load fast and convert better.",
      longDesc:
        "We build production-grade websites using Next.js, React, and modern web technologies. From marketing sites to complex web apps, every project is crafted for speed, scale, and stunning visuals.",
      features: [
        "Custom Next.js / React builds",
        "Lightning-fast performance",
        "SEO-optimized architecture",
        "CMS integration",
        "Responsive across all devices",
        "Accessibility compliant",
      ],
      accentColor: "#D4AF37",
      isActive: true,
      order: 1,
    },
    {
      title: "Digital Marketing",
      slug: "digital-marketing",
      icon: "TrendingUp",
      shortDesc: "Data-driven campaigns that turn browsers into buyers.",
      longDesc:
        "End-to-end digital marketing — from strategy to execution. We craft campaigns that drive measurable growth through paid ads, content, and conversion optimization.",
      features: [
        "Paid ads (Google, Meta, LinkedIn)",
        "Content marketing strategy",
        "Email automation",
        "Conversion rate optimization",
        "A/B testing",
        "Monthly performance reports",
      ],
      accentColor: "#3B82F6",
      isActive: true,
      order: 2,
    },
    {
      title: "SEO Optimization",
      slug: "seo-optimization",
      icon: "Search",
      shortDesc: "Climb to page one — and stay there.",
      longDesc:
        "Comprehensive SEO services that drive organic traffic. We optimize every layer — technical, on-page, content, and backlinks — for long-term ranking dominance.",
      features: [
        "Technical SEO audits",
        "Keyword research",
        "On-page optimization",
        "Link building",
        "Local SEO",
        "Schema markup",
      ],
      accentColor: "#D4AF37",
      isActive: true,
      order: 3,
    },
    {
      title: "E-Commerce Solutions",
      slug: "ecommerce-solutions",
      icon: "ShoppingBag",
      shortDesc: "Online stores built to sell, scale, and delight.",
      longDesc:
        "Custom e-commerce platforms or Shopify/WooCommerce builds optimized for conversions. Beautiful storefronts, seamless checkout, and powerful admin tools.",
      features: [
        "Shopify / Custom builds",
        "Payment gateway integration",
        "Inventory management",
        "Conversion-optimized UX",
        "Analytics dashboard",
        "Multi-currency support",
      ],
      accentColor: "#3B82F6",
      isActive: true,
      order: 4,
    },
    {
      title: "Software Development",
      slug: "software-development",
      icon: "Code2",
      shortDesc: "Custom software that solves real business problems.",
      longDesc:
        "From SaaS platforms to internal tools, we build robust software solutions tailored to your business. Clean code, modern architecture, future-proof.",
      features: [
        "Custom SaaS platforms",
        "API development",
        "Internal dashboards",
        "Mobile applications",
        "Third-party integrations",
        "Ongoing maintenance",
      ],
      accentColor: "#D4AF37",
      isActive: true,
      order: 5,
    },
    {
      title: "Analytics & Growth",
      slug: "analytics-growth",
      icon: "BarChart3",
      shortDesc: "Turn data into your unfair competitive advantage.",
      longDesc:
        "Set up analytics infrastructure, dashboards, and growth experiments. Stop guessing — start knowing exactly what drives your business.",
      features: [
        "Analytics setup (GA4, Mixpanel)",
        "Custom dashboards",
        "Growth experiments",
        "User journey analysis",
        "Cohort analysis",
        "Monthly insights reports",
      ],
      accentColor: "#3B82F6",
      isActive: true,
      order: 6,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    });
    console.log(`   ✓ Service: ${service.title}`);
  }

  // ===========================================================================
  // 4. PROJECTS (8 portfolio items)
  // ===========================================================================
  console.log("\n📁  Creating projects...");

  // Schema Project fields:
  // id, title, slug, category, client (String), description, longDescription,
  // image, gallery (String[]), technologies (String[]), liveUrl, caseStudyUrl,
  // status (ProjectStatus), featured, order, startDate, endDate,
  // createdAt, updatedAt, tasks, clientId (optional FK), channel
  //
  // NOTE: "client" in schema is a plain String column (not a relation here)
  // "clientName" does NOT exist — it's just "client"
  // "status" uses ProjectStatus enum: PLANNING | IN_PROGRESS | REVIEW | LIVE | ARCHIVED
  // Old seed used "PUBLISHED" which does NOT exist in enum — fixed to "LIVE"
  const projects = [
    {
      title: "Aether Finance Dashboard",
      slug: "aether-finance",
      category: "Web",
      client: "Aether Capital",
      description:
        "A premium fintech dashboard with real-time analytics and beautiful data visualization.",
      longDescription:
        "Built a comprehensive financial analytics platform for high-net-worth clients. Features include real-time portfolio tracking, AI-powered insights, and a clean, professional UI.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
      gallery: [] as string[],
      technologies: ["Next.js", "TypeScript", "Recharts", "PostgreSQL"],
      liveUrl: "https://example.com",
      status: "LIVE" as const,
      featured: true,
      order: 1,
    },
    {
      title: "Lumen E-Commerce",
      slug: "lumen-ecommerce",
      category: "E-Commerce",
      client: "Lumen Lighting",
      description:
        "Luxury lighting brand's online store with immersive 3D product previews.",
      longDescription:
        "Conceptualized and built a high-end e-commerce experience featuring 3D product visualization, advanced filtering, and an obsessively crafted checkout flow.",
      image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200",
      gallery: [] as string[],
      technologies: ["Shopify", "Three.js", "Tailwind", "GSAP"],
      liveUrl: "https://example.com",
      status: "LIVE" as const,
      featured: true,
      order: 2,
    },
    {
      title: "Nova SaaS Platform",
      slug: "nova-saas",
      category: "Web",
      client: "Nova Inc.",
      description:
        "Project management tool for creative agencies — built from the ground up.",
      longDescription:
        "A full SaaS platform with team collaboration, time tracking, invoicing, and client portals. Used by 200+ agencies globally.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
      gallery: [] as string[],
      technologies: ["Next.js", "tRPC", "Prisma", "Stripe"],
      liveUrl: "https://example.com",
      status: "LIVE" as const,
      featured: true,
      order: 3,
    },
    {
      title: "Veda Wellness App",
      slug: "veda-wellness",
      category: "Mobile",
      client: "Veda Health",
      description:
        "Mobile-first wellness app for guided meditation and habit tracking.",
      longDescription:
        "Designed and developed a cross-platform wellness application with personalized programs, audio sessions, and progress analytics.",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200",
      gallery: [] as string[],
      technologies: ["React Native", "Expo", "Firebase"],
      liveUrl: "https://example.com",
      status: "LIVE" as const,
      featured: false,
      order: 4,
    },
    {
      title: "Orbit Studio Portfolio",
      slug: "orbit-studio",
      category: "Branding",
      client: "Orbit Studio",
      description:
        "Brand identity and award-winning portfolio site for a motion design studio.",
      longDescription:
        "Comprehensive rebrand and website with WebGL experiments, cinematic transitions, and a custom CMS.",
      image:
        "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200",
      gallery: [] as string[],
      technologies: ["Next.js", "WebGL", "Sanity"],
      liveUrl: "https://example.com",
      status: "LIVE" as const,
      featured: false,
      order: 5,
    },
    {
      title: "Helios Solar Marketplace",
      slug: "helios-solar",
      category: "Web",
      client: "Helios Energy",
      description:
        "B2B marketplace connecting solar installers with property owners.",
      longDescription:
        "Two-sided marketplace with quote engine, project tracker, and payment escrow. Helped grow GMV by 300% in year one.",
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200",
      gallery: [] as string[],
      technologies: ["Next.js", "PostgreSQL", "Stripe Connect"],
      liveUrl: "https://example.com",
      status: "LIVE" as const,
      featured: false,
      order: 6,
    },
    {
      title: "Atlas Travel Blog",
      slug: "atlas-travel",
      category: "Web",
      client: "Atlas Magazine",
      description:
        "Editorial travel platform with stunning photography-first layouts.",
      longDescription:
        "Custom CMS-powered editorial site for an international travel publication. Features include interactive maps, story collections, and audio narration.",
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200",
      gallery: [] as string[],
      technologies: ["Next.js", "Sanity CMS", "Mapbox"],
      liveUrl: "https://example.com",
      status: "LIVE" as const,
      featured: false,
      order: 7,
    },
    {
      title: "Pulse Fitness Tracker",
      slug: "pulse-fitness",
      category: "Mobile",
      client: "Pulse Athletics",
      description:
        "Wearable-integrated fitness app with AI-powered workout recommendations.",
      longDescription:
        "Mobile + web platform that syncs with smartwatches and provides personalized training plans powered by ML.",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200",
      gallery: [] as string[],
      technologies: ["React Native", "Node.js", "TensorFlow"],
      liveUrl: "https://example.com",
      status: "LIVE" as const,
      featured: false,
      order: 8,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
    console.log(`   ✓ Project: ${project.title}`);
  }

  // ===========================================================================
  // 5. CLIENTS (6 with testimonials)
  // ===========================================================================
  console.log("\n🏢  Creating clients...");

  // Schema Client fields:
  // id, userId (optional), companyName, contactName, email, phone,
  // website, industry, notes, createdAt, updatedAt
  //
  // The old seed used a completely different Client shape (name, logo,
  // testimonial, rating, featured, order) — those fields do NOT exist.
  // Fixed to match actual schema columns.
  const clients = [
    {
      companyName: "Aether Capital",
      contactName: "Alex Morgan",
      email: "alex@aethercapital.com",
      phone: null,
      website: "https://example.com",
      industry: "Finance",
      notes:
        "Testimonial: Nirvana delivered beyond every expectation. Our new platform increased client engagement by 240% in three months.",
    },
    {
      companyName: "Lumen Lighting",
      contactName: "Sara Chen",
      email: "sara@lumenlighting.com",
      phone: null,
      website: "https://example.com",
      industry: "E-Commerce",
      notes:
        "Testimonial: The team turned our brand vision into reality with stunning attention to detail. Our conversion rate doubled overnight.",
    },
    {
      companyName: "Nova Inc.",
      contactName: "James Wilson",
      email: "james@novainc.com",
      phone: null,
      website: "https://example.com",
      industry: "SaaS",
      notes:
        "Testimonial: We've worked with many agencies. None come close to Nirvana's craft and care. They feel like part of our team.",
    },
    {
      companyName: "Veda Health",
      contactName: "Priya Nair",
      email: "priya@vedahealth.com",
      phone: null,
      website: "https://example.com",
      industry: "Health & Wellness",
      notes:
        "Testimonial: From strategy to launch, they were ruthlessly focused on outcomes. Our app launch exceeded every KPI.",
    },
    {
      companyName: "Orbit Studio",
      contactName: "Marcus Lee",
      email: "marcus@orbitstudio.com",
      phone: null,
      website: "https://example.com",
      industry: "Design",
      notes:
        "Testimonial: Best creative collaboration of our career. The Nirvana team brought ideas to life we didn't even know we wanted.",
    },
    {
      companyName: "Helios Energy",
      contactName: "Ravi Patel",
      email: "ravi@heliosenergy.com",
      phone: null,
      website: "https://example.com",
      industry: "Energy",
      notes:
        "Testimonial: Smart, fast, and obsessed with quality. They built our entire marketplace platform in record time.",
    },
  ];

  for (const client of clients) {
    const existing = await prisma.client.findFirst({
      where: { companyName: client.companyName },
    });
    if (!existing) {
      await prisma.client.create({ data: client });
      console.log(`   ✓ Client: ${client.companyName}`);
    } else {
      console.log(`   • Skipped (exists): ${client.companyName}`);
    }
  }

  // ===========================================================================
  // 6. CHAT CHANNELS (3 default channels)
  // ===========================================================================
  console.log("\n💬  Creating chat channels...");

  // Schema ChatChannel fields:
  // id, name, description, isPrivate, projectId (optional),
  // createdAt, project, members (User[]), messages
  const channels = [
    {
      name: "general",
      description: "Team-wide announcements and chatter",
      isPrivate: false,
    },
    {
      name: "design",
      description: "Design discussions, critiques, and inspiration",
      isPrivate: false,
    },
    {
      name: "dev",
      description: "Engineering team chat — code, deploys, debugging",
      isPrivate: false,
    },
  ];

  for (const channel of channels) {
    const existing = await prisma.chatChannel.findFirst({
      where: { name: channel.name },
    });
    if (!existing) {
      await prisma.chatChannel.create({
        data: {
          name: channel.name,
          description: channel.description,
          isPrivate: channel.isPrivate,
          // Connect admin user as first member via relation (not members array)
          members: {
            connect: { id: admin.id },
          },
        },
      });
      console.log(`   ✓ Channel: #${channel.name}`);
    } else {
      console.log(`   • Skipped (exists): #${channel.name}`);
    }
  }

  console.log("\n✅  Seed completed successfully!\n");
  console.log("📋  Summary:");
  console.log(`   • Admin email:    ${adminEmail}`);
  console.log(`   • Admin password: ${adminPassword}`);
  console.log(
    `   • Login URL:      http://localhost:3000/nirvana-tech-admin/login`
  );
  console.log("\n");
}

main()
  .catch((e) => {
    console.error("\n❌  Seed failed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });