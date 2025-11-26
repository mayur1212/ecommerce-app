import React from "react";

const categoryImages = {
  all: "/src/assets/Allproducts.webp",
  "Beauty & Personal Care": "/src/assets/Beautypersonal.jpg",
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
    <section className="w-full px-2 sm:px-4">
  <div className="w-full overflow-x-auto no-scrollbar py-4">
    <div className="flex gap-4 sm:gap-6 items-center justify-start sm:justify-center">
      {CATEGORY_OPTIONS.map((c) => {
        const isActive = activeKey === c.key;

        return (
          <button
            key={c.key}
            onClick={() => onSelect(c.key)}
            className={`flex-shrink-0 
            w-32 sm:w-40 md:w-48 lg:w-52 
            rounded-xl overflow-hidden 
            bg-white shadow-md transition-transform 
            ${isActive ? "ring-2 ring-red-400 scale-105" : "hover:-translate-y-1"}`}
          >
            {/* FULL BOX IMAGE */}
            <div
              className="w-full h-24 sm:h-28 bg-cover bg-center"
              style={{ backgroundImage: `url(${categoryImages[c.key]})` }}
            ></div>

            {/* Label */}
            <div className="p-2 sm:p-3 text-center text-sm sm:text-base font-semibold text-slate-700">
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
