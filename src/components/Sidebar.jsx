// src/components/Sidebar.jsx
import React from "react";

export default function Sidebar({ activePage, onChangePage }) {
  const items = [
    { key: "shopping", label: "Shopping" },
    { key: "grocery", label: "Grocery" },
    { key: "market", label: "Market" },
    { key: "services", label: "Services" },
    { key: "news", label: "News" }, // News = Blog
  ];

  return (
    <nav className="flex flex-col gap-2">
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => onChangePage(item.key)}
          className={`w-full text-left flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition ${
            activePage === item.key
              ? "bg-gray-200 font-semibold"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
