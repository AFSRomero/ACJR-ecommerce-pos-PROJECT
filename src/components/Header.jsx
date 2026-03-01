import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [hoveredLink, setHoveredLink] = useState(null);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const getLinkStyle = (linkName, isCart = false) => ({
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "0.95rem",
    transition: "all 0.3s ease",
    padding: isCart ? "8px 16px" : "5px 10px",
    borderRadius: isCart ? "20px" : "8px",
    backgroundColor: isCart
      ? hoveredLink === "cart"
        ? "#74c69d"
        : "#52b788"
      : hoveredLink === linkName
      ? "rgba(255, 255, 255, 0.1)"
      : "transparent",
    display: isCart ? "flex" : "inline-block",
    alignItems: "center",
    gap: "5px",
  });

  return (
    <header
      style={{
        backgroundColor: "#2d6a4f",
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Link
        to="/"
        style={{
          fontSize: "28px",
          fontWeight: "800",
          color: "#ffffff",
          textDecoration: "none",
          letterSpacing: "-1px",
        }}
      >
        Foodino<span style={{ color: "#d8f3dc" }}>.</span>
      </Link>

      <nav style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <Link
          to="/"
          style={getLinkStyle("menu")}
          onMouseEnter={() => setHoveredLink("menu")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Menu
        </Link>

        <Link
          to="/history"
          style={getLinkStyle("history")}
          onMouseEnter={() => setHoveredLink("history")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Orders
        </Link>

        <Link
          to="/checkout"
          style={getLinkStyle("cart", true)}
          onMouseEnter={() => setHoveredLink("cart")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          🛒 <span>{cart.length}</span>
        </Link>

        {/* ✅ Logout Button */}
        {user && (
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#e63946",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;