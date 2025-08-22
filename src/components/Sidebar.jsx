import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ role }) {
  const sidebarStyle = {
    backgroundColor: "#f0f4fb",
    width: "220px",
    minHeight: "100vh",
    padding: "32px 24px",
    boxShadow: "2px 0 16px rgba(32, 118, 212, 0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    fontFamily: "'Inter', sans-serif",
  };

  const listStyle = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  };

  const linkBaseStyle = {
    color: "#182133",
    textDecoration: "none",
    fontWeight: 600,
    padding: "12px 16px",
    borderRadius: "10px",
    transition: "all 0.3s ease",
    fontSize: "1rem",
    userSelect: "none",
    display: "block",
  };

  const linkHoverStyle = {
    color: "#ffffff",
    backgroundColor: "#2076d4",
    boxShadow: "0 4px 12px rgba(32, 118, 212, 0.4)",
  };

  const handleMouseEnter = (e) => {
    Object.assign(e.target.style, linkBaseStyle, linkHoverStyle);
  };
  const handleMouseLeave = (e) => {
    Object.assign(e.target.style, linkBaseStyle);
  };

  return (
    <div style={sidebarStyle}>
      <ul style={listStyle}>
        <li>
          <Link
            to="/dashboard"
            style={linkBaseStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/upload"
            style={linkBaseStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Upload Scan
          </Link>
        </li>
        <li>
          <Link
            to="/results"
            style={linkBaseStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Results
          </Link>
        </li>
        {role === "patient" && (
          <li>
            <Link
              to="/history"
              style={linkBaseStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              View History
            </Link>
          </li>
        )}
        {role === "admin" && (
          <li>
            <Link
              to="/admin"
              style={linkBaseStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Admin Panel
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
