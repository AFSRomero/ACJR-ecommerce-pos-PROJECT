import axios from "axios";

const api = axios.create({
  // Ensure this matches your Laravel port
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials: true,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  }
});

// Automatically attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;