import React from "react";

import ShoppingBanner from "../../components/Shoping/shoppingbanner";
import ProductsList from "../../components/Shoping/ProductsList";
import TrendingProducts from "../../components/Shoping/TrendingProducts";
import HeroOfferBanner from "../../components/Shoping/HeroOfferBanner";

// 🔥 CATEGORY SECTION
import CategorySection from "../../components/Category/CategorySection";

export default function Shoppingp() {
  return (
    <div className="w-full px-2 sm:px-4 lg:px-6 py-4 space-y-4">

      {/* TOP BANNERS */}
      <ShoppingBanner />
      <HeroOfferBanner />

      {/* 🔥 CATEGORY SECTION (HeroOffer ke niche) */}
      <CategorySection />

      {/* TRENDING */}
      <TrendingProducts />

      {/* HEADING */}
      <h1 className="text-lg sm:text-xl font-bold mt-4">
        Shopping
      </h1>

      <p className="text-sm text-gray-600 mt-1 mb-4">
        Explore trending products across beauty, electronics, fashion, home & fitness.
      </p>

      {/* PRODUCTS */}
      <ProductsList />
    </div>
  );
}
