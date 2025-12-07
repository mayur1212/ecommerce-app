// src/components/market/Productsdetails.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import products from "../../data/products.json";
import Relatedproducts from "./Relatedprducts";

const formatPrice = (price) => `₹${price?.toLocaleString() || "0"}`;

// same generic helper you used in ProductsDetails
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
      (variant.discount_price ??
        variant.sale_price ??
        variant.price)) ??
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

  const [selectedColor, setSelectedColor] = useState(
    variants[0]?.color || null
  );
  const [selectedSize, setSelectedSize] = useState(
    variants[0]?.size || null
  );

  const selectedVariant =
    variants.find(
      (v) =>
        (!selectedColor || v.color === selectedColor) &&
        (!selectedSize || v.size === selectedSize)
    ) || variants[0] || {};

  const [selectedImage, setSelectedImage] = useState(
    product?.images?.[0] || product?.thumbnail
  );

  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistToggle = () => {
    setIsWishlisted((prev) => !prev);
  };

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

  const { mrp, salePrice, discountPercent } = getPriceInfo(
    product,
    selectedVariant
  );

  const inStock = (selectedVariant?.stock ?? product.stock ?? 0) > 0;
  const rating = product.rating ?? 4.4;

  const uniqueColors = [
    ...new Set(variants.map((v) => v.color).filter(Boolean)),
  ];
  const uniqueSizes = [...new Set(variants.map((v) => v.size).filter(Boolean))];

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Back Button */}
      <Link
        to="/market"
        className="text-blue-600 mb-4 inline-block text-sm font-semibold hover:underline"
      >
        ← Back to Market
      </Link>

      <div className="flex flex-col md:flex-row gap-10">
        {/* LEFT SIDE – IMAGES */}
        <div className="md:w-1/2 w-full">
          <div className="w-full h-[420px] bg-white rounded-3xl border border-gray-100 p-4 flex items-center justify-center overflow-hidden relative">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
            />

            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded-lg">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
            {[product.thumbnail, ...(product.images || [])].map((img, index) => (
              <div
                key={index}
                className={`rounded-2xl border-2 p-1 cursor-pointer transition min-w-[70px]
                ${
                  selectedImage === img
                    ? "border-blue-600"
                    : "border-gray-200 hover:border-blue-400"
                }`}
              >
                <img
                  src={img}
                  onClick={() => setSelectedImage(img)}
                  className="w-16 h-16 rounded-xl object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE – DETAILS */}
        <div className="md:w-1/2 w-full flex flex-col gap-4">
          <span className="text-sm text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-lg w-max">
            {product.brand}
          </span>

          {/* Title + wishlist/share */}
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-3xl font-bold text-gray-900 leading-snug">
              {product.name}
            </h1>

            <div className="flex gap-2 mt-1">
              {/* Wishlist */}
              <button
                type="button"
                onClick={handleWishlistToggle}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
                aria-label="Add to wishlist"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
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
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
                aria-label="Share product"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
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
          <p className="text-gray-600 text-sm">
            Category:{" "}
            <span className="font-semibold">{product.category}</span> • SKU:{" "}
            <span className="font-semibold">{product.sku_id}</span>
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-1">
            <div className="flex text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  fill={i < Math.floor(rating) ? "currentColor" : "none"}
                  stroke="currentColor"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 1.5l2.9 6 6.1.9-4.5 4.6 1.1 6.3L10 16.5l-5.6 3 1.1-6.3-4.5-4.6 6.1-.9L10 1.5z" />
                </svg>
              ))}
            </div>
            <span className="font-medium text-gray-800">
              {rating.toFixed(1)}
            </span>
          </div>

          {/* Stock */}
          <p
            className={`text-sm font-semibold mt-1 ${
              inStock ? "text-green-600" : "text-red-600"
            }`}
          >
            {inStock ? "✔ In Stock" : "✘ Out Of Stock"}
          </p>

          {/* PRICE SECTION */}
          <div className="mt-3 bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <p className="text-3xl md:text-4xl font-bold text-red-600">
              {formatPrice(salePrice)}
            </p>

            {mrp > salePrice && (
              <div className="mt-1 flex flex-wrap items-baseline gap-2 text-sm md:text-base">
                <span className="line-through text-gray-400">
                  {formatPrice(mrp)}
                </span>
                {discountPercent > 0 && (
                  <span className="font-semibold text-green-600">
                    Save {discountPercent}%
                  </span>
                )}
              </div>
            )}
          </div>

          {/* VARIANTS (color + size) */}
          {variants.length > 0 && (
            <div className="mt-4 space-y-4">
              {uniqueColors.length > 0 && (
                <div>
                  <p className="font-semibold mb-2 text-gray-800 text-xs uppercase tracking-wide">
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
                          className={`w-9 h-9 rounded-full border flex items-center justify-center transition
                          ${
                            isSelected
                              ? "border-gray-900 ring-2 ring-gray-900"
                              : "border-gray-300 hover:border-gray-500"
                          }`}
                        >
                          <span
                            className="w-7 h-7 rounded-full"
                            style={{ backgroundColor: color?.toLowerCase() }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {uniqueSizes.length > 0 && (
                <div>
                  <p className="font-semibold mb-2 text-gray-800 text-xs uppercase tracking-wide">
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
                          className={`w-10 h-10 rounded-full border text-sm flex items-center justify-center transition
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
                      className="ml-4 text-xs underline text-gray-500 hover:text-gray-700"
                    >
                      CLEAR
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* BUTTONS */}
          <div className="mt-6 flex gap-4">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-2xl font-semibold hover:bg-blue-700 transition active:scale-95">
              Add to Cart
            </button>

            <button className="flex-1 bg-red-600 text-white py-3 rounded-2xl font-semibold hover:bg-red-700 transition active:scale-95">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      {product.description && (
        <div className="mt-12 bg-white p-8 rounded-3xl border border-gray-100">
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">
            Description
          </h2>
          <p className="leading-relaxed text-gray-700">
            {product.description}
          </p>
        </div>
      )}

      {/* RELATED */}
      <Relatedproducts products={products} currentProduct={product} />
    </div>
  );
}
