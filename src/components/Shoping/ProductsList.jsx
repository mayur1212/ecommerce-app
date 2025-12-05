// src/components/Shoping/ProductsList.jsx
import React from "react";
import { Link } from "react-router-dom";
import products from "../../data/products.json"; // ✅ JSON default import

const formatPrice = (priceCents) => `₹${(priceCents / 100).toFixed(0)}`;

export default function ProductsList() {
  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/shopping/${product.id}`}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-3 flex flex-col"
        >
          <div className="w-full aspect-[4/5] overflow-hidden rounded-lg mb-3">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <h3 className="text-sm font-semibold line-clamp-2">
            {product.name}
          </h3>

          <p className="text-xs text-gray-500 mt-1">
            {product.category} • {product.subCategory}
          </p>

          <div className="flex items-center justify-between mt-2">
            <span className="text-base font-bold text-red-600">
              {formatPrice(product.priceCents)}
            </span>

            <span className="text-xs text-yellow-600">
              ⭐ {product.rating.stars} ({product.rating.count})
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
