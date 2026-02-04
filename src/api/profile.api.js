import api from "./axios";

/* ================= PROFILE ================= */

export const getProfile = () => {
  return api.get("/customer/profile");
};

export const updateProfileApi = (formData) => {
  return api.post("/customer/profile", formData);
};

export const updateProfileImageApi = (formData) => {
  return api.post("/customer/profile-image", formData);
};

export const updateSocialLinksApi = (formData) => {
  return api.post("/customer/social-links", formData);
};
