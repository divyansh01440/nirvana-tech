import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/nirvana-tech-admin", "/api/", "/admin"],
      },
    ],
    sitemap: "https://nirvanatechsolution.xyz/sitemap.xml",
    host: "https://nirvanatechsolution.xyz",
  };
}