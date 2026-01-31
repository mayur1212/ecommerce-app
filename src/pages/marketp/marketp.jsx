import React from "react";

/* MARKET COMPONENTS */
import MarketBanner from "../../components/market/MarketBanner";
import MarketHeroOfferBanner from "../../components/market/MarketHeroOfferBanner";
import TrendingProducts from "../../components/market/TrendingProducts";
import Productlist from "../../components/market/Productlist";
import CategorySection from "../../components/Category/CategorySection";

/* OPTIONAL: CATEGORY (agar market me bhi chahiye) */
// import CategorySection from "../../components/Category/CategorySection";

export default function Marketp() {
  return (
    <div className="w-full px-2 sm:px-4 lg:px-6 py-4 space-y-4">

      {/* 🔥 TOP MARKET BANNERS */}
      <MarketBanner />
      <MarketHeroOfferBanner />
        <CategorySection />

      {/* 🔥 CATEGORY SECTION (optional – Shopping jaisa) */}
      {/* <CategorySection /> */}

      {/* 🔥 TRENDING PRODUCTS */}
      <TrendingProducts />

      {/* HEADING */}
      <h1 className="text-lg sm:text-xl font-bold mt-4">
        Market
      </h1>

      <p className="text-sm text-gray-600 mt-1 mb-4">
        Discover deals and offers from multiple sellers in our marketplace.
      </p>

      {/* ALL MARKET PRODUCTS */}
      <Productlist />
    </div>
  );
}
