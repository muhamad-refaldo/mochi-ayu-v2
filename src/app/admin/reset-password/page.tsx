"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AdminResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = getSupabaseBrowserClient();
  const [sessionChecked, setSessionChecked] = useState(false);
  const ready = sessionChecked || !supabase;

  // Supabase sends a token hash in the URL fragment; client exchanges it for a session.
  useEffect(() => {
    if (!supabase) return;
    let active = true;
    supabase.auth.getSession().then(() => {
      if (active) setSessionChecked(true);
    }).catch(() => {
      if (!active) return;
      setError("Gagal memuat sesi. Coba buka ulang tautan reset password.");
      setSessionChecked(true);
    });
    return () => { active = false; };
  }, [supabase]);

  const displayedError = error || (supabase ? "" : "Koneksi database belum dikonfigurasi.");


  async function handleReset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    if (newPassword.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }
    setLoading(true);
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError("Koneksi database belum dikonfigurasi.");
      setLoading(false);
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);
    if (updateError) {
      setError("Gagal memperbarui password. Tautan mungkin sudah kadaluarsa — minta ulang dari halaman login.");
      return;
    }
    setNotice("Password berhasil diubah. Mengalihkan ke login...");
    setTimeout(() => {
      router.push("/admin/login");
      router.refresh();
    }, 1200);
  }

  if (!ready) {
    return (
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#fff8f5", padding: 24 }}>
        <section style={{ background: "white", padding: 32, borderRadius: 20, width: "min(100%, 420px)", boxShadow: "0 8px 28px #b94d7020" }}>
          <p style={{ color: "#765b64" }}>Memuat sesi...</p>
        </section>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#fff8f5", padding: 24 }}>
      <section style={{ background: "white", padding: 32, borderRadius: 20, width: "min(100%, 420px)", boxShadow: "0 8px 28px #b94d7020" }}>
        <h1 style={{ color: "#8e3555", marginBottom: 8 }}>Atur Ulang Password</h1>
        <p style={{ color: "#765b64", marginBottom: 24 }}>Masukkan password baru untuk akun admin.</p>
        <form onSubmit={handleReset} style={{ display: "grid", gap: 16 }}>
          <label style={{ display: "grid", gap: 6 }}>Password baru
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required autoComplete="new-password" minLength={6} style={{ padding: 12, border: "1px solid #e7cbd5", borderRadius: 8 }} />
          </label>
          <label style={{ display: "grid", gap: 6 }}>Konfirmasi password baru
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required autoComplete="new-password" minLength={6} style={{ padding: 12, border: "1px solid #e7cbd5", borderRadius: 8 }} />
          </label>
          {displayedError && <p role="alert" style={{ color: "#b22222" }}>{displayedError}</p>}
          {notice && <p role="status" style={{ color: "#386b45" }}>{notice}</p>}
          <button disabled={loading} type="submit" style={{ padding: 14, border: 0, borderRadius: 8, background: "#b94d70", color: "white", cursor: "pointer" }}>{loading ? "Memproses..." : "Simpan password baru"}</button>
        </form>
      </section>
    </main>
  );
}