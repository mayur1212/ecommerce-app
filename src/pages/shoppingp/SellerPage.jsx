// src/pages/shoppingp/SellerPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import products from "../../data/products.json";

// "HILL TOP FASHION" -> "hill-top-fashion"
const getSellerSlug = (name = "") =>
  name.toLowerCase().replace(/[^a-z0-9]+/gi, "-").replace(/(^-|-$)+/g, "");

export default function SellerPage() {
  const { sellerSlug } = useParams();

  const sellerProducts = products.filter(
    (p) => getSellerSlug(p.seller_name || p.brand) === sellerSlug
  );

  if (sellerProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <Link to="/shopping" className="text-red-600 underline text-sm">
          ← Back to Shopping
        </Link>
        <h1 className="mt-4 text-xl font-bold">Seller not found</h1>
      </div>
    );
  }

  const sellerInfo = sellerProducts[0];
  const sellerName = sellerInfo.seller_name || sellerInfo.brand;
  const stats = sellerInfo.seller_stats || {};

  const avgRating =
    stats.sellerRating ??
    sellerProducts.reduce((s, p) => s + (p.rating || 0), 0) /
      sellerProducts.length;

  const totalRatings =
    stats.sellerRatingCount ??
    sellerProducts.reduce((s, p) => s + (p.rating_count || 0), 0);

  const categories = [...new Set(sellerProducts.map((p) => p.category))];
  const prices = sellerProducts.map((p) => p.discount_price || p.price || 0);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const sellerAddress = "Mumbai, India";

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6">
      {/* BACK */}
      <Link
        to="/shopping"
        className="text-red-600 mb-4 inline-block text-xs sm:text-sm font-semibold hover:underline"
      >
        ← Back to Products
      </Link>

      {/* ================= SELLER HEADER (NO RED BACK CARD) ================= */}
      <div className="mb-6 rounded-2xl border bg-white shadow p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* AVATAR */}
          <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-white border-4 border-red-600 shadow flex items-center justify-center text-xl font-bold text-red-600">
            SHOP
          </div>

          {/* INFO */}
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-slate-900">
              {sellerName}
            </h1>

            <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] sm:text-xs text-slate-600">
              <span className="rounded-full bg-green-100 px-2 py-0.5 font-semibold text-green-700">
                {avgRating.toFixed(1)} ★
              </span>
              <span>{totalRatings.toLocaleString()} Ratings</span>
              <span>•</span>
              <span>{(stats.followers ?? 0).toLocaleString()} Followers</span>
              <span>•</span>
              <span>{stats.productsCount ?? sellerProducts.length} Products</span>
            </div>

            {/* LOCATION + MAP ICON */}
            <div className="mt-1 flex items-center gap-2 text-[11px] sm:text-xs text-slate-500">
  {sellerAddress}

  <a
    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      sellerAddress
    )}`}
    target="_blank"
    rel="noreferrer"
    title="Get Directions"
    className="h-8 w-8 rounded-full border bg-white shadow flex items-center justify-center hover:bg-red-50 transition"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className="h-5 w-5"
    >
      <path
        d="M32 2C20.4 2 11 11.4 11 23c0 15.4 21 39 21 39s21-23.6 21-39C53 11.4 43.6 2 32 2z"
        fill="#E53935"
      />
      <circle cx="32" cy="23" r="7" fill="#ffffff" />
    </svg>
  </a>
</div>

          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">
          <button className="rounded-full bg-red-600 hover:bg-red-700 text-white px-6 py-2 text-xs sm:text-sm font-semibold shadow">
            Follow
          </button>

          {["📞", "🔗", "👤"].map((i, idx) => (
            <button
              key={idx}
              className="h-10 w-10 rounded-full border bg-white shadow hover:bg-red-50 flex items-center justify-center"
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      {/* ================= BODY ================= */}
      <div className="flex flex-col md:flex-row gap-5">
        {/* FILTERS */}
        <aside className="md:w-64 w-full rounded-2xl border bg-white p-4 text-xs sm:text-sm text-slate-700">
          <h2 className="font-semibold mb-3">Filters</h2>

          <div className="mb-4">
            <p className="font-medium mb-1">Category</p>
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2">
                <input type="checkbox" className="h-3 w-3" />
                <span>{cat}</span>
              </label>
            ))}
          </div>

          <div>
            <p className="font-medium mb-1">Price</p>
            <p className="text-[11px] text-slate-500">
              ₹{minPrice.toLocaleString()} – ₹{maxPrice.toLocaleString()}
            </p>
          </div>
        </aside>

        {/* PRODUCTS */}
        <main className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {sellerProducts.map((product) => (
              <Link
                key={product.id}
                to={`/shopping/${product.id}`}
                className="rounded-2xl border bg-white overflow-hidden hover:shadow transition"
              >
                <div className="aspect-[3/4] bg-slate-100">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-2">
                  <p className="text-xs font-semibold line-clamp-2">
                    {product.name}
                  </p>

                  <div className="mt-1 flex gap-1 items-baseline">
                    <span className="font-bold text-red-600">
                      ₹{product.discount_price}
                    </span>
                    <span className="line-through text-xs text-slate-400">
                      ₹{product.price}
                    </span>
                  </div>

                  <span className="text-xs text-green-600">
                    {product.rating.toFixed(1)} ★
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
