import React, { useEffect, useState } from "react";

/* ================= CONFIG ================= */

const OFFER_DURATION_MS = 7 * 60 * 60 * 1000; // 7 hours
const STORAGE_KEY = "todayHeroOfferEndTime";

/* ================= COMPONENT ================= */

export default function HeroOfferBanner() {
  // set end time only once per browser
  const getEndTime = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return Number(saved);

    const endTime = Date.now() + OFFER_DURATION_MS;
    localStorage.setItem(STORAGE_KEY, endTime);
    return endTime;
  };

  const [endTime] = useState(getEndTime);
  const [timeLeft, setTimeLeft] = useState(endTime - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(endTime - Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  // hide banner when offer expires
  if (timeLeft <= 0) return null;

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="mb-10 rounded-2xl bg-gradient-to-r from-red-600 via-pink-600 to-orange-500 text-white p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            🔥 Only Today Offer
          </h2>
          <p className="mt-1 text-sm sm:text-base opacity-90">
            Flat{" "}
            <span className="font-bold text-yellow-300">
              20% OFF
            </span>{" "}
            on all products
          </p>
        </div>

        {/* TIMER */}
        <div>
          <p className="text-xs uppercase tracking-wide opacity-80 mb-1">
            Offer ends in
          </p>

          <div className="flex gap-2 text-sm font-bold">
            <span className="bg-white/20 px-3 py-2 rounded-lg min-w-[56px] text-center">
              {String(hours).padStart(2, "0")}
              <div className="text-[10px] font-normal opacity-80">
                HRS
              </div>
            </span>

            <span className="bg-white/20 px-3 py-2 rounded-lg min-w-[56px] text-center">
              {String(minutes).padStart(2, "0")}
              <div className="text-[10px] font-normal opacity-80">
                MIN
              </div>
            </span>

            <span className="bg-white/20 px-3 py-2 rounded-lg min-w-[56px] text-center">
              {String(seconds).padStart(2, "0")}
              <div className="text-[10px] font-normal opacity-80">
                SEC
              </div>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
