// src/pages/Home.jsx
import React, { useState } from "react";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import ProductList from "../components/ProductList";

export default function Home() {
  const [category, setCategory] = useState("all");

  return (
    <>
      {/* Banner */}
      <Banner />

      {/* Products Section */}
      <div className="pt-4 pb-4">
        <Categories onSelect={setCategory} activeKey={category} />
        <ProductList category={category} />
      </div>
    </>
  );
}
