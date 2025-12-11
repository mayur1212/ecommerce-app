// src/components/Shoping/ReviewsDrawer.jsx
import React from "react";

/**
 * ReviewsDrawer
 * Props:
 *  - open (bool)
 *  - onClose (fn)
 *  - reviews (array) each: { id, author, rating, date, text, images: [], helpful_count }
 */
export default function ReviewsDrawer({ open, onClose, reviews = [] }) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* drawer panel */}
      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[520px] max-w-full bg-white shadow-2xl transform transition-transform
          ${open ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="text-lg font-semibold">Product Reviews</h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 p-2 rounded"
            aria-label="Close reviews"
          >
            ✕
          </button>
        </div>

        <div className="p-4 h-full overflow-y-auto space-y-4">
          {reviews.length === 0 ? (
            <div className="text-gray-500">No reviews yet.</div>
          ) : (
            reviews.map((r) => (
              <article key={r.id ?? r._id ?? Math.random()} className="border rounded-2xl p-4 bg-white">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold">
                    {r.author ? r.author.charAt(0).toUpperCase() : "U"}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{r.author || "Meesho User"}</span>
                        <span className="inline-flex items-center bg-green-600 text-white text-xs px-2 py-0.5 rounded">
                          {Number(r.rating ?? 0).toFixed(1)}★
                        </span>
                        <span className="text-xs text-gray-400">{r.date || r.posted_on}</span>
                      </div>
                    </div>

                    {r.text && <p className="mt-2 text-sm text-gray-700 whitespace-pre-line">{r.text}</p>}

                    {/* thumbnails */}
                    {r.images && r.images.length > 0 && (
                      <div className="mt-3 flex gap-2 flex-wrap">
                        {r.images.map((img, i) => (
                          <button
                            key={i}
                            onClick={() => window.open(img, "_blank")}
                            className="h-16 w-16 rounded-md overflow-hidden border bg-slate-50"
                          >
                            <img src={img} alt={`review-${i}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="mt-3 flex items-center gap-3">
                      <button className="flex items-center gap-1 text-xs text-slate-600">
                        👍 Helpful ({r.helpful_count ?? 0})
                      </button>
                      <button className="text-xs text-slate-500">Report</button>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </aside>
    </div>
  );
}
