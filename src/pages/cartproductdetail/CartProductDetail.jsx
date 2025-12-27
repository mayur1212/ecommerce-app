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
                : `Reviews (${product.rating_count || 7890})`}
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

      {/* SELLER */}
      <SellerSection
        sellerName={product.seller_name || "Apple Authorised Store"}
        sellerStats={product.seller_stats}
      />

      <ReviewsDrawer open={false} onClose={() => {}} reviews={[]} />
    </div>
  );
}
