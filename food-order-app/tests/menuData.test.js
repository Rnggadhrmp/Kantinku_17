// ============================================================
// tests/menuData.test.js
// Unit test untuk fungsi filterMenu dan formatRupiah
// ============================================================

const { filterMenu, formatRupiah, MENU_ITEMS } = require("../src/data/menuData");

describe("formatRupiah", () => {
  it("memformat angka ke format Rupiah Indonesia", () => {
    expect(formatRupiah(15000)).toContain("15.000");
    expect(formatRupiah(0)).toContain("0");
  });
});

describe("filterMenu", () => {
  it("mengembalikan semua item jika kategori 'all' dan query kosong", () => {
    const result = filterMenu(MENU_ITEMS, "all", "");
    expect(result).toHaveLength(MENU_ITEMS.length);
  });

  it("memfilter berdasarkan kategori", () => {
    const result = filterMenu(MENU_ITEMS, "minuman", "");
    expect(result.every((i) => i.category === "minuman")).toBe(true);
  });

  it("memfilter berdasarkan query pencarian (case-insensitive)", () => {
    const result = filterMenu(MENU_ITEMS, "all", "nasi");
    expect(result.length).toBeGreaterThan(0);
    result.forEach((item) => {
      const combined = (item.name + item.description).toLowerCase();
      expect(combined).toContain("nasi");
    });
  });

  it("mengembalikan array kosong jika tidak ada yang cocok", () => {
    const result = filterMenu(MENU_ITEMS, "all", "xyzxyzxyz_tidak_ada");
    expect(result).toHaveLength(0);
  });

  it("filter kombinasi kategori dan query", () => {
    const result = filterMenu(MENU_ITEMS, "makanan", "ayam");
    expect(result.every((i) => i.category === "makanan")).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
});
