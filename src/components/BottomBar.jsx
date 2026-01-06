// src/components/BottomBar.jsx
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  MessageCircle,
  Film,
  Video,
  Radio,
  User,
} from "lucide-react";

export default function BottomBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { label: "Home", path: "/", icon: Home },
    { label: "Chat", path: "/chat", icon: MessageCircle },
    { label: "Reels", path: "/reels", icon: Film },
    { label: "Video", path: "/videos", icon: Video },
    { label: "Live", path: "/live", icon: Radio },
    { label: "Account", path: "/profile", icon: User },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
  className="
    fixed bottom-0 left-0 right-0
    bg-white border-t shadow-md
    flex justify-around items-center
    py-2
    lg:hidden
    z-50
    pb-[env(safe-area-inset-bottom)]
  "
>

      {items.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.path);

        return (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-1"
          >
            <Icon
              size={22}
              strokeWidth={1.8}
              className={active ? "text-red-600" : "text-gray-700"}
            />
            <span
              className={`text-[11px] font-medium ${
                active ? "text-red-600" : "text-gray-500"
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
