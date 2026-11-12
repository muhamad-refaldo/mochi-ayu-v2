export type Branch = { slug: string; name: string; hours: string };

export const BRANCHES: Branch[] = [
  { slug: "bojong-gede", name: "Bojong Gede", hours: "16.00–23.00" },
  { slug: "kaum-pandak", name: "Kaum Pandak", hours: "16.00–23.00" },
  { slug: "karadenan", name: "Karadenan", hours: "16.00–23.00" },
  { slug: "gaperi", name: "Gaperi", hours: "16.00–23.00" },
  { slug: "cikaret", name: "Cikaret", hours: "16.00–23.00" },
  { slug: "al-falah", name: "Al-Falah", hours: "16.00–23.00" },
];

export const SUNDAY_SPOTS: Branch[] = [
  { slug: "stadion-pakansari", name: "Stadion Pakansari", hours: "06.00–10.30" },
  { slug: "cfd-bogor", name: "CFD Bogor", hours: "06.00–10.30" },
  { slug: "cfd-margonda", name: "CFD Margonda", hours: "06.00–10.30" },
];

// Nama area dan jadwal dikonfirmasi pemilik; titik/alamat tepat belum tersedia.

export const WHATSAPP_NUMBER = "6288296759533";
export const WHATSAPP_DISPLAY = "0882-9675-9533";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;