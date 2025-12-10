// src/pages/shoppingp/SellerPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import products from "../../data/products.json";

// "HILL TOP FASHION" -> "hill-top-fashion"
const getSellerSlug = (name = "") =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/(^-|-$)+/g, "");

export default function SellerPage() {
  const { sellerSlug } = useParams();

  // त्या seller चे सगळे products
  const sellerProducts = products.filter(
    (p) => getSellerSlug(p.seller_name || p.brand) === sellerSlug
  );

  if (sellerProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-8">
        <p className="text-sm mb-3">
          <Link to="/shopping" className="text-blue-600 underline">
            ← Back to Shopping
          </Link>
        </p>
        <h1 className="text-xl font-bold">Seller not found</h1>
      </div>
    );
  }

  const sellerInfo = sellerProducts[0];
  const sellerName = sellerInfo.seller_name || sellerInfo.brand;
  const stats = sellerInfo.seller_stats || {};

  const avgRating =
    stats.sellerRating ??
    sellerProducts.reduce((sum, p) => sum + (p.rating || 0), 0) /
      sellerProducts.length;

  const totalRatings =
    stats.sellerRatingCount ??
    sellerProducts.reduce((sum, p) => sum + (p.rating_count || 0), 0);

  // ✅ dynamic filters data (for UI)
  const categories = Array.from(
    new Set(sellerProducts.map((p) => p.category))
  );
  const prices = sellerProducts.map((p) => p.discount_price || p.price || 0);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6">
      {/* BACK */}
      <Link
        to="/shopping"
        className="text-blue-600 mb-4 inline-block text-xs sm:text-sm font-semibold hover:underline"
      >
        ← Back to Products
      </Link>

      {/* HEADER */}
      <div className="rounded-2xl border bg-white p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-slate-100 flex items-center justify-center text-lg sm:text-xl">
            🏬
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-slate-900">
              {sellerName}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] sm:text-xs text-slate-500">
              <span className="inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 font-semibold text-green-700">
                {avgRating.toFixed(1)} ★
              </span>
              <span>{totalRatings?.toLocaleString()} Ratings</span>
              <span className="hidden h-1 w-1 rounded-full bg-slate-400 sm:inline-block" />
              <span>{(stats.followers ?? 0).toLocaleString()} Followers</span>
              <span className="hidden h-1 w-1 rounded-full bg-slate-400 sm:inline-block" />
              <span>{stats.productsCount ?? sellerProducts.length} Products</span>
            </div>
          </div>
        </div>

        <button className="self-start rounded-full bg-fuchsia-600 text-white px-5 sm:px-6 py-2 text-xs sm:text-sm font-semibold hover:bg-fuchsia-700">
          Follow
        </button>
      </div>

      {/* BODY: filters + product grid */}
      <div className="flex flex-col md:flex-row gap-5">
        {/* LEFT FILTER UI – mobile वर full width, md वर sidebar */}
        <aside className="md:w-64 w-full rounded-2xl border bg-white p-4 text-xs sm:text-sm text-slate-700">
          <h2 className="font-semibold mb-3">Filters</h2>

          {/* Category filter (UI only) */}
          <div className="mb-4">
            <p className="font-medium mb-1">Category</p>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2">
                  <input type="checkbox" className="h-3 w-3" />
                  <span className="truncate">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price range display */}
          <div className="mb-4">
            <p className="font-medium mb-1">Price</p>
            <p className="text-[11px] text-slate-500 mb-1">
              ₹{minPrice.toLocaleString()} – ₹{maxPrice.toLocaleString()}
            </p>
            <div className="h-1.5 rounded-full bg-slate-100" />
          </div>

          {/* Rating filter (UI only) */}
          <div>
            <p className="font-medium mb-1">Rating</p>
            <div className="space-y-1 text-[11px]">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-3 w-3" />
                <span>4★ & above</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-3 w-3" />
                <span>3★ & above</span>
              </label>
            </div>
          </div>
        </aside>

        {/* PRODUCT GRID */}
        <main className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 text-xs sm:text-sm">
            <p>
              Showing 1–
              {Math.min(20, sellerProducts.length)} of{" "}
              {sellerProducts.length} products
            </p>
            <div className="flex justify-end">
              <select className="border rounded-lg px-2 py-1 text-xs sm:text-sm">
                <option>Sort by: Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>
            </div>
          </div>

          {/* Mobile / Tablet / Desktop responsive grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {sellerProducts.map((product) => (
              <Link
                key={product.id}
                to={`/shopping/${product.id}`}
                className="rounded-2xl border bg-white overflow-hidden hover:shadow-sm transition flex flex-col"
              >
                {/* image container – fixed aspect ratio so mobile वर सुंदर दिसेल */}
                <div className="w-full aspect-[3/4] bg-slate-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* content */}
                <div className="p-2 sm:p-3 flex flex-col gap-1">
                  <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-1">
                    {product.category}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold line-clamp-2 min-h-[2.5rem]">
                    {product.name}
                  </p>

                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-sm sm:text-base font-bold">
                      ₹{product.discount_price.toLocaleString()}
                    </span>
                    <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className="text-[10px] sm:text-xs text-green-600 font-semibold">
                      {product.discount_percent}% off
                    </span>
                  </div>

                  <p className="text-[11px] text-green-600">
                    {product.delivery_charge === 0
                      ? "Free Delivery"
                      : `Delivery: ₹${product.delivery_charge}`}
                  </p>

                  <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
                    <span className="inline-flex items-center rounded px-1 py-[2px] bg-green-100 text-green-700 font-semibold">
                      {product.rating.toFixed(1)} ★
                    </span>
                    <span>
                      {product.rating_count?.toLocaleString() || 0} Reviews
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
