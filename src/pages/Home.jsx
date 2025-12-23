// src/pages/Home.jsx
import React, { useState } from "react";
import Banner from "../components/Banner";
import HeroOfferBanner from "../components/Shoping/HeroOfferBanner";

import ProductList from "../components/Shoping/ProductsList";

export default function Home() {
  const [category, setCategory] = useState("all");

  return (
    <>
      {/* Top Banner */}
      <Banner />

      {/* Offer Banner */}
      <HeroOfferBanner />


      {/* Products Section */}
      <div className="pt-4 pb-1">
        <h1 className="text-xl sm:text-2xl font-bold">Shopping</h1>

        <p className="text-sm text-gray-600 mt-1 mb-6">
          Explore trending products across beauty, electronics, fashion, home & fitness.
        </p>

        <ProductList category={category} />
      </div>
    </>
  );
}
