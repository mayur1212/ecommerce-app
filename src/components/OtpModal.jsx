import { motion } from "framer-motion";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function OtpModal({ phone, onClose, onSuccess }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error("Enter valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      await api.post("auth/verify-registration-otp", {
        phone,
        otp,
      });

      toast.success("Registration successful 🎉");
      onSuccess();

    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-6 w-[90%] max-w-sm"
      >
        <h2 className="text-xl font-bold text-center text-red-600">
          Verify OTP
        </h2>

        <p className="text-center text-sm text-gray-500 mt-1">
          Sent to +91 {phone}
        </p>

        <input
          className="mt-4 w-full border rounded-xl px-4 py-3 text-center text-lg tracking-widest"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
        />

        <button
          onClick={verifyOtp}
          disabled={loading}
          className="w-full mt-4 bg-red-600 text-white py-3 rounded-xl font-semibold"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <button
          onClick={onClose}
          className="w-full mt-2 text-sm text-gray-500"
        >
          Cancel
        </button>
      </motion.div>
    </div>
  );
}
