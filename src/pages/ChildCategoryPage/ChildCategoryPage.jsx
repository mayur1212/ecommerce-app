import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getChildCategories } from "../../api/category.api";
import { useSearch } from "../../context/SearchContext";

export default function ChildCategoryPage() {
  const { categoryId, subId } = useParams();
  const navigate = useNavigate();
  const { searchText } = useSearch(); // ✅ GLOBAL SEARCH

  const [childCategories, setChildCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    let active = true;

    const loadChildCategories = async () => {
      try {
        setLoading(true);
        const res = await getChildCategories(categoryId, subId);
        if (active) {
          setChildCategories(res.data?.data || []);
        }
      } catch (err) {
        if (active) {
          setError("Failed to load child categories");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadChildCategories();

    return () => {
      active = false;
    };
  }, [categoryId, subId]);

  /* ================= GLOBAL SEARCH HANDLER ================= */
  useEffect(() => {
    let active = true;

    // 🔁 Search cleared → reload default list
    if (!searchText.trim()) {
      setSearchLoading(false);
      getChildCategories(categoryId, subId).then((res) => {
        if (active) {
          setChildCategories(res.data?.data || []);
        }
      });
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setSearchLoading(true);
        const res = await getChildCategories(
          categoryId,
          subId,
          searchText
        );
        if (active) {
          setChildCategories(res.data?.data || []);
        }
      } finally {
        if (active) setSearchLoading(false);
      }
    }, 400);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [searchText, categoryId, subId]);

  /* ================= UI STATES ================= */

  if (loading) {
    return (
      <div className="p-6 text-gray-500 font-semibold">
        Loading child categories…
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
          Child Categories
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Select a category to explore products
        </p>
      </div>

      {/* SEARCH LOADING */}
      {searchLoading && (
        <p className="text-sm text-gray-500 mb-4">
          Searching child categories…
        </p>
      )}

      {/* EMPTY STATE (ONLY AFTER SEARCH) */}
      {!searchLoading && searchText && !childCategories.length && (
        <div className="text-gray-500 text-sm">
          No child categories found
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
        {childCategories.map((child) => (
          <div
            key={child.id}
            onClick={() =>
              navigate(
                `/products?category=${categoryId}&sub=${subId}&child=${child.id}`
              )
            }
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
              {child.image ? (
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL_PROD}/${child.image}`}
                  alt={child.name}
                  className="w-9 h-9 object-contain group-hover:brightness-0 group-hover:invert"
                />
              ) : (
                <span className="text-xl font-bold text-red-600 group-hover:text-white">
                  {child.name?.charAt(0)}
                </span>
              )}
            </div>

            {/* NAME */}
            <h3 className="text-sm font-semibold text-center text-gray-800 group-hover:text-red-600">
              {child.name}
            </h3>

            {/* DESCRIPTION */}
            {child.description && (
              <p className="text-xs text-gray-500 text-center mt-1 line-clamp-2">
                {child.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
