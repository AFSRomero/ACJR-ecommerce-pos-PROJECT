import { useState } from "react";
import { useAuth } from "../context/AuthContext";   
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await register(form);
      navigate("/login");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed");
      }
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      {error && (
        <div className="bg-red-100 text-red-600 p-2 mb-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="name"
          placeholder="Name"
          className="border p-2 rounded"
          value={form.name}
          onChange={handleChange}
          required
        />

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
          placeholder="Password (min 8 chars)"
          className="border p-2 rounded"
          value={form.password}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          className="border p-2 rounded"
          value={form.role}
          onChange={handleChange}
        >
          <option value="customer">Customer</option>
          <option value="cashier">Cashier</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="bg-black text-white p-2 rounded hover:opacity-90"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-sm text-center">
  Already have an account?{" "}
  <Link to="/login" className="text-blue-600 underline">
    Login here
  </Link>
</p>
    </div>
  );
}