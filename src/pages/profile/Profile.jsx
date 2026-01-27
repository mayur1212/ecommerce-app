import { ProfileProvider } from "../../context/ProfileContext";

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileStats from "../../components/profile/ProfileStats";
import ProfileActions from "../../components/profile/ProfileActions";
import ProfileTabs from "../../components/profile/ProfileTabs";
import EditProfileModal from "../../components/profile/EditProfileModal"; // ✅ ADD THIS

export default function Profile() {
  return (
    <ProfileProvider>
      <div className="min-h-screen bg-gray-50">
        {/* TOP GRADIENT */}
        <div className="h-44 bg-gradient-to-r from-orange-500 to-red-500" />

        <div className="max-w-6xl mx-auto -mt-20 px-4">
          {/* PROFILE CARD */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <ProfileHeader />
            <ProfileStats />
            <ProfileActions />
          </div>

          {/* TABS */}
          <div className="mt-6">
            <ProfileTabs />
          </div>
        </div>

        {/* ✅ EDIT PROFILE POPUP (GLOBAL) */}
        <EditProfileModal />
      </div>
    </ProfileProvider>
  );
}
