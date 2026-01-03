import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useOrders } from "../../context/OrderContext";
import products from "../../data/products.json";

const formatPrice = (p = 0) => `₹${Number(p).toLocaleString()}`;

const getSellerSlug = (name = "") =>
  name.toLowerCase().replace(/[^a-z0-9]+/gi, "-");

/* ================= RATING BREAKDOWN ================= */
const ratingBreakdown = [
  { label: "Excellent", value: 3228, width: "70%" },
  { label: "Very Good", value: 1069, width: "25%" },
  { label: "Good", value: 533, width: "15%" },
  { label: "Average", value: 0, width: "4%" },
  { label: "Poor", value: 304, width: "6%" },
];

export default function OrderProductDetailPage() {
  const { id } = useParams();
  const { orders = [] } = useOrders();

  /* ================= FIND PRODUCT ================= */
  const product = useMemo(
    () => products.find((p) => String(p.id) === String(id)),
    [id]
  );

  /* ================= FIND ORDER ================= */
  const order = useMemo(
    () => orders.find((o) => String(o.productId) === String(id)),
    [orders, id]
  );

  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!product || !order) {
    return (
      <div className="mt-20 text-center">
        <p className="text-lg font-semibold">Order not found</p>
        <Link to="/my-orders" className="text-orange-600 font-semibold">
          Back to My Orders →
        </Link>
      </div>
    );
  }

  /* ================= PRICE ================= */
  const mrp = Number(product.price) || 0;
  const price = Number(order.price) || 0;
  const qty = Number(order.qty) || 1;
  const deliveryCharge = Number(product.delivery_charge ?? 0);
  const discount =
    mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const total = price * qty + deliveryCharge;

  /* ================= RATINGS ================= */
  const ratingValue = Number(product.rating) || 0;
  const ratingCount = Number(product.rating_count) || 0;
  const reviews = product.reviews || [];

  /* ================= SELLER DATA ================= */
  const sellerName =
    product.seller_name || product.brand || "HILL TOP FASHION";
  const sellerSlug = getSellerSlug(sellerName);

  const sellerRating =
    product.seller_stats?.sellerRating || ratingValue || 4.5;
  const sellerRatingCount =
    product.seller_stats?.sellerRatingCount || ratingCount || 7890;
  const followers =
    product.seller_stats?.followers || 3059;
  const productsCount =
    product.seller_stats?.productsCount || 74;

  /* ================= SPECS ================= */
  const specs = {
    Brand: product.brand,
    Category: product.category,
    SKU: product.sku_id,
    Seller: product.seller_name,
    Quantity: qty,
    "Payment Method": order.paymentMethod,
  };

  const onViewAllReviews = () => {
    alert("Open reviews drawer here");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Link
        to="/my-orders"
        className="text-sm text-blue-600 font-semibold hover:underline"
      >
        ← Back to My Orders
      </Link>

      {/* ================= TOP ================= */}
      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* IMAGE */}
        <div className="lg:w-[45%] bg-white border rounded-3xl p-4">
          <img
            src={order.image || product.thumbnail}
            alt={product.name}
            className="w-full h-[420px] object-contain"
          />
        </div>

        {/* DETAILS */}
        <div className="lg:w-[55%] space-y-4">
          <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-lg">
            {product.brand}
          </span>

          <h1 className="text-2xl md:text-3xl font-bold">
            {product.name}
          </h1>

          <p className="text-sm text-gray-500">
            Category: <b>{product.category}</b> • SKU:{" "}
            <b>{product.sku_id}</b>
          </p>

          <div className="flex items-center gap-2 text-sm">
            <span className="bg-green-600 text-white px-2 py-0.5 rounded">
              ⭐ {ratingValue.toFixed(1)}
            </span>
            <span className="text-gray-500">
              ({ratingCount} reviews)
            </span>
          </div>

          <p className="text-green-600 font-semibold">
            ✔ In Stock • {product.stock} left
          </p>

          {/* PRICE BOX */}
          <div className="bg-gray-50 border rounded-2xl p-4 space-y-2">
            <div className="flex gap-3 items-center">
              {mrp > price && (
                <span className="line-through text-gray-400">
                  {formatPrice(mrp)}
                </span>
              )}
              <span className="text-3xl font-bold text-red-600">
                {formatPrice(price)}
              </span>
              {discount > 0 && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  {discount}% OFF
                </span>
              )}
            </div>

            <p>
              You save <b>{formatPrice(mrp - price)}</b> per item
            </p>

            <p>
              Delivery Charge:{" "}
              <b>
                {deliveryCharge === 0
                  ? "FREE"
                  : formatPrice(deliveryCharge)}
              </b>
            </p>

            <div className="bg-blue-50 border rounded-xl px-3 py-2">
              <b>Total for {qty} item:</b>{" "}
              <span className="text-blue-700 font-bold">
                {formatPrice(total)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="mt-10 bg-white rounded-3xl border">
        <div className="flex border-b text-sm font-semibold overflow-x-auto">
          {["description", "specs", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 whitespace-nowrap ${
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

        <div className="p-6 text-gray-700 text-sm">
          {activeTab === "description" && (
            <p>{product.description || "No description available."}</p>
          )}

          {activeTab === "specs" && (
            <div className="grid sm:grid-cols-2 gap-4">
              {Object.entries(specs).map(([label, value]) => (
                <div key={label}>
                  <p className="text-gray-400 text-xs uppercase">
                    {label}
                  </p>
                  <p className="font-medium">{value}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <>
              {reviews.length === 0 ? (
                <p>No reviews yet.</p>
              ) : (
                reviews.map((r) => (
                  <div
                    key={r.id}
                    className="border rounded-xl p-3 mb-3"
                  >
                    <b>{r.author}</b> ⭐ {r.rating}
                    <p className="mt-1">{r.text}</p>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>

      {/* ================= ADDED SECTION (SAME AS OTHER PAGES) ================= */}
      <section className="mt-8 space-y-4">
        {/* SOLD BY */}
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
                    {Number(sellerRating).toFixed(1)} ★
                  </span>
                  <span>{sellerRatingCount.toLocaleString()} Ratings</span>
                  <span className="hidden h-1 w-1 rounded-full bg-slate-400 sm:inline-block" />
                  <span>{followers.toLocaleString()} Followers</span>
                  <span className="hidden h-1 w-1 rounded-full bg-slate-400 sm:inline-block" />
                  <span>{productsCount} Products</span>
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
                  {Number(sellerRating).toFixed(1)}★
                </p>
                <p className="text-[11px] sm:text-xs text-slate-500">
                  {sellerRatingCount.toLocaleString()} Ratings
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
    </div>
  );
}
