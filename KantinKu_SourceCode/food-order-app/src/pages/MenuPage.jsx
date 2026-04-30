// ============================================================
// pages/MenuPage.jsx
// Halaman menu utama dengan filter kategori dan pencarian
// ============================================================

import React, { useState, useMemo, useCallback } from "react";
import { useAppContext } from "../utils/AppContext";
import { MENU_ITEMS, CATEGORIES, filterMenu, formatRupiah } from "../data/menuData";
import MenuCard from "../components/MenuCard";

export default function MenuPage() {
  const { dispatch, cartState, showToast, setActivePage } = useAppContext();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter menu berdasarkan kategori dan query pencarian
  const filteredMenu = useMemo(
    () => filterMenu(MENU_ITEMS, selectedCategory, searchQuery),
    [selectedCategory, searchQuery]
  );

  // Tambah item ke keranjang
  const handleAddToCart = useCallback(
    (item) => {
      dispatch({ type: "ADD_ITEM", payload: item });
      showToast(`${item.name} ditambahkan ke keranjang! 🛒`);
    },
    [dispatch, showToast]
  );

  // Cari qty item di cart
  const getQtyInCart = useCallback(
    (itemId) => {
      const found = cartState.items.find((i) => i.id === itemId);
      return found ? found.qty : 0;
    },
    [cartState.items]
  );

  const handleRemoveFromCart = useCallback(
    (item) => {
      dispatch({ type: "REMOVE_ITEM", payload: item.id });
    },
    [dispatch]
  );

  return (
    <div className="page-container">
      {/* Banner hero */}
      <div className="hero-banner">
        <div className="hero-content">
          <h2 className="hero-title">Pesan Makananmu Sekarang! 🍛</h2>
          <p className="hero-subtitle">
            Kantin Kampus Terpadu — Cepat, Mudah, Terjangkau
          </p>
        </div>
        <div className="hero-emoji">🍱</div>
      </div>

      {/* Search bar */}
      <div className="search-bar-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-bar"
          placeholder="Cari makanan atau minuman..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className="search-clear"
            onClick={() => setSearchQuery("")}
            aria-label="Hapus pencarian"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filter kategori */}
      <div className="category-tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`category-tab ${selectedCategory === cat.id ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Hasil filter info */}
      <div className="result-info">
        {searchQuery
          ? `Menampilkan ${filteredMenu.length} hasil untuk "${searchQuery}"`
          : `${filteredMenu.length} menu tersedia`}
      </div>

      {/* Grid menu */}
      {filteredMenu.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p>Tidak ada menu yang sesuai pencarianmu.</p>
          <button
            className="btn btn-outline"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
          >
            Tampilkan Semua Menu
          </button>
        </div>
      ) : (
        <div className="menu-grid">
          {filteredMenu.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              qty={getQtyInCart(item.id)}
              onAdd={() => handleAddToCart(item)}
              onRemove={() => handleRemoveFromCart(item)}
            />
          ))}
        </div>
      )}

      {/* Floating cart button jika ada item */}
      {cartState.items.length > 0 && (
        <div className="floating-cart" onClick={() => setActivePage("cart")}>
          <span className="floating-cart-icon">🛒</span>
          <span className="floating-cart-count">
            {cartState.items.reduce((s, i) => s + i.qty, 0)} item
          </span>
          <span className="floating-cart-total">
            {formatRupiah(
              cartState.items.reduce((s, i) => s + i.price * i.qty, 0)
            )}
          </span>
        </div>
      )}
    </div>
  );
}
