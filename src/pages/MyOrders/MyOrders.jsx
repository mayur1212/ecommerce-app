// src/pages/orders/MyOrders.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useOrders } from "../../context/OrderContext";

const formatPrice = (p) =>
  typeof p === "number" ? `₹${p.toLocaleString()}` : "₹0";

export default function MyOrders() {
  const { orders = [] } = useOrders();
  const [activeTab, setActiveTab] = React.useState("All");
  const navigate = useNavigate();

  const filteredOrders = React.useMemo(() => {
    if (activeTab === "All") return orders;
    return orders.filter(
      (o) => o.status?.toLowerCase() === activeTab.toLowerCase()
    );
  }, [orders, activeTab]);

  return (
    <div className="w-full px-4 py-6 bg-gray-100 min-h-screen lg:px-10">
      {/* TABS */}
      <div className="flex bg-[#111827] rounded-xl p-1 mb-6 text-white text-sm">
        {["All", "Ongoing", "Completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-lg font-semibold ${
              activeTab === tab
                ? "bg-yellow-400 text-black"
                : "opacity-70"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="space-y-5">
        {filteredOrders.map((order) => {
          if (!order.productId) return null; // safety

          const price = Number(order.price) || 0;
          const mrp = Number(order.mrp) || 0;
          const discount =
            mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

          return (
            <div
              key={order.id}
              onClick={() =>
                navigate(`/order-details/${order.productId}`)
              }
              className="
                bg-white rounded-2xl border shadow-sm p-4 flex gap-4
                cursor-pointer hover:shadow-md transition
              "
            >
              {/* IMAGE */}
              <Link
                to={`/order-details/${order.productId}`}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={order.image}
                  alt={order.title}
                  className="w-28 h-28 rounded-xl object-cover border"
                />
              </Link>

              {/* CONTENT */}
              <div className="flex-1">
                <Link
                  to={`/order-details/${order.productId}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-sm font-semibold hover:text-orange-600">
                    {order.title}
                  </h3>
                </Link>

                <div className="flex items-center gap-2 mt-1 text-xs">
                  <span className="bg-green-600 text-white px-2 rounded">
                    ⭐ {order.rating}
                  </span>
                  <span className="text-gray-500">
                    ({order.reviews} Reviews)
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold">
                    {formatPrice(price)}
                  </span>
                  {mrp > 0 && (
                    <span className="line-through text-gray-400 text-sm">
                      {formatPrice(mrp)}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="text-red-500 text-sm font-semibold">
                      {discount}% OFF
                    </span>
                  )}
                </div>

                <p className="text-xs text-green-600 mt-1">
                  ✔ 14 Days return available
                </p>

                {/* ACTION BUTTONS */}
                <div
                  className="flex gap-3 mt-4 max-w-[520px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className="flex-1 border rounded-xl py-2 text-xs text-orange-600 font-semibold">
                    Track Order
                  </button>

                  <button className="flex-1 border rounded-xl py-2 text-xs text-orange-600 font-semibold">
                    Write Review
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
