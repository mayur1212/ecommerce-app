import React from "react";
import ProductsList from "../../components/Shoping/ProductsList";
import TrendingProducts from "../../components/Shoping/TrendingProducts";
import HeroOfferBanner from "../../components/Shoping/HeroOfferBanner";

export default function Shopping() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-bold">
        Shopping
      </h1>

      <p className="text-sm text-gray-600 mt-1 mb-4">
        Explore trending products across beauty, electronics, fashion, home & fitness.
      </p>

      {/* HERO OFFER */}
      <HeroOfferBanner />

      {/* TRENDING */}
      <TrendingProducts />

      {/* ALL PRODUCTS */}
      <ProductsList />
    </div>
  );
}
