import { useParams, useNavigate } from "react-router-dom";
import categories from "../../data/categories";

export default function CategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentCategory = id
    ? categories.find((cat) => cat.id === id)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="sticky top-0 z-10 bg-white border-b px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-xl font-bold text-red-600"
        >
          ←
        </button>

        <h1 className="text-lg font-bold text-gray-900">
          {currentCategory ? currentCategory.title : "All Categories"}
        </h1>
      </div>

      <div className="p-4">
        {/* SINGLE CATEGORY */}
        {currentCategory && (
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center text-3xl">
                <currentCategory.icon />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  {currentCategory.title}
                </h2>
                <p className="text-sm text-gray-500">
                  Explore best deals & offers
                </p>
              </div>
            </div>

            <button
              className="
                w-full
                bg-red-600
                text-white
                py-3
                rounded-xl
                font-semibold
                hover:bg-red-700
                transition
              "
            >
              Browse Products
            </button>
          </div>
        )}

        {/* VIEW ALL */}
        {!currentCategory && (
          <div
            className="
              grid
              grid-cols-4
              sm:grid-cols-4
              md:grid-cols-6
              lg:grid-cols-8
              gap-4
            "
          >
            {categories.map((cat) => {
              const Icon = cat.icon;

              return (
                <div
                  key={cat.id}
                  onClick={() => navigate(`/category/${cat.id}`)}
                  className="
                    cursor-pointer
                    bg-white
                    rounded-2xl
                    p-3
                    flex
                    flex-col
                    items-center
                    gap-2
                    shadow-sm
                    hover:shadow-md
                    transition
                  "
                >
                  <div className="w-14 h-14 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-2xl">
                    <Icon />
                  </div>

                  <p className="text-xs font-semibold text-center">
                    {cat.title}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
