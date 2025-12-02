// src/pages/Home.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import BottomBar from "../components/BottomBar";
import LocationPopup from "../components/LocationPopup";
import { MapPin } from "lucide-react";

// ⭐ NEW — IMPORT SEARCH BAR WITH HISTORY
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [category, setCategory] = useState("all");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Header
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        location={location}
        setLocation={setLocation}
      />

      {/* ===== MOBILE NAV + DELIVER TO ===== */}
      <div className="md:hidden w-full bg-white px-4 pb-4 pt-2">
        
        {/* Bottom Nav */}
        <div className="flex justify-between items-center text-xs font-medium text-gray-600">
          <div className="flex flex-col items-center w-1/5">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.5l9-6 9 6V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.5z" />
            </svg>
            <span className="text-purple-600 mt-1">Home</span>
          </div>

          <div className="flex flex-col items-center w-1/5">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 10-8 0v4M5 11h14l-1 9H6l-1-9z" />
            </svg>
            <span className="mt-1">Shopping</span>
          </div>

          <div className="flex flex-col items-center w-1/5">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18l-1 14H4L3 4zM8 4V2h8v2" />
            </svg>
            <span className="mt-1">Market</span>
          </div>

          <div className="flex flex-col items-center w-1/5">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 11l2-2m0 0l3-3m-3 3h4m12 8l-2 2m0 0l-3 3m3-3h-4M10 6h4M6 12h12M10 18h4" />
            </svg>
            <span className="mt-1">Services</span>
          </div>

          <div className="flex flex-col items-center w-1/5">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18l-2 12H5L3 7zM9 7V4h6v3" />
            </svg>
            <span className="mt-1">Grocery</span>
          </div>
        </div>

        {/* Deliver To */}
        <button
          onClick={() => setShowLocationPopup(true)}
          className="flex items-center gap-2 mt-5 bg-gray-100 w-full px-4 py-3 rounded-xl shadow-sm active:scale-95"
        >
          <MapPin size={18} className="text-red-600" />
          <span className="text-[13px] font-semibold text-gray-800">
            Deliver to: {location ? location : "Select location"}
          </span>
        </button>
      </div>

      {/* ===== MOBILE SEARCH (NEW — SHOW DROPDOWN) ===== */}
      {/* ===== MOBILE SEARCH (FIXED — SEARCH + FILTER IN ONE ROW) ===== */}
<div className="md:hidden w-full sticky top-0 z-40 bg-white px-4">
  <div className="flex items-center gap-3">
    
    {/* Search Bar */}
    <div className="flex-1">
      <SearchBar />
    </div>

    {/* Filter Icon Button */}
    <button className="p-3 rounded-xl border border-gray-300 bg-white shadow-sm active:scale-95 transition">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="gray"
        className="w-5 h-5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M6 12h12M10 20h4" />
      </svg>
    </button>

  </div>
</div>



      

      {/* Mobile Hamburger Dropdown */}
      {mobileOpen && (
        <div className="md:hidden w-full bg-white border-t border-b border-gray-200 px-4 py-3">
          <nav className="flex flex-col gap-2">
            {["Home", "Shopping", "Market", "Services", "Grocery", "News"].map(
              (item) => (
                <button
                  key={item}
                  className="text-left py-2 px-1 rounded-md text-gray-800 hover:bg-gray-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {item}
                </button>
              )
            )}
          </nav>
        </div>
      )}

      <div className="flex w-full">
        
        {/* Sidebar */}
        <aside className="hidden md:block w-64 sticky top-16 h-[calc(100vh-4rem)] bg-white shadow-lg p-4 border-r">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          
          {/* ⭐ Desktop Search With Dropdown ⭐ */}
          <div className="hidden lg:flex items-center w-full bg-gray-100 px-4 py-2 border border-gray-200 gap-4">
            <SearchBar />

            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M6 12h12M10 20h4" />
              </svg>
              <span className="font-medium text-gray-700">Filter</span>
            </button>
          </div>

          {/* Banner */}
          <Banner />

          {/* Products */}
          <div className="pt-4 pb-4">
            <Categories onSelect={setCategory} activeKey={category} />
            <ProductList category={category} />
          </div>
        </div>
      </div>

      <BottomBar />
      <Footer />

      {/* Location Popup */}
      {showLocationPopup && (
        <LocationPopup
          close={() => setShowLocationPopup(false)}
          setLocation={setLocation}
        />
      )}
    </main>
  );
}
