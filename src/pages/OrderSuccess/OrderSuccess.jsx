import React from "react";
import { useParams, Link } from "react-router-dom";

export default function OrderSuccess() {
  const { id } = useParams();

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-5">
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          {/* SUCCESS ICON */}
          <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
            <span className="text-4xl">✔</span>
          </div>

          {/* TITLE */}
          <h1 className="text-2xl font-bold text-green-600">
            Order Placed Successfully
          </h1>

          {/* ORDER ID */}
          <p className="mt-3 text-sm text-gray-600">
            Your Order ID
          </p>
          <p className="font-semibold text-gray-900">
            #{id}
          </p>

          {/* INFO */}
          <p className="text-sm text-gray-500 mt-4">
            Thank you for your purchase.  
            Your order is being processed and will be delivered soon.
          </p>

          {/* ACTIONS */}
          <div className="mt-6 flex flex-col gap-3">
            <Link
              to="/my-orders"
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
            >
              View My Orders
            </Link>

            <Link
              to="/shopping"
              className="w-full border py-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-100 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
