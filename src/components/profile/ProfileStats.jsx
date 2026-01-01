import { useProfile } from "../../context/ProfileContext";
import StatItem from "./shared/StatItem";

export default function ProfileStats() {
  const { stats } = useProfile();

  return (
    <div className="flex justify-around mt-6 text-center">
      <StatItem label="Followers" value={stats.followers} />
      <StatItem label="Following" value={stats.following} />
      <StatItem label="Posts" value={stats.posts} />
      <StatItem label="Likes" value={stats.likes} />
    </div>
  );
}
