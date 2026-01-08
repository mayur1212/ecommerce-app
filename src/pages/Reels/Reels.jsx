import React from "react";

const reels = [
  { id: 1, title: "New Shoes Collection 👟" },
  { id: 2, title: "Festival Sale Highlights 🔥" },
  { id: 3, title: "Trending Fashion 2025" },
];

export default function Reels() {
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-bold">Reels</h1>
      <p className="text-sm text-gray-600 mt-1">
        Short trending videos just for you.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {reels.map((reel) => (
          <div
            key={reel.id}
            className="bg-black text-white rounded-xl h-48 flex items-center justify-center font-medium"
          >
            {reel.title}
          </div>
        ))}
      </div>
    </div>
  );
}
