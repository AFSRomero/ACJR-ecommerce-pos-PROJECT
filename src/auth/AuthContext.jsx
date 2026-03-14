import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"; 
import api from "@/app/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on page refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    api.get("/user")
      .then(res => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    try {
      // 1. Get CSRF Cookie from the root (not /api)
      await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', { withCredentials: true });

      // 2. Perform Login via the api instance
      const response = await api.post("/login", credentials);
      const { token, user: userData } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setUser(userData);
        return response.data;
      }
    } catch (error) {
      console.error("AuthContext Login Error:", error);
      throw error; 
    }
  };

  const register = async (userData) => {
    try {
      // This sends name, email, password, role, AND system_key
      const response = await api.post("/register", userData);
      return response.data;
    } catch (err) {
      console.error("AuthContext Register Error:", err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);