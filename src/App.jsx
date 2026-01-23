// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

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

import Account from "./pages/Account/Account";
import Chat from "./pages/Chat/Chat";
import Videos from "./pages/Videos/Videos";
import Live from "./pages/Live/Live";
import Reels from "./pages/Reels/ReelsList";
import ReelDetails from "./pages/Reels/ReelDetails";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import SubCategoryPage from "./pages/SubCategoryPage/SubCategoryPage";
import ChildCategoryPage from "./pages/ChildCategoryPage/ChildCategoryPage";


import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";







/* ====== E-COMMERCE FLOW ====== */
import CartPage from "./pages/CartP/CartPage";
import CheckoutPage from "./pages/CheckoutP/CheckoutPage";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import MyOrders from "./pages/MyOrders/MyOrders";
import OrderProductDetailPage from "./pages/OrderProductDetailPage/OrderProductDetailPage";

/* ================= CONTEXT ================= */
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import { WishlistProvider } from "./context/WishlistContext";
import FilterModal from "./components/FilterModal";

import OfferPagee from "./pages/offerpagee/offerpagee";

/* ================= WISHLIST PAGE ================= */
import Wishlist from "./pages/wishlist/Wishlist";
import CartProductDetail from "./pages/cartproductdetail/CartProductDetail";
import Profile from "./pages/profile/Profile";


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

  const [filters, setFilters] = useState({
    name: "",
    categories: [],
    brands: [],
    minPrice: "",
    maxPrice: "",
  });

  const [showFilter, setShowFilter] = useState(false);

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
      
        <div className="lg:hidden w-full sticky top-0 z-40 bg-white px-4 py-2">

        <div className="flex items-center gap-2">
          <div className="flex-1">
            <SearchBar />
          </div>

          <button
            onClick={() => setShowFilter(true)}
            className="p-2 rounded-xl bg-gray-100 active:scale-95 transition"
          >
            <SlidersHorizontal size={20} className="text-gray-700" />
          </button>
        </div>
      </div>

      

      {/* ========== DESKTOP LAYOUT ========== */}
      <div className="flex w-full">
        
          
           
        <aside
  className="
    hidden lg:block
    w-64
    sticky top-14
    h-[calc(100vh-3.5rem)]
    bg-white shadow-lg
    border-r
    overflow-y-auto
  "
>
  <div className="p-4 pb-24">
    <Sidebar />
  </div>
</aside>


        <div className="flex-1 min-w-0">
          {/* DESKTOP SEARCH + FILTER */}
          <div className="hidden lg:flex items-center w-full bg-gray-100 px-4 py-2 border border-gray-200 gap-2">
            <div className="flex-1">
              <SearchBar />
            </div>

            <button
              onClick={() => setShowFilter(true)}
              className="h-[48px] px-3 flex items-center justify-center rounded-xl bg-white border border-zinc-400 hover:bg-gray-50 transition"
            >
              <SlidersHorizontal size={18} className="text-gray-700" />
            </button>
          </div>

          <div className="px-4 pb-24 lg:pb-10">
  <Outlet context={{ filters }} />
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

      <FilterModal
        open={showFilter}
        onClose={() => setShowFilter(false)}
        filters={filters}
        setFilters={setFilters}
      />
    </main>
  );
}

/* ================= MAIN APP ================= */
export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <WishlistProvider>

            <ScrollToTop />
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

              

              {/* ===== MAIN APP ===== */}
              <Route path="/" element={<MainAppLayout />}>
                <Route index element={<Home />} />

                {/* PROTECTED */}
                <Route
                  path="profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                {/* ===== AUTH ROUTES ===== */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/reset-password" element={<ResetPassword />} />

                <Route path="shopping" element={<Shopping />} />
                <Route path="shopping/:id" element={<ProductsDetails />} />
                <Route path="seller/:sellerSlug" element={<SellerPage />} />

                

                {/* ===== CATEGORY FLOW ===== */}
<Route path="categories" element={<CategoryPage />} />

<Route
  path="category/:categoryId"
  element={<SubCategoryPage />}
/>

<Route
  path="category/:categoryId/:subId"
  element={<ChildCategoryPage />}
/>


                <Route path="cart" element={<CartPage />} />

                {/* PROTECTED */}
                <Route
                  path="checkout"
                  element={
                    <PrivateRoute>
                      <CheckoutPage />
                    </PrivateRoute>
                  }
                />

                <Route path="order-success/:id" element={<OrderSuccess />} />

                {/* PROTECTED */}
                <Route
                  path="my-orders"
                  element={
                    <PrivateRoute>
                      <MyOrders />
                    </PrivateRoute>
                  }
                />

                {/* PROTECTED */}
                <Route
                  path="order-details/:id"
                  element={
                    <PrivateRoute>
                      <OrderProductDetailPage />
                    </PrivateRoute>
                  }
                />

                <Route path="wishlist" element={<Wishlist />} />

                <Route path="store" element={<Storep />} />
                <Route path="store/:id" element={<Storedetails />} />

                <Route path="market" element={<Marketp />} />
                <Route path="market/:id" element={<MarketProductsdetails />} />

                <Route path="services" element={<ServicesPage />} />

                <Route path="blog" element={<Blog />} />
                <Route path="blog/:slug" element={<BlogDetails />} />

                <Route path="offerpage" element={<OfferPagee />} />
                <Route path="cart-product/:id" element={<CartProductDetail />} />
                <Route path="account" element={<Account />} />
                <Route path="chat" element={<Chat />} />

                <Route path="videos" element={<Videos />} />
                <Route path="live" element={<Live />} />

                <Route path="reels" element={<Reels />} />
                <Route path="reels/:id" element={<ReelDetails />} />
              </Route>

            </Routes>

          </WishlistProvider>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}
