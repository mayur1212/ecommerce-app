import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../api/category.api";

export default function CategoryPage() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        if (mounted) {
          setCategories(res.data?.data || []);
        }
      } catch (err) {
        console.error("Category API Error:", err);
        if (mounted) {
          setError("Failed to load categories");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchCategories();
    return () => (mounted = false);
  }, []);

  /* ================= UI STATES ================= */

  if (loading) {
    return (
      <div className="p-6 text-gray-500 font-semibold">
        Loading categories…
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  if (!categories.length) {
    return (
      <div className="p-6 text-gray-500">
        No categories found
      </div>
    );
  }

  /* ================= MAIN UI ================= */

  return (
    <section className="p-4 md:p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-lg md:text-xl font-bold text-gray-900">
          All Categories
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Browse products by category
        </p>
      </div>

      {/* GRID */}
      <div className="
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        gap-4
      ">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/category/${cat.id}`)}
            className="
              group
              cursor-pointer
              bg-white
              rounded-2xl
              p-4
              shadow-sm
              hover:shadow-xl
              transition-all
              active:scale-95
              border
            "
          >
            {/* ICON / IMAGE */}
            <div className="
              w-16 h-16
              mx-auto
              mb-3
              rounded-2xl
              bg-gradient-to-br
              from-red-50 via-white to-red-100
              flex items-center justify-center
              group-hover:from-red-500
              group-hover:to-red-600
              transition
            ">
              {cat.image ? (
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL_PROD}/${cat.image}`}
                  alt={cat.name}
                  className="
                    w-9 h-9
                    object-contain
                    transition
                    group-hover:brightness-0
                    group-hover:invert
                  "
                />
              ) : (
                <span className="
                  text-xl
                  font-bold
                  text-red-600
                  group-hover:text-white
                ">
                  {cat.name?.charAt(0)}
                </span>
              )}
            </div>

            {/* NAME */}
            <h3 className="
              text-sm
              font-semibold
              text-center
              text-gray-800
              group-hover:text-red-600
              transition
            ">
              {cat.name}
            </h3>

            {/* DESCRIPTION */}
            {cat.description && (
              <p className="
                text-xs
                text-gray-500
                text-center
                mt-1
                line-clamp-2
              ">
                {cat.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
