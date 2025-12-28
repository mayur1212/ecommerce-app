export default function Badge({ count }) {
  if (!count || count <= 0) return null;

  return (
    <span
      className="
        absolute -top-1 -right-1
        min-w-[14px] h-[14px]
        px-[3px]
        rounded-full
        bg-red-600 text-white
        text-[9px] font-bold
        flex items-center justify-center
        leading-none
      "
    >
      {count > 9 ? "9+" : count}
    </span>
  );
}
