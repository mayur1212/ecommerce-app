// src/pages/Home.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";



export default function Home() {
  const [category, setCategory] = useState("all");

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Banner — pass images explicitly */}
      <Banner />

      {/* Categories — pass selected category as activeKey */}
      <Categories onSelect={setCategory} activeKey={category} />

      {/* Product grid */}
      <div className="flex-1">
        <ProductList category={category} />
      </div>

      <Footer />
    </main>
  );
}
