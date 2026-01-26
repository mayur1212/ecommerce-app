import api from "./axios";

/* ===============================
   GET ALL CATEGORIES (PRODUCT)
   {{baseURL}}/categories?category_type=product&search=
================================ */
export const getCategories = (search = "") => {
  return api.get(
    `/categories?category_type=product&search=${encodeURIComponent(search)}`
  );
};

/* ===============================
   GET SUB CATEGORIES
   {{baseURL}}/subcategories?category_id=2&search=
================================ */
export const getSubCategories = (categoryId, search = "") => {
  return api.get(
    `/subcategories?category_id=${categoryId}&search=${encodeURIComponent(search)}`
  );
};

/* ===============================
   GET CHILD CATEGORIES
   {{baseURL}}/child-categories?category_id=2&sub_category_id=9&search=Shorts
================================ */
export const getChildCategories = (
  categoryId,
  subCategoryId,
  search = ""
) => {
  return api.get(
    `/child-categories?category_id=${categoryId}&sub_category_id=${subCategoryId}&search=${encodeURIComponent(search)}`
  );
};
