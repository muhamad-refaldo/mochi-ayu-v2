import type { MetadataRoute } from "next";
import { fetchActiveProductsServer } from "@/lib/supabase/server";

const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const staticRoutes = ["", "/menu", "/cerita", "/cabang", "/kontak", "/kebijakan"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!base) return [];

  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/menu" ? 0.9 : 0.6,
  }));

  let products: Awaited<ReturnType<typeof fetchActiveProductsServer>> = [];
  try {
    products = await fetchActiveProductsServer();
  } catch {
    // Product pages omitted if Supabase unavailable at sitemap generation time.
  }

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${base}/menu/${product.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...productEntries];
}
