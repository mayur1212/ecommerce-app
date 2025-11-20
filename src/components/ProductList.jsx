// src/components/ProductList.jsx
import React, { useMemo, useState, useEffect } from "react";
import products from "../data/products.json";
import ProductCard from "./ProductCard";

// Use uploaded file path (dev will transform into usable URL)
const PLACEHOLDER = "/mnt/data/07b21bdf-f96d-4bcb-aaac-ef4211c96006.png";

export default function ProductList({ category = "all" }) {
  const [selected, setSelected] = useState(null);
  const [activeThumb, setActiveThumb] = useState(0);

  const normalize = (s) => (s || "").toString().toLowerCase().trim();

  const list = useMemo(
    () =>
      products.filter((p) => {
        if (category === "all") return true;
        const productCat = normalize(p.category);
        const requested = normalize(category);
        return (
          productCat === requested ||
          productCat.includes(requested) ||
          requested.includes(productCat)
        );
      }),
    [category]
  );

  const getImages = (item) =>
    item.images && item.images.length
      ? item.images
      : item.image
      ? [item.image]
      : [PLACEHOLDER];

  // handle body scroll lock when modal open
  useEffect(() => {
    if (selected) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev || "";
      };
    }
    // if no modal, ensure overflow cleared
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section className="w-full px-4 py-6">
      <h2 className="text-lg font-bold mb-4">
        Products • <span className="text-slate-500 lowercase">{category}</span>
      </h2>

      {/* Responsive grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 w-full">
        {list.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onOpen={() => {
              setSelected(p);
              setActiveThumb(0);
            }}
          />
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/60 p-4 overflow-auto"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden transition-transform transform sm:scale-100"
            onClick={(e) => e.stopPropagation()} // prevent backdrop click close when clicking inside
            style={{ maxHeight: "90vh" }}
          >
            {/* Close button (top-right) */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 bg-black text-white w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-md hover:scale-105 transition"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Modal content: stack on small, row on md+ */}
            <div className="flex flex-col md:flex-row gap-4 p-4 md:p-6 overflow-auto" style={{ maxHeight: "calc(90vh - 104px)" }}>
              {/* LEFT: Image area */}
              <div className="md:w-1/2 w-full flex flex-col">
                <div className="w-full rounded-lg bg-slate-50 p-4 flex items-center justify-center">
                  <img
                    src={getImages(selected)[activeThumb] || PLACEHOLDER}
                    alt={selected.name}
                    className="max-h-[420px] w-full object-contain transition-transform duration-300 ease-in-out hover:scale-[1.02]"
                  />
                </div>

                {/* thumbnails */}
                <div className="mt-3 flex gap-2 overflow-x-auto">
                  {getImages(selected).map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveThumb(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                        idx === activeThumb ? "border-sky-500" : "border-transparent"
                      } shadow-sm`}
                      aria-label={`Thumbnail ${idx + 1}`}
                    >
                      <img
                        src={img || PLACEHOLDER}
                        alt={`${selected.name}-${idx}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* RIGHT: Info area */}
              <div className="md:w-1/2 w-full flex flex-col">
                <h3 className="text-2xl font-bold line-clamp-2">{selected.name}</h3>

                <div className="mt-2 text-slate-600">
                  {selected.brand ? `${selected.brand} • ` : ""}
                  <span className="font-medium text-slate-700">{selected.category}</span>
                </div>

                <div className="mt-4 flex items-baseline gap-3">
                  <div className="text-3xl font-extrabold text-sky-600">
                    ₹
                    {selected.priceAfterDiscount ??
                      (selected.priceCents ? selected.priceCents / 100 : selected.price ?? "0")}
                  </div>
                  {selected.priceCents && selected.priceAfterDiscount && (
                    <div className="text-sm text-slate-400 line-through">₹{selected.priceCents / 100}</div>
                  )}
                </div>

                <div className="mt-3 text-sm text-slate-600">
                  Rating:{" "}
                  <span className="inline-flex items-center gap-1">
                    {typeof selected.rating === "number" ? selected.rating : selected.rating?.stars ?? "—"}
                    <span className="text-yellow-400">★</span>
                  </span>
                </div>

                <div className="mt-5 overflow-auto">
                  <h4 className="font-semibold">Overview</h4>
                  <p className="text-sm text-slate-700 mt-2">
                    {selected.shortDescription ?? selected.description ?? selected.longDescription ?? "No description available."}
                  </p>
                </div>

                <div className="mt-6 flex gap-3 flex-wrap">
                  <button className="bg-sky-600 text-white px-5 py-3 rounded-lg shadow hover:bg-sky-700 transition w-full sm:w-auto">
                    Add to cart
                  </button>
                  <button className="border px-5 py-3 rounded-lg hover:bg-slate-50 transition w-full sm:w-auto">
                    Wishlist
                  </button>
                </div>

                <div className="mt-6 grow">
                  <h5 className="font-semibold">Specifications</h5>
                  <pre className="bg-slate-50 p-3 rounded text-xs mt-2 max-h-36 overflow-auto">
                    {JSON.stringify(selected.specs ?? {}, null, 2)}
                  </pre>
                </div>
              </div>
            </div>

            {/* Sticky action bar: shows nicely on mobile and desktop bottom */}
            <div className="border-t pt-3 px-4 pb-4 bg-white/90 backdrop-blur-md">
              <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-sm text-slate-600">Free delivery • 7 days return</div>
                <div className="flex items-center gap-3">
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
                    Buy now
                  </button>
                  <button className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
