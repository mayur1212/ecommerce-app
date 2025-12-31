import { ProfileProvider } from "../../context/ProfileContext";

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileStats from "../../components/profile/ProfileStats";
import ProfileActions from "../../components/profile/ProfileActions";
import ProfileTabs from "../../components/profile/ProfileTabs";

export default function Profile() {
  return (
    <ProfileProvider>
      <div className="max-w-6xl mx-auto px-6 py-6">
        <ProfileHeader />
        <ProfileStats />
        <ProfileActions />
        <ProfileTabs />
      </div>
    </ProfileProvider>
  );
}
