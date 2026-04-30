// ============================================================
// APLIKASI PEMESANAN MAKANAN KAMPUS
// Mata Kuliah : Pengantar Rekayasa Perangkat Lunak
// Bab        : 11 - Kualitas Perangkat Lunak
// Fitur      : Keranjang belanja, Pembayaran, Riwayat pesanan
// Teknologi  : React.js (Single Page Application)
// ============================================================

import React, { useState, useReducer, useCallback, useMemo } from "react";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import HistoryPage from "./pages/HistoryPage";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import { cartReducer, initialCartState } from "./utils/cartReducer";
import { AppContext } from "./utils/AppContext";
import "./styles/global.css";

/**
 * Root component — mengelola state global aplikasi.
 * Menggunakan useReducer agar logika cart terpusat dan mudah di-test.
 */
export default function App() {
  // ── Autentikasi ────────────────────────────────────────────
  const [currentUser, setCurrentUser] = useState(null);
  const [activePage, setActivePage] = useState("menu"); // menu | cart | checkout | history

  // ── Cart state (useReducer untuk Cyclomatic Complexity rendah) ─
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  // ── Riwayat pesanan (disimpan di in-memory state) ──────────
  const [orderHistory, setOrderHistory] = useState([]);

  // ── Notifikasi toast ───────────────────────────────────────
  const [toast, setToast] = useState(null);

  // ── Helper: tampilkan toast ────────────────────────────────
  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // ── Login ──────────────────────────────────────────────────
  const handleLogin = useCallback((user) => {
    setCurrentUser(user);
    setActivePage("menu");
    showToast(`Selamat datang, ${user.name}! 🎉`);
  }, [showToast]);

  // ── Logout ─────────────────────────────────────────────────
  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    dispatch({ type: "CLEAR_CART" });
    setActivePage("menu");
    showToast("Berhasil keluar.", "info");
  }, []);

  // ── Selesaikan pesanan (dari CheckoutPage) ─────────────────
  const handleOrderComplete = useCallback((order) => {
    setOrderHistory((prev) => [order, ...prev]);
    dispatch({ type: "CLEAR_CART" });
    setActivePage("history");
    showToast("Pesanan berhasil dibuat! Silakan ambil di kantin. 🍱");
  }, []);

  // ── Jumlah item di cart (untuk badge Navbar) ───────────────
  const cartCount = useMemo(
    () => cartState.items.reduce((sum, item) => sum + item.qty, 0),
    [cartState.items]
  );

  // ── Context value ──────────────────────────────────────────
  const contextValue = useMemo(() => ({
    currentUser,
    cartState,
    dispatch,
    orderHistory,
    activePage,
    setActivePage,
    showToast,
    handleOrderComplete,
    cartCount,
  }), [currentUser, cartState, orderHistory, activePage, showToast, handleOrderComplete, cartCount]);

  // ── Render ─────────────────────────────────────────────────
  if (!currentUser) {
    return (
      <AppContext.Provider value={contextValue}>
        <LoginPage onLogin={handleLogin} />
        {toast && <Toast {...toast} />}
      </AppContext.Provider>
    );
  }

  return (
    <AppContext.Provider value={contextValue}>
      <div className="app-container">
        <Navbar
          user={currentUser}
          cartCount={cartCount}
          activePage={activePage}
          onNavigate={setActivePage}
          onLogout={handleLogout}
        />

        <main className="main-content">
          {activePage === "menu" && <MenuPage />}
          {activePage === "cart" && <CartPage />}
          {activePage === "checkout" && <CheckoutPage />}
          {activePage === "history" && <HistoryPage />}
        </main>

        {toast && <Toast {...toast} />}
      </div>
    </AppContext.Provider>
  );
}
