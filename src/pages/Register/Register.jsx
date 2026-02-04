import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../api/axios";
import toast from "react-hot-toast";

/* ================= OTP MODAL ================= */
function OtpModal({ phone, onClose, onSuccess }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  /* ===== VERIFY OTP ===== */
  const verifyOtp = async () => {
    if (!/^\d{6}$/.test(otp)) {
      toast.error("Enter valid 6 digit OTP");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("otp", otp);

      await api.post("/auth/verify-registration-otp", formData);

      toast.success("Registration successful 🎉");
      onSuccess();
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Invalid or expired OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ===== RESEND OTP ===== */
  const resendOtp = async () => {
    if (cooldown > 0) return;

    try {
      const formData = new FormData();
      formData.append("country_code", "91");
      formData.append("phone", phone);

      await api.post("/auth/resend-registration-otp", formData);

      toast.success("OTP resent 📲");
      setCooldown(30); // ⏱ 30 sec wait
    } catch (err) {
      if (err?.response?.status === 429) {
        toast.error("Please wait before resending OTP");
      } else {
        toast.error("Failed to resend OTP");
      }
    }
  };

  /* ===== COOLDOWN TIMER ===== */
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((c) => c - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm">
        <h2 className="text-xl font-bold text-center text-red-600">
          Verify OTP
        </h2>

        <p className="text-sm text-center text-gray-500 mt-1">
          OTP sent to <b>+91 {phone}</b>
        </p>

        <input
          maxLength={6}
          className="mt-4 w-full border px-4 py-3 rounded-xl text-center tracking-widest"
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value.replace(/\D/g, ""))
          }
        />

        <button
          onClick={verifyOtp}
          disabled={loading}
          className="mt-4 w-full bg-red-600 text-white py-3 rounded-xl"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <button
          onClick={resendOtp}
          disabled={cooldown > 0}
          className="mt-2 w-full text-red-600 text-sm disabled:opacity-50"
        >
          {cooldown > 0
            ? `Resend in ${cooldown}s`
            : "Resend OTP"}
        </button>

        <button
          onClick={onClose}
          className="mt-2 w-full text-gray-500 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

/* ================= REGISTER PAGE ================= */
export default function Register() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  /* ===== SEND OTP ===== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (showOtp) return; // ⛔ prevent double register

    if (!/^\d{10}$/.test(phone)) {
      toast.error("Phone must be 10 digits");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("country_code", "91");
      formData.append("phone", phone);

      await api.post("/auth/register", formData);

      toast.success("OTP sent 📲");
      setShowOtp(true);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "OTP already sent"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-900 via-white to-rose-300 px-4">
      <motion.div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-center text-red-600">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex">
            <span className="px-3 py-3 border bg-gray-100 rounded-l-xl">
              +91
            </span>
            <input
              maxLength={10}
              className="w-full border px-4 py-3 rounded-r-xl"
              placeholder="Mobile number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, ""))
              }
            />
          </div>

          <button
            disabled={loading}
            className="w-full mt-4 bg-red-600 text-white py-3 rounded-xl"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already registered?{" "}
          <Link to="/login" className="text-red-600 font-semibold">
            Login
          </Link>
        </p>
      </motion.div>

      {showOtp && (
        <OtpModal
          phone={phone}
          onClose={() => setShowOtp(false)}
          onSuccess={() => navigate("/login")}
        />
      )}
    </div>
  );
}
