// src/components/Header.jsx
import React, { useState } from "react";
import {
  MapPin,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  CalendarCheck,
} from "lucide-react";
import LOGO from "../assets/ecommerce-logo12.png";
import LocationPopup from "./LocationPopup";
import { useNavigate } from "react-router-dom";

export default function Header({ mobileOpen, setMobileOpen }) {
  const [location, setLocation] = useState("Select Location");
  const [openPopup, setOpenPopup] = useState(false);

  const navigate = useNavigate();

  // ✅ only route navigation
  const handleNavClick = (key) => {
    if (typeof setMobileOpen === "function") setMobileOpen(false);

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
      case "grocery":
        navigate("/store");
        break;
      case "news":
        navigate("/blog");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <>
      {openPopup && (
        <LocationPopup
          close={() => setOpenPopup(false)}
          setLocation={setLocation}
        />
      )}

      <header className="backdrop-blur-xl bg-white/70 border-b border-red-300 shadow-sm lg:sticky lg:top-0 lg:z-50">
        <div className="w-full px-1 py-1 flex flex-col">

          {/* ================= MOBILE HEADER ================= */}
          <div className="flex md:hidden w-full items-center justify-between h-14 px-2">
            {/* LOGO */}
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img src={LOGO} alt="Logo" className="w-9 h-9 object-contain" />
              <h1 className="text-base font-bold text-red-600">ShopNow</h1>
            </div>

            {/* ICONS */}
            <div className="flex items-center gap-3">
              <User size={18} className="cursor-pointer" />
              <CalendarCheck size={18} className="cursor-pointer" />

              {/* ✅ WISHLIST */}
              <Heart
                size={18}
                className="cursor-pointer"
                onClick={() => navigate("/wishlist")}
              />

              {/* ✅ CART */}
              <ShoppingBag
                size={18}
                className="cursor-pointer"
                onClick={() => navigate("/cart")}
              />

              <button onClick={() => setMobileOpen((s) => !s)}>
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* ================= DESKTOP HEADER ================= */}
          <div className="hidden md:flex w-full items-center justify-between">
            {/* LOGO */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img src={LOGO} alt="Logo" className="w-12 h-12 object-contain" />
              <h1 className="text-xl font-bold text-red-600 tracking-wide">
                ShopNow
              </h1>
            </div>

            {/* CENTER MENU */}
            <nav className="hidden lg:flex gap-8 text-[15px] font-semibold text-gray-800">
              <button onClick={() => handleNavClick("shopping")}>Shopping</button>
              <button onClick={() => handleNavClick("market")}>Market</button>
              <button onClick={() => handleNavClick("services")}>Services</button>
              <button onClick={() => handleNavClick("grocery")}>Store</button>
              <button onClick={() => handleNavClick("news")}>News</button>
            </nav>

            {/* RIGHT ICONS */}
            <div className="hidden md:flex items-center gap-10 ml-6">
              {/* LOCATION */}
              <div
                onClick={() => setOpenPopup(true)}
                className="hidden lg:flex items-center gap-2 text-sm font-semibold cursor-pointer hover:text-red-600"
              >
                <MapPin size={18} className="text-red-600" />
                <span>{location}</span>
              </div>

              <div className="flex items-center gap-8 text-gray-700">
                <div className="flex flex-col items-center text-[11px] cursor-pointer">
                  <User size={22} />
                  <span>Profile</span>
                </div>

                <div className="flex flex-col items-center text-[11px] cursor-pointer">
                  <CalendarCheck size={22} />
                  <span>Booking</span>
                </div>

                {/* ✅ WISHLIST */}
                <div
                  className="flex flex-col items-center text-[11px] cursor-pointer"
                  onClick={() => navigate("/wishlist")}
                >
                  <Heart size={22} />
                  <span>Wishlist</span>
                </div>

                {/* ✅ CART */}
                <div
                  className="flex flex-col items-center text-[11px] cursor-pointer"
                  onClick={() => navigate("/cart")}
                >
                  <ShoppingBag size={22} />
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
