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
    <section className="w-full flex justify-center">
      <div
        className="
          relative w-full
          h-[30vh] sm:h-[35vh] md:h-[40vh] lg:h-[52vh]
          overflow-hidden

          /* Mobile + Tablet (unchanged) */
          
          rounded-2xl shadow-xl p-0 sm:p-3


          /* Desktop → CARD STYLE */
          lg:max-w-7xl
          lg:rounded-3xl
          lg:shadow-2xl
          lg:p-0
          lg:mx-auto
        "
      >
        {/* Image */}
        <img
          src={images[i]}
          alt={`banner-${i}`}
          className="
            w-full h-full object-cover
            rounded-2xl lg:rounded-3xl
            transition-transform duration-700 ease-out
            lg:scale-[1.03]
          "
        />

        {/* Gradient overlay (desktop only) */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent rounded-3xl" />

        {/* TEXT CONTENT */}
        <div className="absolute top-4 left-4 lg:top-10 lg:left-10 text-white space-y-2">
          <p className="bg-white/20 text-xs px-3 py-1 rounded-full backdrop-blur-sm inline-block">
            Limited time!
          </p>

          <h2 className="text-lg lg:text-2xl font-semibold">
            Get Special Discount
          </h2>

          <p className="text-sm lg:text-base">Up to</p>

          <h1 className="text-4xl lg:text-6xl font-bold -mt-2">
            40%
          </h1>

          <p className="text-[10px] lg:text-sm opacity-80">
            All Salons available | T&C Applied
          </p>
        </div>

        {/* CLAIM BUTTON */}
        <button
          className="
            absolute bottom-4 right-4
            lg:bottom-8 lg:right-8
            bg-red-500 hover:bg-red-600
            text-white text-sm lg:text-base
            px-4 py-2 lg:px-6 lg:py-3
            rounded-full shadow-lg
            transition-transform duration-200
            hover:scale-105
          "
        >
          Claim
        </button>

        
      </div>
    </section>
  );
}
