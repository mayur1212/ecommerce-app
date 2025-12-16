import React from "react";
import { Link } from "react-router-dom";
import { Package, ArrowRight } from "lucide-react";
import { useOrders } from "../../context/OrderContext";

export default function MyOrders() {
  const { orders } = useOrders();

  if (!orders || orders.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <Package size={60} className="mx-auto text-gray-400" />
        <h2 className="text-xl font-semibold text-gray-800 mt-4">
          No orders yet
        </h2>
        <p className="text-gray-600 mt-2">
          You haven’t placed any orders yet.
        </p>

        <Link
          to="/shopping"
          className="inline-block mt-6 px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            {/* LEFT */}
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-semibold">Order ID:</span>{" "}
                <span className="text-blue-600">{order.id}</span>
              </p>

              <p>
                <span className="font-semibold">Placed on:</span>{" "}
                {order.date}
              </p>

              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span className="text-green-600">{order.status}</span>
              </p>

              <p>
                <span className="font-semibold">Total:</span>{" "}
                ₹{order.total}
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              <Link
                to={`/order-success/${order.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold border rounded-xl hover:bg-gray-100 transition"
              >
                View Details
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
