import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import products from "../../data/products.json";
import ReviewsDrawer from "../../components/Shoping/ReviewsDrawer";

/* ================= HELPERS ================= */

const formatPrice = (price) => `₹${price?.toLocaleString() || "0"}`;

const getSellerSlug = (name = "") =>
  name.toLowerCase().replace(/[^a-z0-9]+/gi, "-");

/* ================= PRICE HELPER ================= */

const getPriceInfo = (product, variant) => {
  const mrp =
    variant?.mrp ??
    product.mrp ??
    product.original_price ??
    product.price ??
    0;

  const salePrice =
    variant?.discount_price ??
    variant?.sale_price ??
    product.discount_price ??
    product.sale_price ??
    product.price ??
    mrp;

  const discountPercent =
    mrp > salePrice ? Math.round(((mrp - salePrice) / mrp) * 100) : 0;

  return { mrp, salePrice, discountPercent };
};

/* ================= SELLER ================= */

function SellerSection({ sellerName, sellerStats }) {
  const {
    sellerRating = 4.6,
    sellerRatingCount = 116951,
    followers = 3059,
    productsCount = 74,
  } = sellerStats || {};

  const sellerSlug = getSellerSlug(sellerName);

  return (
    <section className="mt-10">
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-xl">🏬</span>
          <div>
            <p className="text-xs text-gray-500">Sold By</p>
            <p className="font-semibold">{sellerName}</p>
            <p className="text-xs text-gray-500">
              {sellerRating} ★ • {sellerRatingCount.toLocaleString()} Ratings
            </p>
            <p className="text-xs text-gray-500">
              {followers.toLocaleString()} Followers • {productsCount} Products
            </p>
          </div>
        </div>

        <Link
          to={`/seller/${sellerSlug}`}
          className="mt-3 inline-block text-sm text-violet-600 font-semibold"
        >
          View Shop →
        </Link>
      </div>
    </section>
  );
}

/* ================= MAIN ================= */

