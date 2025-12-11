// src/components/Shoping/RelatedProducts.jsx
import React from "react";
import { Link } from "react-router-dom";

/**
 * Smarter RelatedProducts:
 * - Try related_ids
 * - Fallbacks: same category -> same brand -> similar price range -> top-rated
 */
export default function RelatedProducts({ products = [], currentProduct = {}, maxItems = 4 }) {
  const all = Array.isArray(products) ? products : [];

  // Safety: if no products at all, show nothing useful
  if (!all.length) {
    return (
      <div className="mt-10">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Related Products</h2>
        <div className="text-sm text-gray-500">No products available in catalog.</div>
      </div>
    );
  }

  const idOf = (p) => (p && typeof p.id !== "undefined" ? Number(p.id) : null);
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

  // 1) related_ids explicit
  let related = [];
  if (Array.isArray(currentProduct.related_ids) && currentProduct.related_ids.length) {
    related = currentProduct.related_ids
      .map((rid) => all.find((p) => idOf(p) === Number(rid)))
      .filter(Boolean)
      .filter(excludeCurrent);
  }

  // helper: category/brand/price filterers
  const norm = (s) => String(s ?? "").trim().toLowerCase();

  // 2) same category
  if (!related.length) {
    const cat = norm(currentProduct.category);
    if (cat) {
      related = all.filter((p) => excludeCurrent(p) && norm(p.category) === cat);
    }
  }

  // 3) same brand
  if (!related.length) {
    const brand = norm(currentProduct.brand);
    if (brand) {
      related = all.filter((p) => excludeCurrent(p) && norm(p.brand) === brand);
    }
  }

  // 4) similar price range (+/- 50%)
  if (!related.length) {
    const curPrice = Number(currentProduct.discount_price ?? currentProduct.price ?? 0);
    if (curPrice > 0) {
      const lo = curPrice * 0.5;
      const hi = curPrice * 1.5;
      related = all.filter((p) => {
        if (!excludeCurrent(p)) return false;
        const pprice = Number(p.discount_price ?? p.price ?? 0);
        return pprice > 0 && pprice >= lo && pprice <= hi;
      });
    }
  }

  // 5) top-rated fallback
  if (!related.length) {
    related = [...all].filter(excludeCurrent).sort((a, b) => {
      const ra = Number(a.rating ?? a.rating_value ?? 0);
      const rb = Number(b.rating ?? b.rating_value ?? 0);
      return rb - ra;
    });
  }

  // ensure unique, slice to maxItems
  related = uniqById(related).slice(0, maxItems);

  return (
    <div className="mt-10">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Related Products</h2>

      {related.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p) => {
            const name = p?.name || "Unnamed Product";
            const image = p?.thumbnail || p?.image || "/placeholder.png";
            const price = p?.discount_price ?? p?.price ?? 0;
            const originalPrice =
              p?.discount_price && p?.price && p.discount_price < p.price ? p.price : null;

            return (
              <Link
                key={p.id}
                to={`/shopping/${p.id}`}
                className="block bg-white rounded-2xl border border-gray-100 hover:shadow-md transition overflow-hidden"
              >
                <div className="w-full h-32 bg-gray-50 overflow-hidden">
                  <img src={image} alt={name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                </div>
                <div className="p-3 flex flex-col gap-1">
                  <h3 className="text-sm font-semibold line-clamp-2">{name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-red-600">₹{Number(price).toLocaleString()}</span>
                    {originalPrice && <span className="text-[10px] line-through text-gray-400">₹{Number(originalPrice).toLocaleString()}</span>}
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
