// ============================================================
// components/Toast.jsx
// Notifikasi sementara (snackbar) — muncul 3 detik lalu hilang
// ============================================================

import React from "react";

const ICONS = {
  success: "✅",
  error:   "❌",
  info:    "ℹ️",
  warning: "⚠️",
};

/**
 * @param {{ message: string, type: "success"|"error"|"info"|"warning" }} props
 */
export default function Toast({ message, type = "success" }) {
  return (
    <div
      className={`toast toast-${type}`}
      role="alert"
      aria-live="polite"
    >
      <span className="toast-icon">{ICONS[type]}</span>
      <span className="toast-message">{message}</span>
    </div>
  );
}
