import React from "react";

const videos = [
  { id: 1, title: "Product Review – Sneakers" },
  { id: 2, title: "How to Style Casual Wear" },
  { id: 3, title: "Top Deals of the Week" },
];

export default function Videos() {
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-bold">Videos</h1>
      <p className="text-sm text-gray-600 mt-1">
        Watch product and lifestyle videos.
      </p>

      <div className="mt-6 space-y-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-xl shadow p-4"
          >
            <h3 className="font-semibold">{video.title}</h3>
            <div className="mt-2 h-40 bg-gray-200 rounded-lg flex items-center justify-center">
              Video Thumbnail
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
