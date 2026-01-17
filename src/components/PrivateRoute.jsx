import { Navigate, useLocation } from "react-router-dom";

/**
 * PrivateRoute
 * ----------------
 * - Checks if user is logged in (JWT token)
 * - If NOT logged in → redirect to /login
 * - Remembers last page for redirect after login
 */
export default function PrivateRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}
