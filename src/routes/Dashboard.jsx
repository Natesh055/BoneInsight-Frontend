import React from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
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

  const mainAreaStyle = {
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

  const welcomeCardStyle = {
    width: "100%",
    padding: "28px",
    borderRadius: "20px",
    background: "white",
    boxShadow: "0 8px 26px rgba(0,0,0,0.08)",
    transition: "transform 0.2s ease, box-shadow 0.3s ease",
  };

  const headingStyle = {
    fontSize: "1.9rem",
    fontWeight: "800",
    marginBottom: "8px",
    color: "#2076d4",
    letterSpacing: "0.3px",
  };

  const statusMessageStyle = {
    fontSize: "1rem",
    color: "#6b7280",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "8px",
  };

  const cardStyle = {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
    transition: "transform 0.2s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  };

  const scanTitleStyle = {
    fontWeight: "700",
    fontSize: "1.1rem",
    color: "#374151",
    marginBottom: "6px",
  };

  const scanDetailStyle = {
    fontSize: "0.95rem",
    color: "#6b7280",
    marginBottom: "4px",
  };

  const protectedStyle = {
    background: "#fff4e6",
    color: "#b45309",
    borderRadius: "12px",
    padding: "16px",
    marginTop: "20px",
    border: "1.5px solid #fcd9a7",
    textAlign: "center",
    fontWeight: "600",
  };

  return (
    <div style={wrapperStyle}>
      <Navbar />
      <div style={mainAreaStyle}>
        <Sidebar role={user?.role} />

        <main style={contentStyle}>
          {/* Welcome Card */}
          <div
            style={welcomeCardStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 12px 32px rgba(32,118,212,0.15)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 8px 26px rgba(0,0,0,0.08)")
            }
          >
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
              <div
                key={scan.id}
                style={cardStyle}
                onMouseEnter={(e) =>
                  Object.assign(e.currentTarget.style, {
                    boxShadow: "0 10px 28px rgba(32,118,212,0.15)",
                    transform: "translateY(-4px)",
                  })
                }
                onMouseLeave={(e) =>
                  Object.assign(e.currentTarget.style, cardStyle)
                }
              >
                <h2 style={scanTitleStyle}>Scan #{scan.id}</h2>
                <p style={scanDetailStyle}>
                  Prediction:{" "}
                  <span
                    style={{
                      fontWeight: "600",
                      color:
                        scan.prediction === "Normal" ? "#16a34a" : "#dc2626",
                    }}
                  >
                    {scan.prediction}
                  </span>
                </p>
                <p style={scanDetailStyle}>
                  Confidence:{" "}
                  <span style={{ fontWeight: "600", color: "#2563eb" }}>
                    {scan.confidence}
                  </span>
                </p>
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
