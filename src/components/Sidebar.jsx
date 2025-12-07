// src/components/Sidebar.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { key: "shopping", label: "Shopping", path: "/shopping" },
    { key: "store", label: "Store", path: "/store" },
    { key: "market", label: "Market", path: "/market" },
    { key: "services", label: "Services", path: "/services" },
    { key: "news", label: "News", path: "/blog" },
  ];

  // check route highlight
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="flex flex-col gap-2">
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => navigate(item.path)}  // 👈 direct routing
          className={`w-full text-left flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition 
            ${
              isActive(item.path)
                ? "bg-gray-200 font-semibold"  // active highlight
                : "text-gray-700 hover:bg-gray-100"
            }
          `}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
