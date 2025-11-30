// src/components/ProductCard.jsx
import React from "react";

const PLACEHOLDER = "/mnt/data/35afd0b2-528f-45fe-931b-b4f576aa50b7.png";

export default function ProductCard({ product, onOpen }) {
  const priceRupees =
    product.priceAfterDiscount ??
    (product.priceCents ? product.priceCents / 100 : product.price ?? 0);

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
                 focus:outline-none focus:ring-2 focus:ring-sky-400 h-full min-h-[300px]"
      aria-label={`Open ${product.name}`}
    >
      {/* IMAGE */}
      <div className="relative w-full overflow-hidden rounded-lg bg-slate-50 flex items-center justify-center">
        <div className="w-full aspect-[4/3] flex items-center justify-center">
          <img
            src={imgSrc}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {product.priceAfterDiscount && product.priceCents && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded-md">
            Sale
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="mt-3 sm:mt-4 flex flex-col gap-2">
        
        {/* ⭐ PRODUCT NAME — ONLY ONE LINE */}
        <h3 className="text-sm sm:text-base font-semibold text-slate-800 line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-center justify-between gap-2">
          <div className="text-sky-600 font-bold text-base sm:text-lg">
            ₹{fmt.format(priceRupees)}
          </div>

          <div className="flex items-center gap-1 text-xs sm:text-sm text-slate-500">
            <span>{ratingStars}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-yellow-400"
              aria-hidden
            >
              <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847L19.335 24 12 19.897 4.665 24 6 15.27 0 9.423l8.332-1.268z" />
            </svg>
          </div>
        </div>

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
