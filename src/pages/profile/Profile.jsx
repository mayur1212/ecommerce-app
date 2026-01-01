import { ProfileProvider } from "../../context/ProfileContext";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileStats from "../../components/profile/ProfileStats";
import ProfileActions from "../../components/profile/ProfileActions";
import ProfileTabs from "../../components/profile/ProfileTabs";

export default function Profile() {
  return (
    <ProfileProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="h-44 bg-gradient-to-r from-orange-500 to-red-500" />

        <div className="max-w-6xl mx-auto  -mt-20">
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <ProfileHeader />
            <ProfileStats />
            <ProfileActions />
          </div>

          <div className="mt-6">
            <ProfileTabs />
          </div>
        </div>
      </div>
    </ProfileProvider>
  );
}
