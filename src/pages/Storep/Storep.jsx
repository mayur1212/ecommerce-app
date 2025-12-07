// C:\ecommerce\ecommerce-app\src\pages\Storep\Storep.jsx

import React from "react";
import Storelist from "../../components/Store/Storelist";

export default function Storep() {
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-bold">Store</h1>
      <p className="text-sm text-gray-600 mt-1">
        Discover items from nearby stores and daily essentials.
      </p>

      <Storelist />
    </div>
  );
}
