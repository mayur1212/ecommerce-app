import { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [likes, setLikes] = useState([]);

  const toggleFollow = () => setIsFollowing((prev) => !prev);

  const toggleLike = (id) => {
    setLikes((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  return (
    <ProfileContext.Provider
      value={{ isFollowing, toggleFollow, likes, toggleLike }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
