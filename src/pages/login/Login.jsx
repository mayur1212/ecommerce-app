import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  /* ================= VALIDATION ================= */
  const validate = () => {
    const e = {};

    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) {
      e.email = "Enter valid email address";
    }

    if (!form.password) {
      e.password = "Password is required";
    } else if (form.password.length < 6) {
      e.password = "Minimum 6 characters required";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setErrors({});

    if (!validate()) return;

    setLoading(true);
    try {
      const payload = new FormData();
      payload.append("type", "email");
      payload.append("identifier", form.email);
      payload.append("password", form.password);

      const res = await api.post("auth/login", payload);

      // ✅ SAVE AUTH DATA
      localStorage.setItem("token", res.data.data.access_token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.data.customer)
      );

      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-900 via-white to-red-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8"
      >
        <h1 className="text-3xl font-extrabold text-center text-red-600 mb-2">
          Welcome Back 👋
        </h1>

        <p className="text-center text-gray-500 text-sm mb-6">
          Login to continue shopping
        </p>

        {error && (
          <p className="bg-red-100 text-red-600 text-sm p-2 rounded-lg mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-red-500"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value.replace(/\s/g, ""),
                })
              }
            />

            <div className="text-right mt-1">
              <Link
                to="/forgot-password"
                className="text-sm text-red-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password}
              </p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-red-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-red-600 font-semibold">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
