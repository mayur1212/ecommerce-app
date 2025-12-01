// src/components/Header.jsx
import React, { useState } from "react";
import { MapPin, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import LOGO from "../assets/ecommerce-logo12.png";
import LocationPopup from "./LocationPopup";

export default function Header({ mobileOpen, setMobileOpen }) {
  const [location, setLocation] = useState("Select Location");
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      {/* Location Popup Component */}
      {openPopup && (
        <LocationPopup
          close={() => setOpenPopup(false)}
          setLocation={setLocation}
        />
      )}

      <header className="backdrop-blur-xl bg-white/70 border-b border-red-300 shadow-sm lg:sticky lg:top-0 lg:z-50">
        <div className="w-full px-1 py-1 flex items-center">
          {/* MOBILE HEADER */}
          <div className="flex md:hidden w-full items-center justify-between h-14 px-2">
            <div className="flex items-center gap-1">
              <img src={LOGO} alt="Logo" className="w-9 h-9 object-contain" />
              <h1 className="text-base font-bold text-red-600">ShopNow</h1>
            </div>

            <div className="flex items-center gap-3">
              <User size={18} className="cursor-pointer" />
              <Heart size={18} className="cursor-pointer" />
              <ShoppingBag size={18} className="cursor-pointer" />

              <button onClick={() => setMobileOpen((s) => !s)}>
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* DESKTOP HEADER */}
          <div className="hidden md:flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={LOGO} alt="Logo" className="w-12 h-12 object-contain" />
              <h1 className="text-xl font-bold text-red-600 tracking-wide">
                ShopNow
              </h1>
            </div>

            {/* CENTER MENU */}
            <nav className="hidden lg:flex gap-8 text-[15px] font-semibold text-gray-800">
              {["Home", "Shopping", "Market", "Services", "Grocery", "News"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="relative group transition text-gray-700 hover:text-red-600"
                  >
                    {item}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                )
              )}
            </nav>

            {/* RIGHT ICONS */}
            <div className="hidden md:flex items-center gap-10 ml-6">
              {/* 🚨 CLICK → OPEN POPUP */}
              <div
                onClick={() => setOpenPopup(true)}
                className="hidden lg:flex items-center gap-2 text-sm font-semibold cursor-pointer hover:text-red-600 transition"
              >
                <MapPin size={18} className="text-red-600" />
                <span className="font-medium">{location}</span>
              </div>

              <div className="flex items-center gap-8 text-gray-700">
                <div className="flex flex-col items-center text-[11px] font-medium hover:text-red-600 transition cursor-pointer">
                  <User size={22} />
                  <span>Profile</span>
                </div>

                <div className="flex flex-col items-center text-[11px] font-medium hover:text-red-600 transition cursor-pointer">
                  <Heart size={22} />
                  <span>Wishlist</span>
                </div>

                <div className="flex flex-col items-center text-[11px] font-medium hover:text-red-600 transition cursor-pointer">
                  <ShoppingBag size={22} />
                  <span>Bag</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
