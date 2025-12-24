import React from "react";
import { X } from "lucide-react";

export default function FilterModal({ open, onClose, filters, setFilters }) {
  if (!open) return null;

  const categories = ["Electronics", "Fashion", "Groceries"];
  const brands = ["Apple", "Samsung", "Nike", "Adidas"];

  const toggleArrayValue = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  const clearFilters = () => {
    setFilters({
      name: "",
      categories: [],
      brands: [],
      minPrice: "",
      maxPrice: "",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* BACKDROP */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* MODAL */}
      <div
        className="
          relative z-10
          w-[92%] sm:w-[420px] md:w-[460px]
          bg-white
          rounded-3xl           /* ✅ 4-side rounded */
          shadow-[0_20px_60px_rgba(0,0,0,0.25)]
          border border-gray-200
          animate-[fadeIn_.25s_ease-out]
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="max-h-[65vh] overflow-y-auto px-6 py-5 space-y-6">
          {/* SEARCH */}
          <div>
            <label className="text-sm font-medium">Search</label>
            <input
              type="text"
              value={filters.name}
              onChange={(e) =>
                setFilters({ ...filters, name: e.target.value })
              }
              placeholder="Search products"
              className="
                mt-1 w-full rounded-2xl border px-4 py-3 text-sm
                focus:ring-2 focus:ring-red-500 outline-none
              "
            />
          </div>

          {/* CATEGORY */}
          <div>
            <p className="text-sm font-medium mb-2">Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const active = filters.categories.includes(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => toggleArrayValue("categories", cat)}
                    className={`
                      px-4 py-2 rounded-full text-sm border transition
                      ${
                        active
                          ? "bg-red-600 text-white border-red-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }
                    `}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* BRAND */}
          <div>
            <p className="text-sm font-medium mb-2">Brand</p>
            <div className="grid grid-cols-2 gap-3">
              {brands.map((brand) => (
                <label
                  key={brand}
                  className="
                    flex items-center gap-3
                    border rounded-2xl px-4 py-3
                    cursor-pointer
                    hover:bg-gray-50 transition
                  "
                >
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() =>
                      toggleArrayValue("brands", brand)
                    }
                    className="accent-red-600"
                  />
                  <span className="text-sm">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* PRICE */}
          <div>
            <p className="text-sm font-medium mb-2">Price Range</p>
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters({ ...filters, minPrice: e.target.value })
                }
                className="w-1/2 rounded-2xl border px-4 py-3 text-sm"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters({ ...filters, maxPrice: e.target.value })
                }
                className="w-1/2 rounded-2xl border px-4 py-3 text-sm"
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t px-6 py-4 flex gap-3">
          <button
            onClick={clearFilters}
            className="
              w-1/2 py-3 rounded-2xl border
              text-sm font-semibold
              hover:bg-gray-100 transition
            "
          >
            Clear
          </button>

          <button
            onClick={onClose}
            className="
              w-1/2 py-3 rounded-2xl
              bg-red-600 text-white
              font-semibold
              hover:bg-red-700 transition
            "
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
