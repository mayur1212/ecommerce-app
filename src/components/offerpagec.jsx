import React from "react";
import { useNavigate, Link } from "react-router-dom";
import products from "../data/products.json";

/* ================= HELPERS (same logic as ProductsList) ================= */

const formatPrice = (price) => {
  const value = Number(price);
  return `₹${isNaN(value) ? "0" : value.toLocaleString()}`;
};

const getDisplayPrice = (product) => {
  if (product.discount_price != null) return product.discount_price;
  return product.price ?? 0;
};

const getDisplayMRP = (product) => product.price ?? null;

const isTwentyPercentOff = (product) => {
  if (!product.price || !product.discount_price) return false;
  return product.discount_price <= product.price * 0.8;
};

/* ================= COMPONENT ================= */

export default function OfferPageComponent() {
  const navigate = useNavigate();

  const offerProducts = products.filter(isTwentyPercentOff);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-red-600 font-semibold mb-4"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-extrabold text-gray-900">
          🎉 Offer – Flat 20% OFF on Products
        </h1>

        <p className="text-gray-600 mt-2">
          Selected products with minimum 20% discount
        </p>
      </div>

      {/* PRODUCTS GRID (SAME STYLE AS ProductsList) */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {offerProducts.length > 0 ? (
          offerProducts.map((product) => {
            const salePrice = getDisplayPrice(product);
            const mrp = getDisplayMRP(product);

            return (
              <Link
                key={product.id}
                to={`/shopping/${product.id}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-3 flex flex-col"
              >
                {/* IMAGE */}
                <div className="w-full aspect-[4/5] overflow-hidden rounded-lg mb-3 relative">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />

                  {/* OFFER BADGE */}
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-100 text-red-700">
                    20% OFF
                  </span>
                </div>

                {/* TITLE */}
                <h3 className="text-sm font-semibold line-clamp-2">
                  {product.name}
                </h3>

                {/* CATEGORY */}
                <p className="text-xs text-gray-500 mt-1">
                  {product.category}
                </p>

                {/* PRICE */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-base font-bold text-red-600">
                    {formatPrice(salePrice)}
                  </span>
                  {mrp && (
                    <span className="text-xs line-through text-gray-400">
                      {formatPrice(mrp)}
                    </span>
                  )}
                </div>
              </Link>
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No 20% OFF products available.
          </p>
        )}
      </div>
    </div>
  );
}
