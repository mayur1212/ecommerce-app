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

          {/* LOGO — Rectangular & clean */}
          <img
            src={LOGO}
            alt="Logo"
            className="w-11 h-11 object-contain ml-3"
          />

          {/* CENTER EMPTY SPACE */}
          <div className="flex-1"></div>

          {/* MOBILE RIGHT ICONS */}
          <div className="flex items-center gap-4">
            <User size={20} className="cursor-pointer" />
            <Heart size={20} className="cursor-pointer" />
            <ShoppingBag size={20} className="cursor-pointer" />
          </div>
        </div>

        {/* ===== DESKTOP LAYOUT ===== */}
        <div className="hidden md:flex w-full items-center gap-4">

          {/* LOGO */}
          <img
            src={LOGO}
            alt="Logo"
            className="w-12 h-12 object-contain"
          />

          {/* NAVIGATION MENU */}
          <nav className="hidden lg:flex gap-5 text-sm font-semibold text-gray-800 ml-4">
            {["Home", "Shopping", "Market", "Services", "Grocery", "News"].map((item) => (
              <a key={item} href="#" className="hover:text-red-600 transition-colors">
                {item}
              </a>
            ))}
          </nav>

          {/* SEARCH BAR CENTER */}
          <div className="flex-1 hidden md:flex justify-center">
            <div className="relative w-full max-w-xl">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search for products, brands and categories..."
                className="w-full px-5 py-3 rounded-full border border-gray-300 bg-white shadow 
                focus:ring-2 focus:ring-red-400 focus:outline-none transition-all"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white 
                px-6 py-2 rounded-full flex items-center gap-1 transition">
                <Search size={18} />
                Search
              </button>
            </div>
          </div>

          {/* RIGHT SIDE DESKTOP ICONS + LOCATION */}
          <div className="ml-auto hidden md:flex items-center gap-6">
            
            {/* LOCATION */}
            <div className="hidden lg:flex items-center gap-2 text-sm font-semibold cursor-pointer hover:text-red-600 transition">
              <MapPin size={18} className="text-red-600" />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent focus:outline-none"
              >
                {["Mumbai", "Pune", "Nagpur", "Bengaluru"].map((city) => (
                  <option key={city} value={city} className="text-black">
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* DESKTOP ICONS */}
            <div className="flex items-center gap-6 text-gray-700">
              <div className="flex flex-col items-center text-xs font-medium hover:text-red-600 transition cursor-pointer">
                <User size={20} />
                <span>Profile</span>
              </div>

              <div className="flex flex-col items-center text-xs font-medium hover:text-red-600 transition cursor-pointer">
                <Heart size={20} />
                <span>Wishlist</span>
              </div>

              <div className="flex flex-col items-center text-xs font-medium hover:text-red-600 transition cursor-pointer">
                <ShoppingBag size={20} />
                <span>Bag</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MOBILE SEARCH BAR ===== */}
      <div className="w-full px-4 pb-3 md:hidden">
        <div className="relative">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm
            focus:ring-2 focus:ring-red-400 focus:outline-none"
          />
          <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* ===== MOBILE NAV MENU DROPDOWN ===== */}
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

          <div className="mt-2">
            <label className="text-xs text-gray-600">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm"
            >
              {["Mumbai", "Pune", "Nagpur", "Bengaluru"].map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

        </div>
      </div>
    </header>
  );
}
