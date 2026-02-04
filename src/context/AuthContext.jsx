import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  /* ================= SET AUTH HEADER ================= */
  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  /* ================= LOAD USER FROM TOKEN ================= */
  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchUser = async () => {
      try {
        const res = await api.get("/customer/profile");

        if (isMounted) {
          setUser(res.data?.data || null);
        }
      } catch (err) {
        console.error("Auth profile fetch failed", err);

        // ❌ invalid / expired token
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [token]);

  /* ================= LOGIN ================= */
  const login = (accessToken) => {
    localStorage.setItem("token", accessToken);
    setToken(accessToken);
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        login,
        logout,
        isAuthenticated: Boolean(token),
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ================= HOOK ================= */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
