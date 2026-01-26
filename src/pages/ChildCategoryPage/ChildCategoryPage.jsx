import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getChildCategories } from "../../api/category.api";
import { Search } from "lucide-react";

export default function ChildCategoryPage() {
  const { categoryId, subId } = useParams();
  const navigate = useNavigate();

  const [childCategories, setChildCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    const loadChildCategories = async () => {
      try {
        setLoading(true);
        const res = await getChildCategories(categoryId, subId);
        setChildCategories(res.data?.data || []);
      } catch (err) {
        console.error("ChildCategory API Error:", err);
        setError("Failed to load child categories");
      } finally {
        setLoading(false);
      }
    };

    loadChildCategories();
  }, [categoryId, subId]);

  /* ================= SEARCH (ONLY WHEN TYPING) ================= */
  useEffect(() => {
    if (!search.trim()) return; // ✅ stop search on empty input

    const timer = setTimeout(async () => {
      try {
        setSearchLoading(true);
        const res = await getChildCategories(
          categoryId,
          subId,
          search
        );
        setChildCategories(res.data?.data || []);
      } finally {
        setSearchLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search, categoryId, subId]);

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

      {/* SEARCH BAR */}
      <div className="relative mb-6 max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);

            // ✅ reset list when cleared
            if (!value.trim()) {
              getChildCategories(categoryId, subId).then((res) =>
                setChildCategories(res.data?.data || [])
              );
            }
          }}
          placeholder="Search child category…"
          className="
            w-full
            pl-10 pr-4 py-2.5
            rounded-xl
            border
            text-sm
            outline-none
            focus:ring-2 focus:ring-red-500/30
            focus:border-red-500
          "
        />
      </div>

      {/* SEARCH LOADING */}
      {searchLoading && (
        <p className="text-sm text-gray-500 mb-4">
          Searching child categories…
        </p>
      )}

      {/* EMPTY STATE (ONLY AFTER SEARCH) */}
      {!searchLoading && search && !childCategories.length && (
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
