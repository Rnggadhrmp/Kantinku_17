// ============================================================
// pages/LoginPage.jsx
// Halaman autentikasi — validasi input & login mahasiswa
// ============================================================

import React, { useState, useCallback } from "react";

/** Data akun demo (hardcoded untuk keperluan demonstrasi) */
const DEMO_ACCOUNTS = [
  { nim: "2023001", password: "mahasiswa1", name: "Ahmad Fauzi", prodi: "Teknik Informatika" },
  { nim: "2023002", password: "mahasiswa2", name: "Siti Rahayu", prodi: "Sistem Informasi" },
  { nim: "2023003", password: "mahasiswa3", name: "Budi Santoso", prodi: "Ilmu Komputer" },
];

/**
 * Validasi form login secara sederhana.
 * Mengembalikan objek error; kosong berarti valid.
 */
function validateLoginForm(nim, password) {
  const errors = {};
  if (!nim.trim()) {
    errors.nim = "NIM wajib diisi.";
  } else if (!/^\d{7,10}$/.test(nim.trim())) {
    errors.nim = "NIM harus berupa 7–10 digit angka.";
  }
  if (!password) {
    errors.password = "Password wajib diisi.";
  } else if (password.length < 6) {
    errors.password = "Password minimal 6 karakter.";
  }
  return errors;
}

/**
 * Komponen LoginPage
 * @param {{ onLogin: Function }} props
 */
export default function LoginPage({ onLogin }) {
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setAuthError("");

      // Validasi form
      const formErrors = validateLoginForm(nim, password);
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }
      setErrors({});

      // Simulasi delay autentikasi (meniru API call)
      setLoading(true);
      setTimeout(() => {
        const user = DEMO_ACCOUNTS.find(
          (acc) => acc.nim === nim.trim() && acc.password === password
        );
        if (user) {
          onLogin(user);
        } else {
          setAuthError("NIM atau password salah. Silakan coba lagi.");
        }
        setLoading(false);
      }, 800);
    },
    [nim, password, onLogin]
  );

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <div className="login-logo">🍱</div>
          <h1 className="login-title">KantinKu</h1>
          <p className="login-subtitle">Sistem Pemesanan Makanan Kampus</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="login-form">
          {/* NIM */}
          <div className="form-group">
            <label htmlFor="nim" className="form-label">
              Nomor Induk Mahasiswa (NIM)
            </label>
            <input
              id="nim"
              type="text"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              placeholder="Masukkan NIM Anda"
              className={`form-input ${errors.nim ? "input-error" : ""}`}
              maxLength={10}
              autoComplete="username"
            />
            {errors.nim && <span className="error-msg">{errors.nim}</span>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className={`form-input ${errors.password ? "input-error" : ""}`}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword((v) => !v)}
                aria-label="Tampilkan/sembunyikan password"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && (
              <span className="error-msg">{errors.password}</span>
            )}
          </div>

          {/* Auth error */}
          {authError && (
            <div className="alert alert-error" role="alert">
              ⚠️ {authError}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading ? "Memverifikasi..." : "Masuk 🚀"}
          </button>
        </form>

        {/* Demo Hint */}
        <div className="demo-hint">
          <p className="demo-title">💡 Akun Demo:</p>
          {DEMO_ACCOUNTS.map((acc) => (
            <button
              key={acc.nim}
              type="button"
              className="demo-account-btn"
              onClick={() => {
                setNim(acc.nim);
                setPassword(acc.password);
                setErrors({});
                setAuthError("");
              }}
            >
              {acc.nim} — {acc.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
