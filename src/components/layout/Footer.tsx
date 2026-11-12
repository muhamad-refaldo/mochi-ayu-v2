import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/branches";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Link className="wordmark" href="/">
          <span>mochi ayu</span>
        </Link>
        <p>Lembut di luar, manis di dalam.</p>
      </div>

      <nav className="footer-links" aria-label="Navigasi footer">
        <Link href="/cerita">Tentang Kami</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/promo">Promo</Link>
        <Link href="/cabang">Daftar Cabang</Link>
        <Link href="/kontak">Kontak</Link>
        <Link href="/kebijakan">Kebijakan Privasi</Link>
      </nav>

      <div className="footer-social">
        <a href={`${WHATSAPP_LINK}?text=${encodeURIComponent("Halo Mochi Ayu, saya mau bertanya")}`} target="_blank" rel="noopener noreferrer" aria-label="Hubungi Mochi Ayu lewat WhatsApp" className="footer-social-icon"><MessageCircle size={18} /></a>
      </div>

      <span className="footer-copy">© 2026 Mochi Ayu</span>
    </footer>
  );
}