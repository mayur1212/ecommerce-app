import { useNavigate } from "react-router-dom";
import categories from "../../data/categories";

export default function CategorySection() {
  const navigate = useNavigate();

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

      {/* GRID */}
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
        {categories.slice(0, 8).map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              onClick={() => navigate(`/category/${item.id}`)}
              className="
                cursor-pointer
                flex
                flex-col
                items-center
                gap-2
                group
              "
            >
              {/* ICON */}
              <div
                className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-red-50
                  flex
                  items-center
                  justify-center
                  text-red-600
                  text-2xl
                  transition
                  group-hover:bg-red-600
                  group-hover:text-white
                  group-hover:scale-105
                "
              >
                <Icon />
              </div>

              {/* TITLE */}
              <p className="text-xs font-semibold text-center text-gray-700">
                {item.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
