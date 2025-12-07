// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import BottomBar from "./components/BottomBar";
import Footer from "./components/Footer";
import LocationPopup from "./components/LocationPopup";
import SearchBar from "./components/SearchBar";
import { MapPin } from "lucide-react";

// Pages
import Home from "./pages/Home";
import Blog from "./pages/blog/Blog";
import BlogDetails from "./components/Blog/Blogdetails";
import Shopping from "./pages/shoppingp/Shoppingp";
import ProductsDetails from "./components/Shoping/ProductsDetailsp";

// Store
import Storep from "./pages/Storep/Storep";
import Storedetails from "./components/Store/Storedetails";

// ✅ Market
import Marketp from "./pages/marketp/marketp";
import MarketProductsdetails from "./components/market/Productsdetails";

// Simple placeholder Services page
function ServicesPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-2">Services</h1>
      <p className="text-gray-600 text-sm">Services page content goes here.</p>
    </div>
  );
}

// ================= MAIN LAYOUT =================
function MainAppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userLocation, setUserLocation] = useState("");
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  const navigate = useNavigate();

  const handleNavClick = (key) => {
    switch (key) {
      case "shopping":
        navigate("/shopping");
        break;
      case "market":
        navigate("/market");
        break;
      case "services":
        navigate("/services");
        break;
      case "store":
        navigate("/store");
        break;
      case "news":
        navigate("/blog");
        break;
      default:
        navigate("/");
    }
    setMobileOpen(false);
  };

  const navKeys = ["shopping", "market", "services", "store", "news"];

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Mobile Nav Tabs */}
      <div className="md:hidden w-full bg-white px-4 pb-4 pt-2">
        <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
          {navKeys.map((key) => (
            <button
              key={key}
              className="w-1/5 text-center py-2 rounded-lg hover:bg-gray-100 active:scale-95 transition"
              onClick={() => handleNavClick(key)}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowLocationPopup(true)}
          className="flex items-center gap-2 mt-5 bg-gray-100 w-full px-4 py-3 rounded-xl shadow-sm active:scale-95"
        >
          <MapPin size={18} className="text-red-600" />
          <span className="text-[13px] font-semibold text-gray-800">
            Deliver to: {userLocation || "Select location"}
          </span>
        </button>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden w-full sticky top-0 z-40 bg-white px-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <SearchBar />
          </div>
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

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden w-full bg-white border-b border-gray-200 shadow-sm">
          <nav className="flex flex-col py-2">
            {navKeys.map((key) => (
              <button
                key={key}
                onClick={() => handleNavClick(key)}
                className="px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100 active:bg-gray-200"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="flex w-full">
        <aside className="hidden md:block w-64 sticky top-16 h-[calc(100vh-4rem)] bg-white shadow-lg p-4 border-r">
          <Sidebar />
        </aside>

        <div className="flex-1 min-w-0">
          <div className="hidden lg:flex items-center w-full bg-gray-100 px-4 py-2 border border-gray-200 gap-4">
            <SearchBar />
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 shadow-sm">
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
              <span className="font-medium text-gray-700">Filter</span>
            </button>
          </div>

          <div className="px-4 pb-10">
            <Outlet />
          </div>
        </div>
      </div>

      <BottomBar />
      <Footer />

      {showLocationPopup && (
        <LocationPopup
          close={() => setShowLocationPopup(false)}
          setLocation={setUserLocation}
        />
      )}
    </main>
  );
}

// ================= MAIN APP =================
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainAppLayout />}>
        <Route index element={<Home />} />

        {/* Shopping */}
        <Route path="shopping" element={<Shopping />} />
        <Route path="shopping/:id" element={<ProductsDetails />} />

        {/* Store */}
        <Route path="store" element={<Storep />} />
        <Route path="store/:id" element={<Storedetails />} />

        {/* ✅ Market */}
        <Route path="market" element={<Marketp />} />
        <Route path="market/:id" element={<MarketProductsdetails />} />

        {/* Services */}
        <Route path="services" element={<ServicesPage />} />

        {/* Blog */}
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogDetails />} />
      </Route>
    </Routes>
  );
}
