import React from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Results() {
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

  const resultsCardStyle = {
    padding: "24px",
    borderRadius: "18px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 32px rgba(43, 83, 135, 0.13)",
    marginBottom: "16px",
  };

  return (
    <div style={wrapperStyle}>
      <Navbar />
      <div style={mainStyle}>
        <Sidebar role={user?.role} />
        <main style={contentStyle}>
          <div style={resultsCardStyle}>
            <h1 style={headingStyle}>Your Scan Results</h1>
            <p>
              Predictions, confidence scores, and doctor notes will be displayed here.
            </p>
          </div>

          {/* Example of future scan result cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={resultsCardStyle}>
              <h2 style={{ fontWeight: "600" }}>Scan #001</h2>
              <p>Prediction: Normal</p>
              <p>Confidence: 95%</p>
              <p>Doctor Notes: Everything looks fine.</p>
            </div>
            <div style={resultsCardStyle}>
              <h2 style={{ fontWeight: "600" }}>Scan #002</h2>
              <p>Prediction: Abnormal</p>
              <p>Confidence: 82%</p>
              <p>Doctor Notes: Follow-up required.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
