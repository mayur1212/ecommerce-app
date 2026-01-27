import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api/axios";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [tab, setTab] = useState("email"); // email | mobile
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    mobile: "",
    password: "",
    otp: "",
  });

  const [showOtp, setShowOtp] = useState(false);

  /* ================= LOGIN ================= */
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.password) {
      toast.error("Password required");
      return;
    }

    if (tab === "email" && !form.email) {
      toast.error("Email required");
      return;
    }

    if (tab === "mobile" && !form.mobile) {
      toast.error("Mobile number required");
      return;
    }

    try {
      setLoading(true);

      // 🔥 ONLY LOGIN API (NO OTP VERIFY BACKEND)
      const payload = new FormData();
      payload.append("type", tab);
      payload.append(
        "identifier",
        tab === "email" ? form.email : form.mobile
      );
      payload.append("password", form.password);

      await api.post("auth/login", payload);

      toast.success("OTP sent successfully 📩");
      setShowOtp(true);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= STATIC OTP VERIFY ================= */
  const verifyOtp = async () => {
    // ✅ ANY 6 DIGIT OTP ACCEPT
    if (!/^\d{6}$/.test(form.otp)) {
      toast.error("Enter valid 6 digit OTP");
      return;
    }

    try {
      setOtpLoading(true);

      // 🎯 STATIC SUCCESS (NO API CALL)
      toast.success("Login successful 🎉");

      // 👉 Fake token & user (for now)
      localStorage.setItem("token", "static-demo-token");

      localStorage.setItem(
        "user",
        JSON.stringify({
          email: form.email,
          mobile: form.mobile,
        })
      );

      navigate("/");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-700 via-white to-red-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8"
      >
        <h1 className="text-3xl font-extrabold text-center text-red-600">
          Login
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Welcome back 👋
        </p>

        {/* TABS */}
        <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
          {["email", "mobile"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${
                tab === t
                  ? "bg-red-600 text-white shadow"
                  : "text-gray-600"
              }`}
            >
              {t === "email" ? "Email Login" : "Mobile Login"}
            </button>
          ))}
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          {tab === "email" ? (
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          ) : (
            <input
              type="tel"
              placeholder="Mobile number"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500"
              value={form.mobile}
              onChange={(e) =>
                setForm({ ...form, mobile: e.target.value })
              }
            />
          )}

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition"
          >
            {loading ? "Sending OTP..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-red-600 font-semibold">
            Register
          </Link>
        </p>
      </motion.div>

      {/* ================= OTP MODAL ================= */}
      <AnimatePresence>
        {showOtp && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl p-6 w-[90%] max-w-sm"
            >
              <h2 className="text-xl font-bold text-center text-red-600">
                OTP Verification
              </h2>

              <p className="text-sm text-center text-gray-500 mt-1">
                Enter any <b>6 digit OTP</b>
              </p>

              <input
                type="text"
                maxLength={6}
                placeholder="******"
                className="mt-4 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 text-center tracking-widest"
                value={form.otp}
                onChange={(e) =>
                  setForm({ ...form, otp: e.target.value })
                }
              />

              <button
                onClick={verifyOtp}
                disabled={otpLoading}
                className="mt-4 w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700"
              >
                {otpLoading ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                onClick={() => setShowOtp(false)}
                className="mt-3 w-full text-sm text-gray-500"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
