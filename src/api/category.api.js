import api from "./axios";

// GET all categories
export const getCategories = (search = "") => {
  return api.get(
    `/categories?category_type=product&search=${search}`
  );
};

// GET subcategories by category
export const getSubCategories = (categoryId, search = "") => {
  return api.get(
    `/subcategories?category_id=${categoryId}&search=${search}`
  );
};

// GET child categories
export const getChildCategories = (
  categoryId,
  subCategoryId,
  search = ""
) => {
  return api.get(
    `/child-categories?category_id=${categoryId}&sub_category_id=${subCategoryId}&search=${search}`
  );
};
