// ============================================================
// pages/CheckoutPage.jsx
// Halaman pembayaran — pilih metode bayar & konfirmasi pesanan
// ============================================================

import React, { useState, useCallback, useMemo } from "react";
import { useAppContext } from "../utils/AppContext";
import { selectCartTotal } from "../utils/cartReducer";
import { formatRupiah } from "../data/menuData";

const PAYMENT_METHODS = [
  { id: "qris",     label: "QRIS",          icon: "📱", desc: "Scan QR dari aplikasi dompet digital" },
  { id: "gopay",    label: "GoPay",         icon: "💚", desc: "Bayar dengan saldo GoPay" },
  { id: "ovo",      label: "OVO",           icon: "💜", desc: "Bayar dengan saldo OVO" },
  { id: "dana",     label: "DANA",          icon: "💙", desc: "Bayar dengan saldo DANA" },
  { id: "bsi",      label: "BSI Mobile",    icon: "🏦", desc: "Transfer melalui BSI Mobile Banking" },
  { id: "tunai",    label: "Bayar Tunai",   icon: "💵", desc: "Bayar langsung di kasir kantin" },
];

const PICKUP_LOCATIONS = [
  "Kantin Utama - Gedung A",
  "Kantin Selatan - Gedung C",
  "Foodcourt - Gedung Pusat",
];

/**
 * Generate nomor pesanan unik sederhana.
 * Format: KTN-YYYYMMDD-XXXX
 */
function generateOrderId() {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `KTN-${date}-${rand}`;
}

export default function CheckoutPage() {
  const { currentUser, cartState, setActivePage, handleOrderComplete } =
    useAppContext();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [pickupLocation, setPickupLocation] = useState(PICKUP_LOCATIONS[0]);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const { items, note } = cartState;
  const subtotal = selectCartTotal(items);
  const biayaLayanan = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + biayaLayanan;

  // Estimasi waktu pickup (5–15 menit setelah pesanan)
  const estimasiWaktu = useMemo(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 12);
    return now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  }, []);

  const validateCheckout = () => {
    const err = {};
    if (!paymentMethod) err.paymentMethod = "Pilih metode pembayaran terlebih dahulu.";
    return err;
  };

  const handleConfirmOrder = useCallback(() => {
    const err = validateCheckout();
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }
    setErrors({});
    setProcessing(true);

    // Simulasi proses pembayaran
    setTimeout(() => {
      const order = {
        id: generateOrderId(),
        items: [...items],
        note,
        subtotal,
        biayaLayanan,
        grandTotal,
        paymentMethod,
        pickupLocation,
        status: "Diproses",
        estimasiPickup: estimasiWaktu,
        createdAt: new Date().toISOString(),
        user: currentUser,
      };
      handleOrderComplete(order);
      setProcessing(false);
    }, 1500);
  }, [paymentMethod, pickupLocation, items, note, subtotal, biayaLayanan, grandTotal, estimasiWaktu, currentUser, handleOrderComplete]);

  if (items.length === 0) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <p>Keranjang kosong. Tidak ada yang bisa di-checkout.</p>
          <button className="btn btn-primary" onClick={() => setActivePage("menu")}>
            Kembali ke Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2 className="page-title">💳 Pembayaran</h2>

      {/* Ringkasan pesanan */}
      <div className="checkout-section">
        <h3 className="section-label">📋 Ringkasan Pesanan</h3>
        <div className="order-summary-list">
          {items.map((item) => (
            <div key={item.id} className="order-summary-row">
              <span>
                {item.image} {item.name} × {item.qty}
              </span>
              <span>{formatRupiah(item.price * item.qty)}</span>
            </div>
          ))}
          {note && (
            <div className="order-note-display">
              📝 Catatan: <em>{note}</em>
            </div>
          )}
        </div>
        <div className="summary-divider" />
        <div className="summary-row">
          <span>Subtotal</span>
          <span>{formatRupiah(subtotal)}</span>
        </div>
        <div className="summary-row">
          <span>Biaya Layanan (5%)</span>
          <span>{formatRupiah(biayaLayanan)}</span>
        </div>
        <div className="summary-row summary-total">
          <span>Total</span>
          <strong className="total-amount">{formatRupiah(grandTotal)}</strong>
        </div>
      </div>

      {/* Lokasi pengambilan */}
      <div className="checkout-section">
        <h3 className="section-label">📍 Lokasi Pengambilan</h3>
        <select
          className="form-select"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
        >
          {PICKUP_LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        <p className="pickup-estimate">
          ⏱ Estimasi siap: <strong>{estimasiWaktu}</strong>
        </p>
      </div>

      {/* Metode pembayaran */}
      <div className="checkout-section">
        <h3 className="section-label">💳 Pilih Metode Pembayaran</h3>
        <div className="payment-grid">
          {PAYMENT_METHODS.map((method) => (
            <button
              key={method.id}
              className={`payment-card ${paymentMethod === method.id ? "selected" : ""}`}
              onClick={() => {
                setPaymentMethod(method.id);
                setErrors({});
              }}
            >
              <span className="payment-icon">{method.icon}</span>
              <span className="payment-label">{method.label}</span>
              <span className="payment-desc">{method.desc}</span>
            </button>
          ))}
        </div>
        {errors.paymentMethod && (
          <p className="error-msg">{errors.paymentMethod}</p>
        )}
      </div>

      {/* Tombol konfirmasi */}
      <div className="checkout-actions">
        <button
          className="btn btn-outline"
          onClick={() => setActivePage("cart")}
          disabled={processing}
        >
          ← Kembali
        </button>
        <button
          className="btn btn-success btn-large"
          onClick={handleConfirmOrder}
          disabled={processing}
        >
          {processing ? "Memproses..." : `Bayar ${formatRupiah(grandTotal)} ✓`}
        </button>
      </div>
    </div>
  );
}
