import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrderContext";

const formatPrice = (price = 0) => `₹${price.toLocaleString()}`;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems = [], clearCart } = useCart() || {};
  const { placeOrder } = useOrders();

  const [loading, setLoading] = useState(false);

  /* ---------------- PRICE CALCULATION ---------------- */
  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + (item.price || 0) * (item.qty || 1),
        0
      ),
    [cartItems]
  );

  const deliveryCharge = 0;
  const total = subtotal + deliveryCharge;

  /* ---------------- ADDRESS STATE ---------------- */
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ---------------- PAY NOW ---------------- */
  const handlePayNow = () => {
    if (
      !address.name.trim() ||
      !address.phone.trim() ||
      !address.addressLine.trim() ||
      !address.city.trim() ||
      !address.pincode.trim()
    ) {
      alert("Please fill all delivery details");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const orderId = placeOrder(cartItems, total, address);
      clearCart();
      navigate(`/order-success/${orderId}`);
    }, 1200);
  };

  /* ---------------- EMPTY CART ---------------- */
  if (!cartItems.length) {
    return (
      <div className="max-w-md mx-auto px-4 py-10 text-center">
        <h2 className="text-lg font-semibold mb-2">
          Your cart is empty
        </h2>
        <Link
          to="/shopping"
          className="text-orange-600 font-semibold"
        >
          Continue Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* MAIN CONTAINER */}
      <div className="mx-auto w-full max-w-[95%] lg:max-w-[90%] px-4 py-8">
        <h1 className="text-2xl font-bold mb-8 text-center">
          Checkout
        </h1>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* DELIVERY ADDRESS */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">
                Delivery Address
              </h2>

              <div className="space-y-4">
                <input
                  name="name"
                  placeholder="Full Name"
                  value={address.name}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                />

                <input
                  name="phone"
                  placeholder="Phone Number"
                  value={address.phone}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    name="city"
                    placeholder="City"
                    value={address.city}
                    onChange={handleChange}
                    className="sm:col-span-2 border rounded-xl px-4 py-3"
                  />
                  <input
                    name="pincode"
                    placeholder="Pincode"
                    value={address.pincode}
                    onChange={handleChange}
                    className="border rounded-xl px-4 py-3"
                  />
                </div>

                <textarea
                  name="addressLine"
                  placeholder="Full Address"
                  value={address.addressLine}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">
                Payment Method
              </h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="radio" checked readOnly />
                  <span className="font-medium">
                    Cash on Delivery
                  </span>
                </label>

                <label className="flex items-center gap-3 text-gray-400">
                  <input type="radio" disabled />
                  UPI / Card (Coming soon)
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION – ORDER SUMMARY */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl shadow-md border p-6">
              <h2 className="text-lg font-semibold mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                {cartItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between gap-2"
                  >
                    <span className="truncate">
                      {item.name} × {item.qty}
                    </span>
                    <span className="font-medium">
                      {formatPrice(item.price * item.qty)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t mt-4 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-600">FREE</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold border-t pt-4 mt-4">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <button
                onClick={handlePayNow}
                disabled={loading}
                className="mt-6 w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 disabled:opacity-60"
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
