import React, { useState } from "react";
import { Link } from "react-router-dom";
import services from "../../data/products.json"; // ⬅️ services data


/* ================= HELPERS ================= */

const formatPrice = (price) => `₹${Number(price || 0).toLocaleString()}`;

/* ================= COMPONENT ================= */

export default function ServiceList() {
  const [wishlisted, setWishlisted] = useState({});

  const toggleWishlist = (id) => {
    setWishlisted((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {services.length > 0 ? (
        services.map((service) => {
          const isWish = !!wishlisted[service.id];

          const ratingValue =
            service.rating?.stars ??
            service.rating?.value ??
            (typeof service.rating === "number" ? service.rating : 4.5);

          return (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-3 flex flex-col"
            >
              {/* IMAGE */}
              <div className="w-full aspect-[4/5] overflow-hidden rounded-lg mb-3 relative">
                <img
                  src={service.thumbnail || service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />

                {/* SERVICE TYPE BADGE */}
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-100 text-indigo-700">
                  Service
                </span>

                {/* WISHLIST */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(service.id);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center shadow-sm hover:shadow-md transition"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill={isWish ? "red" : "none"}
                    stroke={isWish ? "red" : "currentColor"}
                    strokeWidth="2"
                  >
                    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                  </svg>
                </button>
              </div>

              {/* TITLE */}
              <h3 className="text-sm font-semibold line-clamp-2">
                {service.name}
              </h3>

              {/* CATEGORY */}
              <p className="text-xs text-gray-500 mt-1">
                {service.category}
              </p>

              {/* PRICE + RATING */}
              <div className="flex items-center justify-between mt-2">
                <span className="text-base font-bold text-red-600">
                  {formatPrice(service.price)}
                </span>

                <div className="flex items-center text-xs gap-1 text-gray-800">
                  <svg
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

              {/* DURATION / MODE */}
              <div className="mt-1 flex items-center justify-between text-[11px] text-gray-600">
                <span>
                  ⏱ {service.duration || "Flexible"}
                </span>

                <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-medium">
                  {service.mode || "On-Demand"}
                </span>
              </div>
            </Link>
          );
        })
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No services available.
        </p>
      )}
    </div>
  );
}
