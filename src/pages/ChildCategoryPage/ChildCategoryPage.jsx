import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getChildCategories } from "../../api/category.api";

export default function ChildCategoryPage() {
  const { categoryId, subId } = useParams();
  const navigate = useNavigate();

  const [childCategories, setChildCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getChildCategories(categoryId, subId)
      .then((res) => {
        setChildCategories(res.data?.data || []);
      })
      .finally(() => setLoading(false));
  }, [categoryId, subId]);

  /* ================= UI STATES ================= */

  if (loading) {
    return (
      <div className="p-6 text-gray-500 font-semibold">
        Loading child categories…
      </div>
    );
  }

  if (!childCategories.length) {
    return (
      <div className="p-6 text-gray-500">
        No child categories found
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
              navigate(`/products?category=${categoryId}&sub=${subId}&child=${child.id}`)
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
            {/* ICON / IMAGE */}
            <div
              className="
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
              "
            >
              {child.image ? (
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL_PROD}/${child.image}`}
                  alt={child.name}
                  className="
                    w-9 h-9
                    object-contain
                    transition
                    group-hover:brightness-0
                    group-hover:invert
                  "
                />
              ) : (
                <span
                  className="
                    text-xl
                    font-bold
                    text-red-600
                    group-hover:text-white
                  "
                >
                  {child.name?.charAt(0)}
                </span>
              )}
            </div>

            {/* NAME */}
            <h3
              className="
                text-sm
                font-semibold
                text-center
                text-gray-800
                group-hover:text-red-600
                transition
              "
            >
              {child.name}
            </h3>

            {/* OPTIONAL DESCRIPTION */}
            {child.description && (
              <p
                className="
                  text-xs
                  text-gray-500
                  text-center
                  mt-1
                  line-clamp-2
                "
              >
                {child.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
