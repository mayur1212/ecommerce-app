// src/components/shopping/RelatedProducts.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function RelatedProducts({ products, currentProduct }) {
  const related = products
    .filter(
      (p) =>
        p.id !== currentProduct.id &&
        p.category === currentProduct.category
    )
    .slice(0, 4);

  if (!related.length) return null;

  return (
    <div className="mt-10">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        Related Products
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((product) => (
          <Link
            key={product.id}
            to={`/shopping/${product.id}`}
            className="block bg-white rounded-2xl border border-gray-100 hover:shadow-md transition overflow-hidden"
          >
            <div className="w-full h-32 bg-gray-50 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold line-clamp-2">
                {product.name}
              </h3>
              <p className="text-[11px] text-gray-500 mt-1">
                ₹{(product.priceCents / 100).toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
