import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../api/category.api";

/* SWIPER */
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";

/* ICONS */
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CategorySlider() {
  const navigate = useNavigate();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data?.data || []))
      .catch(console.error);
  }, []);

  if (!categories.length) return null;

  return (
    <section className="relative bg-white rounded-3xl p-5 shadow-md">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base md:text-lg font-bold text-gray-900">
          Shop by Category
        </h2>

        <button
          onClick={() => navigate("/categories")}
          className="text-xs md:text-sm font-semibold text-red-600 hover:text-red-700 transition"
        >
          View all →
        </button>
      </div>

      {/* LEFT ARROW – DESKTOP ONLY */}
      <button
        ref={prevRef}
        className="
          hidden lg:flex
          absolute left-2
          top-1/2 -translate-y-1/2
          z-30
          w-11 h-11
          rounded-full
          bg-white/80
          backdrop-blur
          shadow-xl
          border
          items-center justify-center
          hover:bg-red-600 hover:text-white
          hover:scale-110
          transition-all
        "
      >
        <ChevronLeft size={22} />
      </button>

      {/* RIGHT ARROW – DESKTOP ONLY */}
      <button
        ref={nextRef}
        className="
          hidden lg:flex
          absolute right-2
          top-1/2 -translate-y-1/2
          z-30
          w-11 h-11
          rounded-full
          bg-white/80
          backdrop-blur
          shadow-xl
          border
          items-center justify-center
          hover:bg-red-600 hover:text-white
          hover:scale-110
          transition-all
        "
      >
        <ChevronRight size={22} />
      </button>

      {/* SLIDER */}
      <Swiper
        modules={[FreeMode, Navigation, Mousewheel]}
        freeMode={{ enabled: true, momentum: true }}
        grabCursor
        simulateTouch
        mousewheel={{ forceToAxis: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        spaceBetween={18}
        breakpoints={{
          0: { slidesPerView: 3 },      // 📱 Mobile
          768: { slidesPerView: 5 },    // 📲 Tablet
          1024: { slidesPerView: 8 },   // 🖥 Desktop ✅
        }}
        className="px-1 lg:px-14 cursor-grab active:cursor-grabbing select-none"
      >
        {categories.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              onClick={() => navigate(`/category/${item.id}`)}
              className="group cursor-pointer flex flex-col items-center gap-3 active:scale-95 transition"
            >
              {/* CARD */}
              <div
                className="
                  relative
                  w-20 h-20 md:w-24 md:h-24
                  rounded-3xl
                  bg-gradient-to-br
                  from-red-50 via-white to-red-100
                  flex items-center justify-center
                  shadow-sm
                  group-hover:shadow-xl
                  group-hover:ring-2
                  group-hover:ring-red-500/40
                  transition-all
                "
              >
                {item.image ? (
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL_PROD}/${item.image}`}
                    alt={item.name}
                    className="
                      w-10 h-10 md:w-12 md:h-12
                      object-contain
                      transition
                      group-hover:scale-110
                      group-hover:brightness-0
                      group-hover:invert
                    "
                  />
                ) : (
                  <span className="text-2xl font-bold text-red-600 group-hover:text-white">
                    {item.name?.charAt(0)}
                  </span>
                )}
              </div>

              {/* LABEL */}
              <p
                className="
                  text-[11px] md:text-sm
                  font-semibold
                  text-center
                  text-gray-800
                  group-hover:text-red-600
                  transition
                "
              >
                {item.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
