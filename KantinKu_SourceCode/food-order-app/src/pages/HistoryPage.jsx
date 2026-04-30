// ============================================================
// pages/HistoryPage.jsx
// Halaman riwayat pesanan mahasiswa
// ============================================================

import React, { useState } from "react";
import { useAppContext } from "../utils/AppContext";
import { formatRupiah } from "../data/menuData";

/** Label status beserta warna badge */
const STATUS_CONFIG = {
  Diproses:    { color: "badge-warning",  icon: "⏳" },
  Disiapkan:   { color: "badge-info",     icon: "👨‍🍳" },
  Siap_Diambil:{ color: "badge-success",  icon: "✅" },
  Selesai:     { color: "badge-default",  icon: "🎉" },
};

/**
 * Format tanggal ISO ke format Indonesia yang ramah pengguna.
 * @param {string} isoString
 * @returns {string}
 */
function formatDate(isoString) {
  return new Date(isoString).toLocaleString("id-ID", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function HistoryPage() {
  const { orderHistory, setActivePage } = useAppContext();
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // Belum ada riwayat
  if (orderHistory.length === 0) {
    return (
      <div className="page-container">
        <h2 className="page-title">📜 Riwayat Pesanan</h2>
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <p className="empty-text">Belum ada pesanan.</p>
          <p className="empty-subtext">
            Pesanan yang sudah kamu buat akan muncul di sini.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => setActivePage("menu")}
          >
            Pesan Sekarang 🍛
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">📜 Riwayat Pesanan</h2>
        <span className="history-count">{orderHistory.length} pesanan</span>
      </div>

      <div className="history-list">
        {orderHistory.map((order) => {
          const isExpanded = expandedId === order.id;
          const statusCfg = STATUS_CONFIG[order.status] || STATUS_CONFIG["Diproses"];

          return (
            <div key={order.id} className="history-card">
              {/* Header kartu */}
              <div
                className="history-card-header"
                onClick={() => toggleExpand(order.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && toggleExpand(order.id)}
              >
                <div className="history-card-left">
                  <p className="history-order-id">#{order.id}</p>
                  <p className="history-date">{formatDate(order.createdAt)}</p>
                </div>
                <div className="history-card-right">
                  <span className={`badge ${statusCfg.color}`}>
                    {statusCfg.icon} {order.status}
                  </span>
                  <p className="history-total">{formatRupiah(order.grandTotal)}</p>
                  <span className="expand-toggle">{isExpanded ? "▲" : "▼"}</span>
                </div>
              </div>

              {/* Detail pesanan (accordion) */}
              {isExpanded && (
                <div className="history-card-detail">
                  <div className="history-detail-section">
                    <p className="detail-label">📍 Lokasi Pengambilan</p>
                    <p className="detail-value">{order.pickupLocation}</p>
                  </div>

                  <div className="history-detail-section">
                    <p className="detail-label">💳 Metode Pembayaran</p>
                    <p className="detail-value">{order.paymentMethod.toUpperCase()}</p>
                  </div>

                  <div className="history-detail-section">
                    <p className="detail-label">⏱ Estimasi Pengambilan</p>
                    <p className="detail-value">{order.estimasiPickup}</p>
                  </div>

                  <div className="history-detail-section">
                    <p className="detail-label">🍛 Item Pesanan</p>
                    {order.items.map((item) => (
                      <div key={item.id} className="history-item-row">
                        <span>
                          {item.image} {item.name} × {item.qty}
                        </span>
                        <span>{formatRupiah(item.price * item.qty)}</span>
                      </div>
                    ))}
                    {order.note && (
                      <p className="detail-note">📝 "{order.note}"</p>
                    )}
                  </div>

                  {/* Ringkasan biaya */}
                  <div className="history-summary">
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <span>{formatRupiah(order.subtotal)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Biaya Layanan</span>
                      <span>{formatRupiah(order.biayaLayanan)}</span>
                    </div>
                    <div className="summary-row summary-total">
                      <span>Total</span>
                      <strong>{formatRupiah(order.grandTotal)}</strong>
                    </div>
                  </div>

                  {/* Tombol pesan ulang */}
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => setActivePage("menu")}
                  >
                    🔄 Pesan Lagi
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
