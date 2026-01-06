// src/components/Footer.jsx
import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
} from "lucide-react";

import logo from "../assets/ecommerce-logo12.png";

function SmallTitle({ children }) {
  return (
    <h4 className="text-white font-semibold mb-3 text-sm md:text-base">
      {children}
    </h4>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-gray-900 via-gray-900 to-gray-800 text-gray-300 pt-10 pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-hidden">

        {/* ================= TOP GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* BRAND */}
          <div className="space-y-4">
            <img
              src={logo}
              alt="Shop logo"
              className="w-20 h-20 md:w-24 md:h-24 object-contain rounded-lg"
            />

            <p className="text-sm text-gray-300 leading-relaxed">
              ShopMart — your trusted online marketplace for electronics,
              fashion, beauty, home & more.
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={16} /> support@shopmart.com
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} /> +91 98765 43210
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Facebook className="hover:text-white cursor-pointer" />
              <Instagram className="hover:text-white cursor-pointer" />
              <Twitter className="hover:text-white cursor-pointer" />
              <Youtube className="hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <details className="group md:open">
              <summary className="flex items-center justify-between cursor-pointer text-white font-semibold">
                Quick Links
                <ChevronDown className="md:hidden transition-transform group-open:rotate-180" />
              </summary>

              <ul className="mt-3 space-y-2 text-sm">
                {["Home", "Shop", "Categories", "About Us", "Contact"].map(
                  (item) => (
                    <li
                      key={item}
                      className="hover:text-white cursor-pointer"
                    >
                      {item}
                    </li>
                  )
                )}
              </ul>
            </details>
          </div>

          {/* CUSTOMER SERVICE */}
          <div>
            <details className="group md:open">
              <summary className="flex items-center justify-between cursor-pointer text-white font-semibold">
                Customer Service
                <ChevronDown className="md:hidden transition-transform group-open:rotate-180" />
              </summary>

              <ul className="mt-3 space-y-2 text-sm">
                {[
                  "My Account",
                  "Track Order",
                  "Wishlist",
                  "Return Policy",
                  "Help Center",
                ].map((item) => (
                  <li
                    key={item}
                    className="hover:text-white cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </details>
          </div>

          {/* NEWSLETTER */}
          <div>
            <SmallTitle>Get deals & offers</SmallTitle>

            <form
              className="flex flex-col sm:flex-row gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg text-sm">
                Subscribe
              </button>
            </form>

            <div className="mt-4">
              <SmallTitle>We Accept</SmallTitle>
              <div className="flex flex-wrap gap-2">
                {["VISA", "MC", "UPI", "NB"].map((p) => (
                  <div
                    key={p}
                    className="w-12 h-7 rounded bg-white/10 flex items-center justify-center text-xs"
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin size={14} /> Mumbai, India
              </div>
              <div className="mt-1">
                Secure payment • Easy returns • 24/7 Support
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-sm text-gray-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} ShopMart — All Rights Reserved.
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs">Privacy • Terms • Sitemap</span>
            <span className="hidden sm:inline hover:text-white cursor-pointer">
              Help
            </span>
            <span className="hidden sm:inline hover:text-white cursor-pointer">
              Support
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
