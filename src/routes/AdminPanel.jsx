import React from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminPanel() {
  const { user } = useAuth();

  /* ---------- Inline Styles ---------- */
  const wrapperStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
    background: "linear-gradient(120deg, #f8fbff 0%, #eef4f7 100%)",
    color: "#182133",
  };

  const mainStyle = {
    display: "flex",
    flex: 1,
    padding: "28px 36px",
    gap: "24px",
  };

  const contentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  };

  const headingStyle = {
    fontSize: "1.9rem",
    fontWeight: "800",
    marginBottom: "12px",
    color: "#2076d4",
    letterSpacing: "0.3px",
  };

  const cardStyle = {
    padding: "24px",
    borderRadius: "18px",
    backgroundColor: "#ffffff",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  };

  const statCardBase = {
    ...cardStyle,
    cursor: "pointer",
  };

  // Custom accent borders for differentiation
  const usersCardStyle = {
    ...statCardBase,
    borderLeft: "5px solid #2563eb",
  };
  const logsCardStyle = {
    ...statCardBase,
    borderLeft: "5px solid #dc2626",
  };
  const uploadsCardStyle = {
    ...statCardBase,
    borderLeft: "5px solid #16a34a",
  };
  const performanceCardStyle = {
    ...statCardBase,
    borderLeft: "5px solid #f59e0b",
  };

  const sectionTitleStyle = {
    fontWeight: "700",
    fontSize: "1.1rem",
    marginBottom: "6px",
  };

  const detailTextStyle = {
    fontSize: "0.95rem",
    color: "#4b5563",
    margin: "2px 0",
  };

  return (
    <div style={wrapperStyle}>
      <Navbar />
      <div style={mainStyle}>
        <Sidebar role={user?.role} />
        <main style={contentStyle}>
          {/* Welcome / Admin Overview */}
          <div
            style={cardStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 12px 28px rgba(32,118,212,0.15)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(0,0,0,0.08)")
            }
          >
            <h1 style={headingStyle}>Admin Dashboard</h1>
            <p style={{ fontSize: "1rem", color: "#6b7280" }}>
              Manage users, monitor logs, and view system analytics here.
            </p>
          </div>

          {/* Analytics Cards */}
          <div style={gridStyle}>
            {/* Users Card */}
            <div
              style={usersCardStyle}
              onMouseEnter={(e) =>
                Object.assign(e.currentTarget.style, {
                  boxShadow: "0 10px 26px rgba(37,99,235,0.2)",
                  transform: "translateY(-3px)",
                })
              }
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, usersCardStyle)}
            >
              <h2 style={sectionTitleStyle}>👥 Users</h2>
              <p style={detailTextStyle}>Total: <b>120</b></p>
              <p style={detailTextStyle}>Active: <b style={{ color: "#16a34a" }}>98</b></p>
            </div>

            {/* Logs Card */}
            <div
              style={logsCardStyle}
              onMouseEnter={(e) =>
                Object.assign(e.currentTarget.style, {
                  boxShadow: "0 10px 26px rgba(220,38,38,0.2)",
                  transform: "translateY(-3px)",
                })
              }
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, logsCardStyle)}
            >
              <h2 style={sectionTitleStyle}>📜 System Logs</h2>
              <p style={detailTextStyle}>
                Errors: <b style={{ color: "#dc2626" }}>5</b>
              </p>
              <p style={detailTextStyle}>Recent Activity: 20 actions</p>
            </div>

            {/* Uploads Card */}
            <div
              style={uploadsCardStyle}
              onMouseEnter={(e) =>
                Object.assign(e.currentTarget.style, {
                  boxShadow: "0 10px 26px rgba(22,163,74,0.2)",
                  transform: "translateY(-3px)",
                })
              }
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, uploadsCardStyle)}
            >
              <h2 style={sectionTitleStyle}>📤 Uploads</h2>
              <p style={detailTextStyle}>Last 24h: <b>40 scans</b></p>
              <p style={detailTextStyle}>Pending Review: <b>5 scans</b></p>
            </div>

            {/* Performance Card */}
            <div
              style={performanceCardStyle}
              onMouseEnter={(e) =>
                Object.assign(e.currentTarget.style, {
                  boxShadow: "0 10px 26px rgba(245,158,11,0.2)",
                  transform: "translateY(-3px)",
                })
              }
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, performanceCardStyle)}
            >
              <h2 style={sectionTitleStyle}>⚡ Performance</h2>
              <p style={detailTextStyle}>Avg. Response Time: <b>250ms</b></p>
              <p style={detailTextStyle}>Server Uptime: <b style={{ color: "#16a34a" }}>99.9%</b></p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
