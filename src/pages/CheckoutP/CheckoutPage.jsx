import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const formatPrice = (price) => `₹${price.toLocaleString()}`;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const [loading, setLoading] = useState(false);

  // price calculation
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const deliveryCharge = 0;
  const total = subtotal + deliveryCharge;

  // dummy address state
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePayNow = () => {
    if (
      !address.name ||
      !address.phone ||
      !address.addressLine ||
      !address.city ||
      !address.pincode
    ) {
      alert("Please fill all address details");
      return;
    }

    setLoading(true);

    // simulate payment success
    setTimeout(() => {
      const orderId = Date.now(); // dummy order id
      clearCart();
      navigate(`/order-success/${orderId}`);
    }, 1200);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl font-bold mb-3">Your cart is empty</h2>
        <Link
          to="/shopping"
          className="text-orange-600 font-semibold hover:underline"
        >
          Go back to shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT – ADDRESS */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border rounded-2xl p-5">
            <h2 className="font-semibold text-lg mb-4">Delivery Address</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <input
                name="name"
                placeholder="Full Name"
                value={address.name}
                onChange={handleChange}
                className="border rounded-xl px-4 py-2"
              />

              <input
                name="phone"
                placeholder="Phone Number"
                value={address.phone}
                onChange={handleChange}
                className="border rounded-xl px-4 py-2"
              />

              <input
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleChange}
                className="border rounded-xl px-4 py-2"
              />

              <input
                name="pincode"
                placeholder="Pincode"
                value={address.pincode}
                onChange={handleChange}
                className="border rounded-xl px-4 py-2"
              />
            </div>

            <textarea
              name="addressLine"
              placeholder="Full Address"
              value={address.addressLine}
              onChange={handleChange}
              className="border rounded-xl px-4 py-2 mt-4 w-full"
              rows={3}
            />
          </div>

          {/* PAYMENT METHOD */}
          <div className="bg-white border rounded-2xl p-5">
            <h2 className="font-semibold text-lg mb-3">Payment Method</h2>

            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2">
                <input type="radio" checked readOnly />
                Cash on Delivery
              </label>

              <label className="flex items-center gap-2 text-gray-400">
                <input type="radio" disabled />
                UPI / Card (Coming soon)
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT – ORDER SUMMARY */}
        <div className="bg-gray-50 border rounded-2xl p-5 h-max">
          <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

          <div className="space-y-3 text-sm">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between"
              >
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>{formatPrice(item.price * item.qty)}</span>
              </div>
            ))}
          </div>

          <div className="border-t mt-4 pt-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-green-600">FREE</span>
            </div>
          </div>

          <div className="flex justify-between font-bold text-lg border-t pt-4 mt-4">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>

          <button
            onClick={handlePayNow}
            disabled={loading}
            className="w-full mt-5 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 disabled:opacity-60"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
