import React from "react";

const ShoppingBanner = () => {
  return (
    <section style={{ background: "#EEE9FF" }} className="w-full py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative flex flex-col lg:flex-row items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-[#3b2f7d] via-[#2f2566] to-[#1f1b3f] px-6 py-8 lg:px-10 lg:py-10 text-white">

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:80px_80px]" />

          {/* Left Title */}
          <div className="relative z-10 mb-6 lg:mb-0">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wide leading-tight">
              Mega Shopping
              <span className="block bg-gradient-to-b from-slate-200 to-slate-400 bg-clip-text text-transparent">
                Deals
              </span>
            </h2>
            <p className="mt-2 text-sm text-slate-200 max-w-xs">
              Best offers on fashion, electronics, beauty & more
            </p>
          </div>

          {/* Middle Content */}
          <div className="relative z-10 flex-1 lg:px-10">
            <ul className="space-y-4 text-base sm:text-lg">
              <li className="flex items-center gap-3">
                <span className="text-xl">🔥</span>
                <span>
                  Up to <strong>60% OFF</strong> on top brands
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-xl">🚚</span>
                <span>
                  <strong>Free delivery</strong> on selected products
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-xl">💳</span>
                <span>
                  Extra <strong>bank & wallet offers</strong>
                </span>
              </li>
            </ul>
          </div>

          {/* Right Image / Badge */}
          <div className="relative z-10 mt-6 lg:mt-0">
            <div className="rounded-xl border border-white/20 bg-white/10 p-4 text-center backdrop-blur">
              <p className="mb-2 text-xs font-semibold uppercase">
                Limited Time Offer
              </p>

              <img
                src="../assets/ecommerce-logo12.png"
                alt="Shopping Offer"
                className="mx-auto w-28 h-28 bg-white p-2 rounded-md object-contain"
              />

              <p className="mt-2 text-xs font-semibold uppercase">
                Shop Now
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ShoppingBanner;
