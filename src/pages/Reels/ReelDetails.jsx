import { useParams } from "react-router-dom";
import reelsData from "../../data/reelsData";

export default function ReelDetails() {
  const { id } = useParams();
  const reel = reelsData.find((r) => r.id === Number(id));

  if (!reel) return null;

  return (
    <div className="relative h-screen w-full bg-black">
      {/* VIDEO */}
      <video
        src={reel.video}
        autoPlay
        loop
        playsInline
        className="h-full w-full object-cover"
      />

      {/* TOP BAR */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 text-white z-10">
        <span className="text-lg font-semibold">Reels</span>
      </div>

      {/* RIGHT ICONS */}
      <div className="absolute right-3 bottom-28 flex flex-col items-center gap-5 text-white z-10">
        <button className="flex flex-col items-center">
          ❤️
          <span className="text-xs mt-1">{reel.likes}</span>
        </button>
        <button className="flex flex-col items-center">
          💬
          <span className="text-xs mt-1">{reel.comments}</span>
        </button>
        <button>🔄</button>
        <button>📤</button>
      </div>

      {/* BOTTOM INFO */}
      <div className="absolute bottom-6 left-4 right-16 text-white z-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gray-300" />
          <span className="font-semibold text-sm">
            {reel.username}
          </span>
          <button className="ml-2 border border-white px-2 py-[2px] text-xs rounded">
            Follow
          </button>
        </div>
        <p className="text-sm leading-snug">
          {reel.caption}
        </p>
      </div>

      {/* GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
    </div>
  );
}
