// src/pages/shopping/Shopping.jsx
import React from "react";
import ProductsList from "../../components/Shoping/ProductsList";

export default function Shopping() {
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-bold">Shopping</h1>
      <p className="text-sm text-gray-600 mt-1">
        Explore trending products across beauty, electronics, fashion, home & fitness.
      </p>

      <ProductsList />
    </div>
  );
}
