import { useProfile } from "../../context/ProfileContext";

export default function ProfileProducts() {
  const { likes, toggleLike } = useProfile();

  return (
    <div className="grid grid-cols-3 gap-4">
      {[1,2,3,4,5,6,7,8,9].map((id) => (
        <div
          key={id}
          className="relative aspect-square bg-gray-100 rounded-xl"
        >
          <button
            onClick={() => toggleLike(id)}
            className="absolute top-2 right-2 text-xl"
          >
            {likes.includes(id) ? "❤️" : "🤍"}
          </button>
        </div>
      ))}
    </div>
  );
}
