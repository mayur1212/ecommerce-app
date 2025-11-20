// src/components/Banner.jsx
import React, { useEffect, useState } from "react";

// 🔥 Import your 3 banner images
import top1 from "../assets/banner1.jpeg";
import top2 from "../assets/banner2.jpg";
import top3 from "../assets/banner4.jpeg";

// 🔥 Default images array
const DEFAULT = [top1, top2, top3];

export default function Banner({ images = DEFAULT, interval = 3500 }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % images.length), interval);
    return () => clearInterval(t);
  }, [images, interval]);

  return (
    <section className="w-full">  {/* FULL WIDTH */}

      {/* responsive heights:
          mobile: 30vh, sm: 40vh, md: 50vh, lg: 65vh
          This keeps aspect and looks good on all devices */}
      <div className="relative w-full h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[65vh] overflow-hidden shadow-lg">

        {/* Banner Image */}
        <img
          src={images[i]}
          alt={`banner-${i}`}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />

        {/* Previous Button (bigger tap target on mobile) */}
        <button
          onClick={() => setI((p) => (p - 1 + images.length) % images.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 p-3 sm:p-2 rounded-full shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
          aria-label="Previous"
        >
          ‹
        </button>

        {/* Next Button */}
        <button
          onClick={() => setI((p) => (p + 1) % images.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 p-3 sm:p-2 rounded-full shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
          aria-label="Next"
        >
          ›
        </button>

        {/* Indicator Dots - larger on mobile for touch */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`rounded-full transition-all
                ${idx === i ? "bg-white w-3 h-3 sm:w-3 sm:h-3" : "bg-white/50 w-2 h-2 sm:w-2 sm:h-2"}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
