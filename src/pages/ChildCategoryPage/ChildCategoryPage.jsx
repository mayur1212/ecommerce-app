import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChildCategories } from "../../api/category.api";

export default function ChildCategoryPage() {
  const { categoryId, subId } = useParams();

  const [childCategories, setChildCategories] = useState([]);

  useEffect(() => {
    getChildCategories(categoryId, subId)
      .then((res) => {
        setChildCategories(res.data.data || []);
      });
  }, [categoryId, subId]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Child Categories</h2>

      {childCategories.map((child) => (
        <div
          key={child.id}
          className="p-3 border mb-2 rounded"
        >
          {child.name}
        </div>
      ))}
    </div>
  );
}
