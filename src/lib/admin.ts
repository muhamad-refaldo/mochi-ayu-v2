import { FAMILIES, type FlavorFamily } from "./products";

export type AdminProduct = {
  id: number; slug: string; name: string; tagline: string; family: FlavorFamily;
  image: string; accent: string; price: number; description: string | null;
  note: string | null; is_active: boolean; display_order: number;
};
export type Order = {
  id: number; customer_name: string; customer_phone: string; items: unknown;
  total: number; status: string; notes: string | null; created_at: string;
};
export const ORDER_STATUSES = ["pending", "confirmed", "preparing", "ready", "delivered", "cancelled"] as const;

export function validateProduct(input: AdminProduct): string | null {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug)) return "Slug harus huruf kecil, angka, atau tanda hubung.";
  if (!input.name.trim() || !input.tagline.trim()) return "Nama dan tagline wajib diisi.";
  if (!FAMILIES.includes(input.family)) return "Kategori tidak valid.";
  if (!input.image.startsWith("/mochi/") || !/^#[0-9a-fA-F]{6}$/.test(input.accent)) return "Gambar harus path /mochi/ dan warna harus hex.";
  if (!Number.isSafeInteger(input.price) || input.price < 1) return "Harga harus bilangan bulat positif.";
  if (!Number.isSafeInteger(input.display_order) || input.display_order < 0) return "Urutan harus bilangan bulat nonnegatif.";
  return null;
}

export function productPayload(input: AdminProduct) {
  return {
    slug: input.slug, name: input.name.trim(), tagline: input.tagline.trim(), family: input.family,
    image: input.image, accent: input.accent, price: input.price,
    description: input.description?.trim() || null, note: input.note?.trim() || null,
    is_active: input.is_active, display_order: input.display_order,
  };
}
