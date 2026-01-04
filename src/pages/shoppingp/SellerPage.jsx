// src/pages/shoppingp/SellerPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import products from "../../data/products.json";
import shopIcon from "../../assets/3209711.png";


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
          <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-white border-1 border-red-100 shadow overflow-hidden flex items-center justify-center">
  <img
    src={shopIcon}
    alt="Seller Store"
    className="h-full w-full object-cover"
  />
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
  {sellerAddress}

  
</div>

          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">

  {/* FOLLOW */}
  <button
    className="
      flex items-center justify-center
      rounded-full
      bg-red-600 hover:bg-red-700
      text-white
      px-4 sm:px-5
      py-2
      min-h-[40px]
      text-xs sm:text-sm
      font-semibold
      shadow
      transition
    "
  >
    Follow
  </button>

  {/* ADD FRIEND */}
  <button
    className="
      flex items-center justify-center gap-2
      rounded-full
      border
      bg-slate-100 hover:bg-slate-200
      text-slate-700
      px-4 sm:px-5
      py-2
      min-h-[40px]
      text-xs sm:text-sm
      font-semibold
      shadow-sm
      transition
    "
  >
    ➕ <span>Add Friend</span>
  </button>

  {/* MESSAGE */}
  <button
    className="
      flex items-center gap-2
      rounded-full
      border
      bg-white hover:bg-slate-100
      px-4 sm:px-5
      py-2
      min-h-[40px]
      text-xs sm:text-sm
      font-semibold
      text-slate-800
      shadow-sm
      transition
    "
  >
    💬 <span>Message</span>
  </button>

  {/* ENQUIRY (Clean CTA) */}
  <button
    className="
      flex items-center gap-2
      rounded-full
      border
      bg-blue-50 hover:bg-blue-100
      text-blue-700
      px-4 sm:px-5
      py-2
      min-h-[40px]
      text-xs sm:text-sm
      font-semibold
      shadow-sm
      transition
    "
  >
    ✉️ <span>Enquiry</span>
  </button>

  {/* WHATSAPP – DIRECT CHAT */}
  {/* WHATSAPP – DIRECT CHAT */}
<a
  href="https://wa.me/919999999999"
  target="_blank"
  rel="noreferrer"
  title="Chat on WhatsApp"
  className="
    h-10 w-10
    rounded-full
    bg-green-500 hover:bg-green-600
    text-white
    shadow
    flex items-center justify-center
    transition
  "
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className="h-5 w-5 fill-white"
  >
    <path d="M16.04 2.003c-7.72 0-14 6.28-14 14 0 2.47.65 4.87 1.89 6.99L2 30l7.18-1.87A13.92 13.92 0 0 0 16.04 30c7.72 0 14-6.28 14-14s-6.28-13.997-14-13.997zm0 25.66c-2.21 0-4.37-.59-6.26-1.71l-.45-.27-4.26 1.11 1.14-4.15-.29-.43a11.63 11.63 0 0 1-1.77-6.21c0-6.42 5.23-11.65 11.65-11.65 6.42 0 11.65 5.23 11.65 11.65 0 6.42-5.23 11.66-11.65 11.66zm6.39-8.75c-.35-.18-2.08-1.02-2.4-1.14-.32-.12-.56-.18-.8.18-.24.35-.92 1.14-1.13 1.38-.21.24-.41.27-.76.09-.35-.18-1.48-.54-2.82-1.73-1.04-.93-1.74-2.08-1.95-2.43-.21-.35-.02-.54.16-.72.16-.16.35-.41.53-.62.18-.21.24-.35.35-.59.12-.24.06-.45-.03-.62-.09-.18-.8-1.93-1.1-2.64-.29-.7-.59-.61-.8-.62h-.68c-.24 0-.62.09-.95.45-.32.35-1.25 1.22-1.25 2.97s1.28 3.44 1.46 3.68c.18.24 2.52 3.86 6.11 5.42.85.37 1.51.59 2.02.75.85.27 1.62.23 2.23.14.68-.1 2.08-.85 2.38-1.67.29-.83.29-1.54.21-1.67-.09-.14-.32-.21-.68-.38z" />
  </svg>
</a>


  {/* CALL */}
  <button
    className="
      h-10 w-10
      rounded-full
      border
      bg-white
      shadow
      hover:bg-red-50
      flex items-center justify-center
    "
  >
    📞
  </button>

  {/* SHARE */}
  <button className="h-10 w-10 rounded-full bg-red-600 hover:bg-red-700 text-white shadow flex items-center justify-center transition">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.6 13.5l6.8 3.9" />
      <path d="M15.4 6.6l-6.8 3.9" />
    </svg>
  </button>

  {/* PROFILE */}
  <button
    className="
      h-10 w-10
      rounded-full
      border
      bg-white
      shadow
      hover:bg-red-50
      flex items-center justify-center
    "
  >
    👤
  </button>

</div>



      </div>

      {/* ================= BODY ================= */}
      
      <div className="flex flex-col md:flex-row gap-5">
        {/* FILTERS */}
        <aside className="md:w-64 w-full rounded-2xl border bg-white p-4 text-xs sm:text-sm text-slate-700">
          <h2 className="font-semibold mb-3">Filters</h2>

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

          <div className="mb-4">
            <p className="font-medium mb-1">Price</p>
            <p className="text-[11px] text-slate-500 mb-1">
              ₹{minPrice.toLocaleString()} – ₹{maxPrice.toLocaleString()}
            </p>
            <div className="h-1.5 rounded-full bg-slate-100" />
          </div>

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
