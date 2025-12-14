import React from "react";
import { Link } from "react-router-dom";
import products from "../../data/products.json";

/* ================= CONFIG ================= */

const OFFER_DISCOUNT = 20; // 20% OFF

/* ================= HELPERS ================= */

// calculate trending score safely
const getTrendingScore = (p) => {
  const sold = p.sold ?? 0;
  const views = p.views ?? 0;
  const rating =
    p.rating?.stars ??
    p.rating?.value ??
    (typeof p.rating === "number" ? p.rating : 4);

  return sold * 3 + views + rating * 10;
};

// calculate discounted price
const getDiscountedPrice = (price) => {
  if (!price || isNaN(price)) return 0;
  return Math.round(price * (1 - OFFER_DISCOUNT / 100));
};

// safe price formatter
const formatPrice = (price) => {
  const value = Number(price);
  return `₹${isNaN(value) ? "0" : value.toLocaleString()}`;
};

/* ================= COMPONENT ================= */

export default function TrendingProducts() {
  const trending = [...products]
    .sort((a, b) => getTrendingScore(b) - getTrendingScore(a))
    .slice(0, 6); // top 6 only

  if (trending.length === 0) return null;

  return (
    <div className="mb-10">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">🔥 Trending Products</h2>
        <span className="text-xs text-gray-500">
          Most loved today
        </span>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {trending.map((product) => {
          const basePrice =
            product.discount_price ?? product.price ?? 0;

          const finalPrice = getDiscountedPrice(basePrice);

          return (
            <Link
              key={product.id}
              to={`/shopping/${product.id}`}
              className="relative bg-white rounded-lg border hover:shadow-md transition p-2"
            >
              {/* IMAGE */}
              <div className="relative aspect-[4/5] mb-2 overflow-hidden rounded-md">
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* OFFER BADGE */}
                <span className="absolute bottom-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  20% OFF · Today
                </span>
              </div>

              {/* TITLE */}
              <p className="text-xs font-semibold line-clamp-2">
                {product.name}
              </p>

              {/* PRICE */}
              <div className="mt-1">
                <p className="text-sm font-bold text-red-600">
                  {formatPrice(finalPrice)}
                </p>

                <div className="flex items-center gap-1 text-[11px] text-gray-400">
                  <span className="line-through">
                    {formatPrice(basePrice)}
                  </span>
                  <span className="text-green-600 font-semibold">
                    (20% OFF)
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
