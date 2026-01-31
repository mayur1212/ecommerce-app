import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* ================= CONFIG ================= */

const SLIDES = [
  {
    image: "/images/service-banner-1.jpg",
    badge: "Professional Services",
    title: "Services That Power Your Experience",
    subtitle: "Reliable support for shopping, sellers & businesses",
    button: "Explore Services",
    link: "/services",
  },
  {
    image: "/images/service-banner-2.jpg",
    badge: "Trusted Experts",
    title: "Grow Faster With Our Services",
    subtitle: "From onboarding to support, we’ve got you covered",
    button: "View Services",
    link: "/services",
  },
  {
    image: "/images/service-banner-3.jpg",
    badge: "Limited Time",
    title: "Special Service Offers",
    subtitle: "Exclusive deals on selected services",
    button: "Grab Offers",
    link: "/services",
  },
];

const SLIDE_INTERVAL = 5000;

/* ================= COMPONENT ================= */

export default function ServiceBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  return (
    <section className="w-full mb-8">
      <div
        className="
          relative w-full
          h-[32vh] sm:h-[36vh] md:h-[42vh] lg:h-[52vh]
          overflow-hidden
          rounded-2xl lg:rounded-3xl
          shadow-xl
        "
      >
        {/* IMAGE */}
        <img
          src={slide.image}
          alt={slide.title}
          className="
            w-full h-full object-cover
            transition-opacity duration-700
          "
        />

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />

        {/* TEXT CONTENT */}
        <div className="absolute top-4 left-4 lg:top-12 lg:left-12 text-white space-y-3 w-[90%] sm:w-[70%] lg:w-[460px]">

          <span className="bg-white/20 text-xs px-3 py-1 rounded-full backdrop-blur-sm inline-block">
            {slide.badge}
          </span>

          <h2 className="text-xl lg:text-3xl font-bold leading-tight">
            {slide.title}
          </h2>

          <p className="text-sm lg:text-base opacity-90">
            {slide.subtitle}
          </p>

          {/* BUTTON */}
          <Link
            to={slide.link}
            className="
              inline-block mt-4
              bg-indigo-500 hover:bg-indigo-600
              text-white
              px-6 py-3
              rounded-full
              font-semibold
              shadow-lg
              transition-transform duration-200
              hover:scale-105
            "
          >
            {slide.button}
          </Link>
        </div>
      </div>
    </section>
  );
}
