import React from "react";





const categoryImages = {
  all: "/src/assets/Allproducts.webp",
  "Beauty & Personal Care": "/src/assets/Beautypersonal.jpg", // ← use this
  "Electronics & Gadgets": "/src/assets/ElectronicsGadget.jpg",
  "Fashion & Apparel": "/src/assets/FashionApparel.jpg",
  "Home & Kitchen": "/src/assets/HomeKitchen.jpg",
  "Health & Fitness": "/src/assets/HealthFitness.jpg",
};


const CATEGORY_OPTIONS = [
  { key: "all", label: "All" },
  { key: "Beauty & Personal Care", label: "Beauty & Personal Care" },
  { key: "Electronics & Gadgets", label: "Electronics & Gadgets" },
  { key: "Fashion & Apparel", label: "Fashion & Apparel" },
  { key: "Home & Kitchen", label: "Home & Kitchen" },
  { key: "Health & Fitness", label: "Health & Fitness" },
];

export default function Categories({ onSelect, activeKey }) {
  return (
    <section className="w-full px-4">
      <div className="w-full overflow-x-auto py-4">
        <div className="centerRow flex gap-6 items-center justify-center min-w-[680px] md:min-w-full">
          {CATEGORY_OPTIONS.map((c) => {
            const isActive = activeKey === c.key;

            return (
              <button
  key={c.key}
  onClick={() => onSelect(c.key)}
  className={`flex-shrink-0 w-40 sm:w-44 md:w-48 lg:w-52 rounded-xl overflow-hidden 
              bg-white shadow-md transition-transform 
              ${isActive ? "ring-2 ring-sky-400 scale-105" : "hover:-translate-y-1"}`}
>
  {/* FULL BOX IMAGE */}
  <div
    className="w-full h-28 bg-cover bg-center"
    style={{ backgroundImage: `url(${categoryImages[c.key]})` }}
  ></div>

  {/* Label */}
  <div className="p-3 text-center font-semibold text-slate-700">
    {c.label}
  </div>
</button>

            );
          })}
        </div>
      </div>
    </section>
  );
}
