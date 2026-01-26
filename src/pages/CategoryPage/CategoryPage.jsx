import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../api/category.api";
import { useSearch } from "../../context/SearchContext";

export default function CategoryPage() {
  const navigate = useNavigate();
  const { searchText } = useSearch(); // ✅ GLOBAL SEARCH

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const res = await getCategories();
        setCategories(res.data?.data || []);
      } catch (err) {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  /* ================= SEARCH FROM GLOBAL SEARCH BAR ================= */
  useEffect(() => {
    // 🔁 If search cleared → reload normal list
    if (!searchText.trim()) {
      getCategories().then((res) =>
        setCategories(res.data?.data || [])
      );
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setSearchLoading(true);
        const res = await getCategories(searchText);
        setCategories(res.data?.data || []);
      } finally {
        setSearchLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchText]);

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

      {/* SEARCH LOADING */}
      {searchLoading && (
        <p className="text-sm text-gray-500 mb-4">
          Searching categories…
        </p>
      )}

      {/* EMPTY STATE (ONLY AFTER SEARCH) */}
      {!searchLoading && searchText && !categories.length && (
        <div className="text-gray-500 text-sm">
          No categories found
        </div>
      )}

      {/* GRID */}
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          gap-4
        "
      >
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
              border
              transition-all
              active:scale-95
            "
          >
            {/* ICON */}
            <div
              className="
                w-16 h-16 mx-auto mb-3
                rounded-2xl
                bg-gradient-to-br
                from-red-50 via-white to-red-100
                flex items-center justify-center
                group-hover:from-red-500
                group-hover:to-red-600
              "
            >
              {cat.image ? (
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL_PROD}/${cat.image}`}
                  alt={cat.name}
                  className="w-9 h-9 object-contain group-hover:brightness-0 group-hover:invert"
                />
              ) : (
                <span className="text-xl font-bold text-red-600 group-hover:text-white">
                  {cat.name?.charAt(0)}
                </span>
              )}
            </div>

            {/* NAME */}
            <h3 className="text-sm font-semibold text-center text-gray-800 group-hover:text-red-600">
              {cat.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
