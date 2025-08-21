import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();

  const navStyle = {
    backgroundColor: "#2076d4",
    color: "#fff",
    padding: "16px 36px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "'Inter', sans-serif",
    boxShadow: "0 3px 12px rgba(0,0,0,0.15)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  };

  const brandStyle = {
    fontWeight: "900",
    fontSize: "1.75rem",
    letterSpacing: "1.5px",
    textShadow: "0 2px 4px rgba(0,0,0,0.2)",
    userSelect: "none",
  };

  const linkStyle = {
    marginLeft: "20px",
    textDecoration: "none",
    color: "#dbeafe", /* lighter blue for subtle contrast */
    fontWeight: 600,
    fontSize: "1rem",
    transition: "color 0.25s ease",
  };

  const linkHoverStyle = {
    color: "#ffffff",
  };

  const buttonStyle = {
    marginLeft: "20px",
    padding: "8px 18px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#ffffff",
    color: "#2076d4",
    fontWeight: 700,
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "0 3px 10px rgba(32, 118, 212, 0.3)",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
    userSelect: "none",
  };

  const buttonHoverStyle = {
    backgroundColor: "#e1f0ff",
    boxShadow: "0 6px 16px rgba(32, 118, 212, 0.5)",
  };

  const userInfoStyle = {
    marginRight: "12px",
    fontWeight: 600,
    fontSize: "1rem",
    color: "#dbeafe",
    userSelect: "none",
  };

  // Handlers for hover effects on links (since inline style can't do :hover)
  const handleLinkMouseEnter = (e) => {
    Object.assign(e.target.style, linkHoverStyle);
  };
  const handleLinkMouseLeave = (e) => {
    Object.assign(e.target.style, linkStyle);
  };

  return (
    <nav style={navStyle}>
      <div style={brandStyle}>BoneInsight</div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {user ? (
          <>
            <span style={userInfoStyle}>{user.name} ({user.role})</span>
            <button
              onClick={logout}
              style={buttonStyle}
              onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/"
              style={linkStyle}
              onMouseEnter={handleLinkMouseEnter}
              onMouseLeave={handleLinkMouseLeave}
            >
              Login
            </Link>
            <Link
              to="/signup"
              style={linkStyle}
              onMouseEnter={handleLinkMouseEnter}
              onMouseLeave={handleLinkMouseLeave}
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
