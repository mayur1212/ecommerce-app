import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getProfile,
  updateProfileApi,
  updateProfileImageApi,
  updateSocialLinksApi,
} from "../api/profile.api";
import { useAuth } from "./AuthContext";

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("services");
  const [isFollowing, setIsFollowing] = useState(false);
  const [stats, setStats] = useState({
    followers: 0,
    following: 0,
    posts: 0,
    likes: 0,
  });
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      const d = res.data?.data;

      const name = (d.name || "").split(" ");

      setUser({
        firstName: name[0] || "",
        lastName: name.slice(1).join(" "),
        email: d.email || "",
        username: d.username || "",
        mobile: d.phone || "",
        gender: d.gender || "",
        dob: d.dob || "",
        address: d.address || "",
        city: d.city || "",
        state: d.state || "",
        country: d.country || "",
        pincode: d.pincode || "",
        location:
          d.location ||
          [d.city, d.state, d.country].filter(Boolean).join(", "),
        avatar: d.avatar || "/default-avatar.png",
        socials: {
          whatsapp: d.whatsapp || "",
          website: d.website || "",
          facebook: d.facebook || "",
          instagram: d.instagram || "",
          linkedin: d.linkedin || "",
          youtube: d.youtube || "",
          telegram: d.telegram || "",
          twitter: d.twitter || "",
        },
      });

      setStats({
        followers: Number(d.followers ?? d.followers_count ?? 0),
        following: Number(d.following ?? d.following_count ?? 0),
        posts: Number(d.posts ?? d.posts_count ?? 0),
        likes: Number(d.likes ?? d.likes_count ?? 0),
      });
    } catch {
      toast.error("Failed to load profile");
      setStats({
        followers: 0,
        following: 0,
        posts: 0,
        likes: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE ================= */
  const updateProfile = async (form) => {
    try {
      // 🔹 PROFILE + LOCATION
      const profileFD = new FormData();
      profileFD.append("name", `${form.firstName} ${form.lastName}`.trim());
      profileFD.append("username", form.username || "");
      profileFD.append("phone", form.mobile || "");
      profileFD.append("gender", form.gender || "");
      profileFD.append("dob", form.dob || "");
      profileFD.append("address", form.address || "");
      profileFD.append("city", form.city || "");
      profileFD.append("state", form.state || "");
      profileFD.append("country", form.country || "");
      profileFD.append("pincode", form.pincode || "");

      await updateProfileApi(profileFD);

      // 🔹 SOCIAL LINKS
      const socialFD = new FormData();
      Object.entries(form.socials || {}).forEach(([k, v]) =>
        socialFD.append(k, v || "")
      );

      await updateSocialLinksApi(socialFD);

      // 🔹 IMAGE
      if (form.avatar) {
        const imgFD = new FormData();
        imgFD.append("avatar", form.avatar);
        await updateProfileImageApi(imgFD);
      }

      toast.success("Profile updated successfully ✅");
      setIsEditOpen(false);
      fetchProfile();
    } catch (e) {
      toast.error("Profile update failed ❌");
    }
  };

  const toggleFollow = () => {
    setIsFollowing((prev) => !prev);
  };

  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchProfile();
  }, [token]);

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <ProfileContext.Provider
      value={{
        user,
        isEditOpen,
        setIsEditOpen,
        updateProfile,
        activeTab,
        setActiveTab,
        isFollowing,
        toggleFollow,
        stats,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
