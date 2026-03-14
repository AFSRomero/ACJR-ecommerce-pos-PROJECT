import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import "./AppLayout.css";

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login"); 
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="app-shell">
      <nav className="main-navbar no-print">
        <div className="nav-container">
          <div className="nav-logo">
            <Link to="/" className="logo-link">
              <span className="logo-icon">🌿</span>
              <span className="logo-text">Foodino</span>
            </Link>
          </div>
          
          <div className="nav-links">
            <Link to="/" className="nav-item">Menu</Link>
            
            {(user?.role === 'admin' || user?.role === 'cashier') && (
              <Link to="/pos" className="nav-item">POS Terminal</Link>
            )}

            {user?.role === 'admin' && (
              <>
                <Link to="/inventory" className="nav-item">Inventory</Link>
                <Link to="/dashboard" className="nav-item">Admin Panel</Link>
              </>
            )}

            {user ? (
              <div className="user-controls">
                <span className="user-badge">{user.role.toUpperCase()}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout ({user.name.split(' ')[0]})
                </button>
              </div>
            ) : (
              <Link to="/login" className="sign-in-btn">Sign In</Link>
            )}
          </div>
        </div>
      </nav>

      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}