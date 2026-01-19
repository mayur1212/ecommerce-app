import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = (value) => {
    if (!value.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      return "Enter valid email address";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const err = validateEmail(email);
    if (err) {
      setError(err);
      return;
    }

    setLoading(true);
    try {
      // Backend should send reset link / OTP to email
      await api.post("/auth/forgot-password", { email });
      setSuccess("Password reset link sent to your email");
      setEmail("");
    } catch {
      setError("Email not found or something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-900 via-white to-red-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8"
      >
        <h1 className="text-2xl font-extrabold text-center text-red-600 mb-2">
          Forgot Password 🔑
        </h1>

        <p className="text-center text-gray-500 text-sm mb-6">
          Enter your email to receive a password reset link
        </p>

        {error && (
          <p className="bg-red-100 text-red-600 text-sm p-2 rounded-lg mb-4 text-center">
            {error}
          </p>
        )}

        {success && (
          <p className="bg-green-100 text-green-700 text-sm p-2 rounded-lg mb-4 text-center">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-red-700 transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </motion.button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          Remember your password?{" "}
          <Link to="/login" className="text-red-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
