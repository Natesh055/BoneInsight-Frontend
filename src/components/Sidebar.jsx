import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ role }) {
  const sidebarStyle = {
    backgroundColor: "#f8fafd",
    width: "220px",
    minHeight: "100vh",
    padding: "24px",
    boxShadow: "2px 0 12px rgba(0, 0, 0, 0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const linkStyle = {
    color: "#182133",
    textDecoration: "none",
    fontWeight: 500,
    padding: "10px 12px",
    borderRadius: "8px",
    transition: "all 0.2s ease",
  };

  const linkHoverStyle = {
    color: "#fff",
    backgroundColor: "#2076d4",
  };

  return (
    <div style={sidebarStyle}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
        <li>
          <Link
            to="/dashboard"
            style={linkStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, linkHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, linkStyle)}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/upload"
            style={linkStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, linkHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, linkStyle)}
          >
            Upload Scan
          </Link>
        </li>
        <li>
          <Link
            to="/results"
            style={linkStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, linkHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, linkStyle)}
          >
            Results
          </Link>
        </li>
        {role === "admin" && (
          <li>
            <Link
              to="/admin"
              style={linkStyle}
              onMouseEnter={(e) => Object.assign(e.target.style, linkHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.target.style, linkStyle)}
            >
              Admin Panel
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
