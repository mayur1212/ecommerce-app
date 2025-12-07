// src/components/Store/Storelist.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import products from "../../data/products.json";

const formatPrice = (price) => `₹${price.toLocaleString()}`;

const getStars = (rating = 4) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= rating ? "text-yellow-500" : "text-gray-300"}>
        ★
      </span>
    );
  }
  return stars;
};

export default function Storelist() {
  const [wishlisted, setWishlisted] = useState({});

  const toggleWishlist = (id) => {
    setWishlisted((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Check stock from variants → product stock
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

          return (
            <Link
              key={product.id}
              to={`/store/${product.id}`}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-3 flex flex-col"
            >
              {/* IMAGE + BADGES */}
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

              {/* PRODUCT NAME */}
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

                <div className="text-xs">
                  {getStars(product.rating || 4)}
                </div>
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
