export default function BottomBar() {
  return (
    <nav className="
      fixed bottom-0 left-0 right-0
      bg-white border-t shadow-md
      flex justify-around items-center
      py-2 md:hidden z-50
    ">

      <div className="flex flex-col items-center">
        <span className="text-3xl">🏠</span>
        <span className="text-xs mt-1 font-medium text-blue-600">Home</span>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-3xl">💬</span>
        <span className="text-xs mt-1 text-gray-500">Chat</span>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-3xl">🎬</span>
        <span className="text-xs mt-1 text-gray-500">Reels</span>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-3xl">📹</span>
        <span className="text-xs mt-1 text-gray-500">Video</span>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-3xl">🔴</span>
        <span className="text-xs mt-1 text-gray-500">Live</span>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-3xl">👤</span>
        <span className="text-xs mt-1 text-gray-500">Account</span>
      </div>

    </nav>
  );
}
