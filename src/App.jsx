// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";

/* ================= COMPONENTS ================= */
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import BottomBar from "./components/BottomBar";
import Footer from "./components/Footer";
import LocationPopup from "./components/LocationPopup";
import SearchBar from "./components/SearchBar";
import { MapPin, SlidersHorizontal } from "lucide-react";

/* ================= PAGES ================= */
import Home from "./pages/Home";
import Blog from "./pages/blog/Blog";
import BlogDetails from "./components/Blog/Blogdetails";

import Shopping from "./pages/shoppingp/Shoppingp";
import ProductsDetails from "./components/Shoping/ProductsDetailsp";
import SellerPage from "./pages/shoppingp/SellerPage";

import Storep from "./pages/Storep/Storep";
import Storedetails from "./components/Store/Storedetails";

import Marketp from "./pages/marketp/marketp";
import MarketProductsdetails from "./components/market/Productsdetails";

/* ====== E-COMMERCE FLOW ====== */
import CartPage from "./pages/CartP/CartPage";
import CheckoutPage from "./pages/CheckoutP/CheckoutPage";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import MyOrders from "./pages/MyOrders/MyOrders";

/* ================= CONTEXT ================= */
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";

import OfferPagee from "./pages/offerpagee/offerpagee";

/* ================= SERVICES PAGE ================= */
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

/* ================= MAIN LAYOUT ================= */
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

      {/* ========== MOBILE NAV TABS ========== */}
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

      {/* ========== MOBILE SEARCH + FILTER ========== */}
      <div className="md:hidden w-full sticky top-0 z-40 bg-white px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <SearchBar />
          </div>

          <button
            onClick={() => console.log("Open filter modal")}
            className="p-2 rounded-xl bg-gray-100 active:scale-95 transition"
          >
            <SlidersHorizontal size={20} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* ========== MOBILE DRAWER ========== */}
      {mobileOpen && (
        <div className="md:hidden w-full bg-white border-b border-gray-200 shadow-sm">
          <nav className="flex flex-col py-2">
            {navKeys.map((key) => (
              <button
                key={key}
                onClick={() => handleNavClick(key)}
                className="px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* ========== DESKTOP LAYOUT ========== */}
      <div className="flex w-full">
        <aside className="hidden md:block w-64 sticky top-16 h-[calc(100vh-4rem)] bg-white shadow-lg p-4 border-r">
          <Sidebar />
        </aside>

        <div className="flex-1 min-w-0">
          {/* DESKTOP SEARCH + FILTER */}
          <div className="hidden lg:flex items-center w-full bg-gray-100 px-4 py-2 border border-gray-200 gap-2">
  <div className="flex-1">
    <SearchBar />
  </div>

  <button
  onClick={() => console.log("Open filter modal")}
  className="
    h-[48px]        /* ⬅️ slightly smaller */
    px-3
    flex items-center justify-center
    rounded-xl
    bg-white
    border border-zinc-400
    hover:bg-gray-50
    transition
  "
>
  <SlidersHorizontal size={18} className="text-gray-700" />
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

/* ================= MAIN APP ================= */
export default function App() {
  return (
    <CartProvider>
      <OrderProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 2000,
            style: {
              borderRadius: "14px",
              background: "#111",
              color: "#fff",
              fontWeight: "500",
            },
          }}
        />

        <Routes>
          <Route path="/" element={<MainAppLayout />}>
            <Route index element={<Home />} />

            <Route path="shopping" element={<Shopping />} />
            <Route path="shopping/:id" element={<ProductsDetails />} />
            <Route path="seller/:sellerSlug" element={<SellerPage />} />

            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="order-success/:id" element={<OrderSuccess />} />
            <Route path="my-orders" element={<MyOrders />} />

            <Route path="store" element={<Storep />} />
            <Route path="store/:id" element={<Storedetails />} />

            <Route path="market" element={<Marketp />} />
            <Route path="market/:id" element={<MarketProductsdetails />} />

            <Route path="services" element={<ServicesPage />} />

            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogDetails />} />
            <Route path="/offerpage" element={<OfferPagee />} />
          </Route>
        </Routes>
      </OrderProvider>
    </CartProvider>
  );
}
