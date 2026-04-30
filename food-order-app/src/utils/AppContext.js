// ============================================================
// utils/AppContext.js
// Context global untuk berbagi state antar komponen
// ============================================================
import { createContext, useContext } from "react";

export const AppContext = createContext(null);

/**
 * Custom hook — memudahkan akses context di komponen mana pun.
 * Akan melempar error jika digunakan di luar AppContext.Provider.
 */
export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext harus digunakan di dalam AppContext.Provider");
  }
  return ctx;
}
