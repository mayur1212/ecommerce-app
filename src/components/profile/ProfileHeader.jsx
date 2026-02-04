import { useProfile } from "../../context/ProfileContext";
import { useAuth } from "../../context/AuthContext";
import { Pencil, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfileHeader() {
  const { user, setIsEditOpen } = useProfile();
  const { logout } = useAuth(); // ✅ AuthContext logout
  const navigate = useNavigate();

  // 🛡 SAFETY
  if (!user) return null;

  const handleLogout = () => {
    logout(); // 🔥 clears token + auth state
    navigate("/login", { replace: true });
  };

  return (
    <div className="relative flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-2xl shadow-sm">
      
      {/* ================= PROFILE IMAGE ================= */}
      <div className="relative">
        <img
          src={user.avatar || "/default-avatar.png"}
          alt="profile"
          className="w-28 h-28 rounded-full object-cover border-2 border-red-100"
        />

        {/* EDIT BUTTON – MOBILE */}
        <button
          type="button"
          onClick={() => setIsEditOpen(true)}
          className="absolute bottom-1 right-1 sm:hidden bg-red-600 text-white p-2 rounded-full shadow-md hover:bg-red-700 transition"
        >
          <Pencil size={16} />
        </button>
      </div>

      {/* ================= USER INFO ================= */}
      <div className="flex-1 text-center sm:text-left">
        <h2 className="text-2xl font-bold text-gray-900">
          {user.firstName} {user.lastName}
        </h2>

        {user.email && (
          <p className="text-gray-600 text-sm">{user.email}</p>
        )}
        {user.mobile && (
          <p className="text-sm text-gray-400">{user.mobile}</p>
        )}
        {user.location && (
          <p className="text-sm text-gray-400">{user.location}</p>
        )}

        {/* LOGOUT – MOBILE */}
        <button
          type="button"
          onClick={handleLogout}
          className="sm:hidden mt-4 flex items-center justify-center gap-2 text-red-600 text-sm font-semibold"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

      {/* ================= DESKTOP ACTIONS ================= */}
      <div className="hidden sm:flex flex-col gap-2 absolute top-4 right-4">
        <button
          type="button"
          onClick={() => setIsEditOpen(true)}
          className="flex items-center gap-2 border px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
        >
          <Pencil size={14} />
          Edit Profile
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold text-red-600 hover:bg-red-50 transition"
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </div>
  );
}
