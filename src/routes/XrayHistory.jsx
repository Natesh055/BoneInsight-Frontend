import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";

export default function XrayHistory({ cardClass }) {
  const { token } = useAuth();
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
            headers: {
              Authorization: `Bearer ${token}`,
            },
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

  if (loading) return <div>Loading X-ray history...</div>;
  if (error) return <div style={{ color: "#ef4444", fontWeight: 600 }}>{error}</div>;
  if (!xrays.length) return <div>No previous X-rays found.</div>;

  // Inline styles
  const gridStyle = {
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

  // Simulate hover for card and image
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
    <div style={gridStyle}>
      {xrays.map((xray) => (
        <div
          key={xray._id}
          className={cardClass}
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
        </div>
      ))}
    </div>
  );
}
