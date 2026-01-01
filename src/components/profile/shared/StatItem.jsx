export default function StatItem({ label, value }) {
  return (
    <div>
      <p className="text-lg font-bold">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}
