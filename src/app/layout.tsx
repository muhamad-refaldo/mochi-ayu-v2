import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./motion.css";
import DecorativeMotion from "@/components/DecorativeMotion";
import { CartProvider } from "@/lib/cart";
import { ThemeProvider } from "@/lib/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mochi Ayu — mochi lembut dari Pakansari",
    template: "%s | Mochi Ayu",
  },
  description: "13 rasa mochi, semuanya Rp5.000 per buah. Lihat menu, cek cabang, lalu pesan lewat WhatsApp.",
  keywords: ["mochi ayu", "menu mochi", "mochi bogor", "mochi bojong gede"],
  authors: [{ name: "Mochi Ayu" }],
  creator: "Mochi Ayu",
  publisher: "Mochi Ayu",
  robots: { index: true, follow: true },
  ...(process.env.NEXT_PUBLIC_SITE_URL ? { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL) } : {}),
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Mochi Ayu",
    title: "Mochi Ayu — mochi lembut dari Pakansari",
    description: "Mochi lembut dengan isian stroberi, matcha, cokelat, dan buah. Semua rasa Rp5.000/pcs.",
    images: [
      { url: "/mochi/og-default.jpg", width: 1200, height: 630, alt: "Mochi Ayu" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mochi Ayu — mochi lembut dari Pakansari",
    description: "13 rasa mochi, semua Rp5.000/pcs. Pesan lewat WhatsApp.",
    images: ["/mochi/og-default.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-48.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  other: { "theme-color": "#e88c9a" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('mochi-ayu-theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){}` }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <CartProvider>
            <DecorativeMotion />
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}