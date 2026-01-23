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
        const res = await getCategories(); // API call
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

    return () => {
      mounted = false;
    };
  }, []);

  /* ================= UI STATES ================= */

  if (loading) {
    return (
      <div className="p-4 text-gray-600 font-semibold">
        Loading categories...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="p-4 text-gray-500">
        No categories found
      </div>
    );
  }

  /* ================= MAIN UI ================= */

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">All Categories</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/category/${cat.id}`)} // ✅ ID ONLY
            className="
              cursor-pointer
              bg-white
              p-4
              rounded-xl
              shadow-sm
              hover:shadow-md
              transition
              active:scale-95
            "
          >
            <p className="font-semibold text-gray-800">
              {cat.name}
            </p>

            {/* optional subtitle */}
            {cat.description && (
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {cat.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
