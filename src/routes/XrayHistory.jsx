import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function ResultsDashboard() {
  const { token, user } = useAuth();
  const [xrays, setXrays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchXrays = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE}/api/xrays/history`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setXrays(res.data.xrays || []);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch X-rays");
      } finally {
        setLoading(false);
      }
    };
    fetchXrays();
  }, [token]);

  // Styles
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
    gap: "36px",
  };

  // Scan Results styles
  const resultsCardStyle = {
    padding: "24px",
    borderRadius: "18px",
    backgroundColor: "#ffffff",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  };

  const headingStyle = {
    fontSize: "1.9rem",
    fontWeight: "800",
    marginBottom: "12px",
    color: "#2076d4",
    letterSpacing: "0.2px",
  };

  const gridResultsStyle = {
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

  // X-ray History grid/card styles
  const gridXrayStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
    gap: "26px",
    padding: "10px",
  };

  const cardStyle = {
    background: "#fff",
    borderRadius: "14px",
    boxShadow: "0 6px 18px rgba(32, 118, 212, 0.08)",
    padding: "18px",
    textAlign: "center",
    transition: "box-shadow 0.25s, transform 0.18s",
    cursor: "pointer",
  };

  const imgStyle = {
    width: "100%",
    aspectRatio: "1/1",
    borderRadius: "9px",
    objectFit: "cover",
    boxShadow: "0 2px 8px rgba(32, 118, 212, 0.10)",
    transition: "transform 0.2s",
  };

  const filenameStyle = {
    marginTop: "14px",
    fontSize: "1rem",
    fontWeight: 600,
    color: "#2076d4",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const dateStyle = {
    fontSize: "0.83rem",
    color: "#6b7280",
    fontWeight: 500,
    marginTop: "6px",
    letterSpacing: "0.06em",
  };

  // Hover handlers
  const handleCardMouseEnter = (e) => {
    Object.assign(e.currentTarget.style, {
      boxShadow: "0 12px 32px rgba(32,118,212,0.13)",
      transform: "translateY(-4px)",
    });
    const img = e.currentTarget.querySelector("img");
    if (img) img.style.transform = "scale(1.06)";
  };

  const handleCardMouseLeave = (e) => {
    Object.assign(e.currentTarget.style, cardStyle);
    const img = e.currentTarget.querySelector("img");
    if (img) img.style.transform = "scale(1)";
  };

  return (
    <div style={wrapperStyle}>
      <Navbar />
      <div style={mainStyle}>
        <Sidebar role={user?.role} />
        <main style={contentStyle}>
          {/* Scan Results Section */}
          <div
            style={resultsCardStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 12px 28px rgba(32,118,212,0.15)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)")
            }
          >
            <h1 style={headingStyle}>Your Scan Results 🩻</h1>
            <p style={{ fontSize: "1rem", color: "#6b7280" }}>
              Predictions, confidence scores, and doctor notes will be displayed here.
            </p>
          </div>
          {/* <div style={gridResultsStyle}>
            <div
              style={{ ...resultsCardStyle, borderLeft: "6px solid #16a34a" }}
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
            <div
              style={{ ...resultsCardStyle, borderLeft: "6px solid #dc2626" }}
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
          </div> */}

          {/* X-ray History Section */}
          <div>
            <h1
              style={{
                fontSize: "1.7rem",
                fontWeight: "800",
                color: "#2076d4",
                margin: "8px 0 6px 0",
                letterSpacing: "0.15em",
              }}
            >
              Previous X-ray Uploads
            </h1>
            {loading ? (
              <div>Loading X-ray history...</div>
            ) : error ? (
              <div style={{ color: "#ef4444", fontWeight: 600 }}>{error}</div>
            ) : xrays.length === 0 ? (
              <div>No previous X-rays found.</div>
            ) : (
              <div style={gridXrayStyle}>
                {xrays.map((xray, index) => (
                  <div
                    key={xray._id}
                    style={cardStyle}
                    onMouseEnter={handleCardMouseEnter}
                    onMouseLeave={handleCardMouseLeave}
                  >
                    <img
                      src={`${import.meta.env.VITE_API_BASE}/${xray.filepath}`}
                      alt={xray.filename}
                      style={imgStyle}
                    />
                    <p style={filenameStyle}>{xray.filename}</p>
                    <p style={dateStyle}>
                      Uploaded: {new Date(xray.uploadedAt).toLocaleString()}
                    </p>

                    {/* Hardcoded scan info */}
                    <div style={{ marginTop: "12px", textAlign: "left" }}>
                      <p style={scanTitleStyle}>✅ Scan #{index + 1}</p>
                      <p style={detailTextStyle}>
                        Prediction: <b style={{ color: "#16a34a" }}>Normal</b>
                      </p>
                      <p style={detailTextStyle}>
                        Confidence: <b style={{ color: "#2563eb" }}>95%</b>
                      </p>
                      <p style={detailTextStyle}>
                        Doctor Notes: Everything looks fine.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
