import React from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Results() {
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
    letterSpacing: "0.2px",
  };

  const resultsCardStyle = {
    padding: "24px",
    borderRadius: "18px",
    backgroundColor: "#ffffff",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  };

  const scanTitleStyle = {
    fontWeight: "700",
    fontSize: "1.1rem",
    marginBottom: "6px",
  };

  const detailTextStyle = {
    fontSize: "0.95rem",
    color: "#4b5563",
    margin: "4px 0",
  };

  return (
    <div style={wrapperStyle}>
      <Navbar />
      <div style={mainStyle}>
        <Sidebar role={user?.role} />
        <main style={contentStyle}>
          {/* Header Card */}
          <div
            style={resultsCardStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 12px 28px rgba(32,118,212,0.15)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(0,0,0,0.08)")
            }
          >
            <h1 style={headingStyle}>Your Scan Results 🩻</h1>
            <p style={{ fontSize: "1rem", color: "#6b7280" }}>
              Predictions, confidence scores, and doctor notes will be displayed here.
            </p>
          </div>

          {/* Example Result Cards */}
          <div style={gridStyle}>
            {/* Normal Scan */}
            <div
              style={{
                ...resultsCardStyle,
                borderLeft: "6px solid #16a34a",
              }}
              onMouseEnter={(e) =>
                Object.assign(e.currentTarget.style, {
                  boxShadow: "0 10px 26px rgba(22,163,74,0.2)",
                  transform: "translateY(-3px)",
                })
              }
              onMouseLeave={(e) =>
                Object.assign(e.currentTarget.style, {
                  ...resultsCardStyle,
                  borderLeft: "6px solid #16a34a",
                })
              }
            >
              <h2 style={scanTitleStyle}>✅ Scan #001</h2>
              <p style={detailTextStyle}>
                Prediction: <b style={{ color: "#16a34a" }}>Normal</b>
              </p>
              <p style={detailTextStyle}>
                Confidence: <b style={{ color: "#2563eb" }}>95%</b>
              </p>
              <p style={detailTextStyle}>Doctor Notes: Everything looks fine.</p>
            </div>

            {/* Abnormal Scan */}
            <div
              style={{
                ...resultsCardStyle,
                borderLeft: "6px solid #dc2626",
              }}
              onMouseEnter={(e) =>
                Object.assign(e.currentTarget.style, {
                  boxShadow: "0 10px 26px rgba(220,38,38,0.2)",
                  transform: "translateY(-3px)",
                })
              }
              onMouseLeave={(e) =>
                Object.assign(e.currentTarget.style, {
                  ...resultsCardStyle,
                  borderLeft: "6px solid #dc2626",
                })
              }
            >
              <h2 style={scanTitleStyle}>❌ Scan #002</h2>
              <p style={detailTextStyle}>
                Prediction: <b style={{ color: "#dc2626" }}>Abnormal</b>
              </p>
              <p style={detailTextStyle}>
                Confidence: <b style={{ color: "#2563eb" }}>82%</b>
              </p>
              <p style={detailTextStyle}>Doctor Notes: Follow-up required.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
