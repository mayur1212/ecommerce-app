import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useOrders } from "../../context/OrderContext";
import products from "../../data/products.json";

const formatPrice = (p = 0) => `₹${Number(p).toLocaleString()}`;

export default function OrderProductDetailPage() {
  const { id } = useParams(); // productId
  const { orders = [] } = useOrders();

  /* ================= FIND PRODUCT ================= */
  const product = useMemo(
    () => products.find((p) => String(p.id) === String(id)),
    [id]
  );

  /* ================= FIND ORDER ================= */
  const order = useMemo(
    () => orders.find((o) => String(o.productId) === String(id)),
    [orders, id]
  );

  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!product || !order) {
    return (
      <div className="mt-20 text-center">
        <p className="text-lg font-semibold">Order not found</p>
        <Link to="/my-orders" className="text-orange-600 font-semibold">
          Back to My Orders →
        </Link>
      </div>
    );
  }

  /* ================= PRICE ================= */
  const mrp = Number(product.price) || 0;
  const price = Number(order.price) || 0;
  const qty = Number(order.qty) || 1;
  const deliveryCharge = Number(product.delivery_charge ?? 0);

  const discount =
    mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

  const total = price * qty + deliveryCharge;

  /* ================= RATINGS ================= */
  const ratingValue = Number(product.rating) || 0;
  const ratingCount = Number(product.rating_count) || 0;
  const reviews = product.reviews || [];

  /* ================= SPECS ================= */
  const specs = {
    Brand: product.brand,
    Category: product.category,
    SKU: product.sku_id,
    Seller: product.seller_name,
    Quantity: qty,
    "Payment Method": order.paymentMethod,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Link
        to="/my-orders"
        className="text-sm text-blue-600 font-semibold hover:underline"
      >
        ← Back to My Orders
      </Link>

      {/* ================= TOP ================= */}
      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* IMAGE */}
        <div className="lg:w-[45%] bg-white border rounded-3xl p-4">
          <img
            src={order.image || product.thumbnail}
            alt={product.name}
            className="w-full h-[420px] object-contain"
          />
        </div>

        {/* DETAILS */}
        <div className="lg:w-[55%] space-y-4">
          <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-lg">
            {product.brand}
          </span>

          <h1 className="text-2xl md:text-3xl font-bold">
            {product.name}
          </h1>

          <p className="text-sm text-gray-500">
            Category: <b>{product.category}</b> • SKU:{" "}
            <b>{product.sku_id}</b>
          </p>

          <div className="flex items-center gap-2 text-sm">
            <span className="bg-green-600 text-white px-2 py-0.5 rounded">
              ⭐ {ratingValue.toFixed(1)}
            </span>
            <span className="text-gray-500">
              ({ratingCount} reviews)
            </span>
          </div>

          <p className="text-green-600 font-semibold">
            ✔ In Stock • {product.stock} left
          </p>

          {/* PRICE BOX */}
          <div className="bg-gray-50 border rounded-2xl p-4 space-y-2">
            <div className="flex gap-3 items-center">
              {mrp > price && (
                <span className="line-through text-gray-400">
                  {formatPrice(mrp)}
                </span>
              )}
              <span className="text-3xl font-bold text-red-600">
                {formatPrice(price)}
              </span>
              {discount > 0 && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  {discount}% OFF
                </span>
              )}
            </div>

            <p>
              You save <b>{formatPrice(mrp - price)}</b> per item
            </p>

            <p>
              Delivery Charge:{" "}
              <b>
                {deliveryCharge === 0
                  ? "FREE"
                  : formatPrice(deliveryCharge)}
              </b>
            </p>

            <div className="bg-blue-50 border rounded-xl px-3 py-2">
              <b>Total for {qty} item:</b>{" "}
              <span className="text-blue-700 font-bold">
                {formatPrice(total)}
              </span>
            </div>
          </div>

          {/* EXTRA INFO */}
          <div className="bg-white border rounded-2xl p-4 text-sm">
            <p>
              <b>Delivery:</b> Delivery charge:{" "}
              {formatPrice(deliveryCharge)}
            </p>
            <p>
              <b>Warranty:</b> No warranty info
            </p>
            <p>
              <b>Return Policy:</b> 7 days return policy
            </p>
            <p>
              <b>SKU:</b> {product.sku_id}
            </p>
          </div>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="mt-10 bg-white rounded-3xl border">
        <div className="flex border-b text-sm font-semibold overflow-x-auto">
          {["description", "specs", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 whitespace-nowrap ${
                activeTab === tab
                  ? "text-orange-600 border-b-2 border-orange-500"
                  : "text-gray-500"
              }`}
            >
              {tab === "description"
                ? "Description"
                : tab === "specs"
                ? "Specifications"
                : `Reviews (${ratingCount})`}
            </button>
          ))}
        </div>

        <div className="p-6 text-gray-700 text-sm">
          {activeTab === "description" && (
            <p className="leading-relaxed">
              {product.description || "No description available."}
            </p>
          )}

          {activeTab === "specs" && (
            <div className="grid sm:grid-cols-2 gap-4">
              {Object.entries(specs).map(([label, value]) => (
                <div key={label}>
                  <p className="text-gray-400 text-xs uppercase">
                    {label}
                  </p>
                  <p className="font-medium">{value}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <>
              {reviews.length === 0 ? (
                <p>No reviews yet.</p>
              ) : (
                reviews.map((r) => (
                  <div
                    key={r.id}
                    className="border rounded-xl p-3 mb-3"
                  >
                    <b>{r.author}</b> ⭐ {r.rating}
                    <p className="mt-1">{r.text}</p>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
