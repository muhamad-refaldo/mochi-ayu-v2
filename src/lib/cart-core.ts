import { Product, getProduct } from "./products";

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  isLoaded: boolean;
};

export type CartAction =
  | { type: "SET_LOADED"; payload: CartItem[] }
  | { type: "ADD"; payload: Product }
  | { type: "UPDATE"; payload: { slug: string; quantity: number } }
  | { type: "REMOVE"; payload: string }
  | { type: "CLEAR" };

export const CART_STORAGE_KEY = "mochi-ayu-cart";

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_LOADED":
      return { ...state, items: action.payload, isLoaded: true };
    case "ADD": {
      const exists = state.items.some((i) => i.product.slug === action.payload.slug);
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.slug === action.payload.slug ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { product: action.payload, quantity: 1 }] };
    }
    case "UPDATE": {
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.product.slug !== action.payload.slug) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.slug === action.payload.slug ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.product.slug !== action.payload) };
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function hydrateCart(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    return value.flatMap((row): CartItem[] => {
      const slug = row?.product?.slug;
      const product = typeof slug === "string" ? getProduct(slug) : undefined;
      const quantity = Number(row?.quantity);
      if (!product || !Number.isInteger(quantity) || quantity < 1) return [];
      return [{ product, quantity }];
    });
  } catch {
    return [];
  }
}

export function cartTotals(items: CartItem[]) {
  return {
    totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
    subtotal: items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  };
}

export function buildWhatsAppMessage(items: CartItem[], formatRupiah: (n: number) => string) {
  const { totalItems, subtotal } = cartTotals(items);
  const lines = items.map(
    (i) => `• ${i.product.name} — ${i.quantity} pcs × ${formatRupiah(i.product.price)} = ${formatRupiah(i.product.price * i.quantity)}`
  );
  return [
    "Halo Mochi Ayu, saya mau pesan:",
    "",
    ...lines,
    "",
    `Total ${totalItems} pcs: ${formatRupiah(subtotal)}`,
    "",
    "Mohon info ketersediaan dan jadwal pengambilannya. Terima kasih!",
  ].join("\n");
}