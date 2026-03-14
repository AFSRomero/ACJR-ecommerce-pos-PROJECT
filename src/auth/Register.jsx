import { useState } from "react";
import api from "@/app/api";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; 

export default function Register() {
  const [form, setForm] = useState({
    name: "", 
    email: "", 
    password: "", 
    password_confirmation: "", 
    role: "customer", 
    system_key: "" 
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register", form);
      alert("Registration Successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed. Check your connection.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-logo">
          <span className="logo-icon">🌿</span>
          <h2>Foodino</h2>
        </div>
        <h1>Create Account</h1>
        
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>
            <input placeholder="Enter your name" onChange={e => setForm({...form, name: e.target.value})} required />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="Enter email" onChange={e => setForm({...form, email: e.target.value})} required />
          </div>

          <div className="form-group">
            <label>Account Type</label>
            <select 
              value={form.role} 
              onChange={e => setForm({...form, role: e.target.value})}
              style={{ width: '100%', padding: '14px', borderRadius: '14px', border: '1px solid #e0e6e3' }}
            >
              <option value="customer">Customer</option>
              <option value="cashier">Cashier</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {(form.role === 'admin' || form.role === 'cashier') && (
            <div className="form-group">
              <label>Staff Secret Key</label>
              <input 
                type="password" 
                placeholder="Enter System Security Key" 
                onChange={e => setForm({...form, system_key: e.target.value})} 
                required 
              />
            </div>
          )}

          <div className="form-group" style={{ position: 'relative' }}>
            <label>Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Create password" 
              onChange={e => setForm({...form, password: e.target.value})} 
              required 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '15px', top: '38px', border: 'none', background: 'none', cursor: 'pointer' }}
            >
              {showPassword ? "👁️" : "🙈"}
            </button>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input 
              type="password" 
              placeholder="Confirm password" 
              onChange={e => setForm({...form, password_confirmation: e.target.value})} 
              required 
            />
          </div>

          <button type="submit" className="login-btn">Register</button>
        </form>

        <div className="login-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
}