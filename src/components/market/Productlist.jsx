// src/components/market/Productlist.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import products from "../../data/products.json";

const formatPrice = (price) => `₹${price.toLocaleString()}`;

// Total available quantity (from variants or product.stock)
const getTotalStock = (product) => {
  if (Array.isArray(product.variants) && product.variants.length > 0) {
    return product.variants.reduce(
      (sum, v) => sum + (v.stock ?? 0),
      0
    );
  }
  return product.stock ?? 0;
};

// Delivery label helper
const getDeliveryLabel = (product) => {
  const charge = product.delivery_charge;

  if (charge === 0) return "Free Delivery";
  if (typeof charge === "number") return `Delivery ₹${charge}`;
  return "Delivery info at checkout";
};

export default function Productlist() {
  const [wishlisted, setWishlisted] = useState({});

  const toggleWishlist = (id) => {
    setWishlisted((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Check stock (variants → product stock)
  const isInStock = (product) => {
    if (Array.isArray(product.variants) && product.variants.length > 0) {
      return product.variants.some((v) => (v.stock ?? 0) > 0);
    }
    return (product.stock ?? 0) > 0;
  };

  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.length > 0 ? (
        products.map((product) => {
          const inStock = isInStock(product);
          const isWish = !!wishlisted[product.id];

          // rating value (supports object or number, fallback 4.5)
          const ratingValue =
            product.rating?.stars ??
            product.rating?.value ??
            (typeof product.rating === "number" ? product.rating : null) ??
            4.5;

          const totalStock = getTotalStock(product);
          const deliveryLabel = getDeliveryLabel(product);

          return (
            <Link
              key={product.id}
              to={`/market/${product.id}`}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-3 flex flex-col"
            >
              {/* IMAGE WRAPPER WITH BADGES */}
              <div className="w-full aspect-[4/5] overflow-hidden rounded-lg mb-3 relative">
                <img
                  src={product.thumbnail || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* STOCK BADGE */}
                <span
                  className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold
                    ${
                      inStock
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {inStock ? "In Stock" : "Out of Stock"}
                </span>

                {/* WISHLIST HEART */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center shadow-sm hover:shadow-md transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill={isWish ? "red" : "none"}
                    stroke={isWish ? "red" : "currentColor"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                  </svg>
                </button>
              </div>

              {/* NAME */}
              <h3 className="text-sm font-semibold line-clamp-2">
                {product.name}
              </h3>

              {/* CATEGORY */}
              <p className="text-xs text-gray-500 mt-1">{product.category}</p>

              {/* PRICE + RATING */}
              <div className="flex items-center justify-between mt-2">
                <div>
                  {product.discount_price &&
                  product.discount_price < product.price ? (
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-red-600">
                        {formatPrice(product.discount_price)}
                      </span>
                      <span className="text-xs line-through text-gray-400">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-base font-bold text-red-600">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>

                {/* SINGLE GOLD STAR + RATING NUMBER */}
                <div className="flex items-center text-xs gap-1 text-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.402 8.168L12 18.896l-7.336 3.87 1.402-8.168L.132 9.211l8.2-1.193z" />
                  </svg>
                  <span className="font-medium">
                    {Number(ratingValue).toFixed(1)}
                  </span>
                </div>
              </div>

              {/* QUANTITY + DELIVERY STATUS UNDER PRICE/RATING */}
              <div className="mt-1 flex items-center justify-between text-[11px] text-gray-600">
                <span>
                  Qty:{" "}
                  {totalStock > 0
                    ? totalStock
                    : "Not specified"}
                </span>

                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
                  {deliveryLabel}
                </span>
              </div>
            </Link>
          );
        })
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No products available.
        </p>
      )}
    </div>
  );
}
