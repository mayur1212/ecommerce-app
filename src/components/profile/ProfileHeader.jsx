import { useProfile } from "../../context/ProfileContext";
import { Pencil, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfileHeader() {
  const { user, setIsEditOpen } = useProfile();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="relative flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-2xl shadow-sm">

      {/* PROFILE IMAGE */}
      <div className="relative">
        <img
          src={user.avatar}
          alt="profile"
          className="w-28 h-28 rounded-full object-cover border"
        />

        {/* EDIT BUTTON ON IMAGE (MOBILE) */}
        <button
          onClick={() => setIsEditOpen(true)}
          className="
            absolute bottom-1 right-1
            sm:hidden
            bg-black text-white
            p-2 rounded-full
            shadow-md
            hover:bg-gray-800
          "
        >
          <Pencil size={16} />
        </button>
      </div>

      {/* INFO */}
      <div className="flex-1 text-center sm:text-left">
        <h2 className="text-2xl font-bold">
          {user.firstName} {user.lastName}
        </h2>

        <p className="text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-400">{user.mobile}</p>
        <p className="text-sm text-gray-400">{user.location}</p>

        {/* LOGOUT (MOBILE) */}
        <button
          onClick={handleLogout}
          className="
            sm:hidden
            mt-4
            flex items-center justify-center gap-2
            text-red-600 text-sm font-semibold
          "
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

      {/* EDIT + LOGOUT (DESKTOP) */}
      <div className="hidden sm:flex flex-col gap-2 absolute top-4 right-4">
        <button
          onClick={() => setIsEditOpen(true)}
          className="
            flex items-center gap-2
            border px-4 py-1.5
            rounded-full text-sm font-semibold
            hover:bg-gray-100
          "
        >
          <Pencil size={14} />
          Edit Profile
        </button>

        <button
          onClick={handleLogout}
          className="
            flex items-center gap-2
            px-4 py-1.5
            rounded-full text-sm font-semibold
            text-red-600
            hover:bg-red-50
          "
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </div>
  );
}
