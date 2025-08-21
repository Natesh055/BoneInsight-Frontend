import React from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminPanel() {
  const { user } = useAuth();

  const wrapperStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
    background: "linear-gradient(120deg, #f6faff 0%, #e3eaea 100%)",
    color: "#182133",
  };

  const mainStyle = {
    display: "flex",
    flex: 1,
    padding: "32px",
  };

  const contentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  };

  const headingStyle = {
    fontSize: "1.8rem",
    fontWeight: "700",
    marginBottom: "16px",
    color: "#2076d4",
  };

  const cardStyle = {
    padding: "24px",
    borderRadius: "18px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 32px rgba(43, 83, 135, 0.13)",
    marginBottom: "16px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  };

  return (
    <div style={wrapperStyle}>
      <Navbar />
      <div style={mainStyle}>
        <Sidebar role={user?.role} />
        <main style={contentStyle}>
          <div style={cardStyle}>
            <h1 style={headingStyle}>Admin Dashboard</h1>
            <p>Manage users, monitor logs, and view system analytics here.</p>
          </div>

          {/* Example Analytics / User Cards */}
          <div style={gridStyle}>
            <div style={cardStyle}>
              <h2 style={{ fontWeight: "600" }}>Users</h2>
              <p>Total: 120</p>
              <p>Active: 98</p>
            </div>
            <div style={cardStyle}>
              <h2 style={{ fontWeight: "600" }}>System Logs</h2>
              <p>Errors: 5</p>
              <p>Recent Activity: 20 actions</p>
            </div>
            <div style={cardStyle}>
              <h2 style={{ fontWeight: "600" }}>Uploads</h2>
              <p>Last 24h: 40 scans</p>
              <p>Pending Review: 5 scans</p>
            </div>
            <div style={cardStyle}>
              <h2 style={{ fontWeight: "600" }}>Performance</h2>
              <p>Avg. Response Time: 250ms</p>
              <p>Server Uptime: 99.9%</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
