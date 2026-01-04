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

export default function ShoppingBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const slide = SLIDES[current];

  return (
    <section className="w-full">
      <div
        className="
          relative
          w-full
          h-[30vh] sm:h-[35vh] md:h-[40vh] lg:h-[52vh]
          overflow-hidden
          rounded-2xl lg:rounded-3xl
          shadow-xl lg:shadow-2xl
        "
      >
        {/* IMAGE */}
        <img
          src={slide.image}
          alt={slide.title}
          className="
            w-full h-full object-cover
            rounded-2xl lg:rounded-3xl
            transition-opacity duration-700
          "
        />

        {/* GRADIENT OVERLAY (DESKTOP ONLY) */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent rounded-3xl" />

        {/* TEXT CONTENT */}
        <div className="absolute top-4 left-4 lg:top-10 lg:left-10 text-white space-y-3 w-[90%] sm:w-[70%] lg:w-[420px] xl:w-[480px]">

          <p className="bg-white/20 text-xs px-3 py-1 rounded-full backdrop-blur-sm inline-block">
            {slide.badge}
          </p>

          <h2 className="text-lg lg:text-2xl font-semibold">
            {slide.title}
          </h2>

          <p className="text-sm lg:text-base opacity-90">
            {slide.subtitle}
          </p>

          {/* BUTTON (DESKTOP ONLY – SAME AS Banner.jsx) */}
          <button
            className="
              hidden lg:inline-block
              mt-4
              bg-red-500 hover:bg-red-600
              text-white
              px-6 py-3
              rounded-full
              font-medium
              shadow-lg
              transition-transform duration-200
              hover:scale-105
            "
          >
            {slide.button}
          </button>
        </div>
      </div>
    </section>
  );
}
