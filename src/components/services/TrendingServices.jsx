import React from "react";
import { Link } from "react-router-dom";
import services from "../../data/services.json";

/* ================= CONFIG ================= */

const OFFER_DISCOUNT = 20; // 20% OFF

/* ================= HELPERS ================= */

// trending score
const getTrendingScore = (s) => {
  const bookings = s?.bookings ?? 0;
  const views = s?.views ?? 0;

  const rating =
    s?.rating?.stars ??
    s?.rating?.value ??
    (typeof s?.rating === "number" ? s.rating : 4.5);

  return bookings * 3 + views + rating * 10;
};

// discounted price
const getDiscountedPrice = (price) => {
  const value = Number(price);
  if (!value || isNaN(value)) return 0;
  return Math.round(value * (1 - OFFER_DISCOUNT / 100));
};

// formatter
const formatPrice = (price) => {
  const value = Number(price);
  return `₹${isNaN(value) ? "0" : value.toLocaleString()}`;
};

/* ================= COMPONENT ================= */

export default function TrendingServices() {
  const trending = Array.isArray(services)
    ? [...services]
        .sort((a, b) => getTrendingScore(b) - getTrendingScore(a))
        .slice(0, 6)
    : [];

  if (!trending.length) return null;

  return (
    <div className="mb-10">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">🔥 Trending Services</h2>
        <span className="text-xs text-gray-500">
          Most booked today
        </span>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {trending.map((service) => {
          const basePrice =
            service?.discount_price ??
            service?.price ??
            0;

          const finalPrice = getDiscountedPrice(basePrice);

          return (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              className="relative bg-white rounded-lg border hover:shadow-md transition p-2"
            >
              {/* IMAGE */}
              <div className="relative aspect-[4/5] mb-2 overflow-hidden rounded-md bg-gray-100">
                <img
                  src={
                    service?.thumbnail ||
                    service?.image ||
                    "/images/placeholder-service.jpg"
                  }
                  alt={service?.name || "Service"}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />

                {/* OFFER BADGE */}
                <span className="absolute bottom-2 left-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {OFFER_DISCOUNT}% OFF · Today
                </span>
              </div>

              {/* TITLE */}
              <p className="text-xs font-semibold line-clamp-2">
                {service?.name || "Unnamed Service"}
              </p>

              {/* PRICE */}
              <div className="mt-1">
                <p className="text-sm font-bold text-red-600">
                  {formatPrice(finalPrice)}
                </p>

                {basePrice > finalPrice && (
                  <div className="flex items-center gap-1 text-[11px] text-gray-400">
                    <span className="line-through">
                      {formatPrice(basePrice)}
                    </span>
                    <span className="text-green-600 font-semibold">
                      ({OFFER_DISCOUNT}% OFF)
                    </span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
