import { useProfile } from "../../context/ProfileContext";
import { Pencil } from "lucide-react";

export default function ProfileHeader() {
  const { user, setIsEditOpen } = useProfile();

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
      </div>

      {/* EDIT BUTTON (DESKTOP) */}
      <button
        onClick={() => setIsEditOpen(true)}
        className="
          hidden sm:flex
          items-center gap-2
          absolute top-4 right-4
          border px-4 py-1.5
          rounded-full text-sm font-semibold
          hover:bg-gray-100
        "
      >
        <Pencil size={14} />
        Edit Profile
      </button>
    </div>
  );
}
