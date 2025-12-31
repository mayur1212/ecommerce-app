import { useProfile } from "../../context/ProfileContext";

export default function ProfileLikes() {
  const { likes } = useProfile();

  return (
    <p className="text-center text-gray-500">
      You liked {likes.length} products ❤️
    </p>
  );
}
