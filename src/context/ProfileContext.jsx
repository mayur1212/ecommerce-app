import { createContext, useContext, useState } from "react";

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  /* ================= USER PROFILE ================= */
  const [user, setUser] = useState({
    firstName: "Mayur",
    lastName: "Takke",

    // ecommerce identity (NOT instagram)
    email: "mayur@email.com",
    mobile: "9876543210",

    location: "Mumbai, India",

    // ✅ STATIC LIVE IMAGE LINK (CDN)
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400",
  });

  /* ================= STATS ================= */
  const [stats, setStats] = useState({
    followers: 1300,
    following: 210,
    posts: 98,
    likes: 920,
  });

  /* ================= ACTION STATES ================= */
  const [isFollowing, setIsFollowing] = useState(false);

  /* ================= TABS ================= */
  const [activeTab, setActiveTab] = useState("services");
  // services | stories | reels | posts | blogs

  /* ================= ACTIONS ================= */
  const toggleFollow = () => {
    setIsFollowing((prev) => !prev);

    setStats((prev) => ({
      ...prev,
      followers: isFollowing
        ? prev.followers - 1
        : prev.followers + 1,
    }));
  };

  return (
    <ProfileContext.Provider
      value={{
        /* data */
        user,
        stats,

        /* actions */
        setUser,
        setStats,
        isFollowing,
        toggleFollow,

        /* tabs */
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
