import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { readSupabaseEnv } from "./client";
import { mapProductRow } from "./products";

export async function getSupabaseServerClient() {
  const env = readSupabaseEnv();
  if (!env) return null;
  let cookieStore = null;
  try { cookieStore = await cookies(); } catch { /* build-time context has no request cookies */ }
  return createServerClient(env.url, env.publishableKey, {
    cookies: {
      getAll() {
        return cookieStore?.getAll() ?? [];
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore?.set(name, value, options));
        } catch {
          // ignore in RSC
        }
      },
    },
  });
}

export async function fetchActiveProductsServer() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) throw new Error("Supabase server client not configured");
  const { data, error } = await supabase
    .from("products")
    .select("slug,name,tagline,family,image,accent,price,description,note,is_active,display_order")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapProductRow);
}

export async function fetchProductBySlugServer(slug: string) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) throw new Error("Supabase server client not configured");
  const { data, error } = await supabase
    .from("products")
    .select("slug,name,tagline,family,image,accent,price,description,note,is_active,display_order")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (error) throw error;
  return data ? mapProductRow(data) : null;
}