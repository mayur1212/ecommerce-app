// src/components/Header.jsx
import React, { useState } from "react";
import { Search, MapPin, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import LOGO from "../assets/ecommerce-logo12.png";

export default function Header() {
  const [location, setLocation] = useState("Mumbai");
  const [q, setQ] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="backdrop-blur-xl bg-white/70 sticky top-0 z-50 border-b border-red-300 shadow-sm">

      {/* ======= TOP ROW ======= */}
      <div className="w-full px-4 py-3 flex items-center">

        {/* ===== MOBILE / TABLET LAYOUT ===== */}
        <div className="flex md:hidden w-full items-center">

          {/* HAMBURGER MENU */}
          <button
            className="p-2 rounded-md hover:bg-gray-100 transition"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((s) => !s)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* LOGO */}
          <img src={LOGO} alt="Logo" className="w-11 h-11 object-contain ml-3" />

          <div className="flex-1"></div>

          {/* MOBILE ICONS */}
          <div className="flex items-center gap-4">
            <User size={20} className="cursor-pointer" />
            <Heart size={20} className="cursor-pointer" />
            <ShoppingBag size={20} className="cursor-pointer" />
          </div>
        </div>

        {/* ===== DESKTOP LAYOUT ===== */}
        {/* ===== DESKTOP LAYOUT ===== */}
<div className="hidden md:flex w-full items-center justify-between">

  {/* LOGO */}
  <img src={LOGO} alt="Logo" className="w-12 h-12 object-contain" />

  {/* CENTER NAV MENU */}
  <nav className="hidden lg:flex gap-8 text-[15px] font-semibold text-gray-800">
    {["Home", "Shopping", "Market", "Services", "Grocery", "News"].map((item) => (
      <a
        key={item}
        href="#"
        className="relative group transition text-gray-700 hover:text-red-600"
      >
        {item}

        {/* BEAUTIFUL HOVER EFFECT LINE */}
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-600 transition-all duration-300 group-hover:w-full"></span>
      </a>
    ))}
  </nav>

  {/* RIGHT SIDE ICONS + LOCATION */}
  <div className="hidden md:flex items-center gap-10 ml-6">

  {/* LOCATION */}
  <div className="hidden lg:flex items-center gap-2 text-sm font-semibold cursor-pointer hover:text-red-600 transition">
    <MapPin size={18} className="text-red-600" />
    <select
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      className="bg-transparent focus:outline-none cursor-pointer font-medium text-gray-800"
    >
      {["Mumbai", "Pune", "Nagpur", "Bengaluru"].map((city) => (
        <option key={city} value={city} className="text-black">
          {city}
        </option>
      ))}
    </select>
  </div>

  {/* ICONS */}
  <div className="flex items-center gap-8 text-gray-700">

    {/* PROFILE */}
    <div className="flex flex-col items-center text-[11px] font-medium hover:text-red-600 transition cursor-pointer hover:scale-105">
      <User size={22} />
      <span>Profile</span>
    </div>

    {/* WISHLIST */}
    <div className="flex flex-col items-center text-[11px] font-medium hover:text-red-600 transition cursor-pointer hover:scale-105">
      <Heart size={22} />
      <span>Wishlist</span>
    </div>

    {/* BOOKING */}
    <div className="flex flex-col items-center text-[11px] font-medium hover:text-red-600 transition cursor-pointer hover:scale-105">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17V7a3 3 0 013-3h0a3 3 0 013 3v10m5-6H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0H5"
        />
      </svg>
      <span>Booking</span>
    </div>

    {/* BAG */}
    <div className="flex flex-col items-center text-[11px] font-medium hover:text-red-600 transition cursor-pointer hover:scale-105">
      <ShoppingBag size={22} />
      <span>Bag</span>
    </div>

  </div>

</div>

</div>

      </div>

      {/* ===== MOBILE SEARCH BAR ===== */}
      

      {/* ===== MOBILE DELIVERY + SCROLL CATEGORIES ===== */}
      <div className="md:hidden w-full px-4 pb-3">

  {/* Scrollable Category Bar */}
  <div className="overflow-x-auto no-scrollbar mt-2">
    <div className="flex gap-3 whitespace-nowrap text-sm font-medium">
      {[
        "All",
        "Mobiles",
        "Fashion",
        "Electronics",
        "Grocery",
        "Beauty",
        "Furniture",
        "Books",
        "Toys",
      ].map((cat) => (
        <button
          key={cat}
          className="px-4 py-2 rounded-full border text-gray-700 hover:bg-red-600 hover:text-white transition"
        >
          {cat}
        </button>
      ))}
    </div>
  </div>

  {/* Deliver to (space added using mt-4) */}
  <div className="flex items-center gap-2 text-[13px] font-semibold text-gray-800 mt-4">
    <MapPin size={16} className="text-red-600" />
    <span>Deliver to</span>
    <select
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      className="bg-transparent focus:outline-none font-semibold"
    >
      {["Mumbai", "Pune", "Nagpur", "Bengaluru"].map((city) => (
        <option key={city} value={city} className="text-black">
          {city}
        </option>
      ))}
    </select>
  </div>

</div>


      <div className="w-full px-4 pb-2 md:hidden">
        <div className="relative">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-400 focus:outline-none"
          />
          <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* ===== MOBILE DROPDOWN MENU ===== */}
      <div
        className={`md:hidden transition-max-h duration-300 ease-in-out overflow-hidden ${
          mobileOpen ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <div className="px-4 pb-4 bg-white border-t border-gray-200">
          <nav className="flex flex-col gap-2 py-3">
            {["Home", "Shopping", "Market", "Services", "Grocery", "News"].map((item) => (
              <a
                key={item}
                href="#"
                className="py-2 px-2 rounded-md text-gray-800 hover:bg-gray-50 transition"
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>

          
        </div>
      </div>
    </header>
  );
}
