import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);

  /* ================= FETCH PROFILE ================= */
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
    } catch (err) {
      console.error("Profile fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  /* ================= UPDATE PROFILE ================= */
  const updateProfile = async (form) => {
    try {
      const payload = new FormData();
      payload.append("first_name", form.firstName);
      payload.append("last_name", form.lastName);
      payload.append("email", form.email);
      payload.append("mobile", form.mobile);
      payload.append("location", form.location);

      if (form.avatar) {
        payload.append("avatar", form.avatar); // ✅ IMAGE
      }

      await api.post("customer/profile", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Profile updated successfully ✅");

      await fetchProfile();
      setIsEditOpen(false);
      return true;
    } catch (err) {
      toast.error("Failed to update profile ❌");
      return false;
    }
  };

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
        isEditOpen,
        setIsEditOpen,
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used inside ProfileProvider");
  }
  return context;
}
