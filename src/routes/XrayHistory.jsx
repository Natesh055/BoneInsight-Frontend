import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

// Blob-fetch Image component to handle auth protected image endpoints
function XrayImage({ xrayId, token, alt, style }) {
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    let isActive = true;
    axios
      .get(`${import.meta.env.VITE_API_BASE}/api/xrays/${xrayId}/image`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      })
      .then((res) => {
        if (isActive) {
          const url = URL.createObjectURL(res.data);
          setImgUrl(url);
        }
      })
      .catch(() => {
        if (isActive) setImgUrl(null);
      });
    return () => {
      isActive = false;
      if (imgUrl) URL.revokeObjectURL(imgUrl);
    };
  }, [xrayId, token]);

  if (!imgUrl) return <div>Loading image...</div>;
  return <img src={imgUrl} alt={alt} style={style} />;
}

export default function XrayHistory1() {
  const { token, user } = useAuth();
  const [xrays, setXrays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchXrays = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_BASE}/api/xrays/history`, {
          headers: { Authorization: `Bearer ${token}` },
        });
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

  const scanTitleStyle = {
    fontWeight: "700",
    fontSize: "1.1rem",
    marginTop: "12px",
    marginBottom: "6px",
    textAlign: "left",
  };

  const detailTextStyle = {
    fontSize: "0.95rem",
    color: "#4b5563",
    margin: "4px 0",
    textAlign: "left",
  };

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
                    <XrayImage xrayId={xray._id} token={token} alt={xray.filename} style={imgStyle} />
                    <p style={filenameStyle}>{xray.filename}</p>
                    <p style={dateStyle}>
                      Uploaded: {new Date(xray.uploadedAt).toLocaleString()}
                    </p>

                    <div>
                      <p style={scanTitleStyle}>
                        {xray.prediction && xray.prediction.toLowerCase() === "normal"
                          ? "Scan #"
                          : "Scan #"}
                        {index + 1}
                      </p>
                      <p style={detailTextStyle}>
                        Prediction:{" "}
                        <b
                          style={{
                            color:
                              xray.prediction?.toLowerCase() === "normal"
                                ? "#16a34a"
                                : "#dc2626",
                          }}
                        >
                          {xray.prediction || "Unknown"}
                        </b>
                      </p>
                      <p style={detailTextStyle}>
                        Confidence:{" "}
                        <b style={{ color: "#2563eb" }}>
                          {xray.confidence ? `${xray.confidence}%` : "N/A"}
                        </b>
                      </p>
                      <p style={detailTextStyle}>
                        Doctor Notes: {xray.doctorNotes || "No notes available."}
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
