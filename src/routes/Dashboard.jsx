import React from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { user } = useAuth();

  const wrapperStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
    background: "linear-gradient(120deg, #f6faff 0%, #e3eaea 100%)",
    color: "#182133",
  };

  const mainAreaStyle = {
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

  const welcomeCardStyle = {
    maxWidth: "100%",
    padding: "24px",
    borderRadius: "18px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 32px rgba(43, 83, 135, 0.13)",
  };

  const headingStyle = {
    fontSize: "1.8rem",
    fontWeight: "700",
    marginBottom: "8px",
    color: "#2076d4",
  };

  const statusMessageStyle = {
    fontSize: "1rem",
    color: "#a3a9bb",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginTop: "24px",
  };

  const cardStyle = {
    backgroundColor: "#f3f7fb",
    borderRadius: "11px",
    padding: "16px",
    boxShadow: "0 2px 14px rgba(120,142,176,0.10)",
  };

  const protectedStyle = {
    backgroundColor: "#fff8f0",
    color: "#c6491c",
    borderRadius: "9px",
    padding: "16px",
    marginTop: "24px",
    border: "1.5px solid #ffd9b5",
    textAlign: "center",
    fontWeight: "500",
  };

  return (
    <div style={wrapperStyle}>
      <Navbar />
      <div style={mainAreaStyle}>
        <Sidebar role={user?.role} />

        <main style={contentStyle}>
          {/* Welcome Card */}
          <div style={welcomeCardStyle}>
            <h1 style={headingStyle}>Welcome, {user?.name} 👋</h1>
            <p style={statusMessageStyle}>
              Your recent scans and analytics will appear here.
            </p>
          </div>

          {/* Recent Scans */}
          <section style={gridStyle}>
            {[
              { id: "001", prediction: "Normal", confidence: "98%" },
              { id: "002", prediction: "Abnormal", confidence: "87%" },
              { id: "003", prediction: "Normal", confidence: "92%" },
              { id: "004", prediction: "Abnormal", confidence: "78%" },
            ].map((scan) => (
              <div key={scan.id} style={cardStyle}>
                <h2 style={{ fontWeight: "600", marginBottom: "4px" }}>
                  Scan #{scan.id}
                </h2>
                <p>Prediction: {scan.prediction}</p>
                <p>Confidence: {scan.confidence}</p>
              </div>
            ))}
          </section>

          {/* Protected Area / Extra Info */}
          <div style={protectedStyle}>
            ⚠️ Only authorized users can view detailed scan reports.
          </div>
        </main>
      </div>
    </div>
  );
}
