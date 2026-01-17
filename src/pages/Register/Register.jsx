import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../api/axios";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    country_code: "+91",
    phone: "",
    gender: "",
    dob: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  /* ================= VALIDATION ================= */
  const validate = () => {
    const e = {};

    if (!form.username.trim()) {
      e.username = "Username is required";
    } else if (!/^[a-zA-Z0-9_]{4,}$/.test(form.username)) {
      e.username = "Min 4 chars, letters/numbers/_ only";
    }

    if (!form.name.trim()) {
      e.name = "Full name is required";
    } else if (!/^[A-Za-z\s]+$/.test(form.name)) {
      e.name = "Only alphabets allowed";
    }

    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) {
      e.email = "Enter valid email address";
    }

    if (!/^\d{10}$/.test(form.phone)) {
      e.phone = "Phone must be 10 digits";
    }

    if (!form.gender) {
      e.gender = "Select gender";
    }

    if (!form.dob) {
      e.dob = "Date of birth required";
    } else {
      const dob = new Date(form.dob);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
      if (age < 13) e.dob = "Age must be 13+";
    }

    if (form.password.length < 6) {
      e.password = "Minimum 6 characters required";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      await api.post("/auth/register", fd);
      navigate("/login");
    } catch {
      setError("Username or Email already exists");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI CLASSES ================= */
  const inputClass =
    "w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200";

  const labelClass = "text-xs sm:text-sm font-medium text-gray-600";

  const errorClass = "text-xs text-red-500 mt-1";

  return (
    
    <div className="min-h-screen flex items-start sm:items-center justify-center 
bg-gradient-to-br from-rose-900 via-white to-rose-300 
px-3 sm:px-4 py-8 sm:py-0">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    
        className="w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl 
shadow-xl p-5 sm:p-8 my-4 sm:my-0"

      >
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-red-600 mb-1">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-5 text-xs sm:text-sm">
          Register to get started 🚀
        </p>

        {error && (
          <p className="bg-red-50 text-red-600 text-xs sm:text-sm p-2 rounded-lg mb-4 text-center">
            {error}
          </p>
        )}

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label className={labelClass}>Username</label>
            <input
              className={inputClass}
              value={form.username}
              onChange={(e) =>
                setForm({
                  ...form,
                  username: e.target.value.replace(/[^a-zA-Z0-9_]/g, ""),
                })
              }
            />
            {errors.username && <p className={errorClass}>{errors.username}</p>}
          </div>

          {/* Full Name */}
          <div>
            <label className={labelClass}>Full Name</label>
            <input
              className={inputClass}
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value.replace(/[^A-Za-z\s]/g, ""),
                })
              }
            />
            {errors.name && <p className={errorClass}>{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              className={inputClass}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <p className={errorClass}>{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className={labelClass}>Phone</label>
            <input
              maxLength={10}
              className={inputClass}
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })
              }
            />
            {errors.phone && <p className={errorClass}>{errors.phone}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className={labelClass}>Gender</label>
            <select
              className={inputClass}
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <p className={errorClass}>{errors.gender}</p>}
          </div>

          {/* DOB */}
          <div>
            <label className={labelClass}>Date of Birth</label>
            <input
              type="date"
              className={inputClass}
              value={form.dob}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
            />
            {errors.dob && <p className={errorClass}>{errors.dob}</p>}
          </div>

          {/* Password */}
          <div className="md:col-span-2">
            <label className={labelClass}>Password</label>
            <input
              type="password"
              className={inputClass}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {errors.password && <p className={errorClass}>{errors.password}</p>}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            disabled={loading}
            className="md:col-span-2 bg-gradient-to-r from-red-600 to-rose-500 text-white py-3 rounded-xl font-semibold shadow-md"
          >
            {loading ? "Creating..." : "Create Account"}
          </motion.button>
        </form>

        <p className="text-center mt-5 text-xs sm:text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 font-semibold">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
