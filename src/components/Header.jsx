// src/components/Header.jsx
import React, { useState } from "react";
import Badge from "./ui/Badge";
import {
  MapPin,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  CalendarCheck,
  Home,
  Store,
  Briefcase,
  Newspaper,
} from "lucide-react";
import LOGO from "../assets/ecommerce-logo12.png";
import LocationPopup from "./LocationPopup";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Header({ mobileOpen, setMobileOpen }) {
  const [location, setLocation] = useState("Select Location");
  const [openPopup, setOpenPopup] = useState(false);

  const navigate = useNavigate();

  const { cartItems = [] } = useCart() || {};

  const wishlistContext = useWishlist() || {};
  const wishlistItems =
    wishlistContext.wishlistItems ||
    wishlistContext.wishlist ||
    [];

  const go = (path) => {
    setMobileOpen(false);
    navigate(path);
  };

  return (
    <>
      {openPopup && (
        <LocationPopup
          close={() => setOpenPopup(false)}
          setLocation={setLocation}
        />
      )}

      {/* ================= BACKGROUND OVERLAY (BLUR ONLY BACKGROUND) ================= */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-[60] lg:hidden bg-black/40 backdrop-blur-sm"

        />
      )}

      {/* ================= RIGHT DRAWER (NO BLUR HERE) ================= */}
      <div
  className={`
    fixed top-0 right-0 z-[70] h-full
    w-[90%] max-w-[380px]
    bg-white shadow-2xl lg:hidden
    transform transition-transform duration-300 ease-in-out
    ${mobileOpen ? "translate-x-0" : "translate-x-full"}
  `}
>


        {/* DRAWER HEADER */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center">
              <User className="text-red-600" />
            </div>
            <div>
              <p className="text-sm font-semibold">Hello 👋</p>
              <p className="text-xs text-gray-500">Guest User</p>
            </div>
          </div>

          <button onClick={() => setMobileOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* DRAWER MENU */}
        <div className="flex flex-col py-2">
          <DrawerItem icon={Home} label="Home" onClick={() => go("/")} />
          <DrawerItem icon={ShoppingBag} label="Shopping" onClick={() => go("/shopping")} />
          <DrawerItem icon={Store} label="Market" onClick={() => go("/market")} />
          <DrawerItem icon={Briefcase} label="Services" onClick={() => go("/services")} />
          <DrawerItem icon={Store} label="Store" onClick={() => go("/store")} />
          <DrawerItem icon={Newspaper} label="News" onClick={() => go("/blog")} />
          <DrawerItem icon={Heart} label="Wishlist" onClick={() => go("/wishlist")} />
          <DrawerItem icon={ShoppingBag} label="Cart" onClick={() => go("/cart")} />
        </div>
      </div>

      {/* ================= HEADER ================= */}
      <header className="backdrop-blur-xl bg-white/70 border-b border-red-300 shadow-sm lg:sticky lg:top-0 lg:z-50">
        <div className="w-full px-1 py-1 flex flex-col">

          {/* ================= MOBILE HEADER ================= */}
          
            <div className="flex lg:hidden w-full items-center justify-between">

            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img src={LOGO} alt="Logo" className="w-9 h-9 object-contain" />
              <h1 className="text-base font-bold text-red-600">ShopNow</h1>
            </div>

            <div className="flex items-center gap-3">
  {/* 👤 PROFILE */}
  <User
    size={18}
    className="cursor-pointer"
    onClick={() => navigate("/profile")}
  />

  {/* 📅 BOOKINGS */}
  <CalendarCheck
    size={18}
    className="cursor-pointer"
    onClick={() => navigate("/booking")}
  />

  {/* ❤️ WISHLIST */}
  <div className="relative">
    <Heart
      size={18}
      className="cursor-pointer"
      onClick={() => navigate("/wishlist")}
    />
    <Badge count={wishlistItems.length} />
  </div>

  {/* 🛒 CART */}
  <div className="relative">
    <ShoppingBag
      size={18}
      className="cursor-pointer"
      onClick={() => navigate("/cart")}
    />
    <Badge count={cartItems.length} />
  </div>

  {/* ☰ MOBILE MENU */}
  <button onClick={() => setMobileOpen((s) => !s)}>
    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
  </button>
</div>

          </div>

          {/* ================= DESKTOP HEADER (UNCHANGED) ================= */}
          
            <div className="hidden lg:flex w-full items-center justify-between">

            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img src={LOGO} alt="Logo" className="w-12 h-12 object-contain" />
              <h1 className="text-xl font-bold text-red-600 tracking-wide">
                ShopNow
              </h1>
            </div>

            <nav className="hidden lg:flex gap-8 text-[15px] font-semibold text-gray-800">
              <button onClick={() => go("/shopping")}>Shopping</button>
              <button onClick={() => go("/market")}>Market</button>
              <button onClick={() => go("/services")}>Services</button>
              <button onClick={() => go("/store")}>Store</button>
              <button onClick={() => go("/blog")}>News</button>
            </nav>

            <div className="hidden md:flex items-center gap-10 ml-6">
  {/* 📍 LOCATION */}
  <div
    onClick={() => setOpenPopup(true)}
    className="hidden lg:flex items-center gap-2 text-sm font-semibold cursor-pointer hover:text-red-600"
  >
    <MapPin size={18} className="text-red-600" />
    <span>{location}</span>
  </div>

  {/* 🔔 ICON ACTIONS */}
  <div className="flex items-center gap-8 text-gray-700">
    {/* 👤 PROFILE */}
    <div
      className="flex flex-col items-center text-[11px] cursor-pointer hover:text-red-500 transition"
      onClick={() => navigate("/profile")}
    >
      <User size={22} />
      <span>Profile</span>
    </div>

    {/* 📅 BOOKINGS */}
    <div
      className="flex flex-col items-center text-[11px] cursor-pointer hover:text-red-500 transition"
      onClick={() => navigate("/my-orders")}
    >
      <CalendarCheck size={22} />
      <span>Orders</span>
    </div>

    {/* ❤️ WISHLIST */}
    <div
      className="relative flex flex-col items-center text-[11px] cursor-pointer hover:text-red-500 transition"
      onClick={() => navigate("/wishlist")}
    >
      <Heart size={22} />
      <Badge count={wishlistItems.length} />
      <span>Wishlist</span>
    </div>

    {/* 🛒 CART */}
    <div
      className="relative flex flex-col items-center text-[11px] cursor-pointer hover:text-red-500 transition"
      onClick={() => navigate("/cart")}
    >
      <ShoppingBag size={22} />
      <Badge count={cartItems.length} />
      <span>Cart</span>
    </div>
  </div>
</div>

          </div>

        </div>
      </header>
    </>
  );
}

function DrawerItem({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 px-5 py-3 text-sm font-medium hover:bg-red-50 transition"
    >
      <Icon size={18} className="text-red-600" />
      {label}
    </button>
  );
}
