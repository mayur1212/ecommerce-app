// src/components/Banner.jsx
import React, { useEffect, useState } from "react";

import top1 from "../assets/banner1.jpeg";
import top2 from "../assets/banner2.jpg";
import top3 from "../assets/banner4.jpeg";

const DEFAULT = [top1, top2, top3];

export default function Banner({ images = DEFAULT, interval = 3500 }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setI((p) => (p + 1) % images.length),
      interval
    );
    return () => clearInterval(t);
  }, [images, interval]);

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
          src={images[i]}
          alt={`banner-${i}`}
          className="
            w-full h-full object-cover
            rounded-2xl lg:rounded-3xl
            transition-transform duration-700 ease-out
          "
        />

        {/* GRADIENT OVERLAY (DESKTOP ONLY) */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent rounded-3xl" />

        {/* TEXT CONTENT */}
        <div className="absolute top-4 left-4 lg:top-10 lg:left-10 text-white space-y-3 w-[90%] sm:w-[70%] lg:w-[420px] xl:w-[480px]">
          <p className="bg-white/20 text-xs px-3 py-1 rounded-full backdrop-blur-sm inline-block">
            Limited time!
          </p>

          <h2 className="text-lg lg:text-2xl font-semibold">
            Get Special Discount Get Special Discount
          </h2>

          <p className="text-sm lg:text-base">Up to</p>

          <h1 className="text-4xl lg:text-6xl font-bold -mt-2">
            40%
          </h1>

          <p className="text-[10px] lg:text-sm opacity-80">
            All Salons available | T&C Applied
          </p>

          {/* SHOP NOW BUTTON (DESKTOP ONLY) */}
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
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
}
