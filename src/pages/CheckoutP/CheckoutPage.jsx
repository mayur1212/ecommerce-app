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
  const [errors, setErrors] = useState({});

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

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  /* ================= VALIDATION ================= */
  const validateAddress = () => {
    const newErrors = {};

    if (!address.firstName) newErrors.firstName = "First name is required";
    if (!address.lastName) newErrors.lastName = "Last name is required";
    if (!address.mobile) newErrors.mobile = "Mobile number is required";
    if (!address.email) newErrors.email = "Email is required";
    if (!address.addressLine2)
      newErrors.addressLine2 = "House / Building is required";
    if (!address.addressLine1)
      newErrors.addressLine1 = "Street / Area is required";
    if (!address.city) newErrors.city = "City is required";
    if (!address.state) newErrors.state = "State is required";
    if (!address.country) newErrors.country = "Country is required";
    if (!address.pincode) newErrors.pincode = "Pincode is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      (sum, item) =>
        sum + (item.perItemDelivery || 0) * item.qty,
      0
    ),
  [cartItems]
);


  const gst = Math.round(subtotal * 0.05);
  const platformFee = 10;
  const total = subtotal + deliveryCharge + gst + platformFee;

  /* ================= PLACE ORDER ================= */
  const handlePayNow = () => {
    if (!validateAddress()) return;

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
              <h2 className="text-lg font-semibold mb-6">
                Delivery Address
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    name: "firstName",
                    label: "First Name *",
                    placeholder: "Enter first name",
                  },
                  {
                    name: "lastName",
                    label: "Last Name *",
                    placeholder: "Enter last name",
                  },
                  {
                    name: "mobile",
                    label: "Mobile Number *",
                    placeholder: "Enter mobile number",
                  },
                  {
                    name: "alternateMobile",
                    label: "Alternate Mobile",
                    placeholder: "Enter alternate mobile",
                  },
                ].map(({ name, label, placeholder }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium mb-1">
                      {label}
                    </label>
                    <input
                      name={name}
                      value={address[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className={`w-full border rounded-xl px-4 py-3 ${
                        errors[name] ? "border-red-500" : ""
                      }`}
                    />
                    {errors[name] && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors[name]}
                      </p>
                    )}
                  </div>
                ))}

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Email Address *
                  </label>
                  <input
                    name="email"
                    value={address.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className={`w-full border rounded-xl px-4 py-3 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    House / Building *
                  </label>
                  <input
                    name="addressLine2"
                    value={address.addressLine2}
                    onChange={handleChange}
                    placeholder="Enter house / building name"
                    className={`w-full border rounded-xl px-4 py-3 ${
                      errors.addressLine2 ? "border-red-500" : ""
                    }`}
                  />
                  {errors.addressLine2 && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.addressLine2}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Street / Area *
                  </label>
                  <textarea
                    name="addressLine1"
                    rows={3}
                    value={address.addressLine1}
                    onChange={handleChange}
                    placeholder="Enter street / area details"
                    className={`w-full border rounded-xl px-4 py-3 ${
                      errors.addressLine1 ? "border-red-500" : ""
                    }`}
                  />
                  {errors.addressLine1 && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.addressLine1}
                    </p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { field: "city", placeholder: "Enter city" },
                    { field: "state", placeholder: "Enter state" },
                    { field: "country", placeholder: "Enter country" },
                    { field: "pincode", placeholder: "Enter pincode" },
                  ].map(({ field, placeholder }) => (
                    <div key={field}>
                      <label className="block text-sm font-medium mb-1 capitalize">
                        {field} *
                      </label>
                      <input
                        name={field}
                        value={address[field]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className={`w-full border rounded-xl px-4 py-3 ${
                          errors[field] ? "border-red-500" : ""
                        }`}
                      />
                      {errors[field] && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors[field]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="bg-white rounded-2xl border p-6">
              <h2 className="text-lg font-semibold mb-4">
                Payment Method
              </h2>

              {[
                { id: "cod", label: "Cash on Delivery" },
                { id: "upi", label: "UPI / Online Payment" },
                { id: "wallet", label: "Wallet Payment" },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer mt-3 ${
                    paymentMethod === method.id
                      ? "border-orange-500 bg-orange-50"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id)}
                  />
                  <span className="font-medium">
                    {method.label}
                  </span>
                </label>
              ))}
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
