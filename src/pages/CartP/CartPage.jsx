import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const formatPrice = (price) => `₹${price.toLocaleString()}`;

export default function CartPage() {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQty,
    clearCart,
  } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl font-bold mb-3">Your cart is empty 🛒</h2>
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
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>

      {/* CART ITEMS */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={`${item.productId}-${item.variant?.id || ""}`}
            className="flex gap-4 border rounded-2xl p-4 bg-white"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-xl"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{item.name}</h3>

              {item.variant && (
                <p className="text-xs text-gray-500 mt-1">
                  {item.variant.color && `Color: ${item.variant.color}`}{" "}
                  {item.variant.size && `• Size: ${item.variant.size}`}
                </p>
              )}

              <p className="mt-2 font-bold text-red-600">
                {formatPrice(item.price)}
              </p>

              {/* QTY CONTROLS */}
              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() =>
                    updateQty(item.productId, item.qty - 1)
                  }
                  className="w-8 h-8 border rounded-full"
                  disabled={item.qty <= 1}
                >
                  −
                </button>

                <span className="font-semibold">{item.qty}</span>

                <button
                  onClick={() =>
                    updateQty(item.productId, item.qty + 1)
                  }
                  className="w-8 h-8 border rounded-full"
                >
                  +
                </button>
              </div>
            </div>

            {/* REMOVE */}
            <button
              onClick={() => removeFromCart(item.productId)}
              className="text-sm text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* PRICE SUMMARY */}
      <div className="mt-8 border rounded-2xl p-5 bg-gray-50">
        <div className="flex justify-between text-sm mb-2">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm mb-2">
          <span>Delivery</span>
          <span className="text-green-600">FREE</span>
        </div>

        <div className="flex justify-between text-lg font-bold border-t pt-3">
          <span>Total</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex gap-4 mt-5">
          <button
            onClick={() => navigate("/checkout")}
            className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600"
          >
            Proceed to Checkout
          </button>

          <button
            onClick={clearCart}
            className="px-6 py-3 border rounded-xl font-semibold"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
