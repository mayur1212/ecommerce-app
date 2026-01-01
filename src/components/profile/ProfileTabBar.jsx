import { useProfile } from "../../context/ProfileContext";

const tabs = ["services", "stories", "reels", "posts", "blogs"];

export default function ProfileTabBar() {
  const { activeTab, setActiveTab } = useProfile();

  return (
    <div className="flex justify-around bg-white rounded-xl shadow-sm">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`py-3 capitalize font-medium ${
            activeTab === tab
              ? "text-red-500 border-b-2 border-red-500"
              : "text-gray-500"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
