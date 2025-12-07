// src/pages/marketp/marketp.jsx
import React from "react";
import Productlist from "../../components/market/Productlist";

export default function Marketp() {
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-bold">Market</h1>
      <p className="text-sm text-gray-600 mt-1">
        Discover deals and offers from multiple sellers in our marketplace.
      </p>

      <Productlist />
    </div>
  );
}
