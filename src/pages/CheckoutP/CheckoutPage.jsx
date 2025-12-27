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

  /* ================= ADDRESS STATE ================= */
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

  /* ================= PAYMENT STATE ================= */
  const [paymentMethod, setPaymentMethod] = useState(""); // "" | "cod" | "upi"

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
    const {
      firstName,
      lastName,
      mobile,
      email,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      pincode,
    } = address;

    if (
      !firstName ||
      !lastName ||
      !mobile ||
      !email ||
      !addressLine1 ||
      !addressLine2 ||
      !city ||
      !state ||
      !country ||
      !pincode
    ) {
      alert("Please fill all required delivery address fields");
      return;
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
    }, 1200);
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
                <input name="firstName" placeholder="First Name *" value={address.firstName} onChange={handleChange} className="border rounded-xl px-4 py-3" />
                <input name="lastName" placeholder="Last Name *" value={address.lastName} onChange={handleChange} className="border rounded-xl px-4 py-3" />
                <input name="mobile" placeholder="Mobile Number *" value={address.mobile} onChange={handleChange} className="border rounded-xl px-4 py-3" />
                <input name="alternateMobile" placeholder="Alternate Mobile (Optional)" value={address.alternateMobile} onChange={handleChange} className="border rounded-xl px-4 py-3" />
                <input name="email" placeholder="Email Address *" value={address.email} onChange={handleChange} className="border rounded-xl px-4 py-3 sm:col-span-2" />
              </div>

              <div className="mt-4 space-y-4">
                <input name="addressLine2" placeholder="Address Line 2 (House / Building) *" value={address.addressLine2} onChange={handleChange} className="w-full border rounded-xl px-4 py-3" />
                <textarea name="addressLine1" placeholder="Address Line 1 (Street / Area) *" value={address.addressLine1} onChange={handleChange} rows={3} className="w-full border rounded-xl px-4 py-3" />

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <input name="city" placeholder="Town / City *" value={address.city} onChange={handleChange} className="border rounded-xl px-4 py-3" />
                  <input name="state" placeholder="State *" value={address.state} onChange={handleChange} className="border rounded-xl px-4 py-3" />
                  <input name="country" placeholder="Country *" value={address.country} onChange={handleChange} className="border rounded-xl px-4 py-3" />
                  <input name="pincode" placeholder="Pin Code *" value={address.pincode} onChange={handleChange} className="border rounded-xl px-4 py-3" />
                </div>
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="bg-white rounded-2xl border p-6">
              <h2 className="text-lg font-semibold mb-4">
                Payment Method
              </h2>

              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer ${paymentMethod === "cod" ? "border-orange-500 bg-orange-50" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <span className="font-medium">Cash on Delivery</span>
                </label>

                <label className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer ${paymentMethod === "upi" ? "border-orange-500 bg-orange-50" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                  />
                  <span className="font-medium">UPI / Online Payment</span>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl border p-6">
              <h2 className="text-lg font-semibold mb-4">
                Order Summary
              </h2>

              <div className="space-y-2 text-sm">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex justify-between">
                    <span>{item.name} × {item.qty}</span>
                    <span>{formatPrice(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t mt-4 pt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between"><span>Delivery</span><span>{deliveryCharge === 0 ? "FREE" : formatPrice(deliveryCharge)}</span></div>
                <div className="flex justify-between"><span>GST (5%)</span><span>{formatPrice(gst)}</span></div>
                <div className="flex justify-between"><span>Platform Fee</span><span>{formatPrice(platformFee)}</span></div>
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
