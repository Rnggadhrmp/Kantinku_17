// ============================================================
// components/MenuCard.jsx
// Kartu tampilan satu item menu
// ============================================================

import React from "react";
import { formatRupiah } from "../data/menuData";

/**
 * Merender kartu menu tunggal.
 * Mendukung tombol +/- untuk kontrol qty langsung dari kartu.
 *
 * @param {{ item: Object, qty: number, onAdd: Function, onRemove: Function }} props
 */
export default function MenuCard({ item, qty, onAdd, onRemove }) {
  const isOutOfStock = item.stock === 0;

  return (
    <div className={`menu-card ${isOutOfStock ? "out-of-stock" : ""}`}>
      {/* Emoji gambar produk */}
      <div className="menu-card-image">{item.image}</div>

      {/* Info produk */}
      <div className="menu-card-body">
        <h3 className="menu-card-title">{item.name}</h3>
        <p className="menu-card-desc">{item.description}</p>

        {/* Meta info */}
        <div className="menu-card-meta">
          <span className="meta-item">⭐ {item.rating}</span>
          <span className="meta-item">⏱ {item.estimasi}</span>
          <span className="meta-item">📦 {item.stock} tersisa</span>
        </div>

        {/* Harga dan tombol */}
        <div className="menu-card-footer">
          <span className="menu-price">{formatRupiah(item.price)}</span>

          {isOutOfStock ? (
            <span className="badge badge-sold-out">Habis</span>
          ) : qty === 0 ? (
            <button className="btn btn-add" onClick={onAdd} aria-label={`Tambah ${item.name}`}>
              + Tambah
            </button>
          ) : (
            <div className="qty-control">
              <button
                className="qty-btn"
                onClick={onRemove}
                aria-label="Kurangi"
              >
                −
              </button>
              <span className="qty-value">{qty}</span>
              <button
                className="qty-btn"
                onClick={onAdd}
                disabled={qty >= item.stock}
                aria-label="Tambah"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
