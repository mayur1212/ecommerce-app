import React from "react";
import { Home, Rss, ShoppingBag, MessageSquare, User } from "lucide-react";

export default function BottomBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t
                    flex justify-between px-6 py-3 rounded-t-2xl md:hidden z-50">

      {/* Home */}
      <div className="flex flex-col items-center text-purple-600">
        <Home size={22} />
        <span className="text-xs mt-1">Home</span>
      </div>

      {/* Feed */}
      <div className="flex flex-col items-center text-gray-500">
        <Rss size={22} />
        <span className="text-xs mt-1">Feed</span>
      </div>

      {/* Cart */}
      <div className="relative flex flex-col items-center text-gray-500">
        <ShoppingBag size={22} />
        {/* notification dot */}
        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        <span className="text-xs mt-1">Cart</span>
      </div>

      {/* Message */}
      <div className="flex flex-col items-center text-gray-500">
        <MessageSquare size={22} />
        <span className="text-xs mt-1">Message</span>
      </div>

      {/* User */}
      <div className="flex flex-col items-center text-gray-500">
        <User size={22} />
        <span className="text-xs mt-1">User</span>
      </div>

    </nav>
  );
}
