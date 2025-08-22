import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "axios";

export default function FileUpload({ onUpload }) {
  const { token } = useAuth();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("xray", file);

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE}/api/xrays/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ Backward-compatible: pass uploaded metadata if backend returns it
      if (onUpload) onUpload(res.data?.xray || file);

      // ✅ Backward-compatible: reset file input
      setFile(null);
      e.target.reset();

      alert("File uploaded successfully!");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  /* ------ Inline styles ------ */
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    fontFamily: "'Inter', sans-serif",
  };

  const fileInputStyle = {
    padding: "10px",
    borderRadius: "12px",
    border: "1.5px solid #cbd5e1",
    cursor: "pointer",
    fontSize: "1rem",
  };

  const errorStyle = {
    color: "#f43f5e",
    fontWeight: "600",
    fontSize: "0.9rem",
  };

  const buttonStyle = {
    padding: "14px",
    borderRadius: "12px",
    backgroundColor: "#2076d4",
    color: "#fff",
    fontWeight: "700",
    fontSize: "1rem",
    border: "none",
    cursor: uploading ? "not-allowed" : "pointer",
    boxShadow: "0 6px 14px rgba(32, 118, 212, 0.3)",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
    opacity: uploading ? 0.6 : 1,
    userSelect: "none",
  };

  const buttonHoverStyle = {
    backgroundColor: "#185bb0",
    boxShadow: "0 8px 20px rgba(24, 92, 176, 0.5)",
  };

  const handleButtonMouseEnter = (e) => {
    if (!uploading) Object.assign(e.target.style, buttonHoverStyle);
  };
  const handleButtonMouseLeave = (e) => {
    if (!uploading) Object.assign(e.target.style, buttonStyle);
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={fileInputStyle}
      />
      {error && <div style={errorStyle}>{error}</div>}
      <button
        type="submit"
        disabled={uploading}
        style={buttonStyle}
        onMouseEnter={handleButtonMouseEnter}
        onMouseLeave={handleButtonMouseLeave}
      >
        {uploading ? "Uploading..." : "Upload X-ray"}
      </button>
    </form>
  );
}
