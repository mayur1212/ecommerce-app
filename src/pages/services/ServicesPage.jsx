import React from "react";

/* SERVICES COMPONENTS */
import ServiceBanner from "../../components/services/ServiceBanner";
import ServiceHeroOfferBanner from "../../components/services/ServiceHeroOfferBanner";
import ServiceList from "../../components/services/ServiceList";
import CategorySection from "../../components/Category/CategorySection";

export default function ServicesPage() {
  return (
    <div className="w-full px-2 sm:px-4 lg:px-6 py-4 space-y-4">

      {/* 🔥 TOP SERVICES BANNERS */}
      <ServiceBanner />
      <ServiceHeroOfferBanner />

      {/* 🔥 CATEGORY SECTION (same position as Market) */}
      <CategorySection />

      {/* 🔥 TRENDING / MAIN SERVICES */}
      <ServiceList />

      {/* HEADING */}
      <h1 className="text-lg sm:text-xl font-bold mt-4">
        Services
      </h1>

      <p className="text-sm text-gray-600 mt-1 mb-4">
        Explore our professional services designed to support shopping,
        sellers, and business growth.
      </p>

      {/* ALL SERVICES */}
      <ServiceList />
    </div>
  );
}
