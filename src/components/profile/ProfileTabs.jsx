import ProfileTabBar from "./ProfileTabBar";
import ProfileServices from "./tabs/ProfileServices";
import ProfileStories from "./tabs/ProfileStories";
import ProfileReels from "./tabs/ProfileReels";
import ProfilePosts from "./tabs/ProfilePosts";
import ProfileBlogs from "./tabs/ProfileBlogs";
import { useProfile } from "../../context/ProfileContext";

export default function ProfileTabs() {
  const { activeTab } = useProfile();

  return (
    <>
      <ProfileTabBar />

      <div className="mt-6">
        {activeTab === "services" && <ProfileServices />}
        {activeTab === "stories" && <ProfileStories />}
        {activeTab === "reels" && <ProfileReels />}
        {activeTab === "posts" && <ProfilePosts />}
        {activeTab === "blogs" && <ProfileBlogs />}
      </div>
    </>
  );
}
