import Link from "next/link";
import { redirect } from "next/navigation";
import AdminDashboard from "./dashboard";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { AdminProduct, Order } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) redirect("/admin/login");
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: isAdmin, error: authzError } = await supabase.rpc("is_admin");
  if (authzError || !isAdmin) return <main className="admin-shell"><section className="admin-card"><h1>Akses admin belum aktif</h1><p>Akun belum terdaftar sebagai admin. Pemilik project perlu mengaktifkan akses di tabel <code>admin_users</code> setelah menjalankan migrasi admin.</p><Link href="/">Kembali ke situs</Link></section></main>;

  const [productsResult, ordersResult] = await Promise.all([
    supabase.from("products").select("id,slug,name,tagline,family,image,accent,price,description,note,is_active,display_order").order("display_order").order("name"),
    supabase.from("orders").select("id,customer_name,customer_phone,items,total,status,notes,created_at").order("created_at", { ascending: false }).limit(100),
  ]);
  return <AdminDashboard email={user.email ?? ""} initialProducts={(productsResult.data ?? []) as AdminProduct[]} initialOrders={(ordersResult.data ?? []) as Order[]} loadError={productsResult.error?.message ?? ordersResult.error?.message ?? null} />;
}
