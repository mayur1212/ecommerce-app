import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../api/category.api";

/* SWIPER */
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

export default function CategorySlider() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // ✅ FIX: function call
        const res = await getCategories();

        // ✅ FIX: correct response structure
        const list =
          res.data?.data?.categories ||
          res.data?.data ||
          [];

        console.log("CATEGORY SLIDER DATA 👉", list);
        setCategories(list);
      } catch (err) {
        console.error("Category slider error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        Loading categories...
      </div>
    );
  }

  if (!categories.length) {
    return (
      <div className="bg-white rounded-2xl p-4 shadow-sm text-gray-500">
        No categories found
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">
          Shop by Category
        </h2>

        <button
          onClick={() => navigate("/categories")}
          className="text-sm font-semibold text-red-600 hover:underline"
        >
          View All
        </button>
      </div>

      {/* SLIDER */}
      <Swiper
        modules={[FreeMode]}
        freeMode
        spaceBetween={14}
        slidesPerView="auto"
        className="!pb-2"
      >
        {categories.map((item) => (
          <SwiperSlide
            key={item.id}
            className="!w-[90px]"
          >
            <div
              onClick={() => navigate(`/category/${item.id}`)}
              className="cursor-pointer flex flex-col items-center gap-2 group"
            >
              {/* IMAGE */}
              <div className="
                w-16 h-16 rounded-2xl bg-red-50
                border border-red-100
                flex items-center justify-center
                transition
                group-hover:bg-red-600
                group-hover:scale-105
              ">
                {item.image ? (
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL_PROD}/${item.image}`}
                    alt={item.name}
                    className="w-8 h-8 object-contain group-hover:brightness-0 group-hover:invert"
                  />
                ) : (
                  <span className="text-xl font-bold text-red-600 group-hover:text-white">
                    {item.name?.charAt(0)}
                  </span>
                )}
              </div>

              {/* NAME */}
              <p className="text-[11px] font-semibold text-center text-gray-700 leading-tight">
                {item.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
