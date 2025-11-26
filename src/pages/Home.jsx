// src/pages/Home.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const [category, setCategory] = useState("all");

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex w-full">
        {/* Sticky Sidebar */}
        <aside className="hidden md:block w-64 sticky top-16 h-[calc(100vh-4rem)] bg-white shadow-lg p-4 border-r">
          <Sidebar />
        </aside>

        <div className="flex-1 w-full px-3 md:px-0 md:max-w-[1100px] xl:max-w-[1200px] mx-auto">

          {/* ⭐ NEW — Sticky Search + Filter Header (Desktop Only) */}
          <div className="hidden lg:flex items-center w-full bg-gray-100 px-4 py-2 
    border border-gray-200 focus-within:border-blue-500 focus-within:shadow-sm gap-4">



  {/* Search Box */}
  <div className="flex items-center w-full bg-gray-100 px-4 py-2 
      border border-black border-2 rounded-xl focus-within:border-blue-500 focus-within:shadow-sm">

    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="gray"
      className="w-5 h-5 mr-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35m1.1-5.4a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
      />
    </svg>

    <input
      type="text"
      placeholder="Search for products..."
      className="w-full bg-transparent focus:outline-none text-gray-700"
    />
</div>



  {/* Filter Button */}
  <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 
      bg-white hover:bg-gray-100 transition-all shadow-sm hover:shadow-md">

    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="gray"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 4h18M6 12h12M10 20h4"
      />
    </svg>

    <span className="font-medium text-gray-700">Filter</span>
  </button>
</div>

          {/* ⭐ END */}

          <Banner />

          <div className="p-4">
            <Categories onSelect={setCategory} activeKey={category} />
            <ProductList category={category} />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
