import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrderContext";

const formatPrice = (price = 0) => `₹${price.toLocaleString()}`;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems = [], clearCart } = useCart();
  const { placeOrder } = useOrders();

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  /* ================= ADDRESS ================= */
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    alternateMobile: "",
    email: "",
    addressLine2: "",
    addressLine1: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ================= PRICE ================= */
  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      ),
    [cartItems]
  );

  const deliveryCharge = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + (item.deliveryCharge || 0),
        0
      ),
    [cartItems]
  );

  const gst = Math.round(subtotal * 0.05);
  const platformFee = 10;
  const total = subtotal + deliveryCharge + gst + platformFee;

  /* ================= PLACE ORDER ================= */
  const handlePayNow = () => {
    const required = [
      "firstName",
      "lastName",
      "mobile",
      "email",
      "addressLine1",
      "addressLine2",
      "city",
      "state",
      "country",
      "pincode",
    ];

    for (let key of required) {
      if (!address[key]) {
        alert("Please fill all required delivery address fields");
        return;
      }
    }

    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const orderId = placeOrder(cartItems, total, {
        ...address,
        paymentMethod,
      });

      clearCart();
      navigate(`/order-success/${orderId}`);
    }, 1000);
  };

  /* ================= EMPTY CART ================= */
  if (!cartItems.length) {
    return (
      <div className="max-w-md mx-auto px-4 py-10 text-center">
        <h2 className="text-lg font-semibold mb-2">
          Your cart is empty
        </h2>
        <Link to="/shopping" className="text-orange-600 font-semibold">
          Continue Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-[95%] lg:max-w-[90%] px-4 py-8">
        <h1 className="text-2xl font-bold mb-8 text-center">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* DELIVERY ADDRESS */}
            <div className="bg-white rounded-2xl border p-6">
              <h2 className="text-lg font-semibold mb-4">
                Delivery Address
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  ["firstName", "First Name *"],
                  ["lastName", "Last Name *"],
                  ["mobile", "Mobile Number *"],
                  ["alternateMobile", "Alternate Mobile"],
                ].map(([name, label]) => (
                  <input
                    key={name}
                    name={name}
                    placeholder={label}
                    value={address[name]}
                    onChange={handleChange}
                    className="border rounded-xl px-4 py-3"
                  />
                ))}

                <input
                  name="email"
                  placeholder="Email Address *"
                  value={address.email}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-3 sm:col-span-2"
                />
              </div>

              <div className="mt-4 space-y-4">
                <input
                  name="addressLine2"
                  placeholder="House / Building *"
                  value={address.addressLine2}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                />

                <textarea
                  name="addressLine1"
                  placeholder="Street / Area *"
                  value={address.addressLine1}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border rounded-xl px-4 py-3"
                />

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {["city", "state", "country", "pincode"].map((field) => (
                    <input
                      key={field}
                      name={field}
                      placeholder={`${field} *`}
                      value={address[field]}
                      onChange={handleChange}
                      className="border rounded-xl px-4 py-3"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="bg-white rounded-2xl border p-6">
              <h2 className="text-lg font-semibold mb-4">
                Payment Method
              </h2>

              {/* COD */}
              <label
                className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer ${
                  paymentMethod === "cod"
                    ? "border-orange-500 bg-orange-50"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <span className="font-medium">Cash on Delivery</span>
              </label>

              {/* UPI */}
              <label
                className={`mt-3 flex items-center gap-3 p-3 border rounded-xl cursor-pointer ${
                  paymentMethod === "upi"
                    ? "border-orange-500 bg-orange-50"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "upi"}
                  onChange={() => setPaymentMethod("upi")}
                />
                <span className="font-medium">
                  UPI / Online Payment
                </span>
              </label>

              {/* WALLET (NEW) */}
              <label
                className={`mt-3 flex items-center gap-3 p-3 border rounded-xl cursor-pointer ${
                  paymentMethod === "wallet"
                    ? "border-orange-500 bg-orange-50"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "wallet"}
                  onChange={() => setPaymentMethod("wallet")}
                />
                <span className="font-medium">
                  Wallet Payment
                </span>
              </label>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl border p-6">
              <h2 className="text-lg font-semibold mb-4">
                Order Summary
              </h2>

              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between text-sm"
                >
                  <span>
                    {item.name} × {item.qty}
                  </span>
                  <span>
                    {formatPrice(item.price * item.qty)}
                  </span>
                </div>
              ))}

              <div className="border-t mt-4 pt-4 space-y-2 text-sm">
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
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span>{formatPrice(gst)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee</span>
                  <span>{formatPrice(platformFee)}</span>
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
