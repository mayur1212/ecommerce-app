import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ================= CONFIG ================= */

const OFFER_DURATION_MS = 7 * 60 * 60 * 1000; // 7 hours
const STORAGE_KEY = "serviceHeroOfferEndTime";

/* ================= COMPONENT ================= */

export default function ServiceHeroOfferBanner() {
  const navigate = useNavigate();

  const getEndTime = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return Number(saved);

    const endTime = Date.now() + OFFER_DURATION_MS;
    localStorage.setItem(STORAGE_KEY, endTime);
    return endTime;
  };

  const [endTime] = useState(getEndTime);
  const [timeLeft, setTimeLeft] = useState(
    Math.max(0, endTime - Date.now())
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(Math.max(0, endTime - Date.now()));
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  /* ================= TIME VALUES ================= */

  const days = 0; // intentionally fixed

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  const isExpired = timeLeft === 0;

  return (
    <div
      onClick={() => navigate("/services")}
      className="
        mt-5 mb-8
        rounded-2xl
        bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500
        text-white
        px-4 sm:px-6
        py-5 sm:py-6
        shadow-xl
        cursor-pointer
        hover:scale-[1.01]
        transition-transform
      "
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            🛠️ Service Flash Offer
          </h2>

          {!isExpired ? (
            <p className="mt-1 text-sm sm:text-base opacity-90">
              Up to{" "}
              <span className="font-bold text-yellow-300">
                20% OFF
              </span>{" "}
              on selected services
            </p>
          ) : (
            <p className="mt-1 text-sm sm:text-base text-yellow-200 font-semibold">
              ⏳ Offer Ended
            </p>
          )}
        </div>

        {/* TIMER */}
        <div>
          <p className="text-xs uppercase tracking-wide opacity-80 mb-1">
            {isExpired ? "Time Over" : "Hurry, ends in"}
          </p>

          <div className="flex gap-2 text-sm font-bold">
            <TimeBox value={days} label="DAYS" />
            <TimeBox value={hours} label="HRS" />
            <TimeBox value={minutes} label="MIN" />
            <TimeBox value={seconds} label="SEC" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= TIME BOX ================= */

function TimeBox({ value, label }) {
  return (
    <span className="bg-white/20 px-3 py-2 rounded-lg min-w-[56px] text-center">
      {String(value).padStart(2, "0")}
      <div className="text-[10px] font-normal opacity-80">
        {label}
      </div>
    </span>
  );
}
