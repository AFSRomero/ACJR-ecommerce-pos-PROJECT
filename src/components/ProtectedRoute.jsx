import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRole }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" replace />;

  // If role not loaded properly
  if (!user.role) {
    console.log("User role missing:", user);
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    // Redirect based on actual role
    if (user.role === "admin") return <Navigate to="/inventory" replace />;
    if (user.role === "cashier") return <Navigate to="/pos" replace />;
    if (user.role === "customer") return <Navigate to="/" replace />;
  }

  return children;
}