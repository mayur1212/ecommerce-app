// src/components/market/Productlist.jsx
import React from "react";
import { Link } from "react-router-dom";
import products from "../../data/products.json";

const formatPrice = (price) => `₹${price.toLocaleString()}`;

const getStars = (rating = 4) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={i <= rating ? "text-yellow-500" : "text-gray-300"}
      >
        ★
      </span>
    );
  }
  return stars;
};

export default function Productlist() {
  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.length > 0 ? (
        products.map((product) => (
          <Link
            key={product.id}
            to={`/market/${product.id}`} // 👈 Market details route
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-3 flex flex-col"
          >
            <div className="w-full aspect-[4/5] overflow-hidden rounded-lg mb-3">
              <img
                src={product.thumbnail || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-sm font-semibold line-clamp-2">
              {product.name}
            </h3>

            <p className="text-xs text-gray-500 mt-1">{product.category}</p>

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
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No products available.
        </p>
      )}
    </div>
  );
}
