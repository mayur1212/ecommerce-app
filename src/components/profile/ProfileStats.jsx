import { useProfile } from "../../context/ProfileContext";
import StatItem from "./shared/StatItem";

export default function ProfileStats() {
  const { stats } = useProfile();
  const safeStats = stats || { followers: 0, following: 0, posts: 0, likes: 0 };

  return (
    <div className="flex justify-around mt-6 text-center">
      <StatItem label="Followers" value={safeStats.followers} />
      <StatItem label="Following" value={safeStats.following} />
      <StatItem label="Posts" value={safeStats.posts} />
      <StatItem label="Likes" value={safeStats.likes} />
    </div>
  );
}
