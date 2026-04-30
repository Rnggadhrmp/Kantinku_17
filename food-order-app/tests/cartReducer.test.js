// ============================================================
// tests/cartReducer.test.js
// Unit test untuk cartReducer — mendemonstrasikan Shift-Left Quality
// Jalankan: npx jest tests/cartReducer.test.js
// ============================================================

const { cartReducer, initialCartState, selectCartTotal, selectCartCount } =
  require("../src/utils/cartReducer");

// ── Data fixture ──────────────────────────────────────────────
const ITEM_A = { id: "m001", name: "Nasi Goreng", price: 15000, qty: undefined };
const ITEM_B = { id: "d001", name: "Es Teh Manis", price: 4000, qty: undefined };

// ── Test Suite ────────────────────────────────────────────────

describe("cartReducer", () => {
  // ────────────────────────────────────────────────────────────
  // ADD_ITEM
  // ────────────────────────────────────────────────────────────
  describe("ADD_ITEM", () => {
    it("menambah item baru ke keranjang yang kosong", () => {
      const state = cartReducer(initialCartState, {
        type: "ADD_ITEM",
        payload: ITEM_A,
      });
      expect(state.items).toHaveLength(1);
      expect(state.items[0].qty).toBe(1);
      expect(state.items[0].id).toBe("m001");
    });

    it("menaikkan qty jika item sudah ada di keranjang", () => {
      let state = cartReducer(initialCartState, { type: "ADD_ITEM", payload: ITEM_A });
      state = cartReducer(state, { type: "ADD_ITEM", payload: ITEM_A });
      expect(state.items).toHaveLength(1);
      expect(state.items[0].qty).toBe(2);
    });

    it("menambah item berbeda sebagai entry terpisah", () => {
      let state = cartReducer(initialCartState, { type: "ADD_ITEM", payload: ITEM_A });
      state = cartReducer(state, { type: "ADD_ITEM", payload: ITEM_B });
      expect(state.items).toHaveLength(2);
    });
  });

  // ────────────────────────────────────────────────────────────
  // REMOVE_ITEM
  // ────────────────────────────────────────────────────────────
  describe("REMOVE_ITEM", () => {
    it("mengurangi qty item sebesar 1", () => {
      let state = cartReducer(initialCartState, { type: "ADD_ITEM", payload: ITEM_A });
      state = cartReducer(state, { type: "ADD_ITEM", payload: ITEM_A });
      state = cartReducer(state, { type: "REMOVE_ITEM", payload: "m001" });
      expect(state.items[0].qty).toBe(1);
    });

    it("menghapus item dari keranjang jika qty turun ke 0", () => {
      let state = cartReducer(initialCartState, { type: "ADD_ITEM", payload: ITEM_A });
      state = cartReducer(state, { type: "REMOVE_ITEM", payload: "m001" });
      expect(state.items).toHaveLength(0);
    });

    it("tidak mengubah state jika item tidak ditemukan", () => {
      const state = cartReducer(initialCartState, {
        type: "REMOVE_ITEM",
        payload: "not-exist",
      });
      expect(state).toEqual(initialCartState);
    });
  });

  // ────────────────────────────────────────────────────────────
  // DELETE_ITEM
  // ────────────────────────────────────────────────────────────
  describe("DELETE_ITEM", () => {
    it("menghapus item terlepas dari qty-nya", () => {
      let state = cartReducer(initialCartState, { type: "ADD_ITEM", payload: ITEM_A });
      state = cartReducer(state, { type: "ADD_ITEM", payload: ITEM_A });
      state = cartReducer(state, { type: "DELETE_ITEM", payload: "m001" });
      expect(state.items).toHaveLength(0);
    });
  });

  // ────────────────────────────────────────────────────────────
  // SET_NOTE
  // ────────────────────────────────────────────────────────────
  describe("SET_NOTE", () => {
    it("menyimpan catatan pesanan", () => {
      const state = cartReducer(initialCartState, {
        type: "SET_NOTE",
        payload: "Tidak pakai pedas",
      });
      expect(state.note).toBe("Tidak pakai pedas");
    });
  });

  // ────────────────────────────────────────────────────────────
  // CLEAR_CART
  // ────────────────────────────────────────────────────────────
  describe("CLEAR_CART", () => {
    it("mengosongkan keranjang dan catatan", () => {
      let state = cartReducer(initialCartState, { type: "ADD_ITEM", payload: ITEM_A });
      state = cartReducer(state, { type: "SET_NOTE", payload: "Test note" });
      state = cartReducer(state, { type: "CLEAR_CART" });
      expect(state).toEqual(initialCartState);
    });
  });

  // ────────────────────────────────────────────────────────────
  // Default / unknown action
  // ────────────────────────────────────────────────────────────
  describe("Unknown action", () => {
    it("mengembalikan state tanpa perubahan untuk action tidak dikenal", () => {
      const state = cartReducer(initialCartState, { type: "UNKNOWN_ACTION" });
      expect(state).toEqual(initialCartState);
    });
  });
});

// ── Selector Tests ────────────────────────────────────────────

describe("selectCartTotal", () => {
  it("menghitung total harga dengan benar", () => {
    const items = [
      { id: "m001", price: 15000, qty: 2 },
      { id: "d001", price: 4000,  qty: 3 },
    ];
    expect(selectCartTotal(items)).toBe(15000 * 2 + 4000 * 3); // 42000
  });

  it("mengembalikan 0 untuk keranjang kosong", () => {
    expect(selectCartTotal([])).toBe(0);
  });
});

describe("selectCartCount", () => {
  it("menghitung jumlah total item (qty)", () => {
    const items = [
      { id: "m001", qty: 2 },
      { id: "d001", qty: 3 },
    ];
    expect(selectCartCount(items)).toBe(5);
  });

  it("mengembalikan 0 untuk keranjang kosong", () => {
    expect(selectCartCount([])).toBe(0);
  });
});
