// src/components/ProductCard.jsx
import React, { useState } from "react";

const PLACEHOLDER = "/mnt/data/35afd0b2-528f-45fe-931b-b4f576aa50b7.png";

export default function ProductCard({ product, onOpen }) {
  const [liked, setLiked] = useState(false); // ❤️ Wishlist state

  const priceRupees =
    product.priceAfterDiscount ??
    (product.priceCents
      ? product.priceCents / 100
      : product.price ?? 0);

  const ratingStars =
    typeof product.rating === "number"
      ? product.rating
      : product.rating?.stars ?? "—";

  const imgSrc = product.image || product.images?.[0] || PLACEHOLDER;

  const fmt = new Intl.NumberFormat("en-IN");

  return (
    <button
  onClick={onOpen}
  className="group bg-white rounded-2xl p-3 sm:p-4 shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1 cursor-pointer flex flex-col items-stretch text-left
             focus:outline-none focus:ring-0 focus:border-0 h-full min-h-[300px]"
>

      {/* IMAGE CONTAINER */}
      <div className="relative w-full overflow-hidden rounded-lg bg-slate-50 flex items-center justify-center">

        {/* ❤️ Wishlist Icon */}
        <div
          className="absolute top-3 right-3 z-10 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // opening popup रोकण्यासाठी
            setLiked(!liked);
          }}
        >
          {/* Heart SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={liked ? "#df3c3c" : "white"}
            stroke={liked ? "#df3c3c" : "gray"}
            strokeWidth="1.5"
            className="w-6 h-6 drop-shadow-md rounded-full"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.8 8.4c0 4.6-6.3 8.3-9.8 12-3.5-3.7-9.8-7.4-9.8-12C2.2 5.5 4.4 3.2 7.2 3.2c1.7 0 3.3.9 4.2 2.3 1-1.4 2.5-2.3 4.2-2.3 2.8 0 5 2.3 5 5.2z"
            />
          </svg>
        </div>

        {/* PRODUCT IMAGE */}
        <div className="w-full aspect-[4/3] flex items-center justify-center">
          <img
            src={imgSrc}
            alt={product.name}
            className="w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {product.priceAfterDiscount && product.priceCents && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded-md">
            Sale
          </div>
        )}
      </div>

      {/* INFO SECTION */}
      <div className="mt-3 sm:mt-4 flex flex-col gap-2">

        {/* PRODUCT NAME – 1 line only */}
        <h3 className="text-sm sm:text-base font-semibold text-slate-800 line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-center justify-between gap-2">
          <div className="text-sky-600 font-bold text-base sm:text-lg">
            ₹{fmt.format(priceRupees)}
          </div>

          <div className="flex items-center gap-1 text-xs sm:text-sm text-slate-500">
            <span>{ratingStars}</span>
            <svg width="12" height="12" fill="currentColor" className="text-yellow-400">
              <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847L19.335 24 12 19.897 4.665 24 6 15.27 0 9.423l8.332-1.268z" />
            </svg>
          </div>
        </div>

        {/* BRAND + CATEGORY */}
        <div className="text-xs text-slate-500 line-clamp-1 sm:block hidden">
          {product.brand ? `${product.brand} • ` : ""}
          {product.category}
        </div>

        {/* ADD TO CART BUTTON */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            alert(`${product.name} added to cart!`);
          }}
          className="mt-2 text-white text-sm font-semibold py-2 rounded-xl transition"
          style={{ backgroundColor: "#df3c3c" }}
        >
          Add to Cart
        </button>
      </div>
    </button>
  );
}
