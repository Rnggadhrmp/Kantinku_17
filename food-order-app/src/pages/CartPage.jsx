// ============================================================
// pages/CartPage.jsx
// Halaman keranjang belanja — ringkasan pesanan sebelum checkout
// ============================================================

import React, { useCallback } from "react";
import { useAppContext } from "../utils/AppContext";
import { selectCartTotal, selectCartCount } from "../utils/cartReducer";
import { formatRupiah } from "../data/menuData";

export default function CartPage() {
  const { cartState, dispatch, setActivePage, showToast } = useAppContext();
  const { items, note } = cartState;

  const totalHarga = selectCartTotal(items);
  const totalItem = selectCartCount(items);

  // Biaya layanan (5% dari total)
  const biayaLayanan = Math.round(totalHarga * 0.05);
  const grandTotal = totalHarga + biayaLayanan;

  const handleDeleteItem = useCallback(
    (item) => {
      dispatch({ type: "DELETE_ITEM", payload: item.id });
      showToast(`${item.name} dihapus dari keranjang.`, "info");
    },
    [dispatch, showToast]
  );

  const handleClearCart = useCallback(() => {
    if (window.confirm("Yakin ingin mengosongkan keranjang?")) {
      dispatch({ type: "CLEAR_CART" });
      showToast("Keranjang dikosongkan.", "info");
    }
  }, [dispatch, showToast]);

  // Keranjang kosong
  if (items.length === 0) {
    return (
      <div className="page-container">
        <h2 className="page-title">🛒 Keranjang Belanja</h2>
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <p className="empty-text">Keranjangmu masih kosong.</p>
          <p className="empty-subtext">
            Yuk, pilih menu favoritmu dari kantin!
          </p>
          <button
            className="btn btn-primary"
            onClick={() => setActivePage("menu")}
          >
            Lihat Menu 🍛
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">🛒 Keranjang Belanja</h2>
        <button className="btn btn-danger-outline btn-sm" onClick={handleClearCart}>
          🗑 Kosongkan
        </button>
      </div>

      {/* Daftar item */}
      <div className="cart-list">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image">{item.image}</div>

            <div className="cart-item-info">
              <p className="cart-item-name">{item.name}</p>
              <p className="cart-item-price">{formatRupiah(item.price)} / pcs</p>
            </div>

            <div className="cart-item-actions">
              <div className="qty-control">
                <button
                  className="qty-btn"
                  onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
                >
                  −
                </button>
                <span className="qty-value">{item.qty}</span>
                <button
                  className="qty-btn"
                  onClick={() => dispatch({ type: "ADD_ITEM", payload: item })}
                >
                  +
                </button>
              </div>
              <p className="cart-item-subtotal">
                {formatRupiah(item.price * item.qty)}
              </p>
              <button
                className="cart-delete-btn"
                onClick={() => handleDeleteItem(item)}
                aria-label={`Hapus ${item.name}`}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Catatan pesanan */}
      <div className="cart-note-section">
        <label htmlFor="cart-note" className="form-label">
          📝 Catatan Pesanan (opsional)
        </label>
        <textarea
          id="cart-note"
          className="form-textarea"
          rows={3}
          placeholder="Contoh: Tidak pakai pedas, tambah nasi..."
          value={note}
          onChange={(e) =>
            dispatch({ type: "SET_NOTE", payload: e.target.value })
          }
        />
      </div>

      {/* Ringkasan biaya */}
      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal ({totalItem} item)</span>
          <span>{formatRupiah(totalHarga)}</span>
        </div>
        <div className="summary-row">
          <span>Biaya Layanan (5%)</span>
          <span>{formatRupiah(biayaLayanan)}</span>
        </div>
        <div className="summary-divider" />
        <div className="summary-row summary-total">
          <span>Total Pembayaran</span>
          <span className="total-amount">{formatRupiah(grandTotal)}</span>
        </div>
      </div>

      {/* Tombol aksi */}
      <div className="cart-actions">
        <button
          className="btn btn-outline"
          onClick={() => setActivePage("menu")}
        >
          ← Tambah Menu
        </button>
        <button
          className="btn btn-primary btn-large"
          onClick={() => setActivePage("checkout")}
        >
          Lanjut Bayar →
        </button>
      </div>
    </div>
  );
}
