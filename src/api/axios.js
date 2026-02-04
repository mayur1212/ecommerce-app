import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL_PROD, // https://admin.indstary.com/api
  headers: {
    Accept: "application/json",
  },
});

const PUBLIC_ROUTES = [
  "/auth/login",
  "/auth/register",
  "/auth/verify-login-otp",
  "/auth/resend-login-otp",
  "/auth/verify-registration-otp",
  "/auth/resend-registration-otp",
];

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const url = config.url || "";

  const isPublicRoute = PUBLIC_ROUTES.some((r) => url.includes(r));

  if (token && !isPublicRoute) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");

      const path = window.location.pathname;
      if (!path.includes("login") && !path.includes("register")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export default api;
