import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const formatPrice = (price = 0) => `₹${price.toLocaleString()}`;

export default function CartPage() {
  const navigate = useNavigate();

  const {
    cartItems = [],
    savedItems = [],
    updateQty = () => {},
    removeFromCart = () => {},
    saveForLater = () => {},
    clearCart = () => {},
  } = useCart() || {};

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 1),
    0
  );

  const deliveryCharge = cartItems.reduce(
  (sum, item) =>
    sum + (item.perItemDelivery || 0) * (item.qty || 1),
  0
);


  const total = subtotal + deliveryCharge;

  if (!cartItems.length && !savedItems.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-3">
          Your cart is empty 🛒
        </h2>
        <Link to="/shopping" className="text-orange-600 font-semibold">
          Continue Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-[1200px] px-3 sm:px-4 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-6">My Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-5">
            {cartItems.map((item) => (
              <div
                key={`${item.productId}-${item.variant?.id || ""}`}
                className="bg-white rounded-2xl border p-4 sm:p-5 flex gap-4"
              >
                {/* IMAGE */}
                <Link
                  to={`/cart-product/${item.productId}?color=${item.variant?.color || ""}&size=${item.variant?.size || ""}&weight=${item.variant?.weight || ""}&qty=${item.qty}`}
                  className="shrink-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      w-24 h-24 sm:w-28 sm:h-28
                      aspect-square
                      object-cover
                      rounded-xl
                      bg-gray-100
                    "
                  />
                </Link>

                {/* CONTENT */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link
                      to={`/cart-product/${item.productId}`}
                      className="hover:underline"
                    >
                      <h3 className="text-sm sm:text-base font-semibold leading-snug">
                        {item.name}
                      </h3>
                    </Link>

                    {item.variant && (
                      <p className="text-xs text-gray-500 mt-1">
                        {item.variant.color && `Color: ${item.variant.color}`}{" "}
                        {item.variant.size && `• Size: ${item.variant.size}`}{" "}
                        {item.variant.weight &&
                          `• Weight: ${item.variant.weight}`}
                      </p>
                    )}

                    <p className="mt-2 font-bold text-red-600 text-sm sm:text-base">
                      {formatPrice(item.price)}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
  Delivery:{" "}
  {item.perItemDelivery === 0
    ? "FREE"
    : formatPrice(item.perItemDelivery * item.qty)}
</p>

                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    {/* QTY */}
                    <div className="flex items-center border rounded-xl overflow-hidden">
                      <button
                        onClick={() =>
                          updateQty(item.productId, item.qty - 1)
                        }
                        disabled={item.qty <= 1}
                        className="px-3 py-1.5 text-lg disabled:opacity-40"
                      >
                        −
                      </button>

                      <span className="px-4 font-semibold text-sm">
                        {item.qty}
                      </span>

                      <button
                        onClick={() =>
                          updateQty(item.productId, item.qty + 1)
                        }
                        className="px-3 py-1.5 text-lg"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => saveForLater(item.productId)}
                      className="text-xs sm:text-sm text-blue-600"
                    >
                      Save for later
                    </button>

                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-xs sm:text-sm text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border p-5">
              <h2 className="font-semibold mb-4">Price Details</h2>

              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between text-sm mt-2">
                <span>Delivery</span>
                <span>
                  {deliveryCharge === 0
                    ? "FREE"
                    : formatPrice(deliveryCharge)}
                </span>
              </div>

              <div className="flex justify-between font-bold text-base border-t mt-4 pt-4">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="
                  mt-6 w-full bg-orange-500 hover:bg-orange-600
                  text-white py-3 rounded-xl font-semibold
                  transition
                "
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
