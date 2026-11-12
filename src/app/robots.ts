import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  const sitemap = base ? `${base}/sitemap.xml` : undefined;
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin/", "/keranjang"] },
    ],
    ...(sitemap ? { sitemap } : {}),
  };
}
