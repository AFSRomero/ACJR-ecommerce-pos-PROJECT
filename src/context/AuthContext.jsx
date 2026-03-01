import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.get("/user")
        .then(res => {
          setUser(res.data);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
  const res = await api.post("/login", credentials);

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("role", res.data.user.role);

  setUser(res.data.user);

  return res.data.user;
};

  const register = async (data) => {
    await api.post("/register", data);
  };

  const logout = async () => {
  try {
    await api.post("/logout");
  } catch (err) {
    console.log("Logout error:", err);
  }

  localStorage.removeItem("token");
  localStorage.removeItem("role");
  setUser(null);
};

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);