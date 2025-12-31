import { useProfile } from "../../context/ProfileContext";

export default function ProfileActions() {
  const { isFollowing, toggleFollow } = useProfile();

  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={toggleFollow}
        className={`flex-1 py-2 rounded-full font-semibold transition ${
          isFollowing
            ? "bg-gray-200 text-black"
            : "bg-red-500 text-white"
        }`}
      >
        {isFollowing ? "Following" : "Follow"}
      </button>

      <button className="flex-1 py-2 rounded-full border">
        Message
      </button>
    </div>
  );
}
