function Stat({ label, value }) {
  return (
    <div>
      <p className="font-bold text-lg">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}

export default function ProfileStats() {
  return (
    <div className="flex justify-around text-center bg-white mt-4 py-4 rounded-xl shadow-sm">
      <Stat label="Followers" value="1.3K" />
      <Stat label="Following" value="210" />
      <Stat label="Likes" value="920" />
      <Stat label="Orders" value="38" />
    </div>
  );
}
