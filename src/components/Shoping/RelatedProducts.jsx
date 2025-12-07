// src/components/shopping/RelatedProducts.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function RelatedProducts({ products = [], currentProduct = {} }) {
  if (!currentProduct.id) return null; // Safety check

  // Filter related products (same category, not the current one)
  const related = products
    .filter(
      (p) =>
        p.id !== currentProduct.id &&
        p.category === currentProduct.category
    )
    .slice(0, 4); // Show max 4

  if (!related.length) return null;

  const formatPrice = (price) => `₹${price?.toLocaleString() || "0"}`;

  return (
    <div className="mt-10">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        Related Products
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((product) => {
          const name = product.name || "Unnamed Product";
          const image = product.thumbnail || product.image || "/placeholder.png";

          const price = product.discount_price || product.price || 0;
          const originalPrice =
            product.discount_price && product.discount_price < product.price
              ? product.price
              : null;

          return (
            <Link
              key={product.id}
              to={`/shopping/${product.id}`}
              className="block bg-white rounded-2xl border border-gray-100 hover:shadow-md transition overflow-hidden"
            >
              <div className="w-full h-32 bg-gray-50 overflow-hidden">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-3 flex flex-col gap-1">
                <h3 className="text-sm font-semibold line-clamp-2">{name}</h3>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-red-600">
                    {formatPrice(price)}
                  </span>
                  {originalPrice && (
                    <span className="text-[10px] line-through text-gray-400">
                      {formatPrice(originalPrice)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
