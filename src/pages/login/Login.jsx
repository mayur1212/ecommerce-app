import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

/* ================= OTP MODAL ================= */
function OtpModal({ type, identifier, onClose, onSuccess }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  /* ===== VERIFY OTP ===== */
  const verifyOtp = async () => {
  if (!/^\d{6}$/.test(otp)) {
    toast.error("Enter valid 6 digit OTP");
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("type", type);
    formData.append("identifier", identifier);
    formData.append("otp", otp); // ✅ backend confirmed key

    if (type === "phone") {
      formData.append("country_code", "91");
    }

    console.log("VERIFY OTP PAYLOAD", {
      type,
      identifier,
      otp
    });

    const res = await api.post(
      "/auth/verify-login-otp",
      formData
    );

    toast.success("Login successful 🎉");
    onSuccess(res.data.token);
  } catch (err) {
    console.error("VERIFY OTP ERROR 👉", err?.response?.data);
    toast.error(
      err?.response?.data?.error?.message ||
      err?.response?.data?.message ||
      "OTP invalid or expired. Please resend OTP."
    );
  } finally {
    setLoading(false);
  }
};



  /* ===== RESEND OTP ===== */
  const resendOtp = async () => {
    try {
      const formData = new FormData();
      formData.append("type", type);
      formData.append("identifier", identifier.trim().toLowerCase());

      if (type === "phone") {
        formData.append("country_code", "91");
      }

      await api.post("/auth/resend-login-otp", formData);
      toast.success("OTP resent successfully 📲");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-6 w-[90%] max-w-sm"
      >
        <h2 className="text-xl font-bold text-center text-red-600">
          OTP Verification
        </h2>

        <p className="text-sm text-center text-gray-500 mt-1">
          OTP sent to <b>{identifier}</b>
        </p>

        <input
          maxLength={6}
          className="mt-4 w-full px-4 py-3 border rounded-xl text-center tracking-widest"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
        />

        <button
          onClick={verifyOtp}
          disabled={loading}
          className="mt-4 w-full bg-red-600 text-white py-3 rounded-xl font-semibold"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <button
          onClick={resendOtp}
          className="mt-2 w-full text-sm text-red-600"
        >
          Resend OTP
        </button>

        <button
          onClick={onClose}
          className="mt-2 w-full text-sm text-gray-500"
        >
          Cancel
        </button>
      </motion.div>
    </div>
  );
}

/* ================= LOGIN PAGE ================= */
export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [tab, setTab] = useState("email");
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const redirectTo = location.state?.from || "/profile";

  /* ===== SEND OTP ===== */
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!identifier.trim()) {
      toast.error(tab === "email" ? "Email required" : "Phone required");
      return;
    }

    if (tab === "phone" && !/^\d{10}$/.test(identifier)) {
      toast.error("Phone must be 10 digits");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("type", tab);
      formData.append("identifier", identifier.trim().toLowerCase());

      if (tab === "phone") {
        formData.append("country_code", "91");
      }

      await api.post("/auth/login", formData);

      toast.success("OTP sent successfully 📩");
      setShowOtp(true);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ===== OTP SUCCESS ===== */
  const handleOtpSuccess = (token) => {
    login(token);
    setShowOtp(false);
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-700 via-white to-red-200 px-4">
      <motion.div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-red-600">
          Login
        </h1>

        {/* Tabs */}
        <div className="flex mt-6 mb-6 bg-gray-100 rounded-xl p-1">
          {["email", "phone"].map((t) => (
            <button
              key={t}
              onClick={() => {
                if (!showOtp) {
                  setTab(t);
                  setIdentifier("");
                }
              }}
              className={`flex-1 py-2 rounded-xl ${
                tab === t ? "bg-red-600 text-white" : "text-gray-600"
              }`}
            >
              {t === "email" ? "Email Login" : "Mobile Login"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {tab === "phone" ? (
            <div className="flex">
              <span className="px-3 py-3 border bg-gray-100 rounded-l-xl">
                +91
              </span>
              <input
                disabled={showOtp}
                maxLength={10}
                className="w-full border px-4 py-3 rounded-r-xl"
                placeholder="Mobile number"
                value={identifier}
                onChange={(e) =>
                  setIdentifier(e.target.value.replace(/\D/g, ""))
                }
              />
            </div>
          ) : (
            <input
              disabled={showOtp}
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 border rounded-xl"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          )}

          <button
            disabled={loading || showOtp}
            className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Sending OTP..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-red-600 font-semibold">
            Register
          </Link>
        </p>
      </motion.div>

      <AnimatePresence>
        {showOtp && (
          <OtpModal
            type={tab}
            identifier={identifier}
            onClose={() => setShowOtp(false)}
            onSuccess={handleOtpSuccess}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
