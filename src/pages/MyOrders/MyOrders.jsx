import React from "react";
import { useOrders } from "../../context/OrderContext";

const formatPrice = (p) => `₹${p}`;

export default function MyOrders() {
  const { orders, removeOrder } = useOrders();
  const [activeTab, setActiveTab] = React.useState("All");

  const filteredOrders = React.useMemo(() => {
    if (activeTab === "All") return orders;
    return orders.filter(
      (o) => o.status.toLowerCase() === activeTab.toLowerCase()
    );
  }, [orders, activeTab]);

  if (!orders || orders.length === 0) {
    return (
      <div className="w-full max-w-[90%] mx-auto py-16 text-center">
        <h2 className="text-xl font-semibold">No orders yet</h2>
        <p className="text-sm text-gray-500 mt-2">
          When you place an order, it will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[90%] mx-auto px-3 py-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track, review and manage your purchases
        </p>
      </div>

      {/* TABS */}
      <div className="flex justify-center mb-8">
  <div className="flex bg-gray-900 rounded-xl p-1 text-white text-sm w-full max-w-[90%]">
    {["All", "Ongoing", "Completed"].map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`flex-1 py-2 rounded-lg font-medium transition ${
          activeTab === tab
            ? "bg-yellow-400 text-black"
            : "opacity-70 hover:opacity-100"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
</div>


      {/* ORDER GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredOrders.map((order) => {
          const discount = Math.round(
            ((order.mrp - order.price) / order.mrp) * 100
          );

          const isCompleted = order.status === "completed";

          return (
            <div
              key={order.id}
              className="bg-white rounded-3xl border shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {/* IMAGE + STATUS */}
              <div className="relative">
                <img
                  src={order.image}
                  alt={order.title}
                  className="w-full h-44 object-cover"
                />

                <span
                  className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
                    isCompleted
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {isCompleted ? "Completed" : "Ongoing"}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
                  {order.title}
                </h3>

                {/* RATING */}
                <div className="flex items-center gap-2 text-xs mt-2">
                  <span className="bg-green-600 text-white px-2 py-0.5 rounded">
                    ★ {order.rating}
                  </span>
                  <span className="text-gray-500">
                    {order.reviews} Reviews
                  </span>
                </div>

                {/* PRICE */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(order.price)}
                  </span>
                  <span className="line-through text-gray-400 text-sm">
                    {formatPrice(order.mrp)}
                  </span>
                  <span className="text-red-500 text-sm font-semibold">
                    {discount}% OFF
                  </span>
                </div>

                <p className="text-xs text-green-600 mt-1">
                  ✔ 14 days return available
                </p>

                {/* ACTIONS */}
                <div className="border-t mt-4 pt-4 flex gap-2">
                  {!isCompleted && (
                    <button className="flex-1 rounded-xl border py-2 text-sm font-medium text-orange-600 hover:bg-orange-50">
                      Track
                    </button>
                  )}

                  {isCompleted && (
                    <button className="flex-1 rounded-xl border py-2 text-sm font-medium text-orange-600 hover:bg-orange-50">
                      {order.rating ? "Edit Review" : "Write Review"}
                    </button>
                  )}

                  <button
                    onClick={() => removeOrder(order.id)}
                    className="flex-1 rounded-xl border py-2 text-sm font-medium text-red-500 hover:bg-red-50"
                  >
                    Remove
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
