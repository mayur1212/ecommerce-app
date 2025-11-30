// src/components/Banner.jsx
import React, { useEffect, useState } from "react";

import top1 from "../assets/banner1.jpeg";
import top2 from "../assets/banner2.jpg";
import top3 from "../assets/banner4.jpeg";

const DEFAULT = [top1, top2, top3];

export default function Banner({ images = DEFAULT, interval = 3500 }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % images.length), interval);
    return () => clearInterval(t);
  }, [images, interval]);

  return (
    <section className="w-full">
      <div
        className="
          relative w-full 
          h-[30vh] sm:h-[35vh] md:h-[40vh] lg:h-[65vh]
          overflow-hidden

          /* Mobile + Tablet → Card */
          rounded-2xl shadow-xl p-3

          /* Desktop → No card styling */
          lg:rounded-none lg:p-0
        "
      >
        {/* Background Image */}
        <img
          src={images[i]}
          alt={`banner-${i}`}
          className="w-full h-full object-cover rounded-2xl lg:rounded-none"
        />

        {/* TEXT CONTENT */}
        <div className="absolute top-4 left-4 text-white space-y-1">
          <p className="bg-white/20 text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            Limited time!
          </p>

          <h2 className="text-lg font-semibold">Get Special Discount</h2>

          <p className="text-sm">Up to</p>

          <h1 className="text-4xl font-bold -mt-2">40%</h1>

          <p className="text-[10px] mt-1 opacity-80">
            All Salons available | T&C Applied
          </p>
        </div>

        {/* CLAIM BUTTON */}
        <button
          className="
            absolute bottom-4 right-4 
            bg-red-500 text-white text-sm 
            px-4 py-2 rounded-full shadow-md
          "
        >
          Claim
        </button>

        {/* Prev Button */}
        {/* Prev Button — hide on mobile/tablet */}
<button
  onClick={() => setI((p) => (p - 1 + images.length) % images.length)}
  className="
    hidden lg:flex
    absolute left-3 top-1/2 -translate-y-1/2 
    bg-white/90 p-3 rounded-full shadow
  "
>
  ‹
</button>

{/* Next Button — hide on mobile/tablet */}
<button
  onClick={() => setI((p) => (p + 1) % images.length)}
  className="
    hidden lg:flex
    absolute right-3 top-1/2 -translate-y-1/2 
    bg-white/90 p-3 rounded-full shadow
  "
>
  ›
</button>

      </div>
    </section>
  );
}
