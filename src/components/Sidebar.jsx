// src/components/Sidebar.jsx
import React from "react";
import { Home, ShoppingBag, Store, Shirt } from "lucide-react";

export default function Sidebar() {
  const menu = [
    
    { name: "Products", icon: <ShoppingBag size={20} />, link: "/products" },
    { name: "Grocery", icon: <Store size={20} />, link: "/grocery" },
    { name: "Clothes", icon: <Shirt size={20} />, link: "/clothes" },
    { name: "News", icon: <Home size={20} />, link: "/News" },
  ];

  return (
    <nav className="flex flex-col gap-3">
      {menu.map((item, idx) => (
        <a
          key={idx}
          href={item.link}
          className="flex items-center gap-3 p-3 rounded-lg 
          hover:bg-gray-100 text-gray-800 font-medium transition"
        >
          {item.icon}
          <span>{item.name}</span>
        </a>
      ))}
    </nav>
  );
}
