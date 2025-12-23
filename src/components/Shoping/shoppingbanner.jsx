import React, { useEffect, useState } from "react";

/* ================= CONFIG ================= */

const SLIDES = [
  {
    image: "/images/shoppingbanner1.jpg",
    badge: "Special Offer",
    title: "Big Shopping Sale",
    subtitle: "Up to 50% off on selected items",
    button: "Shop Now",
  },
  {
    image: "/images/shoppingbanner.jpg",
    badge: "New Arrival",
    title: "Fresh Collections",
    subtitle: "Latest trends at best prices",
    button: "Explore Now",
  },
  {
    image: "/images/shoppingbanner1.jpg",
    badge: "Limited Time",
    title: "Mega Discount",
    subtitle: "Flat 40% off today only",
    button: "Grab Deal",
  },
];

const SLIDE_INTERVAL = 5000;

/* ================= COMPONENT ================= */

const ShoppingBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const slide = SLIDES[current];

  return (
    <section className="w-full py-4 px-1">
      <div className="max-w-7xl mx-auto">
        <div className="relative w-full h-[180px] sm:h-[220px] lg:h-[260px] rounded-2xl overflow-hidden shadow-xl">

          {/* IMAGE */}
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/40" />

          {/* TEXT */}
          <div className="absolute inset-0 flex items-center">
            <div className="ml-6 sm:ml-10 text-white space-y-2 max-w-md">
              <p className="text-xs sm:text-sm bg-white/20 inline-block px-3 py-1 rounded-full backdrop-blur">
                {slide.badge}
              </p>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
                {slide.title}
              </h2>

              <p className="text-sm sm:text-base opacity-90">
                {slide.subtitle}
              </p>

              <button className="mt-3 bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-full font-medium shadow-lg transition-transform duration-200 hover:scale-105">
                {slide.button}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ShoppingBanner;
