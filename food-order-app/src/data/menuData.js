// ============================================================
// data/menuData.js
// Data statis menu kantin kampus
// Dalam implementasi nyata, data ini diambil dari REST API
// ============================================================

export const CATEGORIES = [
  { id: "all",       label: "Semua" },
  { id: "makanan",   label: "🍛 Makanan" },
  { id: "minuman",   label: "🥤 Minuman" },
  { id: "snack",     label: "🍟 Snack" },
  { id: "paket",     label: "🎁 Paket Hemat" },
];

export const MENU_ITEMS = [
  // ── MAKANAN ──────────────────────────────────────────────
  {
    id: "m001",
    name: "Nasi Goreng Spesial",
    price: 15000,
    category: "makanan",
    image: "🍳",
    description: "Nasi goreng dengan telur, ayam suwir, dan sayuran segar.",
    stock: 20,
    rating: 4.7,
    estimasi: "10 menit",
  },
  {
    id: "m002",
    name: "Ayam Bakar Komplit",
    price: 22000,
    category: "makanan",
    image: "🍗",
    description: "Ayam bakar empuk lengkap dengan nasi, lalapan, dan sambal.",
    stock: 15,
    rating: 4.8,
    estimasi: "15 menit",
  },
  {
    id: "m003",
    name: "Mie Ayam Bakso",
    price: 13000,
    category: "makanan",
    image: "🍜",
    description: "Mie kenyal dengan ayam cincang, bakso, dan kuah kaldu gurih.",
    stock: 25,
    rating: 4.5,
    estimasi: "8 menit",
  },
  {
    id: "m004",
    name: "Gado-Gado",
    price: 12000,
    category: "makanan",
    image: "🥗",
    description: "Sayuran rebus segar dengan saus kacang kental nan lezat.",
    stock: 18,
    rating: 4.4,
    estimasi: "5 menit",
  },
  {
    id: "m005",
    name: "Soto Ayam",
    price: 14000,
    category: "makanan",
    image: "🥣",
    description: "Soto kuning khas dengan potongan ayam, telur, dan bihun.",
    stock: 20,
    rating: 4.6,
    estimasi: "10 menit",
  },
  {
    id: "m006",
    name: "Nasi Padang Campur",
    price: 20000,
    category: "makanan",
    image: "🍚",
    description: "Nasi putih dengan pilihan lauk rendang, ayam, dan sayur.",
    stock: 12,
    rating: 4.9,
    estimasi: "5 menit",
  },

  // ── MINUMAN ───────────────────────────────────────────────
  {
    id: "d001",
    name: "Es Teh Manis",
    price: 4000,
    category: "minuman",
    image: "🧋",
    description: "Teh manis segar dengan es batu, cocok untuk menemani makan.",
    stock: 50,
    rating: 4.3,
    estimasi: "2 menit",
  },
  {
    id: "d002",
    name: "Jus Alpukat",
    price: 10000,
    category: "minuman",
    image: "🥑",
    description: "Jus alpukat creamy dengan susu kental manis.",
    stock: 20,
    rating: 4.7,
    estimasi: "5 menit",
  },
  {
    id: "d003",
    name: "Es Jeruk Peras",
    price: 6000,
    category: "minuman",
    image: "🍊",
    description: "Jeruk peras segar tanpa pengawet, menyegarkan di siang hari.",
    stock: 30,
    rating: 4.5,
    estimasi: "3 menit",
  },
  {
    id: "d004",
    name: "Kopi Susu Kampus",
    price: 8000,
    category: "minuman",
    image: "☕",
    description: "Kopi robusta lokal dengan susu full cream, pas untuk ngerjain tugas.",
    stock: 40,
    rating: 4.8,
    estimasi: "5 menit",
  },
  {
    id: "d005",
    name: "Air Mineral 600ml",
    price: 3000,
    category: "minuman",
    image: "💧",
    description: "Air mineral botol 600ml, hidrasi terjaga sepanjang kuliah.",
    stock: 100,
    rating: 4.0,
    estimasi: "1 menit",
  },

  // ── SNACK ────────────────────────────────────────────────
  {
    id: "s001",
    name: "Pisang Goreng Coklat",
    price: 8000,
    category: "snack",
    image: "🍌",
    description: "Pisang goreng renyah dengan taburan coklat dan keju.",
    stock: 30,
    rating: 4.6,
    estimasi: "7 menit",
  },
  {
    id: "s002",
    name: "Tempe Mendoan",
    price: 5000,
    category: "snack",
    image: "🟫",
    description: "Tempe goreng tipis tepung renyah khas Banyumas.",
    stock: 25,
    rating: 4.4,
    estimasi: "5 menit",
  },
  {
    id: "s003",
    name: "Cireng Isi Keju",
    price: 7000,
    category: "snack",
    image: "⭕",
    description: "Aci goreng renyah berisi keju mozzarella meleleh.",
    stock: 20,
    rating: 4.5,
    estimasi: "6 menit",
  },
  {
    id: "s004",
    name: "Martabak Mini",
    price: 9000,
    category: "snack",
    image: "🥞",
    description: "Martabak telur mini crispy dengan isian sayuran dan daging.",
    stock: 15,
    rating: 4.7,
    estimasi: "8 menit",
  },

  // ── PAKET HEMAT ──────────────────────────────────────────
  {
    id: "p001",
    name: "Paket Makan Siang A",
    price: 18000,
    category: "paket",
    image: "🎁",
    description: "Nasi goreng + Es teh manis. Hemat 3.000 dibanding beli satuan!",
    stock: 20,
    rating: 4.8,
    estimasi: "10 menit",
  },
  {
    id: "p002",
    name: "Paket Makan Siang B",
    price: 25000,
    category: "paket",
    image: "🎀",
    description: "Ayam bakar komplit + Jus alpukat. Hemat 7.000!",
    stock: 15,
    rating: 4.9,
    estimasi: "15 menit",
  },
  {
    id: "p003",
    name: "Paket Snack & Minum",
    price: 14000,
    category: "paket",
    image: "🛍️",
    description: "Pisang goreng coklat + Kopi susu kampus. Cocok buat ngampus pagi.",
    stock: 20,
    rating: 4.6,
    estimasi: "7 menit",
  },
];

/**
 * Memformat angka ke format mata uang Rupiah.
 * @param {number} amount
 * @returns {string}
 */
export function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Memfilter menu berdasarkan kategori dan query pencarian.
 * @param {Array}  items
 * @param {string} category
 * @param {string} query
 * @returns {Array}
 */
export function filterMenu(items, category, query) {
  return items.filter((item) => {
    const matchCategory = category === "all" || item.category === category;
    const matchQuery =
      query === "" ||
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase());
    return matchCategory && matchQuery;
  });
}
