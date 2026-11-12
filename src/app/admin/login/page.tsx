"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError("Koneksi database belum dikonfigurasi.");
      setLoading(false);
      return;
    }

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError("Email atau password salah.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  async function handleForgotPassword() {
    setError("");
    setNotice("");
    if (!email) {
      setError("Isi email terlebih dahulu untuk menerima tautan reset.");
      return;
    }
    setLoading(true);
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError("Koneksi database belum dikonfigurasi.");
      setLoading(false);
      return;
    }

    const redirectTo = `${window.location.origin}/admin/reset-password`;
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    setLoading(false);
    if (resetError) {
      setError("Email reset tidak dapat dikirim. Periksa email atau konfigurasi Supabase.");
      return;
    }
    setNotice("Jika email terdaftar, tautan untuk mengatur ulang password akan dikirim.");
  }

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#fff8f5", padding: 24 }}>
      <section style={{ background: "white", padding: 32, borderRadius: 20, width: "min(100%, 420px)", boxShadow: "0 8px 28px #b94d7020" }}>
        <h1 style={{ color: "#8e3555", marginBottom: 8 }}>Admin Mochi Ayu</h1>
        <p style={{ color: "#765b64", marginBottom: 24 }}>Masuk untuk mengelola toko.</p>
        <form onSubmit={handleLogin} style={{ display: "grid", gap: 16 }}>
          <label style={{ display: "grid", gap: 6 }}>Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" style={{ padding: 12, border: "1px solid #e7cbd5", borderRadius: 8 }} />
          </label>
          <label style={{ display: "grid", gap: 6 }}>Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" style={{ padding: 12, border: "1px solid #e7cbd5", borderRadius: 8 }} />
          </label>
          {error && <p role="alert" style={{ color: "#b22222" }}>{error}</p>}
          {notice && <p role="status" style={{ color: "#386b45" }}>{notice}</p>}
          <button disabled={loading} type="submit" style={{ padding: 14, border: 0, borderRadius: 8, background: "#b94d70", color: "white", cursor: "pointer" }}>{loading ? "Memproses..." : "Masuk"}</button>
        </form>
        <button disabled={loading || !email} onClick={handleForgotPassword} style={{ marginTop: 18, padding: 8, border: 0, background: "transparent", color: "#8e3555", textDecoration: "underline", cursor: email ? "pointer" : "not-allowed", fontSize: 14 }}>Lupa password? Kirim tautan reset</button>
      </section>
    </main>
  );
}
