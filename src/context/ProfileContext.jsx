import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ EDIT MODAL STATE
  const [isEditOpen, setIsEditOpen] = useState(false);

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("customer/profile");
        const data = res.data.data;

        const baseURL = import.meta.env.VITE_API_BASE_URL_PROD.replace(
          "/api/v1",
          ""
        );

        setUser({
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          mobile: data.mobile,
          location: data.location,
          avatar: data.avatar
            ? data.avatar.startsWith("http")
              ? data.avatar
              : `${baseURL}/${data.avatar}`
            : "/default-avatar.png",
        });

        setStats({
          followers: data.followers ?? 0,
          following: data.following ?? 0,
          posts: data.posts ?? 0,
          likes: data.likes ?? 0,
        });
      } catch (error) {
        console.error("Profile fetch failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
    <ProfileContext.Provider
      value={{
        user,
        stats,
        setUser,
        setStats,
        isEditOpen,
        setIsEditOpen,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
