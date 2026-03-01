import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
const { user } = useAuth();

useEffect(() => {
  if (user) {
    navigate("/");
  } 
}, [user, navigate]);
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login(form);

const role = response?.role || localStorage.getItem("role");

if (user.role === "admin") {
  navigate("/inventory");
} else if (user.role === "cashier") {
  navigate("/pos");
} else {
  navigate("/");
}
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {error && (
        <div className="bg-red-100 text-red-600 p-2 mb-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="bg-black text-white p-2 rounded hover:opacity-90"
        >
          Login
        </button>
      </form>

      {/* Redirect to Register */}
      <p className="mt-4 text-sm text-center">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-600 underline">
          Register here
        </Link>
      </p>
    </div>
  );
}