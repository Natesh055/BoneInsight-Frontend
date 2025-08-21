import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();

  const navStyle = {
    backgroundColor: "#2076d4",
    color: "#fff",
    padding: "16px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "'Inter', sans-serif",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  };

  const brandStyle = {
    fontWeight: "700",
    fontSize: "1.5rem",
  };

  const linkStyle = {
    marginLeft: "16px",
    textDecoration: "none",
    color: "#fff",
    fontWeight: 500,
    transition: "all 0.2s ease",
  };

  const buttonStyle = {
    marginLeft: "16px",
    padding: "6px 14px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#ffffff",
    color: "#2076d4",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  const buttonHover = {
    backgroundColor: "#e1f0ff",
  };

  return (
    <nav style={navStyle}>
      <div style={brandStyle}>BoneInsight</div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {user ? (
          <>
            <span>{user.name} ({user.role})</span>
            <button
              onClick={logout}
              style={buttonStyle}
              onMouseEnter={(e) => Object.assign(e.target.style, buttonHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" style={linkStyle}>Login</Link>
            <Link to="/signup" style={linkStyle}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
