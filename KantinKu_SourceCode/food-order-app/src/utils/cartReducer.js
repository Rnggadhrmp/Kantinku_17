// ============================================================
// utils/cartReducer.js
// Reducer untuk mengelola state keranjang belanja
// Dipisah agar mudah di-unit-test secara independen
// ============================================================

export const initialCartState = {
  items: [],        // [{ id, name, price, category, image, qty }]
  note: "",         // Catatan tambahan untuk pesanan
};

/**
 * Reducer murni (pure function) — tidak ada side-effect.
 * Setiap action menghasilkan state baru (immutable update).
 *
 * Actions:
 *   ADD_ITEM     — tambah item atau naikkan qty
 *   REMOVE_ITEM  — turunkan qty; hapus jika qty = 0
 *   DELETE_ITEM  — hapus item sepenuhnya
 *   SET_NOTE     — simpan catatan pesanan
 *   CLEAR_CART   — kosongkan keranjang setelah checkout
 */
export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, qty: 1 }],
      };
    }

    case "REMOVE_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload);
      if (!existing) return state;
      if (existing.qty <= 1) {
        return {
          ...state,
          items: state.items.filter((i) => i.id !== action.payload),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload ? { ...i, qty: i.qty - 1 } : i
        ),
      };
    }

    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };

    case "SET_NOTE":
      return { ...state, note: action.payload };

    case "CLEAR_CART":
      return initialCartState;

    default:
      return state;
  }
}

// ── Selector helpers (digunakan di berbagai komponen) ──────────

/**
 * Menghitung total harga item di keranjang.
 * @param {Array} items
 * @returns {number}
 */
export function selectCartTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

/**
 * Menghitung total jumlah item (qty) di keranjang.
 * @param {Array} items
 * @returns {number}
 */
export function selectCartCount(items) {
  return items.reduce((sum, item) => sum + item.qty, 0);
}
