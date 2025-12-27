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
    moveToCart = () => {},
    clearCart = () => {},
  } = useCart() || {};

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 1),
    0
  );

  const deliveryCharge = cartItems.reduce(
    (sum, item) => sum + (item.deliveryCharge || 0),
    0
  );

  const total = subtotal + deliveryCharge;

  if (!cartItems.length && !savedItems.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-3">Your cart is empty 🛒</h2>
        <Link to="/shopping" className="text-orange-600 font-semibold">
          Continue Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-[90%] px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">My Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={`${item.productId}-${item.variant?.id || ""}`}
                className="bg-white rounded-2xl border p-5 flex gap-4"
              >
                {/* 🔥 LINK WITH PARAMS */}
                <Link
                  to={`/cart-product/${item.productId}?color=${item.variant?.color || ""}&size=${item.variant?.size || ""}&weight=${item.variant?.weight || ""}&qty=${item.qty}`}
                  className="flex gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-xl"
                  />
                </Link>

                <div className="flex-1">
                  <Link
                    to={`/cart-product/${item.productId}?color=${item.variant?.color || ""}&size=${item.variant?.size || ""}&weight=${item.variant?.weight || ""}&qty=${item.qty}`}
                    className="hover:underline"
                  >
                    <h3 className="font-semibold">{item.name}</h3>
                  </Link>

                  {item.variant && (
                    <p className="text-xs text-gray-500 mt-1">
                      {item.variant.color && `Color: ${item.variant.color}`}{" "}
                      {item.variant.size && `• Size: ${item.variant.size}`}{" "}
                      {item.variant.weight && `• Weight: ${item.variant.weight}`}
                    </p>
                  )}

                  <p className="mt-2 font-bold text-red-600">
                    {formatPrice(item.price)}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Delivery:{" "}
                    {item.deliveryCharge === 0
                      ? "FREE"
                      : formatPrice(item.deliveryCharge)}
                  </p>

                  {/* QTY */}
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border rounded-xl">
                      <button
                        onClick={() =>
                          updateQty(item.productId, item.qty - 1)
                        }
                        disabled={item.qty <= 1}
                        className="px-3 py-1 text-lg"
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
                      className="text-sm text-blue-600"
                    >
                      Save for later
                    </button>

                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-sm text-red-500"
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
            <div className="bg-white rounded-2xl border p-6">
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

              <div className="flex justify-between font-bold text-lg border-t mt-4 pt-4">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="mt-6 w-full bg-orange-500 text-white py-3 rounded-xl font-semibold"
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
