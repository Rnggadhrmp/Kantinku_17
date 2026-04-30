# KantinKu — Aplikasi Pemesanan Makanan Kampus
> Tugas Bab 11: Kualitas Perangkat Lunak — Pengantar Rekayasa Perangkat Lunak

![React](https://img.shields.io/badge/React-18-blue) ![Jest](https://img.shields.io/badge/Coverage-80%25-green) ![ESLint](https://img.shields.io/badge/ESLint-8-yellow) ![CI](https://img.shields.io/badge/CI-GitHub_Actions-teal)

## Deskripsi Proyek

KantinKu adalah aplikasi pemesanan makanan kampus berbasis web yang dibangun menggunakan React.js sebagai studi kasus implementasi kualitas perangkat lunak. Proyek ini mendemonstrasikan penerapan prinsip *Shift-Left Testing*, *Static Analysis*, dan pipeline *DevSecOps* dalam siklus pengembangan perangkat lunak.

## Anggota Kelompok

| Nama | NIM |
|------|-----|
| Ahmad Naufal Azzuhdi | 24343029 |
| Rangga Dharma Putra | 24343045 |

## Fitur Aplikasi

- Autentikasi pengguna (Login/Logout)
- Tampilan menu dengan filter kategori dan pencarian
- Keranjang belanja dengan manajemen qty
- Halaman checkout dengan konfirmasi pesanan
- Riwayat pesanan
- Notifikasi toast untuk feedback pengguna

## Teknologi

| Kategori | Teknologi |
|----------|-----------|
| Frontend | React 18, Context API, useReducer |
| Testing | Jest 29, @testing-library/react |
| Linting | ESLint 8 + plugin React & React Hooks |
| CI/CD | GitHub Actions |
| SAST | Semgrep |
| SCA | npm audit |
| Quality Gate | SonarCloud |

## Struktur Proyek

```
food-order-app/
├── .github/workflows/
│   └── devsecops-pipeline.yml   # CI/CD Pipeline
├── src/
│   ├── components/              # MenuCard, Navbar, Toast
│   ├── pages/                   # Login, Menu, Cart, Checkout, History
│   ├── utils/
│   │   ├── cartReducer.js       # Pure function — business logic
│   │   └── AppContext.js        # Global state context
│   ├── data/
│   │   └── menuData.js          # Data menu & helper functions
│   └── styles/
│       └── global.css
├── tests/
│   ├── cartReducer.test.js      # 10 unit tests
│   └── menuData.test.js         # 5 unit tests
└── package.json
```

## Cara Menjalankan

### Prasyarat
- Node.js versi 16 atau lebih baru
- npm versi 8 atau lebih baru

### Instalasi & Menjalankan Aplikasi

```bash
git clone https://github.com/username/kantinku.git
cd food-order-app
npm install
npm start
```

Aplikasi akan berjalan di `http://localhost:3000`

### Menjalankan Test

```bash
npm test                  # Jalankan semua unit test
npm run test:coverage     # Jalankan test + laporan coverage
npm run lint              # Cek kualitas kode dengan ESLint
```

## Pipeline DevSecOps

Pipeline CI/CD otomatis berjalan pada setiap *pull request* ke branch `main` dengan tahapan berikut:

| Tahap | Tool | Fungsi |
|-------|------|--------|
| 1. Lint & Unit Test | ESLint + Jest | Kualitas kode dan coverage minimum 80% |
| 2. SAST | Semgrep | Deteksi kerentanan pada source code |
| 3. SCA | npm audit | Deteksi kerentanan pada dependencies |
| 4. Quality Gate | SonarCloud | Analisis kualitas kode menyeluruh |
| 5. Build | react-scripts | Build production (hanya di branch main) |

## Coverage Target

| Metrik | Target |
|--------|--------|
| Lines | 80% |
| Branches | 75% |
| Functions | 80% |
| Statements | 80% |

---
*Universitas Negeri Padang — Jurusan Teknik Informatika — 2026*
