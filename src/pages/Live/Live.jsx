import React from "react";

const liveStreams = [
  { id: 1, title: "Live Shopping – Electronics" },
  { id: 2, title: "Fashion Sale Live Now" },
];

export default function Live() {
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-bold">Live</h1>
      <p className="text-sm text-gray-600 mt-1">
        Join live streams and exclusive deals.
      </p>

      <div className="mt-6 space-y-4">
        {liveStreams.map((live) => (
          <div
            key={live.id}
            className="bg-red-50 border border-red-200 rounded-xl p-4"
          >
            <h3 className="font-semibold text-red-600">{live.title}</h3>
            <p className="text-sm text-gray-600 mt-1">
              🔴 Live now
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
