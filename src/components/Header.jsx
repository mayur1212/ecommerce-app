// src/components/Header.jsx
import React, { useState } from "react";
import { MapPin, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import LOGO from "../assets/ecommerce-logo12.png";

export default function Header({ mobileOpen, setMobileOpen }) {
  const [location, setLocation] = useState("Mumbai");

  return (
    <header className="backdrop-blur-xl bg-white/70 border-b border-red-300 shadow-sm lg:sticky lg:top-0 lg:z-50">

      {/* ======= TOP ROW ======= */}
      <div className="w-full px-1 py-1 flex items-center">

        {/* ===== MOBILE / TABLET LAYOUT ===== */}
        <div className="flex md:hidden w-full items-center justify-between h-14 px-2">

          {/* LEFT SIDE: LOGO */}
          <div className="flex items-center gap-1">
            <img src={LOGO} alt="Logo" className="w-9 h-9 object-contain" />
            <h1 className="text-base font-bold text-red-600">ShopNow</h1>
          </div>

          {/* RIGHT SIDE: ICONS */}
          <div className="flex items-center gap-3">
            <User size={18} className="cursor-pointer" />

            {/* BOOKING ICON */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 cursor-pointer"
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

            <Heart size={18} className="cursor-pointer" />
            <ShoppingBag size={18} className="cursor-pointer" />

            {/* HAMBURGER BUTTON */}
            <button onClick={() => setMobileOpen((s) => !s)}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ===== DESKTOP LAYOUT ===== */}
        <div className="hidden md:flex w-full items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <img src={LOGO} alt="Logo" className="w-12 h-12 object-contain" />
            <h1 className="text-xl font-bold text-red-600 tracking-wide">ShopNow</h1>
          </div>

          {/* CENTER MENU */}
          <nav className="hidden lg:flex gap-8 text-[15px] font-semibold text-gray-800">
            {["Home", "Shopping", "Market", "Services", "Grocery", "News"].map((item) => (
              <a
                key={item}
                href="#"
                className="relative group transition text-gray-700 hover:text-red-600"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* RIGHT ICONS + LOCATION */}
          <div className="hidden md:flex items-center gap-10 ml-6">

            {/* LOCATION (desktop only) */}
            <div className="hidden lg:flex items-center gap-2 text-sm font-semibold hover:text-red-600 transition">
              <MapPin size={18} className="text-red-600" />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent font-medium text-gray-800 focus:outline-none"
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
              <div className="flex flex-col items-center text-[11px] font-medium hover:text-red-600 transition cursor-pointer hover:scale-105">
                <User size={22} />
                <span>Profile</span>
              </div>

              <div className="flex flex-col items-center text-[11px] font-medium hover:text-red-600 transition cursor-pointer hover:scale-105">
                <Heart size={22} />
                <span>Wishlist</span>
              </div>

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

              <div className="flex flex-col items-center text-[11px] font-medium hover:text-red-600 transition cursor-pointer hover:scale-105">
                <ShoppingBag size={22} />
                <span>Bag</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </header>
  );
}
