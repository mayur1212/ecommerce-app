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

// ✅ Correct way — Import image from assets
import logo from "../assets/ecommerce-logo12.png";

function SmallTitle({ children }) {
  return <h4 className="text-white font-semibold mb-3">{children}</h4>;
}

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-gray-900 via-gray-900 to-gray-800 text-gray-300 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          
          {/* Brand & info */}
          <div className="space-y-4">
            {/* ✅ Updated Image */}
            <img
              src={logo}
              alt="Shop logo"
              className="w-28 h-28 object-cover rounded-lg shadow-md"
            />

            <p className="text-sm text-gray-300/90">
              ShopMart — your trusted online marketplace for electronics, fashion,
              beauty, home & more. Fast delivery and secure payments.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail size={16} /> <span>support@shopmart.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone size={16} /> <span>+91 98765 43210</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <a aria-label="facebook" className="hover:text-white transition"><Facebook /></a>
              <a aria-label="instagram" className="hover:text-white transition"><Instagram /></a>
              <a aria-label="twitter" className="hover:text-white transition"><Twitter /></a>
              <a aria-label="youtube" className="hover:text-white transition"><Youtube /></a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <details className="group" open>
              <summary className="flex items-center justify-between cursor-pointer text-sm md:text-base">
                <span className="text-white font-semibold">Quick Links</span>
                <ChevronDown className="transition-transform group-open:rotate-180" />
              </summary>

              <ul className="mt-3 space-y-2 text-sm text-gray-300">
                <li className="hover:text-white transition cursor-pointer">Home</li>
                <li className="hover:text-white transition cursor-pointer">Shop</li>
                <li className="hover:text-white transition cursor-pointer">Categories</li>
                <li className="hover:text-white transition cursor-pointer">About Us</li>
                <li className="hover:text-white transition cursor-pointer">Contact</li>
              </ul>
            </details>
          </div>

          {/* Customer service */}
          <div>
            <details className="group" open>
              <summary className="flex items-center justify-between cursor-pointer text-sm md:text-base">
                <span className="text-white font-semibold">Customer Service</span>
                <ChevronDown className="transition-transform group-open:rotate-180" />
              </summary>

              <ul className="mt-3 space-y-2 text-sm text-gray-300">
                <li className="hover:text-white transition cursor-pointer">My Account</li>
                <li className="hover:text-white transition cursor-pointer">Track Order</li>
                <li className="hover:text-white transition cursor-pointer">Wishlist</li>
                <li className="hover:text-white transition cursor-pointer">Return Policy</li>
                <li className="hover:text-white transition cursor-pointer">Help Center</li>
              </ul>
            </details>
          </div>

          {/* Newsletter */}
          <div>
            <SmallTitle>Get deals & offers</SmallTitle>

            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                aria-label="Email"
              />
              <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg text-sm">
                Subscribe
              </button>
            </form>

            <div className="mt-4">
              <SmallTitle>We Accept</SmallTitle>
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 rounded bg-white/10 flex items-center justify-center text-xs">VISA</div>
                <div className="w-10 h-6 rounded bg-white/10 flex items-center justify-center text-xs">MC</div>
                <div className="w-10 h-6 rounded bg-white/10 flex items-center justify-center text-xs">UPI</div>
                <div className="w-10 h-6 rounded bg-white/10 flex items-center justify-center text-xs">NB</div>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-400">
              <div className="flex items-center gap-2"><MapPin size={14} /> Mumbai, India</div>
              <div className="mt-2">Secure payment • Easy returns • 24/7 Support</div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-sm text-gray-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} ShopMart — All Rights Reserved.</div>

          <div className="flex items-center gap-4">
            <div className="text-xs text-gray-400">Privacy • Terms • Sitemap</div>
            <div className="hidden sm:flex items-center gap-3">
              <a className="hover:text-white transition">Help</a>
              <a className="hover:text-white transition">Support</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
