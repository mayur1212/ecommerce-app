// src/components/market/Productsdetails.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import products from "../../data/products.json";
import Relatedproducts from "./Relatedprducts";

const formatPrice = (price) => `₹${price?.toLocaleString() || "0"}`;

// Generic pricing helper – product + variant दोन्हीवर काम करतो
const getPriceInfo = (product, variant) => {
  const hasVariant = variant && Object.keys(variant).length > 0;

  const mrp =
    (hasVariant && (variant.mrp ?? variant.original_price)) ??
    product.mrp ??
    product.original_price ??
    product.price ??
    0;

  let salePrice =
    (hasVariant &&
      (variant.discount_price ?? variant.sale_price ?? variant.price)) ??
    product.discount_price ??
    product.sale_price ??
    product.price ??
    mrp;

  let discountPercent = 0;

  if (mrp && salePrice && mrp > salePrice) {
    discountPercent = Math.round(((mrp - salePrice) / mrp) * 100);
  } else if (hasVariant && typeof variant.discount_percent === "number") {
    discountPercent = variant.discount_percent;
  } else if (typeof product.discount_percent === "number") {
    discountPercent = product.discount_percent;
  }

  if (mrp && discountPercent > 0 && (salePrice === mrp || !salePrice)) {
    salePrice = Math.round(mrp * (1 - discountPercent / 100));
  }

  return { mrp, salePrice, discountPercent };
};

