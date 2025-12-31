export default function ProfileHeader() {
  return (
    <div className="flex gap-6 items-center bg-white p-6 rounded-xl shadow-sm">
      <img
        src="/avatar.png"
        alt="User"
        className="w-28 h-28 rounded-full object-cover border"
      />

      <div>
        <h2 className="text-xl font-semibold flex gap-2 items-center">
          shopnow_user
          <span className="text-blue-500 text-sm">✔</span>
        </h2>

        <p className="text-gray-600">
          Deals • Fashion • Gadgets
        </p>

        <p className="text-sm text-gray-400">
          Mumbai, India
        </p>
      </div>
    </div>
  );
}
