import { useProfile } from "../../context/ProfileContext";

export default function ProfileHeader() {
  const { user, setIsEditOpen } = useProfile();

  return (
    <div className="relative flex items-center gap-6 bg-white  rounded-2xl shadow-sm">
      
      {/* PROFILE IMAGE */}
      <div className="relative">
        <img
          src={user.avatar}
          alt="profile"
          className="w-28 h-28 rounded-full object-cover border"
        />

        
      </div>

      {/* INFO */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold">
          {user.firstName} {user.lastName}
        </h2>

        <p className="text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-400">{user.mobile}</p>
        <p className="text-sm text-gray-400">{user.location}</p>
      </div>

      {/* EDIT BUTTON (RIGHT SIDE) */}
      <button
        onClick={() => setIsEditOpen(true)}
        className="absolute top-4 right-4 border px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-100"
      >
        Edit Profile
      </button>
    </div>
  );
}
