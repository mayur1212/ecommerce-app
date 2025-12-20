import React, { useEffect, useState } from "react";

/* ================= CONFIG ================= */

const IMAGES = [
  "/images/shoppingbanner1.jpg",
  "/images/shoppingbanner.jpg",
  "/images/shoppingbanner1.jpg",
];

const SLIDE_INTERVAL = 5000; // 5 seconds

/* ================= COMPONENT ================= */

const ShoppingBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % IMAGES.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      
      className="w-full py-4 px-1 "
    >
      <div className="max-w-7xl mx-auto">
        {/* BANNER */}
        <div className="relative w-full h-[180px] sm:h-[220px] lg:h-[260px] rounded-2xl overflow-hidden shadow-xl">
          {IMAGES.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Shopping Banner"
              className={`
                absolute inset-0 w-full h-full object-cover
                transition-opacity duration-700 ease-in-out
                ${index === current ? "opacity-100" : "opacity-0"}
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShoppingBanner;
