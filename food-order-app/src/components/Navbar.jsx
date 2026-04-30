// ============================================================
// components/Navbar.jsx
// Navigasi utama aplikasi — responsif dan aksesibel
// ============================================================

import React from "react";

const NAV_ITEMS = [
  { id: "menu",     label: "Menu",    icon: "🍛" },
  { id: "cart",     label: "Keranjang", icon: "🛒" },
  { id: "history",  label: "Riwayat", icon: "📜" },
];

export default function Navbar({ user, cartCount, activePage, onNavigate, onLogout }) {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">🍱</span>
        <span className="navbar-title">KantinKu</span>
      </div>

      <nav className="navbar-nav" role="navigation" aria-label="Navigasi utama">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activePage === item.id ? "active" : ""}`}
            onClick={() => onNavigate(item.id)}
            aria-current={activePage === item.id ? "page" : undefined}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {item.id === "cart" && cartCount > 0 && (
              <span className="cart-badge" aria-label={`${cartCount} item di keranjang`}>
                {cartCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="navbar-user">
        <span className="user-name" title={user.prodi}>
          👤 {user.name.split(" ")[0]}
        </span>
        <button className="btn-logout" onClick={onLogout} aria-label="Keluar">
          Keluar
        </button>
      </div>
    </header>
  );
}
