import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSubCategories } from "../../api/category.api";

export default function SubCategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    getSubCategories(categoryId)
      .then((res) => {
        setSubCategories(res.data.data || []);
      });
  }, [categoryId]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Sub Categories</h2>

      {subCategories.map((sub) => (
        <div
          key={sub.id}
          onClick={() =>
            navigate(`/category/${categoryId}/${sub.id}`)
          }
          className="cursor-pointer p-3 border mb-2 rounded"
        >
          {sub.name}
        </div>
      ))}
    </div>
  );
}
