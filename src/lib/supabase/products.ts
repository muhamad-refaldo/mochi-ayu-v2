import type { Product, FlavorFamily } from "@/lib/products";
import { getSupabaseBrowserClient } from "./client";

export interface SupabaseProductRow {
  slug: string;
  name: string;
  tagline: string;
  family: string;
  image: string;
  accent: string;
  price: number;
  description: string | null;
  note: string | null;
  is_active: boolean;
  display_order: number;
}

const VALID_FAMILIES: FlavorFamily[] = ["Cream", "Cokelat", "Buah", "Matcha"];

export function mapProductRow(row: SupabaseProductRow): Product {
  if (!VALID_FAMILIES.includes(row.family as FlavorFamily)) {
    throw new Error(`Invalid product row: family "${row.family}" not in allowed list`);
  }
  if (row.price <= 0) {
    throw new Error(`Invalid product row: price must be positive`);
  }
  return {
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    family: row.family as FlavorFamily,
    image: row.image,
    accent: row.accent,
    price: row.price,
    description: row.description ?? undefined,
    note: row.note ?? undefined,
  };
}

export async function fetchActiveProducts(): Promise<Product[]> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) throw new Error("Supabase client not configured");
  const { data, error } = await supabase
    .from("products")
    .select("slug,name,tagline,family,image,accent,price,description,note,is_active,display_order")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapProductRow);
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) throw new Error("Supabase client not configured");
  const { data, error } = await supabase
    .from("products")
    .select("slug,name,tagline,family,image,accent,price,description,note,is_active,display_order")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (error) throw error;
  return data ? mapProductRow(data) : null;
}