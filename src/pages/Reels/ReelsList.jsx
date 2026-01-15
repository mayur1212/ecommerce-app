import { useRef, useState, useEffect } from "react";
import reelsData from "../../data/reelsData";

export default function ReelsList() {
  // 🔑 Global sound state
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [soundUnlocked, setSoundUnlocked] = useState(false);

  /* 🔥 UNLOCK SOUND ON FIRST SCROLL / TOUCH (NO TAP MESSAGE) */
  useEffect(() => {
    const unlockSound = () => {
      if (!soundUnlocked) {
        setSoundUnlocked(true);
        setSoundEnabled(true); // 🔊 sound ON by default
      }
    };

    window.addEventListener("scroll", unlockSound, { once: true });
    window.addEventListener("touchstart", unlockSound, { once: true });

    return () => {
      window.removeEventListener("scroll", unlockSound);
      window.removeEventListener("touchstart", unlockSound);
    };
  }, [soundUnlocked]);

  return (
    <div className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
      {reelsData.map((reel) => (
        <ReelItem
          key={reel.id}
          reel={reel}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
        />
      ))}
    </div>
  );
}

/* ================= SINGLE REEL ================= */

function ReelItem({ reel, soundEnabled, setSoundEnabled }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(reel.likes);
  const [followed, setFollowed] = useState(false);

  /* 🔥 PLAY / PAUSE BASED ON VISIBILITY */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.muted = !soundEnabled;
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      },
      { threshold: 0.6 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [soundEnabled]);

  /* 🔊 / 🔇 MANUAL TOGGLE */
  const toggleSound = async (e) => {
    e.stopPropagation();
    setSoundEnabled((prev) => !prev);
    try {
      await videoRef.current.play();
    } catch {}
  };

  /* ❤️ LIKE */
  const handleLike = () => {
    setLiked((p) => !p);
    setLikes((p) => (liked ? p - 1 : p + 1));
  };

  return (
    <div ref={containerRef} className="relative h-screen w-full snap-start">
      {/* VIDEO */}
      <video
        ref={videoRef}
        src={reel.video}
        playsInline
        loop
        muted={!soundEnabled}
        className="h-full w-full object-cover"
      />

      {/* 🔊 SOUND ICON */}
      <button
        onClick={toggleSound}
        className="absolute top-16 right-4 z-30 bg-black/60 text-white p-2 rounded-full"
      >
        {soundEnabled ? "🔊" : "🔇"}
      </button>

      {/* RIGHT ACTIONS */}
      <div className="absolute right-3 bottom-28 flex flex-col items-center gap-6 text-white z-20">
        <button onClick={handleLike} className="flex flex-col items-center">
          <span className={`text-2xl ${liked ? "scale-110" : ""}`}>
            {liked ? "❤️" : "🤍"}
          </span>
          <span className="text-xs mt-1">{likes}</span>
        </button>

        <button className="flex flex-col items-center">
          💬
          <span className="text-xs mt-1">{reel.comments}</span>
        </button>

        <button>🔄</button>
        <button>📤</button>
      </div>

      {/* BOTTOM INFO */}
      <div className="absolute bottom-6 left-4 right-16 text-white z-20">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gray-400" />
          <span className="font-semibold text-sm">{reel.username}</span>

          <button
            onClick={() => setFollowed((p) => !p)}
            className={`ml-2 px-2 py-[2px] text-xs rounded border
              ${followed ? "border-gray-400 text-gray-300" : "border-white"}
            `}
          >
            {followed ? "Following" : "Follow"}
          </button>
        </div>

        <p className="text-sm leading-snug line-clamp-2">
          {reel.caption}
        </p>
      </div>

      {/* GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50 z-10" />
    </div>
  );
}
