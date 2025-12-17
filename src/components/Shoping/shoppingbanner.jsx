import React from "react";

const ShoppingBanner = () => {
  return (
    <section style={{ background: "#EEE9FF" }} className="w-full py-6 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">

        {/* ================= DESKTOP (UNCHANGED) ================= */}
        <div className="hidden lg:flex relative items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-[#3b2f7d] via-[#2f2566] to-[#1f1b3f] px-10 py-10 text-white">

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:80px_80px]" />

          {/* Left */}
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold tracking-wide leading-tight">
              Mega Shopping
              <span className="block bg-gradient-to-b from-slate-200 to-slate-400 bg-clip-text text-transparent">
                Deals
              </span>
            </h2>
            <p className="mt-2 text-sm text-slate-200 max-w-xs">
              Best offers on fashion, electronics, beauty & more
            </p>
          </div>

          {/* Middle */}
          <div className="relative z-10 flex-1 px-10">
            <ul className="space-y-4 text-lg">
              <li className="flex items-center gap-3">
                <span className="text-xl">🔥</span>
                <span>Up to <strong>60% OFF</strong> on top brands</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-xl">🚚</span>
                <span><strong>Free delivery</strong> on selected products</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-xl">💳</span>
                <span>Extra <strong>bank & wallet offers</strong></span>
              </li>
            </ul>
          </div>

          {/* Right */}
          <div className="relative z-10">
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

        {/* ================= MOBILE + TABLET (CARD UI) ================= */}
        {/* ================= MOBILE + TABLET (CARD UI) ================= */}
<div className="lg:hidden grid gap-4">

  {/* Offer Card */}
  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#3b2f7d] via-[#2f2566] to-[#1f1b3f] p-5 text-white shadow-xl">

    {/* Glow */}
    <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-400/30 rounded-full blur-3xl" />

    {/* Badge */}
    <span className="inline-block mb-2 text-[11px] font-semibold uppercase tracking-wide bg-white/20 px-3 py-1 rounded-full">
      Limited Time Deal
    </span>

    {/* Title */}
    <h2 className="text-2xl font-extrabold leading-tight">
      Mega Shopping
      <span className="block text-slate-300">Deals</span>
    </h2>

    <p className="mt-2 text-sm text-slate-200">
      Fashion, electronics, beauty & more
    </p>

    {/* Content */}
    <div className="mt-4 flex items-center justify-between gap-4">
      <div className="space-y-2 text-sm">
        <p className="flex items-center gap-2">
          🔥 <span>Up to <b>60% OFF</b></span>
        </p>
        <p className="flex items-center gap-2">
          🚚 <span>Free Delivery</span>
        </p>
        <p className="flex items-center gap-2">
          💳 <span>Extra Offers</span>
        </p>
      </div>

      <img
        src="../assets/ecommerce-logo12.png"
        alt="Offer"
        className="w-20 h-20 bg-white rounded-xl p-2 object-contain shadow-md"
      />
    </div>

    {/* CTA */}
    <button className="mt-5 w-full rounded-xl bg-white text-[#2f2566] py-3 text-sm font-bold active:scale-95 transition">
      Shop Now →
    </button>
  </div>

</div>

      </div>
    </section>
  );
};

export default ShoppingBanner;
