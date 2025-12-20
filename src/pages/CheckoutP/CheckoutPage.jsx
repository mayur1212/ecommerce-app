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

  /* ---------------- LIVE LOCATION ---------------- */
  const useLiveLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        setAddress((prev) => ({
          ...prev,
          addressLine: `Lat ${latitude}, Lng ${longitude}`,
          city: "Auto detected",
          pincode: "------",
        }));
      },
      () => alert("Unable to fetch live location")
    );
  };

  /* ---------------- PRICE CALCULATION ---------------- */

  // Subtotal
  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
  }, [cartItems]);

  // 🔥 DELIVERY CHARGE = SUM of all products
  const deliveryCharge = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + (item.deliveryCharge || 0),
      0
    );
  }, [cartItems]);

  const gst = Math.round(subtotal * 0.05); // 5% GST
  const platformFee = 10;

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const applyCoupon = () => {
    if (coupon === "SAVE10") {
      setDiscount(Math.round(subtotal * 0.1));
    } else {
      setDiscount(0);
      alert("Invalid coupon");
    }
  };

  const total =
    subtotal +
    deliveryCharge +
    gst +
    platformFee -
    discount;

  /* ---------------- PLACE ORDER ---------------- */
  const handlePayNow = () => {
    const { name, phone, addressLine, city, pincode } = address;

    if (!name || !phone || !addressLine || !city || !pincode) {
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

                <textarea
                  name="addressLine"
                  placeholder="Full Address"
                  value={address.addressLine}
                  onChange={handleChange}
                  rows={3}
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

                <button
                  onClick={useLiveLocation}
                  className="w-full border border-blue-500 text-blue-600 py-2 rounded-xl font-semibold hover:bg-blue-50"
                >
                  📍 Use Live Location
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">
                Payment Method
              </h2>

              <label className="flex items-center gap-3">
                <input type="radio" checked readOnly />
                <span className="font-medium">
                  Cash on Delivery
                </span>
              </label>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl shadow-md border p-6">
              <h2 className="text-lg font-semibold mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex justify-between">
                    <span>{item.name} × {item.qty}</span>
                    <span>{formatPrice(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t mt-4 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery charges</span>
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

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between text-lg font-bold border-t pt-4 mt-4">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <div className="flex gap-2 mt-4">
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Coupon code"
                  className="flex-1 border rounded-xl px-3 py-2"
                />
                <button
                  onClick={applyCoupon}
                  className="bg-black text-white px-4 rounded-xl"
                >
                  Apply
                </button>
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
