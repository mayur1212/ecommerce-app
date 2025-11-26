import React from "react";

import allImg from "../assets/Allproducts.webp";
import beautyImg from "../assets/Beautypersonal.jpg";
import electronicsImg from "../assets/ElectronicsGadget.jpg";
import fashionImg from "../assets/FashionApparel.jpg";
import homeImg from "../assets/HomeKitchen.jpg";
import healthImg from "../assets/HealthFitness.jpg";

const categoryImages = {
  all: allImg,
  "Beauty & Personal Care": beautyImg,
  "Electronics & Gadgets": electronicsImg,
  "Fashion & Apparel": fashionImg,
  "Home & Kitchen": homeImg,
  "Health & Fitness": healthImg,
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
                {/* Image */}
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
