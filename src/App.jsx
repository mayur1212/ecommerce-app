// src/App.jsx
import React, { useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import BottomBar from "./components/BottomBar";
import Footer from "./components/Footer";
import LocationPopup from "./components/LocationPopup";
import { MapPin } from "lucide-react";
import SearchBar from "./components/SearchBar";

import Home from "./pages/Home";
import Blog from "./pages/blog/Blog";
import BlogDetails from "./components/Blog/Blogdetails";
import Shopping from "./pages/shoppingp/Shoppingp"; // 👈 SHOPPING PAGE
import ProductsDetails from "./components/Shoping/ProductsDetailsp"; // 👈 PRODUCT DETAILS PAGE

import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";

// बाकी pages आत्तासाठी simple placeholders
function MarketPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-2">Market</h1>
      <p className="text-gray-600 text-sm">Market page content goes here.</p>
    </div>
  );
}

function ServicesPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-2">Services</h1>
      <p className="text-gray-600 text-sm">
        Services page content goes here.
      </p>
    </div>
  );
}

function GroceryPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-2">Grocery</h1>
      <p className="text-gray-600 text-sm">
        Grocery page content goes here.
      </p>
    </div>
  );
}

// ================= MAIN LAYOUT (HEADER + SIDEBAR कायम) =================
function MainAppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userLocation, setUserLocation] = useState("");
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname;

  // URL वरून active tab शोधतो
  const getActiveFromPath = (path) => {
    if (path === "/" || path.startsWith("/shopping")) return "shopping";
    if (path.startsWith("/market")) return "market";
    if (path.startsWith("/services")) return "services";
    if (path.startsWith("/grocery")) return "grocery";
    if (path.startsWith("/blog")) return "news"; // /blog आणि /blog/:slug
    return "shopping";
  };

  const activePage = getActiveFromPath(pathname);

  // bottom nav + sidebar दोघांसाठी common handler
  const handleNavClick = (key) => {
    switch (key) {
      case "shopping":
        navigate("/shopping"); // 👈 Shopping = /shopping
        break;
      case "market":
        navigate("/market");
        break;
      case "services":
        navigate("/services");
        break;
      case "grocery":
        navigate("/grocery");
        break;
      case "news":
        navigate("/blog");
        break;
      default:
        navigate("/");
    }
    setMobileOpen(false);
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      {/* HEADER - वरचा भाग */}
      <Header
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        location={userLocation}
        setLocation={setUserLocation}
      />

      {/* ===== MOBILE NAV + DELIVER TO ===== */}
      <div className="md:hidden w-full bg-white px-4 pb-4 pt-2">
        <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
          <button
            className="w-1/5 text-center py-2 rounded-lg hover:bg-blue-100 hover:text-blue-700 active:scale-95 transition"
            onClick={() => handleNavClick("shopping")}
          >
            Shopping
          </button>

          <button
            className="w-1/5 text-center py-2 rounded-lg hover:bg-green-100 hover:text-green-700 active:scale-95 transition"
            onClick={() => handleNavClick("market")}
          >
            Market
          </button>

          <button
            className="w-1/5 text-center py-2 rounded-lg hover:bg-orange-100 hover:text-orange-700 active:scale-95 transition"
            onClick={() => handleNavClick("services")}
          >
            Services
          </button>

          <button
            className="w-1/5 text-center py-2 rounded-lg hover:bg-red-100 hover:text-red-700 active:scale-95 transition"
            onClick={() => handleNavClick("grocery")}
          >
            Grocery
          </button>

          {/* NEWS -> BLOG */}
          <button
            className="w-1/5 text-center py-2 rounded-lg hover:bg-yellow-100 hover:text-yellow-700 active:scale-95 transition"
            onClick={() => handleNavClick("news")}
          >
            News
          </button>
        </div>

        <button
          onClick={() => setShowLocationPopup(true)}
          className="flex items-center gap-2 mt-5 bg-gray-100 w-full px-4 py-3 rounded-xl shadow-sm active:scale-95"
        >
          <MapPin size={18} className="text-red-600" />
          <span className="text-[13px] font-semibold text-gray-800">
            Deliver to: {userLocation ? userLocation : "Select location"}
          </span>
        </button>
      </div>

      {/* ===== MOBILE SEARCH (sticky) ===== */}
      <div className="md:hidden w-full sticky top-0 z-40 bg-white px-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <SearchBar />
          </div>

          <button className="p-3 rounded-xl border border-gray-300 bg-white shadow-sm active:scale-95 transition">
            {/* filter icon */}
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
          </button>
        </div>
      </div>

      {/* ✅ MOBILE DROPDOWN NAV - SEARCH/FILTER च्या खाली */}
      {mobileOpen && (
        <div className="md:hidden w-full bg-white border-b border-gray-200 shadow-sm">
          <nav className="flex flex-col py-2">
            {[
              { key: "shopping", label: "Shopping" },
              { key: "market", label: "Market" },
              { key: "services", label: "Services" },
              { key: "grocery", label: "Grocery" },
              { key: "news", label: "News" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className="px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100 active:bg-gray-200"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* ===== MAIN LAYOUT ===== */}
      <div className="flex w-full">
        {/* Sidebar - sticky राहणार */}
        <aside className="hidden md:block w-64 sticky top-16 h-[calc(100vh-4rem)] bg-white shadow-lg p-4 border-r">
          <Sidebar activePage={activePage} onChangePage={handleNavClick} />
        </aside>

        {/* ⭐ MAIN CONTENT - इथे route नुसार बदल होईल ⭐ */}
        <div className="flex-1 min-w-0">
          {/* Desktop Search With Filter */}
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4h18M6 12h12M10 20h4"
                />
              </svg>
              <span className="font-medium text-gray-700">Filter</span>
            </button>
          </div>

          {/* इथे nested routes render होतील */}
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

// ================== MAIN APP (ROUTER) ==================
export default function App() {
  return (
    <Routes>
      {/* Layout route */}
      <Route path="/" element={<MainAppLayout />}>
        {/* Home ("/") */}
        <Route index element={<Home />} />

        {/* SHOPPING PAGE -> /shopping */}
        <Route path="shopping" element={<Shopping />} />

        {/* PRODUCT DETAILS PAGE -> /shopping/:id */}
        <Route path="shopping/:id" element={<ProductsDetails />} />

        {/* बाकी pages */}
        <Route path="market" element={<MarketPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="grocery" element={<GroceryPage />} />

        {/* BLOG LIST PAGE -> /blog */}
        <Route path="blog" element={<Blog />} />

        {/* BLOG DETAILS PAGE -> /blog/:slug */}
        <Route path="blog/:slug" element={<BlogDetails />} />
      </Route>
    </Routes>
  );
}
