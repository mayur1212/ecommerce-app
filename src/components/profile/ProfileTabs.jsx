import { useState } from "react";
import ProfileProducts from "./ProfileProducts";
import ProfileLikes from "./ProfileLikes";
import ProfileWishlist from "./ProfileWishlist";
import ProfileActivity from "./ProfileActivity";

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <>
      <div className="flex justify-around mt-6 bg-white rounded-xl shadow-sm border-b">
        {["products", "likes", "wishlist", "activity"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 font-medium capitalize ${
              activeTab === tab
                ? "border-b-2 border-red-500 text-red-500"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === "products" && <ProfileProducts />}
        {activeTab === "likes" && <ProfileLikes />}
        {activeTab === "wishlist" && <ProfileWishlist />}
        {activeTab === "activity" && <ProfileActivity />}
      </div>
    </>
  );
}
