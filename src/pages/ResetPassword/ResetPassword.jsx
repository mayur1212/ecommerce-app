import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../api/axios";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.password || !form.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!token) {
      setError("Invalid or missing reset token");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/reset-password", {
        token,
        password: form.password,
      });
      setSuccess("Password reset successful. Please login.");
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setError("Reset link expired or invalid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-900 via-white to-red-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8"
      >
        <h1 className="text-2xl font-extrabold text-center text-red-600 mb-2">
          Reset Password 🔐
        </h1>

        <p className="text-center text-gray-500 text-sm mb-6">
          Create a new password for your account
        </p>

        {error && (
          <p className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4">
            {error}
          </p>
        )}

        {success && (
          <p className="bg-green-100 text-green-700 text-sm p-2 rounded mb-4">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter new password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Confirm new password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold shadow-lg"
          >
            {loading ? "Updating..." : "Reset Password"}
          </motion.button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          Back to{" "}
          <Link to="/login" className="text-red-600 font-semibold">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
