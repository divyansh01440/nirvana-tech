// =============================================================================
// 🛠️ NIRVANA TECH — Full Services Data
// =============================================================================
// Detailed data for each of the 6 services on the Services page.
//
// ⚠️ ICONS ARE STORED AS STRINGS (not React components) because this data
// crosses the Server→Client boundary. Icons resolved via ICON_MAP in the
// client component.
// =============================================================================

import type { ServiceData } from "@/components/services/ServiceDetailSection";

export const SERVICES_FULL: ServiceData[] = [
  // ============== 01 WEBSITE BUILDER ==============
  {
    number: "01",
    slug: "website-builder",
    icon: "Globe",
    title: "Website Builder",
    subtitle: "Premium websites that load fast and convert harder.",
    description:
      "We build custom websites from scratch — no templates, no shortcuts. Every layout, animation, and interaction is engineered for your brand. Fast on mobile, gorgeous on desktop, and built to last.",
    accentColor: "#D4AF37",
    benefits: [
      "Custom design system tailored to your brand",
      "Lightning-fast Next.js + edge-deployed architecture",
      "100/100 Lighthouse score targets",
      "Full mobile-first responsive design",
      "CMS integration so you can update content yourself",
      "Built-in SEO and analytics from day one",
    ],
    microSteps: [
      {
        title: "Discovery",
        description: "Understand your audience, goals, and brand soul.",
      },
      {
        title: "Wireframe",
        description: "Map every page, interaction, and user journey.",
      },
      {
        title: "Design & Build",
        description: "Craft pixels, write code, and obsess over details.",
      },
      {
        title: "Launch & Iterate",
        description: "Deploy, measure, refine — your site keeps getting better.",
      },
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel", "Sanity CMS"],
    visualType: "website",
  },

  // ============== 02 DIGITAL MARKETING ==============
  {
    number: "02",
    slug: "digital-marketing",
    icon: "TrendingUp",
    title: "Digital Marketing",
    subtitle: "Strategy + execution that grows your audience.",
    description:
      "We don't just run ads. We build full-funnel marketing systems — content, campaigns, social, and retention — that turn cold audiences into loyal customers. Driven by data, refined by craft.",
    accentColor: "#3B82F6",
    benefits: [
      "Multi-channel paid ad campaigns (Meta, Google, LinkedIn)",
      "Content strategy + production for blogs and social",
      "Email marketing funnels and automation",
      "Brand storytelling that resonates",
      "Conversion-rate optimization on every touchpoint",
      "Monthly reports with real ROI metrics",
    ],
    microSteps: [
      {
        title: "Audit",
        description: "Analyze what's working and what's leaking growth.",
      },
      {
        title: "Strategy",
        description: "Build a 90-day plan tied to specific business outcomes.",
      },
      {
        title: "Execute",
        description: "Launch campaigns, write copy, design creatives, ship fast.",
      },
      {
        title: "Optimize",
        description: "Measure weekly, double down on what wins.",
      },
    ],
    technologies: ["Meta Ads", "Google Ads", "Mailchimp", "HubSpot", "Notion", "Figma"],
    visualType: "marketing",
  },

  // ============== 03 SEO OPTIMIZATION ==============
  {
    number: "03",
    slug: "seo",
    icon: "Search",
    title: "SEO Optimization",
    subtitle: "Rank higher. Earn more organic traffic.",
    description:
      "We treat SEO as both technical engineering and editorial craft. From schema markup to long-form content strategy, we build the infrastructure search engines love and humans actually read.",
    accentColor: "#10B981",
    benefits: [
      "Full technical SEO audit and remediation",
      "Keyword research aligned with buyer intent",
      "On-page optimization for every important page",
      "High-quality content production at scale",
      "Backlink strategy through PR and outreach",
      "Monthly ranking and traffic reports",
    ],
    microSteps: [
      {
        title: "Audit",
        description: "Crawl, analyze, and uncover every ranking blocker.",
      },
      {
        title: "Research",
        description: "Find the keywords your customers actually search.",
      },
      {
        title: "Optimize",
        description: "Fix technical issues, rewrite content, build links.",
      },
      {
        title: "Track",
        description: "Watch rankings climb, traffic grow, conversions follow.",
      },
    ],
    technologies: ["Ahrefs", "SEMrush", "Search Console", "Schema.org", "Screaming Frog", "GA4"],
    visualType: "seo",
  },

  // ============== 04 E-COMMERCE ==============
  {
    number: "04",
    slug: "ecommerce",
    icon: "ShoppingBag",
    title: "E-Commerce Solutions",
    subtitle: "Online stores that don't just sell — they convert.",
    description:
      "From product pages to checkout, we engineer e-commerce experiences that feel premium and convert above industry averages. Built on robust platforms with custom integrations for your unique workflow.",
    accentColor: "#A855F7",
    benefits: [
      "Custom Shopify or Next.js commerce builds",
      "High-converting product detail pages",
      "Multi-payment gateway integration (Stripe, Razorpay)",
      "Inventory and order management systems",
      "Cart abandonment recovery flows",
      "Mobile-optimized checkout under 3 steps",
    ],
    microSteps: [
      {
        title: "Architecture",
        description: "Choose platform, plan integrations, design data flow.",
      },
      {
        title: "Design",
        description: "Craft a storefront that screams 'premium'.",
      },
      {
        title: "Develop",
        description: "Build, integrate payments, test every checkout edge case.",
      },
      {
        title: "Launch",
        description: "Go live with monitoring, recovery flows, growth ready.",
      },
    ],
    technologies: ["Shopify", "Next.js Commerce", "Stripe", "Razorpay", "Algolia", "Cloudinary"],
    visualType: "ecommerce",
  },

  // ============== 05 SOFTWARE DEVELOPMENT ==============
  {
    number: "05",
    slug: "software",
    icon: "Code2",
    title: "Software Development",
    subtitle: "Custom apps. Robust systems. Real business value.",
    description:
      "We build full-stack web applications, internal tools, dashboards, and SaaS products. From MVP to scale, our code is written to be maintainable, testable, and built for the next decade.",
    accentColor: "#F59E0B",
    benefits: [
      "Full-stack TypeScript apps with type safety end-to-end",
      "Modern API design (REST + GraphQL)",
      "Database modeling and optimization",
      "Auth, payments, real-time, file uploads — all included",
      "CI/CD pipelines and automated deployments",
      "Documentation so you can hand off if needed",
    ],
    microSteps: [
      {
        title: "Spec",
        description: "Document features, edge cases, and success criteria.",
      },
      {
        title: "Prototype",
        description: "Ship an MVP fast. Validate before scaling.",
      },
      {
        title: "Engineer",
        description: "Build robust, tested, production-ready software.",
      },
      {
        title: "Scale",
        description: "Monitor, optimize, and evolve as you grow.",
      },
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Redis"],
    visualType: "code",
  },

  // ============== 06 ANALYTICS ==============
  {
    number: "06",
    slug: "analytics",
    icon: "BarChart3",
    title: "Analytics & Insights",
    subtitle: "See clearly. Decide confidently. Grow predictably.",
    description:
      "We set up analytics infrastructure that tells you the truth — not vanity metrics. Custom dashboards, event tracking, and reports that connect data to decisions you can actually make.",
    accentColor: "#06B6D4",
    benefits: [
      "GA4, Mixpanel, or PostHog setup from scratch",
      "Custom event tracking for every key action",
      "Real-time dashboards with the metrics that matter",
      "Funnel analysis and conversion attribution",
      "Privacy-compliant tracking (GDPR/CCPA ready)",
      "Monthly insight reports — not just data dumps",
    ],
    microSteps: [
      {
        title: "Map",
        description: "Define KPIs and what success actually looks like.",
      },
      {
        title: "Instrument",
        description: "Set up tracking on every event that matters.",
      },
      {
        title: "Visualize",
        description: "Build dashboards your whole team can understand.",
      },
      {
        title: "Report",
        description: "Monthly insights with clear next actions.",
      },
    ],
    technologies: ["GA4", "Mixpanel", "PostHog", "Looker Studio", "Segment", "Hotjar"],
    visualType: "analytics",
  },
];