export default function CartProductDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const product = products.find((p) => String(p.id) === id);
  if (!product) {
    return <p className="mt-10 text-center">Product not found</p>;
  }

  /* ===== VALUES FROM DETAILS PAGE ===== */
  const selectedColor = searchParams.get("color");
  const selectedSize = searchParams.get("size");
  const selectedWeight = searchParams.get("weight");
  const quantity = Number(searchParams.get("qty")) || 1;

  const variant = product.variants?.[0] || {};
  const { mrp, salePrice, discountPercent } = getPriceInfo(product, variant);

  const deliveryCharge = product.delivery_charge ?? 100;
  const totalPrice = salePrice * quantity + deliveryCharge;

  const [activeTab, setActiveTab] = useState("description");

  /* ===== EXTRA VALUES FOR NEW SECTION ===== */
  const sellerName =
    product.seller_name || product.brand || "Apple Authorised Store";
  const sellerSlug = getSellerSlug(sellerName);
  const displayRating =
    product.rating?.value || product.rating || 4.7;
  const ratingCount = product.rating_count || 7890;

  const ratingBreakdown = [
    { label: "Excellent", value: 3228, width: "70%" },
    { label: "Very Good", value: 1069, width: "25%" },
    { label: "Good", value: 533, width: "15%" },
    { label: "Average", value: 0, width: "4%" },
    { label: "Poor", value: 304, width: "6%" },
  ];

  const onViewAllReviews = () => {
    alert("Open reviews drawer here");
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-4">
      <Link to="/shopping" className="text-sm text-blue-600 hover:underline">
        ← Back to Products
      </Link>

      {/* ================= TOP ================= */}
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        {/* IMAGE */}
        <div className="rounded-3xl border bg-white p-4">
          <img
            src={product.images?.[0] || product.thumbnail}
            alt={product.name}
            className="h-[420px] w-full object-contain"
          />

          <div className="mt-4 flex gap-3 overflow-x-auto">
            {[product.thumbnail, ...(product.images || [])].map((img, i) => (
              <div
                key={i}
                className="w-16 h-16 rounded-xl border bg-white p-1"
              >
                <img src={img} className="w-full h-full object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div className="space-y-3">
          <p className="text-sm text-blue-600 font-semibold">
            {product.brand}
          </p>

          <h1 className="text-2xl font-bold">{product.name}</h1>

          <p className="text-sm text-gray-600">
            Category: <b>{product.category}</b> • SKU:{" "}
            <b>{product.sku_id || product.sku}</b>
          </p>

          <div className="flex items-center gap-2 text-sm">
            <span>★</span>
            <span className="font-semibold">
              {product.rating?.value || 4.7}
            </span>
            <span className="text-gray-500">
              ({product.rating_count || 7890} reviews)
            </span>
          </div>

          <p className="text-green-600 font-semibold">
            ✔ In Stock • {variant.stock || 10} left
          </p>

          {/* PRICE */}
          <div className="bg-gray-50 rounded-2xl border p-4 space-y-2">
            <div className="flex gap-3 items-center">
              {mrp > salePrice && (
                <span className="line-through text-gray-400 text-lg">
                  {formatPrice(mrp)}
                </span>
              )}
              <span className="text-3xl font-bold text-red-600">
                {formatPrice(salePrice)}
              </span>
              {discountPercent > 0 && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg">
                  {discountPercent}% off
                </span>
              )}
            </div>

            <p className="text-sm">
              You save <b>{formatPrice(mrp - salePrice)}</b> per item
            </p>

            <p className="text-sm">
              Delivery Charge:{" "}
              <b className="text-red-600">
                {formatPrice(deliveryCharge)}
              </b>
            </p>

            <div className="bg-blue-50 rounded-xl px-3 py-2 text-sm">
              <b>Total for {quantity} item{quantity > 1 ? "s" : ""}:</b>{" "}
              <span className="text-blue-700 font-bold">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>

          {/* ✅ SELECTED OPTIONS (RIGHT SIDE) */}
          <div className="mt-4 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Selected Options
            </p>

            <div className="flex flex-wrap gap-2 text-xs">
              {selectedColor && (
                <span className="px-3 py-1 rounded-full bg-gray-100 border">
                  Color: <b>{selectedColor}</b>
                </span>
              )}
              {selectedSize && (
                <span className="px-3 py-1 rounded-full bg-gray-100 border">
                  Size: <b>{selectedSize}</b>
                </span>
              )}
              {selectedWeight && (
                <span className="px-3 py-1 rounded-full bg-gray-100 border">
                  Weight: <b>{selectedWeight}</b>
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
                Quantity: <b>{quantity}</b>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="mt-10 bg-white rounded-3xl border">
        <div className="flex border-b text-sm font-semibold">
          {["description", "specs", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 ${
                activeTab === tab
                  ? "text-orange-600 border-b-2 border-orange-500"
                  : "text-gray-500"
              }`}
            >
              {tab === "description"
                ? "Description"
                : tab === "specs"
                ? "Specifications"
                : `Reviews (${ratingCount})`}
            </button>
          ))}
        </div>

        <div className="p-6 text-sm text-gray-700">
          {activeTab === "description" && <p>{product.description}</p>}
          {activeTab === "specs" && (
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400">Brand</p>
                <p>{product.brand}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">SKU</p>
                <p>{product.sku_id}</p>
              </div>
            </div>
          )}
          {activeTab === "reviews" && <p>Reviews will be displayed here.</p>}
        </div>
      </div>

      {/* ================= ADDED SECTION (ONLY THIS IS NEW) ================= */}
      <section className="mt-8 space-y-4">
        {/* SOLD BY CARD */}
        <div className="rounded-2xl border bg-white p-4 sm:p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold">
                🏬
              </div>

              <div>
                <p className="text-[11px] font-medium text-slate-500">Sold By</p>
                <p className="text-sm sm:text-base font-semibold text-slate-900">
                  {sellerName}
                </p>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] sm:text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 font-semibold text-green-700">
                    {Number(displayRating).toFixed(1)} ★
                  </span>
                  <span>{ratingCount.toLocaleString()} Ratings</span>
                  <span className="hidden h-1 w-1 rounded-full bg-slate-400 sm:inline-block" />
                  <span>3,059 Followers</span>
                  <span className="hidden h-1 w-1 rounded-full bg-slate-400 sm:inline-block" />
                  <span>74 Products</span>
                </div>
              </div>
            </div>

            <Link
              to={`/seller/${sellerSlug}`}
              className="self-start rounded-lg border px-4 py-2 text-xs sm:text-sm font-medium text-violet-600 hover:bg-violet-50"
            >
              View Shop
            </Link>
          </div>
        </div>

        {/* PRODUCT RATINGS */}
        <div className="rounded-2xl border bg-white p-4 sm:p-5 shadow-sm">
          <p className="mb-4 text-sm sm:text-base font-semibold text-slate-900">
            Product Ratings & Reviews
          </p>

          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex flex-1 items-center gap-3">
              <div>
                <p className="text-4xl sm:text-5xl font-semibold text-green-600">
                  {Number(displayRating).toFixed(1)}★
                </p>
                <p className="text-[11px] sm:text-xs text-slate-500">
                  {ratingCount.toLocaleString()} Ratings
                </p>
              </div>
            </div>

            <div className="flex-1 space-y-2">
              {ratingBreakdown.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-xs text-slate-600"
                >
                  <span className="w-20">{item.label}</span>
                  <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-green-500"
                      style={{ width: item.width }}
                    />
                  </div>
                  <span className="w-10 text-right text-[11px] text-slate-500">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onViewAllReviews}
            className="mt-4 w-full rounded-lg border border-violet-500 py-2 text-xs sm:text-sm font-semibold text-violet-600 hover:bg-violet-50"
          >
            VIEW ALL REVIEWS →
          </button>
        </div>

        {/* FEATURES */}
        <div className="grid gap-2 rounded-2xl border bg-[#f5f7ff] p-3 text-center text-xs sm:text-sm text-slate-700 sm:grid-cols-3">
          <div>🏷️ Lowest Price</div>
          <div>📦 Cash on Delivery</div>
          <div>🔄 7-day Returns</div>
        </div>
      </section>

      
      <ReviewsDrawer open={false} onClose={() => {}} reviews={[]} />
    </div>
  );
}
