import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const formatPrice = (price = 0) => `₹${price.toLocaleString()}`;

export default function CartPage() {
  const navigate = useNavigate();

  // ✅ SAFE CONTEXT
  const cartContext = useCart() || {};
  const {
    cartItems = [],
    savedItems = [],
    updateQty = () => {},
    removeFromCart = () => {},
    saveForLater = () => {},
    moveToCart = () => {},
    clearCart = () => {},
  } = cartContext;

  /* ---------------- SUBTOTAL ---------------- */
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 1),
    0
  );

  /* ---------------- DELIVERY CHARGES (🔥 MAIN FIX) ---------------- */
  const deliveryCharge = cartItems.reduce(
    (sum, item) => sum + (item.deliveryCharge || 0),
    0
  );

  const total = subtotal + deliveryCharge;

  /* ================= EMPTY CART ================= */
  if (!cartItems.length && !savedItems.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-3">
          Your cart is empty 🛒
        </h2>
        <Link
          to="/shopping"
          className="text-orange-600 font-semibold hover:underline"
        >
          Continue Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-[95%] lg:max-w-[90%] px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">My Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT – CART ITEMS */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={`${item.productId}-${item.variant?.id || ""}`}
                className="bg-white rounded-2xl shadow-sm border p-5 flex gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-xl"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {item.name}
                  </h3>

                  {item.variant && (
                    <p className="text-xs text-gray-500 mt-1">
                      {item.variant.color && `Color: ${item.variant.color}`}{" "}
                      {item.variant.size && `• Size: ${item.variant.size}`}
                    </p>
                  )}

                  <p className="mt-2 font-bold text-red-600">
                    {formatPrice(item.price)}
                  </p>

                  {/* DELIVERY INFO (OPTIONAL, NICE TOUCH) */}
                  <p className="text-xs text-gray-500 mt-1">
                    Delivery:{" "}
                    {item.deliveryCharge === 0
                      ? "FREE"
                      : formatPrice(item.deliveryCharge)}
                  </p>

                  {/* ACTIONS */}
                  <div className="flex flex-wrap items-center gap-4 mt-4">
                    <div className="flex items-center border rounded-xl overflow-hidden">
                      <button
                        onClick={() =>
                          updateQty(item.productId, item.qty - 1)
                        }
                        disabled={item.qty <= 1}
                        className="px-3 py-1 text-lg disabled:opacity-40"
                      >
                        −
                      </button>

                      <span className="px-4 font-semibold">
                        {item.qty}
                      </span>

                      <button
                        onClick={() =>
                          updateQty(item.productId, item.qty + 1)
                        }
                        className="px-3 py-1 text-lg"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => saveForLater(item.productId)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Save for later
                    </button>

                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* SAVED FOR LATER */}
            {savedItems.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-bold mb-4">
                  Saved for later ({savedItems.length})
                </h2>

                <div className="space-y-4">
                  {savedItems.map((item) => (
                    <div
                      key={item.productId}
                      className="bg-white rounded-2xl border p-4 flex gap-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-xl object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {item.name}
                        </h3>

                        <p className="mt-1 font-bold text-red-600">
                          {formatPrice(item.price)}
                        </p>

                        <button
                          onClick={() => moveToCart(item.productId)}
                          className="mt-2 text-sm text-green-600 hover:underline"
                        >
                          Move to cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT – PRICE SUMMARY */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl shadow-md border p-6">
              <h2 className="text-lg font-semibold mb-4">
                Price Details
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>
                    {deliveryCharge === 0
                      ? "FREE"
                      : formatPrice(deliveryCharge)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold border-t pt-4 mt-4">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="mt-6 w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={clearCart}
                className="mt-3 w-full border py-3 rounded-xl font-semibold"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
