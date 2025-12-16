import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useOrders } from "../../context/OrderContext";

export default function OrderSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders } = useOrders();

  const order = orders.find((o) => String(o.id) === String(id));

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-md border p-8 text-center">
        {/* SUCCESS ICON */}
        <div className="flex justify-center mb-4">
          <CheckCircle size={64} className="text-green-600" />
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-gray-900">
          Order Placed Successfully 🎉
        </h1>

        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        {/* ORDER INFO */}
        <div className="mt-6 text-left bg-gray-50 rounded-xl p-4 text-sm">
          <p>
            <span className="font-semibold">Order ID:</span>{" "}
            <span className="text-blue-600">{id}</span>
          </p>

          <p className="mt-1">
            <span className="font-semibold">Status:</span>{" "}
            <span className="text-green-600">Confirmed</span>
          </p>

          {order && (
            <>
              <p className="mt-1">
                <span className="font-semibold">Total Amount:</span>{" "}
                ₹{order.total}
              </p>

              <p className="mt-1">
                <span className="font-semibold">Order Date:</span>{" "}
                {order.date}
              </p>
            </>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/my-orders"
            className="px-6 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
          >
            View My Orders
          </Link>

          <button
            onClick={() => navigate("/shopping")}
            className="px-6 py-3 rounded-xl border border-gray-300 font-semibold text-gray-700 hover:bg-gray-100 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