export default function Productsdetails() {
  const { id } = useParams();
  const product = products.find((p) => String(p.id) === id);

  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  const variants = product.variants || [];

  // ---------- VARIANT STATE ----------
  const [selectedColor, setSelectedColor] = useState(
    variants[0]?.color || null
  );
  const [selectedSize, setSelectedSize] = useState(variants[0]?.size || null);

  const selectedVariant =
    variants.find(
      (v) =>
        (!selectedColor || v.color === selectedColor) &&
        (!selectedSize || v.size === selectedSize)
    ) || variants[0] || {};

  // ---------- IMAGE STATE ----------
  const [selectedImage, setSelectedImage] = useState(
    product?.images?.[0] || product?.thumbnail
  );

  // ---------- WISHLIST ----------
  const [isWishlisted, setIsWishlisted] = useState(false);
  const handleWishlistToggle = () => setIsWishlisted((p) => !p);

  // ---------- SHARE ----------
  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: product.name,
      text: product.description,
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        alert("Product link copied to clipboard!");
      } else {
        alert("Share not supported on this browser.");
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  // ---------- PRICE / STOCK / RATING ----------
  const { mrp, salePrice, discountPercent } = getPriceInfo(
    product,
    selectedVariant
  );

  const totalStock = selectedVariant?.stock ?? product.stock ?? 0;
  const inStock = totalStock > 0;

  // ✅ robust rating handling (object or number)
  const ratingValue =
    product.rating?.stars ??
    product.rating?.value ??
    (typeof product.rating === "number" ? product.rating : null) ??
    0;

  const ratingCount =
    product.rating_count ?? product.rating?.count ?? 0;

  const youSave = mrp > salePrice ? mrp - salePrice : 0;

  // ---------- QUANTITY ----------
  const [quantity, setQuantity] = useState(1);
  const minQty = product.min_order_qty ?? 1;

  const handleQtyChange = (type) => {
    setQuantity((prev) => {
      if (type === "dec") {
        return Math.max(minQty, prev - 1);
      }
      if (totalStock) {
        return Math.min(totalStock, prev + 1);
      }
      return prev + 1;
    });
  };

  const totalPrice = salePrice * quantity;

  // ---------- VARIANT OPTIONS ----------
  const uniqueColors = [
    ...new Set(variants.map((v) => v.color).filter(Boolean)),
  ];
  const uniqueSizes = [...new Set(variants.map((v) => v.size).filter(Boolean))];

  // ---------- BOTTOM TABS ----------
  const [activeTab, setActiveTab] = useState("description");

  const tags = product.tags || [];
  const specs = {
    Brand: product.brand,
    Category: product.category,
    SKU: product.sku_id || product.sku,
    Weight: product.weight,
    Dimensions: product.dimensions,
    "Min Order Qty": product.min_order_qty,
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4">
      {/* Back Button */}
      <Link
        to="/market"
        className="text-blue-600 mb-4 inline-block text-xs sm:text-sm font-semibold hover:underline"
      >
        ← Back to Market
      </Link>

      <div className="flex flex-col gap-6 md:gap-8 lg:flex-row">
        {/* LEFT – IMAGES + VARIANTS */}
        <div className="lg:w-[45%] w-full">
          <div className="w-full h-64 sm:h-80 md:h-[420px] bg-white rounded-3xl border border-gray-100 p-4 flex items-center justify-center overflow-hidden relative">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
            />

            {discountPercent > 0 && (
              <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-red-600 text-white px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-bold rounded-lg">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-3 sm:mt-4 overflow-x-auto pb-2">
            {[product.thumbnail, ...(product.images || [])].map(
              (img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`rounded-2xl border-2 p-1 cursor-pointer transition min-w-[60px] sm:min-w-[70px]
                  ${
                    selectedImage === img
                      ? "border-blue-600"
                      : "border-gray-200 hover:border-blue-400"
                  }`}
                >
                  <img
                    src={img}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover"
                    alt=""
                  />
                </button>
              )
            )}
          </div>

          {/* VARIANTS UNDER THUMBNAILS */}
          {variants.length > 0 && (
            <div className="mt-4 space-y-4">
              {/* COLOR */}
              {uniqueColors.length > 0 && (
                <div>
                  <p className="font-semibold mb-2 text-gray-800 text-[11px] sm:text-xs uppercase tracking-wide">
                    Color
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {uniqueColors.map((color) => {
                      const isSelected = selectedColor === color;
                      return (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition
                          ${
                            isSelected
                              ? "border-gray-900 ring-2 ring-gray-900"
                              : "border-gray-300 hover:border-gray-500"
                          }`}
                        >
                          <span
                            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full"
                            style={{ backgroundColor: color?.toLowerCase() }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SIZE */}
              {uniqueSizes.length > 0 && (
                <div>
                  <p className="font-semibold mb-2 text-gray-800 text-[11px] sm:text-xs uppercase tracking-wide">
                    Size
                  </p>
                  <div className="flex flex-wrap gap-3 items-center">
                    {uniqueSizes.map((size) => {
                      const isSelected = selectedSize === size;
                      const isAvailable = variants.some(
                        (v) =>
                          v.size === size &&
                          (!selectedColor || v.color === selectedColor)
                      );

                      return (
                        <button
                          key={size}
                          type="button"
                          disabled={!isAvailable}
                          onClick={() => isAvailable && setSelectedSize(size)}
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border text-xs sm:text-sm flex items-center justify-center transition
                          ${
                            isSelected
                              ? "bg-gray-900 text-white border-gray-900"
                              : "bg-white text-gray-700 border-gray-300 hover:border-gray-500"
                          }
                          ${!isAvailable ? "opacity-40 cursor-not-allowed" : ""}`}
                        >
                          {size}
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedColor(variants[0]?.color || null);
                        setSelectedSize(variants[0]?.size || null);
                      }}
                      className="ml-2 sm:ml-4 text-[11px] sm:text-xs underline text-gray-500 hover:text-gray-700"
                    >
                      CLEAR
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT – DETAILS */}
        <div className="lg:w-[55%] w-full flex flex-col gap-4 mt-4 lg:mt-0">
          {/* Brand */}
          <span className="text-[11px] sm:text-xs md:text-sm text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-lg w-max">
            {product.brand}
          </span>

          {/* Title + icons */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
                {product.name}
              </h1>
              {product.overview && (
                <p className="mt-1 text-xs sm:text-sm text-gray-600">
                  {product.overview}
                </p>
              )}
            </div>

            <div className="flex gap-2 mt-1">
              {/* Wishlist */}
              <button
                type="button"
                onClick={handleWishlistToggle}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
                aria-label="Add to wishlist"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  viewBox="0 0 24 24"
                  fill={isWishlisted ? "red" : "none"}
                  stroke={isWishlisted ? "red" : "currentColor"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                </svg>
              </button>

              {/* Share */}
              <button
                type="button"
                onClick={handleShare}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
                aria-label="Share product"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <path d="M8.59 13.51 15.42 17.5" />
                  <path d="M15.41 6.5 8.59 10.49" />
                </svg>
              </button>
            </div>
          </div>

          {/* Category + SKU */}
          <p className="text-gray-600 text-[11px] sm:text-xs md:text-sm">
            Category: <span className="font-semibold">{product.category}</span>{" "}
            • SKU:{" "}
            <span className="font-semibold">
              {product.sku_id || product.sku}
            </span>
          </p>

          {/* ✅ Rating – single gold star + value + count */}
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center text-yellow-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 md:w-6 md:h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.402 8.168L12 18.896l-7.336 3.87 1.402-8.168L.132 9.211l8.2-1.193z" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-gray-900">
              {Number(ratingValue).toFixed(1)}
            </span>
            <span className="text-[11px] sm:text-xs text-gray-500">
              ({ratingCount} reviews)
            </span>
          </div>

          {/* Stock line */}
          <p
            className={`text-xs sm:text-sm font-semibold ${
              inStock ? "text-green-600" : "text-red-600"
            }`}
          >
            {inStock
              ? `✔ In Stock • ${totalStock} left in stock`
              : "✘ Out Of Stock"}
          </p>

          {/* PRICE SECTION */}
          <div className="mt-3 space-y-3">
            {/* main price card */}
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {mrp > salePrice && (
                  <span className="text-sm sm:text-base md:text-lg line-through text-gray-400">
                    {formatPrice(mrp)}
                  </span>
                )}

                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600">
                  {formatPrice(salePrice)}
                </span>

                {discountPercent > 0 && (
                  <span className="text-[11px] sm:text-xs md:text-sm font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    {discountPercent}% off
                  </span>
                )}
              </div>

              {youSave > 0 && (
                <p className="mt-2 text-[11px] sm:text-xs md:text-sm text-gray-700">
                  You save:{" "}
                  <span className="font-semibold">{formatPrice(youSave)}</span>{" "}
                  per item
                </p>
              )}

              <div className="mt-2 text-[11px] sm:text-xs md:text-sm bg-blue-50 border border-blue-100 rounded-xl px-3 py-2">
                <span className="font-medium">
                  Total for {quantity} item{quantity > 1 ? "s" : ""}:{" "}
                </span>
                <span className="font-semibold text-blue-700">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            {/* info box – delivery, warranty etc. */}
            <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 text-[11px] sm:text-xs md:text-sm text-gray-700">
              <p>
                <span className="font-semibold">FREE delivery:</span>{" "}
                {product.delivery_info || "On eligible orders."}
              </p>
              <p>
                <span className="font-semibold">Warranty:</span>{" "}
                {product.warranty || "No warranty info"}
              </p>
              <p>
                <span className="font-semibold">Return Policy:</span>{" "}
                {product.return_policy || "7 days return policy"}
              </p>
              <p>
                <span className="font-semibold">SKU:</span>{" "}
                {product.sku_id || product.sku}
              </p>
              {product.weight && (
                <p>
                  <span className="font-semibold">Weight:</span>{" "}
                  {product.weight}
                </p>
              )}
            </div>
          </div>

          {/* QUANTITY + BUTTONS */}
          <div className="mt-5 space-y-4">
            {/* quantity row */}
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-xs sm:text-sm font-semibold text-gray-800">
                Quantity:
              </span>

              <div className="inline-flex items-center border border-gray-300 rounded-full overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleQtyChange("dec")}
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-lg text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="w-10 sm:w-12 text-center text-xs sm:text-sm font-medium">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => handleQtyChange("inc")}
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-lg text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                className="flex-1 bg-amber-500 text-white py-3 rounded-2xl text-sm sm:text-base font-semibold hover:bg-amber-600 transition active:scale-95 disabled:opacity-60"
                disabled={!inStock}
              >
                Add to Cart
              </button>

              <button
                className="flex-1 bg-orange-500 text-white py-3 rounded-2xl text-sm sm:text-base font-semibold hover:bg-orange-600 transition active:scale-95 disabled:opacity-60"
                disabled={!inStock}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM TABS – Description / Specifications / Reviews */}
      <div className="mt-8 sm:mt-10 bg-white rounded-3xl border border-gray-100">
        {/* tabs */}
        <div className="flex border-b border-gray-100 text-xs sm:text-sm font-semibold overflow-x-auto">
          {["description", "specs", "reviews"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-5 py-3 rounded-t-3xl whitespace-nowrap
                ${
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

        {/* tab content */}
        <div className="p-4 sm:p-6 text-sm md:text-base text-gray-700">
          {activeTab === "description" && (
            <p className="leading-relaxed whitespace-pre-line text-xs sm:text-sm md:text-base">
              {product.description ||
                "No description available for this product."}
            </p>
          )}

          {activeTab === "specs" && (
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {Object.entries(specs).map(([label, value]) =>
                value ? (
                  <div key={label}>
                    <p className="text-[10px] sm:text-xs uppercase text-gray-400">
                      {label}
                    </p>
                    <p className="font-medium text-gray-800 text-xs sm:text-sm">
                      {value}
                    </p>
                  </div>
                ) : null
              )}

              {tags.length > 0 && (
                <div className="sm:col-span-2">
                  <p className="text-[10px] sm:text-xs uppercase text-gray-400 mb-1">
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-[11px] sm:text-xs rounded-full bg-gray-100 text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <p className="font-semibold mb-2 text-sm sm:text-base">
                Rating: {Number(ratingValue).toFixed(1)} / 5
              </p>
              {ratingCount === 0 ? (
                <p className="text-gray-500 text-xs sm:text-sm">
                  No reviews yet. Be the first to review this product.
                </p>
              ) : (
                <p className="text-gray-500 text-xs sm:text-sm">
                  {ratingCount} reviews will be shown here.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* RELATED PRODUCTS – market version */}
      <Relatedproducts products={products} currentProduct={product} />
    </div>
  );
}
