// src/components/Shoping/RelatedProducts.jsx
import React from "react";
import { Link } from "react-router-dom";

/* ================= SAFE HELPERS (NO UI CHANGE) ================= */

const formatPrice = (price) => {
  const value = Number(price);
  return `₹${isNaN(value) ? "0" : value.toLocaleString()}`;
};

const getDisplayPrice = (product) => {
  if (Array.isArray(product?.variants) && product.variants.length > 0) {
    const prices = product.variants
      .map((v) => v.price)
      .filter((p) => typeof p === "number");
    return prices.length ? Math.min(...prices) : 0;
  }
  return product?.discount_price ?? product?.price ?? 0;
};

const getDisplayMRP = (product) => {
  if (Array.isArray(product?.variants) && product.variants.length > 0) {
    const mrps = product.variants
      .map((v) => v.mrp)
      .filter((m) => typeof m === "number");
    return mrps.length ? Math.max(...mrps) : null;
  }
  return product?.price ?? null;
};

/* =============================================================== */

export default function RelatedProducts({
  products = [],
  currentProduct = {},
  maxItems = 4,
}) {
  const all = Array.isArray(products) ? products : [];

  if (!all.length) {
    return (
      <div className="mt-10">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Related Products
        </h2>
        <div className="text-sm text-gray-500">
          No products available in catalog.
        </div>
      </div>
    );
  }

  const idOf = (p) =>
    p && typeof p.id !== "undefined" ? Number(p.id) : null;

  const currentId = idOf(currentProduct);
  const excludeCurrent = (p) => idOf(p) !== currentId;

  const uniqById = (arr) => {
    const seen = new Set();
    return arr.filter((it) => {
      const id = idOf(it);
      if (id === null || seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  };

  let related = [];

  if (Array.isArray(currentProduct.related_ids)) {
    related = currentProduct.related_ids
      .map((rid) => all.find((p) => idOf(p) === Number(rid)))
      .filter(Boolean)
      .filter(excludeCurrent);
  }

  const norm = (s) => String(s ?? "").trim().toLowerCase();

  if (!related.length) {
    const cat = norm(currentProduct.category);
    related = all.filter(
      (p) => excludeCurrent(p) && norm(p.category) === cat
    );
  }

  if (!related.length) {
    const brand = norm(currentProduct.brand);
    related = all.filter(
      (p) => excludeCurrent(p) && norm(p.brand) === brand
    );
  }

  if (!related.length) {
    const curPrice = getDisplayPrice(currentProduct);
    const lo = curPrice * 0.5;
    const hi = curPrice * 1.5;
    related = all.filter((p) => {
      const price = getDisplayPrice(p);
      return excludeCurrent(p) && price >= lo && price <= hi;
    });
  }

  if (!related.length) {
    related = [...all]
      .filter(excludeCurrent)
      .sort((a, b) => {
        const ra = typeof a.rating === "number" ? a.rating : a.rating?.value ?? 0;
        const rb = typeof b.rating === "number" ? b.rating : b.rating?.value ?? 0;
        return rb - ra;
      });
  }

  related = uniqById(related).slice(0, maxItems);

  return (
    <div className="mt-10">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        Related Products
      </h2>

      {related.length ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {related.map((p) => {
            const name = p?.name || "Unnamed Product";
            const image = p?.thumbnail || "/placeholder.png";
            const salePrice = getDisplayPrice(p);
            const mrp = getDisplayMRP(p);

            return (
              <Link
  key={p.id}
  to={`/shopping/${p.id}`}
  className="
    group block bg-white
    rounded-xl border border-gray-100
    hover:shadow-lg transition
    overflow-hidden
  "
>
  {/* IMAGE */}
  <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
    <img
      src={image}
      alt={name}
      className="
        w-full h-full object-cover
        transition-transform duration-300
        group-hover:scale-110
      "
    />
    <span className="absolute bottom-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  20% OFF · Today
                </span>
  </div>

  {/* CONTENT */}
  <div className="p-3 flex flex-col gap-1">
    <h3 className="text-sm font-semibold line-clamp-2 leading-snug">
      {name}
    </h3>

    <div className="flex items-center gap-2 mt-1">
      <span className="text-sm font-bold text-red-600">
        {formatPrice(salePrice)}
      </span>

      {mrp && mrp > salePrice && (
        <span className="text-[11px] line-through text-gray-400">
          {formatPrice(mrp)}
        </span>
      )}
    </div>
  </div>
</Link>

            );
          })}
        </div>
      ) : (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
          No related products found.
        </div>
      )}
    </div>
  );
}
