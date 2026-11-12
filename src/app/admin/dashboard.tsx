"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { formatRupiah, FAMILIES } from "@/lib/products";
import { productPayload, validateProduct, type AdminProduct, type Order } from "@/lib/admin";
import "./dashboard.css";

type Props = { email: string; initialProducts: AdminProduct[]; initialOrders: Order[]; loadError: string | null };
const empty: AdminProduct = { id: 0, slug: "", name: "", tagline: "", family: "Cream", image: "/mochi/", accent: "#E9A8B8", price: 5000, description: "", note: "", is_active: true, display_order: 0 };

export default function AdminDashboard({ email, initialProducts, initialOrders, loadError }: Props) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [tab, setTab] = useState<"products" | "orders">("products");
  const [draft, setDraft] = useState<AdminProduct | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = products.filter(p => `${p.name} ${p.slug}`.toLowerCase().includes(query.toLowerCase()));

  async function save() {
    if (!draft) return;
    const invalid = validateProduct(draft);
    if (invalid) { setMessage(invalid); return; }
    const supabase = getSupabaseBrowserClient();
    if (!supabase) { setMessage("Koneksi database belum tersedia."); return; }
    setBusy(true); setMessage("");
    const payload = productPayload(draft);
    const request = draft.id
      ? supabase.from("products").update(payload).eq("id", draft.id).select("id,slug,name,tagline,family,image,accent,price,description,note,is_active,display_order").single()
      : supabase.from("products").insert(payload).select("id,slug,name,tagline,family,image,accent,price,description,note,is_active,display_order").single();
    const { data, error } = await request;
    setBusy(false);
    if (error || !data) { setMessage(error?.message ?? "Gagal menyimpan produk."); return; }
    setProducts(current => [...current.filter(p => p.id !== data.id), data as AdminProduct].sort((a, b) => a.display_order - b.display_order || a.name.localeCompare(b.name)));
    setDraft(null); setMessage("Produk tersimpan."); router.refresh();
  }
  async function remove(product: AdminProduct) {
    if (!window.confirm(`Hapus ${product.name} secara permanen?`)) return;
    const supabase = getSupabaseBrowserClient(); if (!supabase) return;
    setBusy(true); setMessage("");
    const { error, count } = await supabase.from("products").delete({ count: "exact" }).eq("id", product.id);
    setBusy(false);
    if (error || count !== 1) { setMessage(error?.message ?? "Produk tidak terhapus. Periksa izin admin."); return; }
    setProducts(current => current.filter(p => p.id !== product.id)); setMessage("Produk dihapus."); router.refresh();
  }
  async function signOut() {
    await getSupabaseBrowserClient()?.auth.signOut(); router.replace("/admin/login"); router.refresh();
  }
  return <main className="admin-shell"><div className="admin-wrap">
    <header className="admin-head"><div><span className="admin-eyebrow">MOCHI AYU · ADMIN</span><h1>Kelola toko</h1><p>Masuk sebagai {email}</p></div><button className="admin-button secondary" onClick={signOut}>Keluar</button></header>
    <div className="admin-stats"><div className="admin-card"><span>Total produk</span><strong>{products.length}</strong></div><div className="admin-card"><span>Produk aktif</span><strong>{products.filter(p => p.is_active).length}</strong></div><div className="admin-card"><span>Pesanan tercatat</span><strong>{initialOrders.length}</strong></div></div>
    <nav className="admin-tabs" aria-label="Bagian admin"><button aria-current={tab === "products" ? "page" : undefined} onClick={() => setTab("products")}>Produk</button><button aria-current={tab === "orders" ? "page" : undefined} onClick={() => setTab("orders")}>Pesanan</button></nav>
    {loadError && <p role="alert" className="admin-error">Gagal memuat data: {loadError}</p>}{message && <p role="status" className="admin-notice">{message}</p>}
    {tab === "products" ? <section className="admin-card"><div className="admin-section-head"><div><h2>Daftar produk</h2><p>Produk nonaktif tidak muncul di katalog publik.</p></div><button className="admin-button" onClick={() => { setDraft({ ...empty, display_order: products.length + 1 }); setMessage(""); }}>+ Tambah produk</button></div><input className="admin-search" type="search" aria-label="Cari produk" placeholder="Cari nama atau slug…" value={query} onChange={e => setQuery(e.target.value)} /><div className="admin-table-wrap"><table><thead><tr><th>Produk</th><th>Kategori</th><th>Harga</th><th>Status</th><th>Aksi</th></tr></thead><tbody>{filtered.map(p => <tr key={p.id}><td><div className="admin-product"><span className="admin-swatch" style={{ background: p.accent }} /> <div><strong>{p.name}</strong><small>{p.slug}</small></div></div></td><td>{p.family}</td><td>{formatRupiah(p.price)}</td><td><span className={`admin-pill ${p.is_active ? "active" : ""}`}>{p.is_active ? "Aktif" : "Nonaktif"}</span></td><td className="admin-actions"><button onClick={() => { setDraft({ ...p }); setMessage(""); }}>Edit</button><button disabled={busy} onClick={() => remove(p)}>Hapus</button></td></tr>)}</tbody></table>{!filtered.length && <p className="admin-empty">Tidak ada produk ditemukan.</p>}</div></section> : <section className="admin-card"><div className="admin-section-head"><div><h2>Pesanan</h2><p>100 pesanan terbaru. Checkout WhatsApp tidak otomatis tercatat di sini.</p></div></div><div className="admin-table-wrap"><table><thead><tr><th>ID / Tanggal</th><th>Pelanggan</th><th>Item</th><th>Total</th><th>Status</th></tr></thead><tbody>{initialOrders.map(o => <tr key={o.id}><td><strong>#{o.id}</strong><small>{new Date(o.created_at).toLocaleString("id-ID")}</small></td><td><strong>{o.customer_name}</strong><small>{o.customer_phone}</small></td><td><details><summary>Lihat item</summary><pre>{JSON.stringify(o.items, null, 2)}</pre>{o.notes && <p>Catatan: {o.notes}</p>}</details></td><td>{formatRupiah(o.total)}</td><td><span className="admin-pill">{o.status}</span></td></tr>)}</tbody></table>{!initialOrders.length && <p className="admin-empty">Belum ada pesanan tersimpan. Pesanan melalui WhatsApp tidak otomatis masuk database.</p>}</div></section>}
    {draft && <div className="admin-modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget && !busy) setDraft(null); }}><section className="admin-modal admin-card" role="dialog" aria-modal="true" aria-labelledby="product-form-title"><h2 id="product-form-title">{draft.id ? "Edit produk" : "Tambah produk"}</h2><form onSubmit={e => { e.preventDefault(); void save(); }}><div className="admin-fields">{([ ["name", "Nama"], ["slug", "Slug"], ["tagline", "Tagline"], ["image", "Path gambar (/mochi/…)"], ["accent", "Warna (#RRGGBB)"] ] as const).map(([key, label]) => <label key={key}>{label}<input required value={draft[key]} onChange={e => setDraft({ ...draft, [key]: e.target.value })} /></label>)}<label>Kategori<select value={draft.family} onChange={e => setDraft({ ...draft, family: e.target.value as AdminProduct["family"] })}>{FAMILIES.map(f => <option key={f}>{f}</option>)}</select></label><label>Harga (Rp)<input type="number" min="1" step="1" required value={draft.price} onChange={e => setDraft({ ...draft, price: Number(e.target.value) })} /></label><label>Urutan<input type="number" min="0" step="1" required value={draft.display_order} onChange={e => setDraft({ ...draft, display_order: Number(e.target.value) })} /></label><label className="wide">Deskripsi<textarea rows={3} value={draft.description ?? ""} onChange={e => setDraft({ ...draft, description: e.target.value })} /></label><label className="wide">Catatan<input value={draft.note ?? ""} onChange={e => setDraft({ ...draft, note: e.target.value })} /></label><label className="admin-check wide"><input type="checkbox" checked={draft.is_active} onChange={e => setDraft({ ...draft, is_active: e.target.checked })} /> Tampilkan di katalog</label></div><div className="admin-form-actions"><button type="button" className="admin-button secondary" disabled={busy} onClick={() => setDraft(null)}>Batal</button><button className="admin-button" disabled={busy}>{busy ? "Menyimpan…" : "Simpan produk"}</button></div></form></section></div>}
  </div></main>;
}
