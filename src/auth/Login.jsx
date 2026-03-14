import { useState } from "react";
import { useAuth } from "@/auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // WRAP credentials in an object { email, password }
      const response = await login({ email, password }); 
      
      // REDIRECT logic based on the response user data
      const userRole = response.user.role;
      if (userRole === 'admin') navigate("/dashboard");
      else if (userRole === 'cashier') navigate("/pos");
      else navigate("/");
      
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-logo">
          <span className="logo-icon">🌿</span>
          <h2>Foodino</h2>
        </div>
        <h1>Welcome Back</h1>
        <p className="login-subtitle">Please enter your details</p>

        {error && <div className="login-error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group" style={{ position: 'relative' }}>
            <label>Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Enter password" 
              value={password}
              onChange={e => setPassword(e.target.value)} 
              required 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '15px', top: '38px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
            >
              {showPassword ? "👁️" : "🙈"}
            </button>
          </div>

          <button type="submit" className="login-btn">Sign In</button>
        </form>

        <div className="login-footer">
          Don't have an account? <Link to="/register">Create one</Link>
        </div>
      </div>
    </div>
  );
}