// src/components/Sidebar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  User,
  MessageCircle,
  Film,
  Video,
  Radio,
  ShoppingBag,
  Store,
  ShoppingCart,
  Briefcase,
  Newspaper,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  const items = [
    { key: "home", label: "Home", path: "/", icon: Home },
    { key: "account", label: "Account", path: "/account", icon: User },
    { key: "chat", label: "Chat", path: "/chat", icon: MessageCircle },
    { key: "reels", label: "Reels", path: "/reels", icon: Film },
    { key: "videos", label: "Videos", path: "/videos", icon: Video },
    { key: "live", label: "Live", path: "/live", icon: Radio },

    { key: "shopping", label: "Shopping", path: "/shopping", icon: ShoppingBag },
    { key: "store", label: "Store", path: "/store", icon: Store },
    { key: "market", label: "Market", path: "/market", icon: ShoppingCart },
    { key: "services", label: "Services", path: "/services", icon: Briefcase },
    { key: "news", label: "News", path: "/blog", icon: Newspaper },
  ];

  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.key}
            onClick={() => navigate(item.path)}
            className="
              w-full flex items-center gap-4
              px-5 py-3 rounded-xl text-base
              text-gray-700
              hover:bg-gray-100 hover:text-black
              transition
            "
          >
            <Icon size={22} strokeWidth={1.75} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
