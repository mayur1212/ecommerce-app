import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * PrivateRoute
 * ----------------
 * - Uses AuthContext (single source of truth)
 * - Shows nothing while auth is loading
 * - Redirects to login if not authenticated
 * - Remembers last page for post-login redirect
 */
export default function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // ⏳ Wait till auth check finishes
  if (loading) {
    return null; // or loader
  }

  // 🔒 Not logged in → redirect
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // ✅ Logged in
  return children;
}
