import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSubCategories } from "../../api/category.api";
import { Search } from "lucide-react";

export default function SubCategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [subCategories, setSubCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    const loadSubCategories = async () => {
      try {
        setLoading(true);
        const res = await getSubCategories(categoryId);
        setSubCategories(res.data?.data || []);
      } catch (err) {
        setError("Failed to load sub categories");
      } finally {
        setLoading(false);
      }
    };

    loadSubCategories();
  }, [categoryId]);

  /* ================= SEARCH (ONLY WHEN TYPING) ================= */
  useEffect(() => {
    if (!search.trim()) return; // ✅ stop unnecessary calls

    const timer = setTimeout(async () => {
      try {
        setSearchLoading(true);
        const res = await getSubCategories(categoryId, search);
        setSubCategories(res.data?.data || []);
      } finally {
        setSearchLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search, categoryId]);

  /* ================= UI STATES ================= */

  if (loading) {
    return (
      <div className="p-6 text-gray-500 font-semibold">
        Loading sub categories…
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
          Sub Categories
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Choose a category to continue
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
            const val = e.target.value;
            setSearch(val);

            // ✅ reset list when cleared
            if (!val.trim()) {
              getSubCategories(categoryId).then((res) =>
                setSubCategories(res.data?.data || [])
              );
            }
          }}
          placeholder="Search sub category…"
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
          Searching sub categories…
        </p>
      )}

      {/* EMPTY STATE (ONLY AFTER SEARCH) */}
      {!searchLoading && search && !subCategories.length && (
        <div className="text-gray-500 text-sm">
          No sub categories found
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
        {subCategories.map((sub) => (
          <div
            key={sub.id}
            onClick={() =>
              navigate(`/category/${categoryId}/${sub.id}`)
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
              {sub.image ? (
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL_PROD}/${sub.image}`}
                  alt={sub.name}
                  className="w-9 h-9 object-contain group-hover:brightness-0 group-hover:invert"
                />
              ) : (
                <span className="text-xl font-bold text-red-600 group-hover:text-white">
                  {sub.name?.charAt(0)}
                </span>
              )}
            </div>

            {/* NAME */}
            <h3 className="text-sm font-semibold text-center text-gray-800 group-hover:text-red-600">
              {sub.name}
            </h3>

            {/* DESCRIPTION */}
            {sub.description && (
              <p className="text-xs text-gray-500 text-center mt-1 line-clamp-2">
                {sub.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
